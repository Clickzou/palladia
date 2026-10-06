/**
 * Contrôle d'un article « fichier » (contenu/articles/<slug>.json).
 *
 * Écrit en JavaScript pur pour servir aux DEUX endroits qui doivent appliquer
 * exactement les mêmes règles :
 *   - le site (src/lib/articles-fichiers/index.ts) : un article invalide est
 *     écarté et signalé dans les journaux, jamais affiché à moitié ;
 *   - le contrôle de build (scripts/verifier-articles-fichiers.mjs, lancé par
 *     `npm run build` via `prebuild`) : un article invalide fait échouer le
 *     déploiement, et la version en ligne reste en place.
 *
 * Règle centrale : tout texte lu par un visiteur est un triplet
 * `{ "fr": "…", "en": "…", "es": "…" }`. Le site est trilingue et une phrase
 * non traduite retomberait silencieusement sur le français (consigne de session
 * « traduire après chaque modification »). Seuls les champs techniques
 * (chemins d'images, liens, jetons de mise en page) sont des chaînes simples.
 */

export const LANGUES = ["fr", "en", "es"];

export const TYPES_DE_BLOC = [
  "texte",
  "texte_image",
  "cartes",
  "bandeau",
  "bandeau_image",
  "carrousel",
  "liste_cochee",
  "citation",
  "equipe",
  "bouton",
  "caracteristiques",
  "menu",
  "sections",
];

/** Champs des blocs qui ne se traduisent pas : chaîne simple attendue. */
export const CHAMPS_TECHNIQUES = new Set([
  "image",
  "src",
  "href",
  "photo",
  "email",
  "telephone",
  "position",
  "taille_titre",
  "ratio",
  "icone",
]);

const LIEN = /\[([^\]]+)\]\(([^)]+)\)/g;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

/** Vrai pour `{ fr, en, es }` (trois chaînes, et rien d'autre). */
export function estTriplet(v) {
  if (!v || typeof v !== "object" || Array.isArray(v)) return false;
  const cles = Object.keys(v);
  return cles.length === LANGUES.length && LANGUES.every((l) => typeof v[l] === "string");
}

/** Cibles des liens `[ancre](/chemin)` d'un texte, dans l'ordre. */
export function ciblesDesLiens(texte) {
  return [...texte.matchAll(LIEN)].map((m) => m[2]);
}

/**
 * Valide un article brut (JSON déjà lu). Renvoie `{ erreurs, alertes }` :
 * une erreur rend l'article inutilisable, une alerte se signale seulement.
 *
 * @param {unknown} a
 * @param {{ nomFichier?: string, routesReservees?: Iterable<string>, imageExiste?: (chemin: string) => boolean }} [options]
 */
export function validerArticle(a, options = {}) {
  const erreurs = [];
  const alertes = [];
  const err = (m) => erreurs.push(m);

  if (!a || typeof a !== "object" || Array.isArray(a)) return { erreurs: ["le fichier ne contient pas un objet JSON"], alertes };

  if (typeof a.slug !== "string" || !SLUG.test(a.slug)) err("`slug` : minuscules, chiffres et tirets seulement");
  else {
    if (options.nomFichier && options.nomFichier !== `${a.slug}.json`) err(`le fichier doit s'appeler ${a.slug}.json`);
    const reservees = new Set(options.routesReservees ?? []);
    if (reservees.has(`/${a.slug}`)) err(`\`slug\` : /${a.slug} est déjà une page fixe du site`);
  }

  if (typeof a.datePublication !== "string" || !DATE.test(a.datePublication) || Number.isNaN(Date.parse(a.datePublication))) {
    err("`datePublication` : date AAAA-MM-JJ attendue");
  }
  if (a.brouillon !== undefined && typeof a.brouillon !== "boolean") err("`brouillon` : true ou false");
  if (typeof a.motCle !== "string" || !a.motCle.trim()) err("`motCle` : la requête visée est obligatoire");
  if (a.motsClesSecondaires !== undefined && (!Array.isArray(a.motsClesSecondaires) || a.motsClesSecondaires.some((m) => typeof m !== "string"))) {
    err("`motsClesSecondaires` : liste de chaînes");
  }

  for (const champ of ["image_hero", "image_vignette"]) {
    const v = a[champ];
    if (v === null || v === undefined) continue;
    if (typeof v !== "string" || !v.startsWith("/images/")) err(`\`${champ}\` : chemin commençant par /images/ ou null`);
    else if (options.imageExiste && !options.imageExiste(v)) err(`\`${champ}\` : ${v} introuvable dans public/`);
  }

  const triplet = (chemin, v, obligatoire) => {
    if (v === null || v === undefined) {
      if (obligatoire) err(`\`${chemin}\` : obligatoire`);
      return;
    }
    if (!estTriplet(v)) return err(`\`${chemin}\` : { "fr", "en", "es" } attendu`);
    for (const l of LANGUES) if (!v[l].trim()) err(`\`${chemin}.${l}\` : texte vide`);
    const ref = ciblesDesLiens(v.fr).join(" ");
    for (const l of ["en", "es"]) {
      if (ciblesDesLiens(v[l]).join(" ") !== ref) err(`\`${chemin}.${l}\` : les liens [ancre](/chemin) doivent être les mêmes qu'en français`);
    }
    if (/\b20\d{2}\b/.test(v.fr)) alertes.push(`\`${chemin}\` : une année est écrite (« aucune date figée dans un article »)`);
    if (/€|\beuros?\b/i.test(v.fr)) alertes.push(`\`${chemin}\` : un prix est écrit (« aucun tarif figé dans un article »)`);
  };

  triplet("titre", a.titre, true);
  triplet("chapo", a.chapo, true);
  triplet("seo_description", a.seo_description, true);
  triplet("titre_page", a.titre_page, false);
  triplet("sous_titre", a.sous_titre, false);
  triplet("seo_title", a.seo_title, false);

  if (a.aRetenir !== undefined) {
    if (!Array.isArray(a.aRetenir)) err("`aRetenir` : liste de triplets");
    else a.aRetenir.forEach((p, i) => triplet(`aRetenir.${i}`, p, true));
  }
  if (a.pilier !== undefined) {
    const p = a.pilier;
    if (!p || typeof p.href !== "string" || !p.href.startsWith("/") || typeof p.ancre !== "string" || !p.ancre.trim()) {
      err("`pilier` : { \"href\": \"/page\", \"ancre\": \"texte\" }");
    }
  }

  if (!Array.isArray(a.blocs) || a.blocs.length === 0) err("`blocs` : au moins un bloc");
  else {
    a.blocs.forEach((b, i) => {
      const base = `blocs.${i}`;
      if (!b || typeof b !== "object") return err(`\`${base}\` : objet attendu`);
      if (!TYPES_DE_BLOC.includes(b.type)) return err(`\`${base}.type\` : « ${b.type} » inconnu (${TYPES_DE_BLOC.join(", ")})`);
      if (!b.contenu || typeof b.contenu !== "object" || Array.isArray(b.contenu)) return err(`\`${base}.contenu\` : objet attendu`);

      const parcourir = (chemin, v, cle) => {
        if (typeof v === "string") {
          if (!CHAMPS_TECHNIQUES.has(cle)) err(`\`${chemin}\` : texte non traduit, { "fr", "en", "es" } attendu`);
          else if ((cle === "image" || cle === "src" || cle === "photo") && options.imageExiste && !options.imageExiste(v)) {
            err(`\`${chemin}\` : ${v} introuvable dans public/`);
          }
          return;
        }
        if (estTriplet(v)) {
          if (CHAMPS_TECHNIQUES.has(cle)) return err(`\`${chemin}\` : champ technique, chaîne simple attendue`);
          return triplet(chemin, v, true);
        }
        if (Array.isArray(v)) return v.forEach((x, j) => parcourir(`${chemin}.${j}`, x, cle));
        if (v && typeof v === "object") {
          for (const [k, x] of Object.entries(v)) parcourir(`${chemin}.${k}`, x, k);
          return;
        }
        if (typeof v !== "boolean" && typeof v !== "number" && v !== null) err(`\`${chemin}\` : valeur inattendue`);
      };
      for (const [k, x] of Object.entries(b.contenu)) parcourir(`${base}.contenu.${k}`, x, k);
    });
  }

  return { erreurs, alertes };
}
