#!/usr/bin/env node
/**
 * Extrait les articles publies (wp_posts) d'un dump All-in-One.
 * Parse les tuples SQL caractere par caractere pour gerer correctement
 * les quotes echappees et les virgules a l'interieur du contenu HTML.
 */
import { createReadStream, writeFileSync } from "node:fs";

const file = process.argv[2];
const out = process.argv[3] || "posts.json";

/** Decoupe "(a,'b',...),(c,'d',...)" en tableaux de valeurs. */
function parseTuples(s) {
  const rows = [];
  let i = 0;
  while (i < s.length) {
    if (s[i] !== "(") { i++; continue; }
    i++; // saute (
    const vals = [];
    let cur = "";
    let inStr = false;
    while (i < s.length) {
      const c = s[i];
      if (inStr) {
        if (c === "\\") {
          // Sequences d'echappement MySQL : \n \r \t \0 \\ \' \"
          const esc = s[i + 1];
          cur += esc === "n" ? "\n" : esc === "r" ? "\r" : esc === "t" ? "\t" : esc === "0" ? "" : esc;
          i += 2;
          continue;
        }
        if (c === "'") { inStr = false; i++; continue; }
        cur += c; i++; continue;
      }
      if (c === "'") { inStr = true; i++; continue; }
      if (c === ",") { vals.push(cur); cur = ""; i++; continue; }
      if (c === ")") { vals.push(cur); i++; break; }
      cur += c; i++;
    }
    rows.push(vals);
  }
  return rows;
}

let buf = "";
const posts = [];
const stream = createReadStream(file, { encoding: "utf8", highWaterMark: 8 * 1024 * 1024 });

for await (const chunk of stream) {
  buf += chunk;
  // On traite chaque instruction complete puis on garde le reste
  let idx;
  while ((idx = buf.indexOf(");\n")) !== -1 || (idx = buf.indexOf("); ")) !== -1) {
    const stmt = buf.slice(0, idx + 1);
    buf = buf.slice(idx + 2);

    if (!/INSERT INTO `[^`]*posts` VALUES/.test(stmt)) continue;
    const payload = stmt.slice(stmt.indexOf("VALUES") + 6);

    for (const v of parseTuples(payload)) {
      // colonnes wp_posts : 0 ID, 1 author, 2 date, 3 date_gmt, 4 content, 5 title,
      // 6 excerpt, 7 status, ... 11 name(slug), ... 20 type
      const [id, , date, , content, title, excerpt, status] = v;
      const slug = v[11];
      const type = v[20];
      if (type !== "post" || status !== "publish") continue;
      posts.push({ id, date, slug, title, excerpt, type, length: content?.length ?? 0, content });
    }
  }
  if (buf.length > 40 * 1024 * 1024) buf = buf.slice(-20 * 1024 * 1024);
}

posts.sort((a, b) => (a.date < b.date ? 1 : -1));
writeFileSync(out, JSON.stringify(posts, null, 1));

console.log(`${posts.length} article(s) publie(s)\n`);
for (const p of posts) {
  console.log(`${p.date.slice(0, 10)}  ${String(p.length).padStart(7)} car.  ${p.slug}`);
  console.log(`             ${p.title}`);
}
