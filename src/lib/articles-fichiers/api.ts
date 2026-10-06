import { seo } from "@/data/seo";
import { supabaseConfigure } from "@/lib/blog";
import { createClient } from "@/lib/supabase/server";
import type { Article, ArticleComplet, Bloc } from "@/lib/supabase/types";
import { type ArticleFichier, dateAtteinte, tousLesArticlesFichiers, versArticleComplet } from "./index";
import { MOTS_CLES_BASE } from "./mots-cles-base";
import { cheminApercu } from "./tableau-de-bord";

/**
 * Articles au format `ArticleClient` du tableau de bord Clickzou
 * (src/lib/espace-client/articles.ts du dépôt clickzou-v2).
 */
export type ArticleClient = {
  slug: string;
  titre: string;
  datePublication: string;
  statut: "publie" | "programme";
  url: string;
  urlActuelle: string;
  apercuUrl: string | null;
  image?: string;
  auteur: string;
  motCle: string;
  motsClesSecondaires: string[];
  metaDescription: string;
  chapo: string;
  essentiel: { reponse: string; points: string[] };
  pilier: { href: string; ancre: string };
  /** Hors contrat Clickzou, informatif : d'où vient l'article. */
  source: "base" | "fichier";
};

export const SITE = "https://www.hotelpalladia.com";
const AUTEUR = "Hôtel Palladia";

/** Texte brut : retire `**gras**`, `*italique*` et `[ancre](url)`. */
export const brut = (t: string) =>
  t.replace(/\*\*/g, "").replace(/\*([^*]+)\*/g, "$1").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").trim();

/** Toutes les chaînes d'une valeur, dans l'ordre. */
function chaines(v: unknown, cle = ""): { cle: string; texte: string }[] {
  if (typeof v === "string") return [{ cle, texte: v }];
  if (Array.isArray(v)) return v.flatMap((x) => chaines(x, cle));
  if (v && typeof v === "object") return Object.entries(v).flatMap(([k, x]) => chaines(x, k));
  return [];
}

const PAGES_FIXES = new Set(Object.keys(seo));
const SECONDAIRES = new Set(["/", "/actualites", "/contact", "/devis", "/mentions-legales"]);

/**
 * La page qui vend, servie par l'article : le premier lien de l'article vers
 * une page fixe du site (hors accueil, contact et devis, pris seulement en
 * dernier recours), sinon les actualités. Tiré du contenu réel, rien d'inventé.
 */
function pilierDepuisBlocs(blocs: Bloc[]): { href: string; ancre: string } {
  const liens: { href: string; ancre: string }[] = [];
  for (const b of blocs) {
    for (const { texte } of chaines(b.contenu)) {
      for (const m of texte.matchAll(/\[([^\]]+)\]\((\/[^)#?]*)[^)]*\)/g)) liens.push({ ancre: brut(m[1]), href: m[2] });
    }
    // Boutons : { label, href }
    const boutons = chaines(b.contenu).filter((c) => c.cle === "href" || c.cle === "label");
    for (let i = 0; i + 1 < boutons.length; i++) {
      const [x, y] = [boutons[i], boutons[i + 1]];
      if (x.cle === "label" && y.cle === "href" && y.texte.startsWith("/")) liens.push({ ancre: brut(x.texte), href: y.texte.split(/[?#]/)[0] });
    }
  }
  const fixes = liens.filter((l) => PAGES_FIXES.has(l.href));
  return fixes.find((l) => !SECONDAIRES.has(l.href)) ?? fixes.find((l) => l.href === "/devis") ?? { href: "/actualites", ancre: "actualités de l’Hôtel Palladia" };
}

/** Intertitres de l'article (titres de blocs), matière des « points clés ». */
function intertitres(blocs: Bloc[]): string[] {
  return blocs
    .map((b) => (b.contenu as { titre?: unknown }).titre)
    .filter((t): t is string => typeof t === "string" && Boolean(t.trim()))
    .map(brut)
    .slice(0, 6);
}

function premierParagraphe(blocs: Bloc[]): string {
  for (const b of blocs) {
    const p = (b.contenu as { paragraphes?: unknown }).paragraphes;
    if (Array.isArray(p) && typeof p[0] === "string") return brut(p[0]);
  }
  return "";
}

function versClient(
  a: ArticleComplet,
  extra: { statut: "publie" | "programme"; motCle: string; motsClesSecondaires: string[]; points?: string[]; pilier?: { href: string; ancre: string }; source: "base" | "fichier" },
  origine: string,
): ArticleClient {
  const chemin = `/${a.slug}`;
  const chapo = brut(a.chapo ?? a.seo_description ?? premierParagraphe(a.blocs));
  const image = a.image_vignette ?? a.image_hero;
  const apercu = extra.statut === "programme" ? cheminApercu(a.slug) : null;
  return {
    slug: a.slug,
    titre: a.titre,
    datePublication: a.date_publication.slice(0, 10),
    statut: extra.statut,
    url: `${SITE}${chemin}`,
    urlActuelle: `${origine}${chemin}`,
    apercuUrl: apercu ? `${origine}${apercu}` : null,
    ...(image ? { image: `${origine}${image}` } : {}),
    auteur: AUTEUR,
    motCle: extra.motCle,
    motsClesSecondaires: extra.motsClesSecondaires,
    metaDescription: brut(a.seo_description ?? chapo),
    chapo,
    essentiel: { reponse: chapo, points: extra.points ?? intertitres(a.blocs) },
    pilier: extra.pilier ?? pilierDepuisBlocs(a.blocs),
    source: extra.source,
  };
}

export function articleFichierVersClient(f: ArticleFichier, origine: string): ArticleClient {
  return versClient(
    versArticleComplet(f, "fr"),
    {
      statut: dateAtteinte(f) ? "publie" : "programme",
      motCle: f.motCle,
      motsClesSecondaires: f.motsClesSecondaires ?? [],
      points: f.aRetenir ? f.aRetenir.map((p) => brut(p.fr)) : undefined,
      pilier: f.pilier,
      source: "fichier",
    },
    origine,
  );
}

/** Articles publiés en base (français), avec leurs blocs. Lecture seule. */
export async function articlesBaseComplets(): Promise<ArticleComplet[]> {
  if (!supabaseConfigure) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*, article_blocs(*)")
    .eq("locale", "fr")
    .eq("statut", "publie");
  if (error) throw new Error(`Lecture des articles en base impossible : ${error.message}`);
  return (data ?? []).map((ligne) => {
    const { article_blocs, ...article } = ligne as Article & { article_blocs: Bloc[] };
    return { ...article, blocs: (article_blocs ?? []).sort((x, y) => x.ordre - y.ordre) };
  });
}

export function articleBaseVersClient(a: ArticleComplet, origine: string): ArticleClient {
  return versClient(
    a,
    {
      statut: "publie",
      // Article absent de la table (créé après le 06/10/2026 en base) : son titre SEO.
      motCle: MOTS_CLES_BASE[a.slug]?.motCle ?? brut(a.seo_title ?? a.titre),
      motsClesSecondaires: [],
      source: "base",
    },
    origine,
  );
}

/** Liste complète pour le tableau de bord : base + fichiers non brouillons. */
export async function articlesPourTableauDeBord(origine: string): Promise<ArticleClient[]> {
  const base = await articlesBaseComplets();
  const enBase = new Set(base.map((a) => a.slug));
  const fichiers = tousLesArticlesFichiers().filter((f) => !f.brouillon && !enBase.has(f.slug));
  return [
    ...base.map((a) => articleBaseVersClient(a, origine)),
    ...fichiers.map((f) => articleFichierVersClient(f, origine)),
  ].sort((x, y) => x.datePublication.localeCompare(y.datePublication));
}
