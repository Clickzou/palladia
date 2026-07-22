/**
 * Controle le SEO des trois langues : title, description, canonical, hreflang,
 * et signale les metas restees en français sur les versions anglaise et
 * espagnole.
 *
 * Le repere de « reste en français » est simple mais fiable ici : une meta
 * identique a la version française alors que le texte fait plus de quelques
 * mots n'a pas ete traduite.
 *
 *   node scripts/verifier-seo-langues.mjs
 */
const BASE = process.env.BASE ?? "http://localhost:3000";

const chemins = process.argv.slice(2).length
  ? process.argv.slice(2)
  : await (async () => {
      const rep = await fetch(`${BASE}/sitemap.xml`);
      const xml = await rep.text();
      const vus = new Set();
      for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
        const p = new URL(m[1]).pathname.replace(/^\/(en|es)(?=\/|$)/, "") || "/";
        vus.add(p);
      }
      return [...vus].sort();
    })();

const lire = async (url) => {
  const rep = await fetch(url);
  const h = await rep.text();
  const un = (re) => (h.match(re) ?? [])[1] ?? null;
  return {
    statut: rep.status,
    title: un(/<title>([\s\S]*?)<\/title>/),
    description: un(/<meta name="description" content="([^"]*)"/),
    canonical: un(/<link rel="canonical" href="([^"]*)"/),
    hreflang: [...h.matchAll(/hreflang="([^"]*)"/gi)].map((m) => m[1]).sort(),
    ogLocale: un(/property="og:locale" content="([^"]*)"/),
  };
};

const anomalies = [];
for (const chemin of chemins) {
  const fr = await lire(`${BASE}${chemin}`);
  for (const langue of ["en", "es"]) {
    const p = chemin === "/" ? `/${langue}` : `/${langue}${chemin}`;
    const v = await lire(`${BASE}${p}`);

    if (v.statut !== 200) anomalies.push(`${p} — statut ${v.statut}`);
    if (!v.title) anomalies.push(`${p} — pas de <title>`);
    if (!v.description) anomalies.push(`${p} — pas de meta description`);
    if (!v.canonical?.endsWith(p)) anomalies.push(`${p} — canonical ${v.canonical}`);

    const attendu = ["es", "en", "fr", "x-default"].sort();
    if (JSON.stringify(v.hreflang) !== JSON.stringify(attendu)) {
      anomalies.push(`${p} — hreflang ${v.hreflang.join(",")}`);
    }
    if (v.ogLocale !== { en: "en_GB", es: "es_ES" }[langue]) {
      anomalies.push(`${p} — og:locale ${v.ogLocale}`);
    }

    if (v.title === fr.title && (fr.title?.split(/\s+/).length ?? 0) > 3) {
      anomalies.push(`${p} — title identique au français : ${v.title}`);
    }
    if (v.description === fr.description && (fr.description?.split(/\s+/).length ?? 0) > 5) {
      anomalies.push(`${p} — description identique au français`);
    }
  }
}

console.log(
  anomalies.length
    ? `${anomalies.length} anomalies sur ${chemins.length} pages :\n` + anomalies.join("\n")
    : `Les ${chemins.length} pages ont un SEO complet et traduit dans les trois langues.`,
);
