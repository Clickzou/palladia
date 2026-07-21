#!/usr/bin/env node
/**
 * Regenere les donnees d'une page legale a partir du site en ligne.
 *
 * Elementor ne balise pas les titres de section en <h2> : ce sont des
 * paragraphes. On les reconnait a leur numerotation (« 4- Agrégation… »)
 * ou a une liste d'intitules connus.
 *
 * Les intitules en gras en tete de paragraphe sont conserves, encadres de
 * ** pour etre restitues en gras a l'affichage.
 */
import { readFileSync, writeFileSync } from "node:fs";

const [FICHIER, SORTIE, NOM] = process.argv.slice(2);

const dec = (s) =>
  s
    .replace(/&nbsp;/g, " ")
    .replace(/&#8217;|&rsquo;/g, "’")
    .replace(/&amp;/g, "&")
    .replace(/&#8211;|&ndash;/g, "–")
    .replace(/&#8212;|&mdash;/g, "—")
    .replace(/&quot;/g, '"')
    .replace(/&eacute;/g, "é")
    .replace(/&egrave;/g, "è")
    .replace(/&agrave;/g, "à")
    .replace(/&ccedil;/g, "ç")
    .replace(/&#0*39;|&apos;/g, "’")
    .replace(/&laquo;/g, "«")
    .replace(/&raquo;/g, "»")
    .replace(/&#8230;|&hellip;/g, "…");

const propre = (s) => dec(s.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

/** Un titre de section : numerote, ou intitule connu. */
const EST_TITRE = (t) =>
  // « 4- Agrégation… », « 1. Introduction », « 9 – Conservation… »
  /^\d+\s*[-–.]\s*\S/.test(t) ||
  /^(Définitions|Litiges|RGPD|Informations collectées sur le site|Coordonnées|Droits d’auteur|Éditeur du site)/i.test(t);

const html = readFileSync(FICHIER, "utf8");
const debut = html.indexOf("elementor-location-single");
const fin = html.indexOf("elementor-location-footer");
const corps = html.slice(debut > 0 ? debut : 0, fin > 0 ? fin : html.length);

// Bruit de navigation a ecarter
const BRUIT =
  /^(Hôtel Palladia|Linkedin|Menu|Accueil|Réserver|Politique de|Mentions|Skip|Aller directement)/i;

const sections = [];
let courante = null;

for (const m of corps.matchAll(/<(?:p|h[23])[^>]*>([\s\S]*?)<\/(?:p|h[23])>/gi)) {
  const brut = m[1];
  const texte = propre(brut);
  if (!texte || texte.length < 3 || BRUIT.test(texte) || texte.length > 4000) continue;

  if (EST_TITRE(texte) && texte.length < 130) {
    courante = { titre: texte, paragraphes: [] };
    sections.push(courante);
    continue;
  }

  // Intitule en gras en tete de paragraphe
  let sortie = texte;
  const gras = brut.match(/^\s*<(strong|b)[^>]*>([\s\S]*?)<\/\1>/i);
  if (gras) {
    const intitule = propre(gras[2]).replace(/[.:]$/, "");
    const reste = propre(brut.slice(gras[0].length)).replace(/^[.\s]+/, "");
    if (intitule && reste && intitule.length < 130) sortie = `**${intitule}** ${reste}`;
  }

  if (!courante) {
    courante = { titre: "", paragraphes: [] };
    sections.push(courante);
  }
  courante.paragraphes.push(sortie);
}

const utiles = sections.filter((s) => s.paragraphes.length > 0);
console.log(`${utiles.length} sections, ${utiles.reduce((n, s) => n + s.paragraphes.length, 0)} paragraphes`);

const echapper = (s) => s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
const lignes = [
  `/**`,
  ` * ${NOM}`,
  ` * Contenu repris integralement du site en ligne : sur une page legale,`,
  ` * tout resume expose a une non-conformite.`,
  ` * Les segments encadres de ** sont affiches en gras.`,
  ` */`,
  `export const sections = [`,
];
for (const s of utiles) {
  lignes.push("  {");
  lignes.push(`    titre: "${echapper(s.titre)}",`);
  lignes.push("    paragraphes: [");
  for (const p of s.paragraphes) lignes.push(`      "${echapper(p)}",`);
  lignes.push("    ],");
  lignes.push("  },");
}
lignes.push("] as const;");

writeFileSync(SORTIE, lignes.join("\n") + "\n", "utf8");
console.log(`-> ${SORTIE}`);
