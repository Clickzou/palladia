/**
 * Audit SEO du site, page par page et langue par langue.
 *
 * Complete verifier-seo-langues.mjs, qui ne controle que les metadonnees :
 * on regarde ici la structure des titres, les images, les liens, les donnees
 * structurees et les doublons entre pages.
 *
 *   node scripts/audit-seo.mjs
 *   BASE=https://www.hotelpalladia.com node scripts/audit-seo.mjs
 */
const BASE = process.env.BASE ?? "http://localhost:3000";

/* Seuils usuels d'affichage dans les resultats Google. */
const TITRE_MIN = 25;
const TITRE_MAX = 65;
const DESC_MIN = 70;
const DESC_MAX = 165;

const decoder = (t) =>
  t
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "’")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();

/** Le serveur de developpement coupe parfois une connexion : on reessaie. */
const lire = async (url, essais = 3) => {
  for (let i = 1; ; i++) {
    try {
      return await fetch(url);
    } catch (e) {
      if (i === essais) throw e;
      await new Promise((r) => setTimeout(r, 500 * i));
    }
  }
};

const xml = await (await lire(`${BASE}/sitemap.xml`)).text();
const chemins = [
  ...new Set(
    [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      (m) => new URL(m[1]).pathname.replace(/^\/(en|es)(?=\/|$)/, "") || "/",
    ),
  ),
].sort();

const analyser = async (url) => {
  const rep = await lire(url);
  const h = await rep.text();
  const tete = (h.match(/<head>[\s\S]*?<\/head>/) ?? [""])[0];
  const corps = h
    .replace(/<head>[\s\S]*?<\/head>/, "")
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<style[\s\S]*?<\/style>/g, "");

  const titres = (n) =>
    [...corps.matchAll(new RegExp(`<h${n}[^>]*>([\\s\\S]*?)</h${n}>`, "g"))].map((m) =>
      decoder(m[1].replace(/<[^>]*>/g, "")),
    );

  const images = [...corps.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);

  return {
    statut: rep.status,
    langue: (h.match(/<html[^>]*\blang="([^"]*)"/) ?? [])[1] ?? null,
    title: decoder((tete.match(/<title>([\s\S]*?)<\/title>/) ?? [, ""])[1]),
    description: decoder((tete.match(/<meta name="description" content="([^"]*)"/) ?? [, ""])[1]),
    robots: (tete.match(/<meta name="robots" content="([^"]*)"/) ?? [])[1] ?? null,
    ogImage: (tete.match(/property="og:image"[^>]*content="([^"]*)"/) ?? [])[1] ?? null,
    h1: titres(1),
    h2: titres(2),
    h3: titres(3),
    images,
    sansAlt: images.filter((i) => !/\balt="[^"]/.test(i)).length,
    liens: [...corps.matchAll(/<a\b[^>]*href="([^"#][^"]*)"/g)].map((m) => m[1]),
    jsonLd: [...h.matchAll(/type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(
      (m) => m[1],
    ),
    poids: h.length,
  };
};

const anomalies = [];
const pages = new Map();
const ajouter = (gravite, url, texte) => anomalies.push({ gravite, url, texte });

for (const chemin of chemins) {
  for (const langue of ["fr", "en", "es"]) {
    const p = langue === "fr" ? chemin : `/${langue}${chemin === "/" ? "" : chemin}`;
    const a = await analyser(`${BASE}${p}`);
    pages.set(p, a);

    if (a.statut !== 200) ajouter("bloquant", p, `statut ${a.statut}`);
    if (a.langue !== langue) ajouter("bloquant", p, `<html lang="${a.langue}"> au lieu de ${langue}`);

    if (!a.title) ajouter("bloquant", p, "titre absent");
    else if (a.title.length > TITRE_MAX)
      ajouter("moyen", p, `titre de ${a.title.length} signes (> ${TITRE_MAX}) : ${a.title}`);
    else if (a.title.length < TITRE_MIN)
      ajouter("moyen", p, `titre de ${a.title.length} signes (< ${TITRE_MIN}) : ${a.title}`);

    if (!a.description) ajouter("bloquant", p, "description absente");
    else if (a.description.length > DESC_MAX)
      ajouter("moyen", p, `description de ${a.description.length} signes (> ${DESC_MAX})`);
    else if (a.description.length < DESC_MIN)
      ajouter("mineur", p, `description de ${a.description.length} signes (< ${DESC_MIN})`);

    if (a.h1.length === 0) ajouter("bloquant", p, "aucun h1");
    else if (a.h1.length > 1) ajouter("moyen", p, `${a.h1.length} h1 : ${a.h1.join(" | ")}`);

    if (a.h2.length === 0 && a.h3.length > 0) ajouter("mineur", p, "des h3 sans h2");
    if (a.sansAlt) ajouter("moyen", p, `${a.sansAlt} image(s) sans attribut alt`);
    if (!a.ogImage) ajouter("mineur", p, "pas d’image OpenGraph");

    for (const bloc of a.jsonLd) {
      try {
        JSON.parse(bloc);
      } catch {
        ajouter("bloquant", p, "donnees structurees JSON-LD invalides");
      }
    }
  }
}

/* Doublons de titre ou de description a l'interieur d'une meme langue. */
for (const langue of ["fr", "en", "es"]) {
  const vues = new Map();
  for (const [p, a] of pages) {
    const l = /^\/(en|es)(\/|$)/.test(p) ? p.slice(1, 3) : "fr";
    if (l !== langue) continue;
    for (const champ of ["title", "description"]) {
      const cle = `${champ}:${a[champ]}`;
      if (!a[champ]) continue;
      if (vues.has(cle)) ajouter("moyen", p, `${champ} identique a ${vues.get(cle)}`);
      else vues.set(cle, p);
    }
  }
}

/* Maillage interne : pages du sitemap que rien ne relie. */
const cibles = new Set();
for (const a of pages.values()) {
  for (const l of a.liens) {
    if (l.startsWith("http")) continue;
    cibles.add(l.split("?")[0].replace(/\/$/, "") || "/");
  }
}
for (const chemin of chemins) {
  if (chemin !== "/" && !cibles.has(chemin)) {
    ajouter("moyen", chemin, "aucun lien interne ne pointe vers cette page");
  }
}

/* Liens internes casses. */
const internes = new Set();
for (const a of pages.values()) {
  for (const l of a.liens) if (l.startsWith("/")) internes.add(l.split("?")[0]);
}
for (const l of internes) {
  const r = await lire(`${BASE}${l}`);
  if (r.status >= 400) ajouter("bloquant", l, `lien interne casse (${r.status})`);
}

const parGravite = { bloquant: [], moyen: [], mineur: [] };
for (const a of anomalies) parGravite[a.gravite].push(a);

console.log(`${pages.size} pages analysees, ${internes.size} liens internes distincts\n`);
for (const [gravite, liste] of Object.entries(parGravite)) {
  console.log(`## ${gravite} — ${liste.length}`);
  for (const a of liste) console.log(`   ${a.url} — ${a.texte}`);
  console.log();
}
