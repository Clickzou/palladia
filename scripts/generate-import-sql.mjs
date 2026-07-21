#!/usr/bin/env node
/**
 * Genere le SQL d'import des articles WordPress vers Supabase.
 * Sortie : un fichier a coller dans le SQL Editor, idempotent (on conflict).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { htmlVersBlocs, premiereImage, texte } from "./html-to-blocs.mjs";

const posts = JSON.parse(readFileSync("posts.json", "utf8"));

/** Echappe une valeur pour SQL ('' pour les quotes), ou NULL. */
const q = (v) => (v == null || v === "" ? "NULL" : `'${String(v).replace(/'/g, "''")}'`);

const lignes = [
  "-- Import des articles du blog depuis l'archive WordPress.",
  "-- Genere automatiquement — relancable sans risque (on conflict do update).",
  "",
  "begin;",
  "",
];

let nbBlocs = 0;

for (const p of posts) {
  const blocs = htmlVersBlocs(p.content, { titre: texte(p.title) });
  const titre = texte(p.title);
  const hero = premiereImage(p.content);
  // Chapo : premier paragraphe du premier bloc textuel
  const chapo =
    blocs.find((b) => b.contenu.paragraphes?.length)?.contenu.paragraphes[0]?.slice(0, 280) ?? null;

  lignes.push(
    `-- ${titre}`,
    `insert into public.articles (slug, locale, titre, chapo, image_hero, image_vignette, statut, date_publication, seo_description)`,
    `values (${q(p.slug)}, 'fr', ${q(titre)}, ${q(chapo)}, ${q(hero)}, ${q(hero)}, 'publie', ${q(p.date)}, ${q(chapo)})`,
    `on conflict (slug, locale) do update set`,
    `  titre = excluded.titre, chapo = excluded.chapo, image_hero = excluded.image_hero,`,
    `  image_vignette = excluded.image_vignette, date_publication = excluded.date_publication,`,
    `  seo_description = excluded.seo_description;`,
    "",
    `delete from public.article_blocs where article_id = (select id from public.articles where slug = ${q(p.slug)} and locale = 'fr');`,
    "",
  );

  for (const b of blocs) {
    nbBlocs++;
    lignes.push(
      `insert into public.article_blocs (article_id, ordre, type, contenu)`,
      `values ((select id from public.articles where slug = ${q(p.slug)} and locale = 'fr'), ${b.ordre}, '${b.type}', ${q(JSON.stringify(b.contenu))}::jsonb);`,
    );
  }
  lignes.push("");
}

lignes.push("commit;");

writeFileSync("0002_import_articles.sql", lignes.join("\n"), "utf8");
console.log(`${posts.length} articles, ${nbBlocs} blocs -> 0002_import_articles.sql`);

// Liste des images a recuperer
const images = new Set();
for (const p of posts) {
  for (const m of p.content.matchAll(/\/uploads\/([^"']+?)(?:-\d+x\d+)?(\.[a-z]+)/gi)) {
    images.add(m[1].split("/").pop() + m[2]);
  }
}
writeFileSync("blog-images.txt", [...images].join("\n"), "utf8");
console.log(`${images.size} images referencees -> blog-images.txt`);
