/**
 * Telecharge les visuels d'une page du site d'origine, HTML et CSS compris.
 *
 * Elementor pose une bonne part de ses photos en `background-image` depuis sa
 * feuille de style de page : les chercher dans le seul HTML n'en ramene qu'une
 * fraction. On lit donc aussi les CSS propres a la page.
 *
 * Les fichiers sont recompresses et deposes dans public/images/blog.
 *
 *   node scripts/recuperer-images.mjs staycation-toulouse
 */
import { existsSync } from "node:fs";
import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ORIGINE = "https://www.hotelpalladia.com";
const DOSSIER = fileURLToPath(new URL("../public/images/blog", import.meta.url));

/** Visuels communs a tout le site, deja presents : inutile de les reprendre. */
const COMMUNS = /logo-|clef-verte|clickzou|flags?\/|icone-|picto-/i;

const slug = process.argv[2]?.split(/[\\/]/).filter(Boolean).pop();
if (!slug) {
  console.error("Usage : node scripts/recuperer-images.mjs <slug>");
  process.exit(1);
}

const html = await fetch(`${ORIGINE}/${slug}/`, {
  headers: { "User-Agent": "Mozilla/5.0" },
}).then((r) => r.text());

// Feuilles de style propres a la page : elles portent les images de fond.
const feuilles = [...html.matchAll(/href="([^"]*elementor\/css\/post-\d+\.css[^"]*)"/g)].map(
  (m) => m[1],
);

let corpus = html;
for (const f of feuilles) {
  corpus += await fetch(f, { headers: { "User-Agent": "Mozilla/5.0" } }).then((r) => r.text());
}

/**
 * On ne garde que l'original de chaque visuel : WordPress publie une dizaine
 * de tailles derivees du meme fichier (-300x179, -768x458…).
 */
const trouvees = new Set(
  [...corpus.matchAll(/uploads\/\d{4}\/\d{2}\/[^"')\s]+?\.(?:jpe?g|png|webp)/gi)].map((m) => m[0]),
);

const parBase = new Map();
for (const chemin of trouvees) {
  if (COMMUNS.test(chemin)) continue;
  const nom = chemin.split("/").pop();
  const base = nom.replace(/-\d+x\d+(?=\.[a-z]+$)/i, "");
  const derive = /-\d+x\d+\.[a-z]+$/i.test(nom);
  // A defaut d'original, on garde la plus grande derivee rencontree.
  const taille = derive ? +(/-(\d+)x\d+\.[a-z]+$/i.exec(nom)?.[1] ?? 0) : Infinity;
  if (!parBase.has(base) || parBase.get(base).taille < taille)
    parBase.set(base, { chemin, taille });
}

await mkdir(DOSSIER, { recursive: true });
console.log(`${parBase.size} visuel(s) sur ${slug} :\n`);

for (const [base, { chemin }] of parBase) {
  const cible = join(DOSSIER, base);
  if (existsSync(cible)) {
    console.log(`  ${base} — déjà présent`);
    continue;
  }

  const reponse = await fetch(`${ORIGINE}/wp-content/${chemin}`, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  if (!reponse.ok) {
    console.log(`  ${base} — échec ${reponse.status}`);
    continue;
  }

  const brut = Buffer.from(await reponse.arrayBuffer());
  const image = sharp(brut);
  const { format, width, height } = await image.metadata();

  // Recompression au meme format : les originaux WordPress sont souvent deux
  // a trois fois plus lourds que necessaire.
  const compresse =
    format === "png"
      ? await image.png({ compressionLevel: 9 }).toBuffer()
      : format === "webp"
        ? await image.webp({ quality: 80 }).toBuffer()
        : await image.jpeg({ quality: 80, mozjpeg: true }).toBuffer();

  const retenu = compresse.length < brut.length ? compresse : brut;
  await writeFile(cible, retenu);
  console.log(
    `  ${base} — ${width}×${height}, ${Math.round(retenu.length / 1024)} Ko` +
      (retenu === compresse ? ` (au lieu de ${Math.round(brut.length / 1024)} Ko)` : ""),
  );
}
