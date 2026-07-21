#!/usr/bin/env node
/**
 * Extraction SELECTIVE depuis une archive .wpress via l'index JSON.
 * usage: node wpress-extract.mjs <archive> <index.json> <destination> <regex-chemin>
 * Les fichiers sont ecrits avec l'extension .txt ajoutee si executables, pour eviter
 * toute execution accidentelle par un serveur local.
 */
import { openSync, readSync, closeSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const [archive, indexPath, dest, pattern] = process.argv.slice(2);
if (!pattern) {
  console.error('usage: node wpress-extract.mjs <archive> <index.json> <dest> <regex>');
  process.exit(1);
}

const entries = JSON.parse(await import('node:fs').then((fs) => fs.readFileSync(indexPath, 'utf8')));
const re = new RegExp(pattern, 'i');
const targets = entries.filter((e) => re.test(e.path));
console.log(`${targets.length} fichier(s) correspondent.`);

const fd = openSync(archive, 'r');
let written = 0;
for (const e of targets) {
  const buf = Buffer.alloc(e.size);
  if (e.size > 0) readSync(fd, buf, 0, e.size, e.dataOffset);
  // neutralisation : on suffixe .txt pour que rien ne soit executable
  const safe = /\.(php\d?|phtml|phar|sh|htaccess)$/i.test(e.path) ? `${e.path}.txt` : e.path;
  const out = join(dest, safe);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, buf);
  written++;
  console.log(`  ${String(e.size).padStart(9)}  ${safe}`);
}
closeSync(fd);
console.log(`\n${written} fichier(s) extrait(s) vers ${dest}`);
