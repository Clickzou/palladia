/**
 * Releve les dimensions de toutes les images de public/images et les ecrit
 * dans src/data/dimensions-images.json.
 *
 * Les visuels dont le chemin vient de la base (heros d'article, blocs) ne
 * peuvent pas etre importes statiquement par next/image : ce manifeste leur
 * rend leurs proportions d'origine, comme sur le site WordPress.
 *
 *   node scripts/dimensions-images.mjs
 */
import { readdir, writeFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

// fileURLToPath : le chemin du projet contient des espaces, que `pathname`
// laisserait encodes en %20.
const RACINE = fileURLToPath(new URL("../public/images", import.meta.url));
const SORTIE = fileURLToPath(new URL("../src/data/dimensions-images.json", import.meta.url));

async function parcourir(dossier) {
  const entrees = await readdir(dossier, { withFileTypes: true });
  const fichiers = [];

  for (const e of entrees) {
    const chemin = join(dossier, e.name);
    if (e.isDirectory()) fichiers.push(...(await parcourir(chemin)));
    else if (/\.(jpe?g|png|webp|avif)$/i.test(e.name)) fichiers.push(chemin);
  }
  return fichiers;
}

const dimensions = {};
for (const fichier of await parcourir(RACINE)) {
  try {
    const { width, height } = await sharp(fichier).metadata();
    if (!width || !height) continue;
    const url = "/images/" + relative(RACINE, fichier).split(sep).join("/");
    dimensions[url] = [width, height];
  } catch {
    // fichier illisible : on le laisse au ratio par defaut
  }
}

const trie = Object.fromEntries(Object.entries(dimensions).sort(([a], [b]) => a.localeCompare(b)));
await writeFile(SORTIE, JSON.stringify(trie, null, 2) + "\n");
console.log(`${Object.keys(trie).length} images relevees → src/data/dimensions-images.json`);
