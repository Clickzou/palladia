#!/usr/bin/env node
/**
 * Aspire les pages du site en ligne (FR, EN, ES) a partir du sitemap.
 * Enregistre le HTML brut, pour comparaison avec la v2 et extraction des
 * contenus 2026 absents de l'archive de decembre 2025.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const BASE = "https://www.hotelpalladia.com";
const DEST = process.argv[2] ?? "site-en-ligne";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126 Safari/537.36";

/** Recupere une URL en texte, avec un petit delai pour menager le serveur. */
async function recuperer(url) {
  const r = await fetch(url, { headers: { "User-Agent": UA } });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.text();
}

const pause = (ms) => new Promise((r) => setTimeout(r, ms));

// 1. Liste des URLs depuis les sitemaps
const index = await recuperer(`${BASE}/sitemap_index.xml`);
const sitemaps = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const urls = new Set();
for (const sm of sitemaps) {
  if (/author|category|tag/.test(sm)) continue;
  const xml = await recuperer(sm);
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) urls.add(m[1]);
  await pause(200);
}

console.log(`${sitemaps.length} sitemaps, ${urls.size} URLs a recuperer\n`);

// 2. Telechargement
let ok = 0;
let ko = 0;
for (const url of [...urls].sort()) {
  const chemin = new URL(url).pathname.replace(/^\/|\/$/g, "") || "accueil";
  const fichier = join(DEST, `${chemin.replace(/\//g, "__")}.html`);

  try {
    const html = await recuperer(url);
    await mkdir(dirname(fichier), { recursive: true });
    await writeFile(fichier, html, "utf8");
    ok++;
    if (ok % 10 === 0) console.log(`  ${ok} pages...`);
  } catch (e) {
    ko++;
    console.log(`  ECHEC ${url} : ${e.message}`);
  }
  await pause(150);
}

console.log(`\n${ok} pages enregistrees, ${ko} echec(s) -> ${DEST}/`);
