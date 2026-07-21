/**
 * Liste les phrases d'un fichier de donnees qui n'ont pas encore de traduction.
 *
 * Sert a preparer le travail de traduction : plutot que de relire les fichiers
 * de donnees, on obtient la liste exacte de ce qui reste a ecrire.
 *
 *   node scripts/phrases-a-traduire.mjs src/data/hotel.ts en
 *   node scripts/phrases-a-traduire.mjs --toutes es
 */
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const [cible, langue = "en"] = process.argv.slice(2);
if (!cible) {
  console.error("Usage : node scripts/phrases-a-traduire.mjs <fichier|--toutes> <en|es>");
  process.exit(1);
}

const racine = fileURLToPath(new URL("..", import.meta.url));
const dico = JSON.parse(readFileSync(join(racine, `messages/contenu.${langue}.json`), "utf8"));

const fichiers =
  cible === "--toutes"
    ? readdirSync(join(racine, "src/data"))
        .filter((f) => f.endsWith(".ts"))
        .map((f) => join("src/data", f))
    : [cible];

/**
 * Les chaines des fichiers de donnees, reperees dans le source. On ne cherche
 * pas a evaluer le module : lire le texte suffit et evite d'executer du code.
 */
const phrases = new Set();

for (const f of fichiers) {
  const source = readFileSync(join(racine, f), "utf8");

  // Chaines entre guillemets doubles, y compris sur plusieurs lignes
  for (const m of source.matchAll(/"((?:[^"\\]|\\.){2,600})"/g)) {
    const t = m[1].replace(/\\n/g, "\n").replace(/\\"/g, '"');

    if (/^(https?:|mailto:|tel:|\/|#)/.test(t)) continue;
    if (/\.(jpe?g|png|webp|avif|pdf|svg|mp4)$/i.test(t)) continue;
    if (!/[a-zàâçéèêëîïôûùüÿñæœ]/i.test(t)) continue; // codes, identifiants
    if (/^[a-z_]+$/.test(t)) continue; // cles techniques
    phrases.add(t);
  }
}

const manquantes = [...phrases].filter((t) => !dico[t]);

console.log(`${phrases.size} phrases, ${manquantes.length} sans traduction ${langue}\n`);
console.log(JSON.stringify(Object.fromEntries(manquantes.map((t) => [t, ""])), null, 2));
