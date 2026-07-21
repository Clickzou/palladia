#!/usr/bin/env node
/**
 * Construit messages/en.json et messages/es.json a partir du site en ligne.
 *
 * Methode : on aligne les textes des trois versions d'une meme page (la
 * structure HTML est identique d'une langue a l'autre), ce qui donne un
 * dictionnaire FR -> EN / ES. On applique ensuite ce dictionnaire aux
 * valeurs de messages/fr.json.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const RACINE = process.argv[2];
const MESSAGES = process.argv[3];

const dossiers = { fr: "en-ligne", en: "en-ligne-en", es: "en-ligne-es" };

const normaliser = (s) =>
  s
    .replace(/\s+/g, " ")
    .replace(/[’']/g, "’")
    .trim()
    .toLowerCase();

function textes(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, "\n")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8217;|&rsquo;/g, "’")
    .replace(/&amp;/g, "&")
    .replace(/&#8211;|&ndash;/g, "–")
    .replace(/&#8230;|&hellip;/g, "…")
    .replace(/&laquo;/g, "«")
    .replace(/&raquo;/g, "»")
    .replace(/&quot;/g, '"')
    .replace(/&eacute;/g, "é")
    .replace(/&egrave;/g, "è")
    .replace(/&agrave;/g, "à")
    .replace(/&ccedil;/g, "ç")
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s.length > 1);
}

// 1. Dictionnaire FR -> {en, es}, construit sur toutes les pages
const dico = new Map();
const pages = readdirSync(join(RACINE, dossiers.fr)).filter((f) => f.endsWith(".html"));

for (const page of pages) {
  let parLangue;
  try {
    parLangue = Object.fromEntries(
      Object.entries(dossiers).map(([l, d]) => [l, textes(readFileSync(join(RACINE, d, page), "utf8"))]),
    );
  } catch {
    continue;
  }

  const n = Math.min(...Object.values(parLangue).map((t) => t.length));
  for (let i = 0; i < n; i++) {
    const fr = parLangue.fr[i];
    const cle = normaliser(fr);
    if (!dico.has(cle)) dico.set(cle, { en: parLangue.en[i], es: parLangue.es[i] });
  }
}

console.log(`Dictionnaire : ${dico.size} segments issus de ${pages.length} pages`);

// 2. Application aux messages
const fr = JSON.parse(readFileSync(join(MESSAGES, "fr.json"), "utf8"));
const stats = { en: { trouve: 0, manque: 0 }, es: { trouve: 0, manque: 0 } };
const manquants = [];

for (const langue of ["en", "es"]) {
  const sortie = {};
  for (const [ns, valeurs] of Object.entries(fr)) {
    sortie[ns] = {};
    for (const [k, v] of Object.entries(valeurs)) {
      // Le texte peut contenir du HTML (balises <b>) : on cherche sans
      const nu = String(v).replace(/<[^>]+>/g, "");
      const trad = dico.get(normaliser(nu));
      if (trad?.[langue] && normaliser(trad[langue]) !== normaliser(nu)) {
        sortie[ns][k] = trad[langue];
        stats[langue].trouve++;
      } else {
        sortie[ns][k] = v; // repli sur le francais
        stats[langue].manque++;
        if (langue === "en") manquants.push(`${ns}.${k}`);
      }
    }
  }
  writeFileSync(join(MESSAGES, `${langue}.json`), JSON.stringify(sortie, null, 2) + "\n", "utf8");
}

console.log(`\nEN : ${stats.en.trouve} traduits, ${stats.en.manque} sans correspondance`);
console.log(`ES : ${stats.es.trouve} traduits, ${stats.es.manque} sans correspondance`);
if (manquants.length) {
  console.log(`\nCles restees en francais :\n  ${manquants.slice(0, 40).join("\n  ")}`);
  if (manquants.length > 40) console.log(`  … +${manquants.length - 40}`);
}
