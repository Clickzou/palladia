import { readFileSync } from "node:fs";
const env = Object.fromEntries(
  readFileSync(".env.local", "utf8").split(/\r?\n/).filter(l => l.includes("=") && !l.startsWith("#"))
    .map(l => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()]));
const slugs = process.argv.slice(2);
const r = await fetch(
  `${env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/articles?select=slug,sous_titre,article_blocs(ordre,type,contenu)&locale=eq.fr&slug=in.(${slugs.join(",")})`,
  { headers: { apikey: env.SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}` } });
for (const a of await r.json()) {
  console.log("\n########", a.slug, "|", a.article_blocs.length, "blocs");
  const t = JSON.stringify(a.article_blocs.sort((x, y) => x.ordre - y.ordre).map(b => b.contenu));
  // Extraits autour des marqueurs datés
  const vus = new Set();
  for (const m of t.matchAll(/.{70}(?:20[12]\d|\d+\s?€).{70}/g)) {
    const e = m[0].replace(/\\"/g, '"').replace(/","/g, " | ");
    if (vus.has(e.slice(20, 60))) continue;
    vus.add(e.slice(20, 60));
    console.log("  …" + e + "…");
    if (vus.size >= 4) break;
  }
}
