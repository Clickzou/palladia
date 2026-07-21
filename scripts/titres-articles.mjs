/**
 * Releve, pour chaque article, le titre et le sous-titre reellement affiches
 * par le site, et produit le SQL de mise a jour quand ils different de la base.
 *
 * Le site distingue le titre WordPress (fil d'Ariane, vignettes) du titre
 * affiche en tete d'article : c'est la colonne `titre_page`.
 *
 *   node scripts/titres-articles.mjs > supabase/migrations/00XX_titres.sql
 */
import { chromium } from "playwright-core";
import { readFileSync } from "node:fs";

const ORIGINE = "https://www.hotelpalladia.com";
const SUPABASE = "https://ezylouomkirodnhmnqyo.supabase.co/rest/v1";
const CLE = process.env.SUPABASE_KEY ?? "sb_publishable_VkQrEJhKWHrDkqHeUw46ww_6vLGZx_g";

const ROUTES = JSON.parse(readFileSync(new URL("./routes.json", import.meta.url), "utf8"));
const ARTICLES = ROUTES.slice(19);

const enBase = await fetch(
  `${SUPABASE}/articles?select=slug,titre,titre_page,sous_titre&locale=eq.fr`,
  { headers: { apikey: CLE, Authorization: `Bearer ${CLE}` } },
).then((r) => r.json());

const parSlug = new Map(enBase.map((a) => [a.slug, a]));

/** Echappe une chaine pour un litteral SQL. */
const sql = (v) => (v === null ? "null" : `'${v.replace(/'/g, "''")}'`);

const navigateur = await chromium.launch({ channel: "chrome" });
const page = await navigateur.newPage({ viewport: { width: 1920, height: 1080 } });

const lignes = [];

for (const route of ARTICLES) {
  const slug = route.v2.slice(1);
  const base = parSlug.get(slug);
  if (!base) {
    console.error(`-- ${slug} : absent de la base`);
    continue;
  }

  try {
    await page.goto(ORIGINE + route.origine, { waitUntil: "domcontentloaded", timeout: 45_000 });
  } catch {
    console.error(`-- ${slug} : page inaccessible`);
    continue;
  }

  const releve = await page.evaluate(() => {
    const propre = (t) => t?.replace(/\s+/g, " ").trim() ?? null;
    const zone = document.querySelector(".page-content") ?? document.body;

    // Le titre d'article est le premier grand titre du contenu Elementor ;
    // le sous-titre, le titre a 22 px qui le suit immediatement.
    const titres = [...zone.querySelectorAll("h1,h2")]
      .map((el) => ({
        texte: propre(el.textContent),
        taille: Math.round(parseFloat(getComputedStyle(el).fontSize)),
      }))
      .filter((t) => t.texte);

    const titre = titres.find((t) => t.taille >= 30);
    const i = titres.indexOf(titre);
    const sousTitre = i >= 0 ? titres[i + 1] : null;

    return {
      titre: titre?.texte ?? null,
      sousTitre: sousTitre && sousTitre.taille <= 24 ? sousTitre.texte : null,
    };
  });

  const memeTitre = (a, b) =>
    (a ?? "").replace(/\s+/g, " ").toLowerCase() === (b ?? "").replace(/\s+/g, " ").toLowerCase();

  // `titre_page` n'a de sens que s'il differe vraiment du titre WordPress.
  const titrePage = memeTitre(releve.titre, base.titre) ? null : releve.titre;

  if (memeTitre(titrePage, base.titre_page) && memeTitre(releve.sousTitre, base.sous_titre)) continue;

  lignes.push(
    `update public.articles set titre_page = ${sql(titrePage)}, sous_titre = ${sql(releve.sousTitre)}\n` +
      `  where slug = ${sql(slug)} and locale = 'fr';`,
  );
  console.error(`-- ${slug}\n--   titre_page : ${titrePage}\n--   sous_titre : ${releve.sousTitre}`);
}

await navigateur.close();

console.log(`-- ---------------------------------------------------------------------------
-- Titres et sous-titres d'article releves sur le site en ligne.
--
-- \`titre_page\` ne porte que les titres qui different du titre WordPress ;
-- ailleurs il reste nul et l'affichage retombe sur \`titre\`.
--
-- Genere par scripts/titres-articles.mjs. Relançable sans risque.
-- ---------------------------------------------------------------------------

alter table public.articles add column if not exists titre_page text;

${lignes.join("\n\n")}`);
