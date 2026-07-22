/**
 * Sauvegarde les menus en ligne sous forme de SQL de restauration.
 *
 * A lancer avant une manipulation delicate. Le fichier produit se colle dans
 * l'editeur SQL de Supabase : il republie le contenu sauvegarde sous forme de
 * nouvelle version, sans rien effacer de l'historique.
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

/* La cle publiable ne voit que les versions deja effectives — exactement ce
   qu'il faut sauvegarder : ce que le public a sous les yeux. */
const rep = await fetch(
  `${env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/menus_versions` +
    `?select=cle,fr,en,es,publie_le&order=publie_le.desc`,
  {
    headers: {
      apikey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      Authorization: `Bearer ${env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
    },
  },
);

const versions = await rep.json();
if (!Array.isArray(versions) || !versions.length) {
  console.error("Aucune version lue — sauvegarde annulee.");
  process.exit(1);
}

/* Les versions arrivent de la plus recente a la plus ancienne : la premiere
   rencontree pour un menu est celle qui s'affiche. */
const enLigne = [];
for (const v of versions) if (!enLigne.some((x) => x.cle === v.cle)) enLigne.push(v);

const horodatage = new Date().toISOString().slice(0, 16).replace("T", " ");
const sortie = process.argv[2] ?? "sauvegarde-menus.sql";

/** `$json$` evite d'avoir a echapper les apostrophes des noms de plats. */
const bloc = (v) => (v == null ? "null" : `$json$${JSON.stringify(v, null, 2)}$json$::jsonb`);

const sql = [
  `-- Menus en ligne au ${horodatage}`,
  "--",
  "-- Restauration : coller ce fichier dans l'editeur SQL de Supabase et lancer.",
  "-- Le contenu est republie sous forme de nouvelle version ; l'historique",
  "-- reste intact, et un simple retour en arriere reste possible.",
  "",
  ...enLigne.map(
    (m) =>
      `insert into public.menus_versions (cle, fr, en, es, publie_le) values (\n` +
      `  '${m.cle}',\n  ${bloc(m.fr)},\n  ${bloc(m.en)},\n  ${bloc(m.es)},\n  now()\n);\n`,
  ),
].join("\n");

writeFileSync(sortie, sql);
console.log(
  `${enLigne.length} menus sauvegardes dans ${sortie}\n` +
    enLigne
      .map((m) => `  ${m.cle.padEnd(8)} fr:oui  en:${m.en ? "oui" : "non"}  es:${m.es ? "oui" : "non"}`)
      .join("\n"),
);
