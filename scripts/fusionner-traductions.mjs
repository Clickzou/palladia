/**
 * Ajoute un lot de traductions au dictionnaire, sans ecraser l'existant.
 *
 *   node scripts/fusionner-traductions.mjs <lot.json> <en|es>
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const [lot, langue] = process.argv.slice(2);
if (!lot || !langue) {
  console.error("Usage : node scripts/fusionner-traductions.mjs <lot.json> <en|es>");
  process.exit(1);
}

const chemin = fileURLToPath(new URL(`../messages/contenu.${langue}.json`, import.meta.url));
const base = JSON.parse(readFileSync(chemin, "utf8"));
const ajout = JSON.parse(readFileSync(lot, "utf8"));

const vides = Object.entries(ajout).filter(([, v]) => !v).map(([k]) => k);
if (vides.length) {
  console.error(`${vides.length} traduction(s) vide(s), rien n'a ete ecrit :`);
  vides.slice(0, 5).forEach((k) => console.error(`  ${k.slice(0, 70)}`));
  process.exit(1);
}

// Tri alphabetique : le fichier reste lisible et les ajouts se voient dans le diff.
const tout = Object.fromEntries(
  Object.entries({ ...base, ...ajout }).sort(([a], [b]) => a.localeCompare(b, "fr")),
);

writeFileSync(chemin, JSON.stringify(tout, null, 2) + "\n");
console.log(
  `+${Object.keys(ajout).filter((k) => !base[k]).length} — ${Object.keys(tout).length} phrases en ${langue}`,
);
