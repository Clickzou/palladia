#!/usr/bin/env node
/**
 * Inventaire d'une archive All-in-One WP Migration (.wpress) SANS extraction.
 *
 * Format ServMask : blocs d'en-tete de 4377 octets (nom 255 | taille 14 | mtime 12 | chemin 4096),
 * suivis du contenu brut du fichier. Un en-tete entierement a zero marque la fin de l'archive.
 * On lit chaque en-tete puis on saute le contenu -> lecture rapide, aucune ecriture disque.
 */
import { openSync, readSync, closeSync, statSync, writeFileSync } from 'node:fs';

const HEADER = 4377;
const F = { name: [0, 255], size: [255, 14], mtime: [269, 12], prefix: [281, 4096] };

const archive = process.argv[2];
if (!archive) {
  console.error('usage: node wpress-inventory.mjs <archive.wpress> [rapport.json]');
  process.exit(1);
}
const reportPath = process.argv[3];

const str = (buf, [off, len]) => buf.subarray(off, off + len).toString('utf8').replace(/\0+$/, '').trim();

const fd = openSync(archive, 'r');
const total = statSync(archive).size;
const head = Buffer.alloc(HEADER);
let offset = 0;
const entries = [];

while (offset < total) {
  const read = readSync(fd, head, 0, HEADER, offset);
  if (read < HEADER) break;
  if (head.every((b) => b === 0)) break; // EOF block

  const name = str(head, F.name);
  const size = parseInt(str(head, F.size), 10);
  const prefix = str(head, F.prefix);
  if (!name || Number.isNaN(size)) {
    console.error(`En-tete illisible a l'offset ${offset} — arret.`);
    break;
  }

  const path = prefix === '.' ? name : `${prefix}/${name}`;
  entries.push({ path, size, dataOffset: offset + HEADER, mtime: str(head, F.mtime) });
  offset += HEADER + size;
}
closeSync(fd);

// --- Statistiques par extension ---
const byExt = new Map();
for (const e of entries) {
  const ext = (e.path.match(/\.([a-z0-9]+)$/i)?.[1] || '(sans)').toLowerCase();
  const s = byExt.get(ext) || { n: 0, bytes: 0 };
  s.n++; s.bytes += e.size;
  byExt.set(ext, s);
}

const mo = (b) => (b / 1024 / 1024).toFixed(1).padStart(9) + ' Mo';
console.log(`\nARCHIVE : ${archive}`);
console.log(`${entries.length} fichiers, ${mo(entries.reduce((a, e) => a + e.size, 0))}\n`);

console.log('--- TOP 20 EXTENSIONS ---');
[...byExt.entries()].sort((a, b) => b[1].bytes - a[1].bytes).slice(0, 20)
  .forEach(([ext, s]) => console.log(`${mo(s.bytes)}  ${String(s.n).padStart(6)} fichiers  .${ext}`));

console.log('\n--- 15 PLUS GROS FICHIERS ---');
[...entries].sort((a, b) => b.size - a.size).slice(0, 15)
  .forEach((e) => console.log(`${mo(e.size)}  ${e.path}`));

// --- Signaux de compromission ---
const execInUploads = entries.filter((e) =>
  /^wp-content\/uploads\//i.test(e.path) && /\.(php\d?|phtml|phar|pht|shtml|htaccess|suspected|ico)$/i.test(e.path));
const rootPhp = entries.filter((e) => /^[^/]+\.php$/i.test(e.path));
const muPlugins = entries.filter((e) => /^wp-content\/mu-plugins\//i.test(e.path));
const dropins = entries.filter((e) => /^wp-content\/(object-cache|advanced-cache|db|maintenance|sunrise)\.php$/i.test(e.path));

console.log('\n=== SIGNAUX DE COMPROMISSION ===');
const flag = (label, list, sample = 25) => {
  console.log(`\n[${list.length === 0 ? 'OK' : 'A VERIFIER'}] ${label} : ${list.length}`);
  list.slice(0, sample).forEach((e) => console.log(`    ${String(e.size).padStart(9)}  ${e.path}`));
  if (list.length > sample) console.log(`    ... +${list.length - sample} autres`);
};
flag('Executables dans uploads/ (jamais normal)', execInUploads);
flag('mu-plugins (planque classique)', muPlugins);
flag('Drop-ins wp-content', dropins);
flag('PHP a la racine (comparer a la liste standard WP)', rootPhp, 60);

if (reportPath) {
  writeFileSync(reportPath, JSON.stringify(entries, null, 0));
  console.log(`\nIndex complet ecrit : ${reportPath}`);
}
