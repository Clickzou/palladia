#!/usr/bin/env node
/**
 * Genere le SQL corrigeant deux points de l'import initial :
 *  1. le chapo, pris a tort dans le premier paragraphe alors que WordPress
 *     stocke un extrait dedie (post_excerpt) ;
 *  2. l'ordre d'affichage, qui ne suit pas les dates de l'archive.
 */
import { readFileSync, writeFileSync } from "node:fs";

const posts = JSON.parse(readFileSync("posts.json", "utf8"));
const q = (v) => (v == null || v === "" ? "NULL" : `'${String(v).replace(/'/g, "''")}'`);

/** Ordre releve sur le site, page par page. La position 1 correspond a
 *  « Comment choisir le meilleur lieu… », absent de l'archive. */
const ORDRE = [
  "zenith-de-toulouse-hotel-palladia",
  "saint-valentin-toulouse",
  "reveillon-toulouse",
  "ou-dormir-proche-aeroport-toulouse",
  "diner-spectacles-toulouse",
  "sejour-en-famille-a-toulouse-hotel-palladia",
  "adelya",
  "lhotel-palladia-un-voyage-dans-lexcellence-hoteliere-et-levenementiel-a-toulouse",
  "amphitheatre-hotel-palladia-renove",
  "staycation-toulouse",
  "sejour-en-famille-le-gardien-du-temple",
  "seminaire-hotel-palladia-toulouse",
  "les-temps-forts-de-lhotel-palladia",
  "diner-accord-mets-champagne",
  "le-jardin-du-barry-a-toulouse-le-poumon-vert-de-la-cartoucherie",
  "theatre-le-grenier-de-toulouse",
  "afterwork-toulouse",
  "hotel-palladia-x-orchestre-de-chambre-de-toulouse",
  "mariage-hotel-palladia-toulouse",
];

const lignes = [
  "-- Correction de l'import : extraits WordPress et ordre d'affichage.",
  "-- Relancable sans risque.",
  "",
  "-- Colonne d'ordre manuel : permet de mettre un article en avant sans",
  "-- toucher a sa date de publication.",
  "alter table public.articles add column if not exists position integer;",
  "create index if not exists articles_position_idx on public.articles (locale, position);",
  "",
  "begin;",
  "",
  "-- 1. Chapo et description SEO repris de l'extrait WordPress",
];

for (const p of posts) {
  const extrait = (p.excerpt ?? "").trim();
  if (!extrait) continue;
  lignes.push(
    `update public.articles set chapo = ${q(extrait)}, seo_description = ${q(extrait)}`,
    `  where slug = ${q(p.slug)} and locale = 'fr';`,
  );
}

lignes.push("", "-- 2. Ordre d'affichage releve sur le site");
ORDRE.forEach((slug, i) => {
  // La position 1 est reservee a l'article manquant de l'archive
  lignes.push(`update public.articles set position = ${i + 2} where slug = ${q(slug)} and locale = 'fr';`);
});

lignes.push("", "commit;");

writeFileSync("0010_extraits_et_ordre.sql", lignes.join("\n"), "utf8");
console.log(`SQL genere : ${posts.filter((p) => p.excerpt?.trim()).length} extraits, ${ORDRE.length} positions`);

// Controle : tous les slugs de l'ordre existent-ils ?
const connus = new Set(posts.map((p) => p.slug));
const absents = ORDRE.filter((s) => !connus.has(s));
if (absents.length) console.log("Slugs inconnus dans l'archive :", absents);
