import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { seo } from "@/data/seo";
import { dateDuJourAParis } from "@/lib/dates";
import type { ArticleComplet, Bloc, BlocType } from "@/lib/supabase/types";
import { estTriplet, validerArticle } from "./valider.mjs";

/**
 * Articles « fichiers » : un article = un fichier JSON dans `contenu/articles/`.
 *
 * Pourquoi (décision du 06/10/2026) : les articles historiques du Palladia
 * vivent dans la base Supabase du site, que l'agent contenus de Clickzou (une
 * routine cloud) ne peut pas atteindre — il n'a accès qu'aux dépôts GitHub. Un
 * article fichier se publie donc par un simple commit, sans écriture en base ni
 * DDL. Les deux sources sont fusionnées à l'affichage (src/lib/blog.ts) ; les
 * articles en base ne changent pas.
 *
 * Publication à date : un article dont `datePublication` est dans le futur
 * (heure de Paris) est invisible — 404 sur son adresse, absent des actualités
 * et du sitemap — et paraît seul le jour venu : les pages du blog sont rendues
 * à chaque requête (elles lisent les cookies Supabase), aucun redéploiement
 * n'est nécessaire. Seul l'aperçu signé (/blog/apercu/<slug>?sig=…) le montre
 * avant.
 *
 * Trilingue : chaque texte est un triplet { fr, en, es } (voir valider.mjs).
 */

type Texte = { fr: string; en: string; es: string };

/** Format d'un fichier `contenu/articles/<slug>.json`. */
export type ArticleFichier = {
  slug: string;
  /** AAAA-MM-JJ, heure de Paris. Dans le futur : article programmé. */
  datePublication: string;
  /** true : jamais affiché, pas même dans le tableau de bord. */
  brouillon?: boolean;
  /** La requête visée (réelle : Search Console, audit, question Pulse). */
  motCle: string;
  motsClesSecondaires?: string[];
  image_hero: string | null;
  image_vignette: string | null;
  titre: Texte;
  titre_page?: Texte | null;
  sous_titre?: Texte | null;
  chapo: Texte;
  seo_title?: Texte | null;
  seo_description: Texte;
  /** Points clés (matière des posts LinkedIn du tableau de bord). */
  aRetenir?: Texte[];
  /** Page qui vend, servie par l'article ; par défaut le premier lien vers une page fixe. */
  pilier?: { href: string; ancre: string };
  /** Mêmes blocs que la base (`BlocContenu`), textes en triplets. */
  blocs: { type: BlocType; contenu: Record<string, unknown> }[];
};

export const DOSSIER_ARTICLES = path.join(process.cwd(), "contenu", "articles");
export const FICHIER_CORRECTIONS = "contenu/corrections-client.json";

type Corrections = Record<string, { champs?: Record<string, string>; modifieLe?: string; par?: string }>;

/* ─────────── Corrections du client (espace client Clickzou) ─────────── */

/**
 * Textes que le client peut modifier depuis son espace Clickzou : la version
 * FRANÇAISE du chapô, des points clés et des paragraphes, listes, réponses et
 * conclusions. Restent verrouillés : titres (H1, H2, intertitres, questions de
 * FAQ), SEO, slug, date, mot-clé, images, boutons et liens (Clickzou refuse en
 * plus tout texte qui perd ou change un lien `[ancre](/chemin)`).
 */
const EDITABLES = [
  /^chapo\.fr$/,
  /^aRetenir\.\d+\.fr$/,
  /^blocs\.\d+\.contenu\.(?:(?:sections|cartes)\.\d+\.)?(?:paragraphes|liste|items|apres|apres_liste)\.\d+\.fr$/,
  /^blocs\.\d+\.contenu\.(?:(?:sections|cartes)\.\d+\.)?(?:intro|conclusion|note)\.fr$/,
];

export const estEditable = (chemin: string) => EDITABLES.some((re) => re.test(chemin));

function lire(objet: unknown, chemin: string): unknown {
  return chemin.split(".").reduce<unknown>((o, e) => (o && typeof o === "object" ? (o as Record<string, unknown>)[e] : undefined), objet);
}

/** Pose un texte à son adresse, seulement si un texte s'y trouve déjà. */
function poser(objet: unknown, chemin: string, texte: string) {
  const etapes = chemin.split(".");
  const parent = lire(objet, etapes.slice(0, -1).join("."));
  const dernier = etapes.at(-1)!;
  if (parent && typeof parent === "object" && typeof (parent as Record<string, unknown>)[dernier] === "string") {
    (parent as Record<string, unknown>)[dernier] = texte;
  }
}

function lireCorrections(): Corrections {
  try {
    return JSON.parse(readFileSync(path.join(process.cwd(), FICHIER_CORRECTIONS), "utf8")) as Corrections;
  } catch {
    return {};
  }
}

function appliquerCorrections(a: ArticleFichier, corrections: Corrections): ArticleFichier {
  const c = corrections[a.slug]?.champs;
  if (!c) return a;
  const copie = structuredClone(a);
  for (const [chemin, texte] of Object.entries(c)) {
    if (estEditable(chemin) && typeof texte === "string") poser(copie, chemin, texte);
  }
  return copie;
}

/* ─────────── Lecture ─────────── */

/**
 * Les routes fixes du site : un article ne peut pas prendre leur adresse (la
 * page fixe l'emporterait, cas de l'article fantôme diner-spectacles-toulouse).
 * `seo` les liste presque toutes ; le contrôle de build, lui, lit les dossiers
 * de src/app et fait autorité.
 */
const ROUTES_RESERVEES = [...Object.keys(seo), "/diner-spectacles-toulouse", "/adminpclickzou", "/blog", "/api"];

let cache: ArticleFichier[] | null = null;

/**
 * Tous les articles fichiers valides, corrections du client appliquées.
 * Lu une fois par instance : les fichiers ne changent qu'au déploiement.
 * Un fichier invalide est écarté (le contrôle de build l'aurait refusé).
 */
export function tousLesArticlesFichiers(): ArticleFichier[] {
  if (cache) return cache;
  let noms: string[] = [];
  try {
    noms = readdirSync(DOSSIER_ARTICLES).filter((n) => n.endsWith(".json"));
  } catch {
    noms = [];
  }
  const corrections = lireCorrections();
  const articles: ArticleFichier[] = [];
  for (const nom of noms) {
    try {
      const brut = JSON.parse(readFileSync(path.join(DOSSIER_ARTICLES, nom), "utf8")) as ArticleFichier;
      const article = appliquerCorrections(brut, corrections);
      const { erreurs } = validerArticle(article, { nomFichier: nom, routesReservees: ROUTES_RESERVEES });
      if (erreurs.length) {
        console.error(`[articles-fichiers] ${nom} écarté :`, erreurs.join(" ; "));
        continue;
      }
      articles.push(article);
    } catch (e) {
      console.error(`[articles-fichiers] ${nom} illisible :`, (e as Error).message);
    }
  }
  cache = articles;
  return articles;
}

/** Vrai si la date de parution est atteinte (heure de Paris). */
export function dateAtteinte(a: ArticleFichier): boolean {
  return a.datePublication <= dateDuJourAParis();
}

/** Articles en ligne (ni brouillon, ni programmé), du plus récent au plus ancien. */
export function articlesFichiersPublies(): ArticleFichier[] {
  return tousLesArticlesFichiers()
    .filter((a) => !a.brouillon && dateAtteinte(a))
    .sort((a, b) => b.datePublication.localeCompare(a.datePublication));
}

/** Un article non brouillon, publié ou programmé (aperçu, tableau de bord). */
export function articleFichier(slug: string): ArticleFichier | undefined {
  return tousLesArticlesFichiers().find((a) => a.slug === slug && !a.brouillon);
}

/* ─────────── Résolution dans une langue ─────────── */

/** Remplace chaque triplet par le texte de la langue demandée. */
export function resoudre<T>(valeur: T, locale: string): T {
  const langue = locale === "en" || locale === "es" ? locale : "fr";
  const passe = (v: unknown): unknown => {
    if (estTriplet(v)) return (v as Texte)[langue];
    if (Array.isArray(v)) return v.map(passe);
    if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, passe(x)]));
    return v;
  };
  return passe(valeur) as T;
}

/**
 * L'article au format du blog (celui des articles en base), dans une langue.
 * Les textes sont déjà traduits : le passage par le dictionnaire que fait la
 * page ensuite ne les change pas.
 */
export function versArticleComplet(a: ArticleFichier, locale: string): ArticleComplet {
  const id = `fichier:${a.slug}`;
  const t = (v: Texte | null | undefined) => (v ? resoudre(v, locale) : null) as string | null;
  return {
    id,
    slug: a.slug,
    locale: (locale === "en" || locale === "es" ? locale : "fr") as ArticleComplet["locale"],
    titre: t(a.titre)!,
    titre_page: t(a.titre_page),
    sous_titre: t(a.sous_titre),
    chapo: t(a.chapo),
    image_hero: a.image_hero,
    image_vignette: a.image_vignette,
    statut: "publie",
    date_publication: a.datePublication,
    seo_title: t(a.seo_title),
    seo_description: t(a.seo_description),
    groupe_id: id,
    position: null,
    blocs: a.blocs.map(
      (b, i) => ({ id: `${id}:${i}`, article_id: id, ordre: i, type: b.type, contenu: resoudre(b.contenu, locale) }) as Bloc,
    ),
  };
}
