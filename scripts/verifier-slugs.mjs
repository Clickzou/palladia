/**
 * Verifie que chaque page porte le meme chemin dans les trois langues.
 *
 * Le site sert les memes slugs, en français, quelle que soit la langue :
 * /en/restaurant et non /en/restaurant-en. C'est un choix assume — une seule
 * adresse par contenu, donc un seul referencement a construire — mais il ne
 * tient que si rien ne diverge en douce.
 *
 *   node scripts/verifier-slugs.mjs
 */
const BASE = process.env.BASE ?? "http://localhost:3000";

const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);

/** Chemin sans son prefixe de langue. */
const nu = (p) => p.replace(/^\/(en|es)(?=\/|$)/, "") || "/";

const parChemin = new Map();
for (const p of urls) {
  const langue = /^\/(en|es)(\/|$)/.test(p) ? p.slice(1, 3) : "fr";
  const cle = nu(p);
  (parChemin.get(cle) ?? parChemin.set(cle, new Map()).get(cle)).set(langue, p);
}

const anomalies = [];
for (const [cle, langues] of parChemin) {
  for (const langue of ["fr", "en", "es"]) {
    if (!langues.has(langue)) anomalies.push(`${cle} — absent du sitemap en ${langue}`);
  }
  // Le chemin doit etre le meme au prefixe pres
  for (const [langue, chemin] of langues) {
    const attendu = langue === "fr" ? cle : `/${langue}${cle === "/" ? "" : cle}`;
    if (chemin !== attendu) anomalies.push(`${cle} — ${langue} sert ${chemin} au lieu de ${attendu}`);
  }
}

// Les balises hreflang doivent designer exactement ces adresses.
for (const [cle, langues] of parChemin) {
  const h = await (await fetch(`${BASE}${cle}`)).text();
  const declares = Object.fromEntries(
    [...h.matchAll(/hreflang="([^"]+)"\s+href="([^"]+)"/gi)].map((m) => [m[1], new URL(m[2]).pathname]),
  );
  for (const [langue, chemin] of langues) {
    if (declares[langue] !== chemin) {
      anomalies.push(`${cle} — hreflang ${langue} annonce ${declares[langue]}, sitemap ${chemin}`);
    }
  }
}

console.log(
  anomalies.length
    ? `${anomalies.length} anomalies :\n` + anomalies.join("\n")
    : `Les ${parChemin.size} pages portent le meme slug dans les trois langues, ` +
        `et leurs hreflang concordent avec le sitemap.`,
);
