/**
 * Liste les phrases des articles de blog qui n'ont pas encore de traduction.
 *
 * Les articles vivent dans Supabase, pas dans src/data : phrases-donnees.mjs
 * ne les voit donc pas. Comme la page d'article passe son contenu par
 * traduireContenu(), il suffit d'alimenter le dictionnaire — aucune ligne
 * traduite n'est a inserer en base.
 *
 *   node scripts/phrases-blog.mjs en
 *   node scripts/phrases-blog.mjs es --slug=nom-de-l-article
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const racine = fileURLToPath(new URL("..", import.meta.url));
const args = process.argv.slice(2);
const langue = args.find((a) => !a.startsWith("--")) ?? "en";
const slugVoulu = args.find((a) => a.startsWith("--slug="))?.slice(7);

/** Lecture directe de .env.local : le script tourne hors de Next.js. */
const env = Object.fromEntries(
  readFileSync(join(racine, ".env.local"), "utf8")
    .split(/\r?\n/)
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()]),
);

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const cle = env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
if (!url || !cle) {
  console.error("NEXT_PUBLIC_SUPABASE_URL / clé publiable absentes de .env.local");
  process.exit(1);
}

const dico = JSON.parse(readFileSync(join(racine, `messages/contenu.${langue}.json`), "utf8"));

const rep = await fetch(
  `${url}/rest/v1/articles?select=slug,titre,titre_page,sous_titre,chapo,seo_title,seo_description,` +
    `article_blocs(ordre,contenu)` +
    `&locale=eq.fr&statut=eq.publie&order=slug`,
  { headers: { apikey: cle, Authorization: `Bearer ${cle}` } },
);
if (!rep.ok) {
  console.error(`Supabase a répondu ${rep.status} : ${await rep.text()}`);
  process.exit(1);
}

const articles = await rep.json();
const phrases = new Map(); // texte -> slugs qui l'emploient

/** Toutes les chaines d'une valeur, quelle que soit sa profondeur. */
const collecter = (v, slug) => {
  if (typeof v === "string") {
    const t = v.trim();
    if (!t || t.length > 6000) return;
    if (/^(https?:|mailto:|tel:|\/|#)/.test(t)) return;
    if (/\.(jpe?g|png|webp|avif|pdf|svg|mp4)$/i.test(t)) return;
    if (!/[a-zàâçéèêëîïôûùüÿñæœ]/i.test(t)) return;
    if (dico[t]) return;
    (phrases.get(t) ?? phrases.set(t, new Set()).get(t)).add(slug);
    return;
  }
  if (Array.isArray(v)) return v.forEach((x) => collecter(x, slug));
  if (v && typeof v === "object") return Object.values(v).forEach((x) => collecter(x, slug));
};

for (const a of articles) {
  if (slugVoulu && a.slug !== slugVoulu) continue;
  const { article_blocs, slug, ...champs } = a;
  collecter(champs, slug);
  collecter((article_blocs ?? []).sort((x, y) => x.ordre - y.ordre).map((b) => b.contenu), slug);
}

const total = slugVoulu ? 1 : articles.length;
console.error(`${total} article(s), ${phrases.size} phrases sans traduction en ${langue}`);
console.log(
  JSON.stringify(Object.fromEntries([...phrases].map(([t, s]) => [t, [...s].join(", ")])), null, 2),
);
