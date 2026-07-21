#!/usr/bin/env node
/**
 * Recupere les versions anglaise et espagnole des pages FR deja aspirees.
 * TranslatePress prefixe les URLs : /en/… et /es/…
 */
import { readdir, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const BASE = "https://www.hotelpalladia.com";
const SOURCE = process.argv[2];
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126 Safari/537.36";
const pause = (ms) => new Promise((r) => setTimeout(r, ms));

const fichiers = (await readdir(SOURCE)).filter((f) => f.endsWith(".html"));
console.log(`${fichiers.length} pages FR, soit ${fichiers.length * 2} traductions a recuperer\n`);

for (const langue of ["en", "es"]) {
  const dest = join(SOURCE, `..`, `en-ligne-${langue}`);
  await mkdir(dest, { recursive: true });

  let ok = 0;
  let ko = 0;
  for (const f of fichiers) {
    const chemin = f.replace(/\.html$/, "").replace(/__/g, "/");
    const url = chemin === "accueil" ? `${BASE}/${langue}/` : `${BASE}/${langue}/${chemin}/`;

    try {
      const r = await fetch(url, { headers: { "User-Agent": UA } });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      await writeFile(join(dest, f), await r.text(), "utf8");
      ok++;
    } catch (e) {
      ko++;
      console.log(`  [${langue}] ECHEC ${chemin} : ${e.message}`);
    }
    await pause(150);
  }
  console.log(`[${langue}] ${ok} pages, ${ko} echec(s)`);
}
