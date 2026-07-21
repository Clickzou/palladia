#!/usr/bin/env node
/**
 * Compresse les images de public/ sans changer leur nom ni leur format.
 *
 * Beaucoup de visuels viennent de l'archive WordPress en pleine résolution
 * (jusqu'à 2500 px de large) alors qu'aucun n'est affiché au-delà de 1920 px.
 * On redimensionne à cette borne et on recompresse.
 *
 * Les affiches (offres, spectacles) portent du texte : elles sont traitées
 * avec une qualité plus élevée et ne sont jamais agrandies.
 *
 *   node scripts/optimiser-images.mjs           → simulation, n'écrit rien
 *   node scripts/optimiser-images.mjs --appliquer → réécrit les fichiers
 */
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import { join, extname } from "node:path";
import sharp from "sharp";

const RACINE = "public/images";
const LARGEUR_MAX = 1920;
const APPLIQUER = process.argv.includes("--appliquer");

/** Visuels contenant du texte : on préserve davantage de détail. */
const AVEC_TEXTE = /\/(offres|spectacles)\/|logo|clef-verte|picto/i;

const octets = (n) => (n / 1024 / 1024).toFixed(2) + " Mo";

async function lister(dossier) {
  const fichiers = [];
  for (const entree of await readdir(dossier, { withFileTypes: true })) {
    const chemin = join(dossier, entree.name);
    if (entree.isDirectory()) fichiers.push(...(await lister(chemin)));
    else if (/\.(jpe?g|png|webp)$/i.test(entree.name)) fichiers.push(chemin);
  }
  return fichiers;
}

const fichiers = (await lister(RACINE)).sort();
let avant = 0;
let apres = 0;
let modifies = 0;

for (const chemin of fichiers) {
  const taille = (await stat(chemin)).size;
  avant += taille;

  const texte = AVEC_TEXTE.test(chemin.replace(/\\/g, "/"));
  const qualite = texte ? 90 : 80;

  // On lit le fichier en memoire : sous Windows, sharp garde sinon un verrou
  // qui empeche de reecrire le fichier d'origine.
  let image = sharp(await readFile(chemin));
  const meta = await image.metadata();

  if (meta.width > LARGEUR_MAX) {
    image = image.resize({ width: LARGEUR_MAX, withoutEnlargement: true });
  }

  const ext = extname(chemin).toLowerCase();
  if (ext === ".png") {
    image = image.png({ compressionLevel: 9, palette: !texte });
  } else if (ext === ".webp") {
    image = image.webp({ quality: qualite });
  } else {
    image = image.jpeg({ quality: qualite, mozjpeg: true, progressive: true });
  }

  const sortie = await image.toBuffer();

  // On ne remplace que si le gain est réel (au moins 5 %)
  if (sortie.length < taille * 0.95) {
    apres += sortie.length;
    modifies++;
    if (APPLIQUER) await writeFile(chemin, sortie);
    const gain = Math.round((1 - sortie.length / taille) * 100);
    if (gain >= 40) {
      console.log(`  −${String(gain).padStart(2)} %  ${chemin}  (${octets(taille)} → ${octets(sortie.length)})`);
    }
  } else {
    apres += taille;
  }
}

console.log(`\n${fichiers.length} image(s) analysee(s), ${modifies} optimisable(s)`);
console.log(`Avant : ${octets(avant)}`);
console.log(`Apres : ${octets(apres)}   (−${Math.round((1 - apres / avant) * 100)} %)`);
if (!APPLIQUER) console.log("\nSimulation. Relancer avec --appliquer pour ecrire les fichiers.");
