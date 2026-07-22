/**
 * Sauvegarde les menus du restaurant sous forme de SQL de restauration.
 *
 * A lancer avant tout essai sur /adminpclickzou : le formulaire ecrase les
 * menus en place, et rien ne les conserve. Le fichier produit se colle tel
 * quel dans l'editeur SQL de Supabase pour revenir en arriere.
 *
 *   node scripts/sauver-menus.mjs [chemin-de-sortie.sql]
 */
import { readFileSync, writeFileSync } from "node:fs";

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split(/\r?\n/)
    .filter((l) => l.includes("=") && !l.trimStart().startsWith("#"))
    .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()]),
);

const rep = await fetch(`${env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/menus?select=cle,fr,en,es`, {
  headers: {
    apikey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    Authorization: `Bearer ${env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
  },
});

const menus = await rep.json();
if (!Array.isArray(menus) || !menus.length) {
  console.error("Aucun menu lu — sauvegarde annulee.");
  process.exit(1);
}

const horodatage = new Date().toISOString().slice(0, 16).replace("T", " ");
const sortie = process.argv[2] ?? "sauvegarde-menus.sql";

/** `$json$` evite d'avoir a echapper les apostrophes des noms de plats. */
const bloc = (valeur) => (valeur === null ? "null" : `$json$${JSON.stringify(valeur, null, 2)}$json$::jsonb`);

const sql = [
  `-- Sauvegarde des menus du restaurant — ${horodatage}`,
  "--",
  "-- Restauration : coller ce fichier dans l'editeur SQL de Supabase et lancer.",
  "-- Les lignes existantes sont remplacees ; rien d'autre n'est touche.",
  "",
  ...menus.map(
    (m) =>
      `update public.menus set\n` +
      `  fr = ${bloc(m.fr)},\n` +
      `  en = ${bloc(m.en)},\n` +
      `  es = ${bloc(m.es)}\n` +
      `where cle = '${m.cle}';\n`,
  ),
].join("\n");

writeFileSync(sortie, sql);
console.log(
  `${menus.length} menus sauvegardes dans ${sortie}\n` +
    menus
      .map((m) => `  ${m.cle.padEnd(8)} fr:oui  en:${m.en ? "oui" : "non"}  es:${m.es ? "oui" : "non"}`)
      .join("\n"),
);
