/**
 * Verifie que chaque page repond dans les trois langues, sous la meme URL.
 *
 * Le site sert le français a la racine et prefixe l'anglais et l'espagnol :
 * /restaurant, /en/restaurant, /es/restaurant. Le chemin doit rester
 * identique — une traduction de slug casserait les liens et obligerait a
 * maintenir trois arborescences.
 *
 * Controle aussi les balises hreflang et l'URL canonique, qui disent a Google
 * que ces trois adresses sont la meme page.
 *
 *   node scripts/verifier-urls-langues.mjs
 */
import { readFileSync } from "node:fs";

const BASE = process.env.LOCAL ?? "http://localhost:3000";
const ROUTES = JSON.parse(readFileSync(new URL("./routes.json", import.meta.url), "utf8"));

let defauts = 0;

for (const { v2 } of ROUTES) {
  const chemin = v2 === "/" ? "" : v2;
  const lignes = [];

  for (const langue of ["fr", "en", "es"]) {
    const url = langue === "fr" ? `${BASE}${chemin || "/"}` : `${BASE}/${langue}${chemin}`;

    let reponse;
    try {
      reponse = await fetch(url, { redirect: "manual" });
    } catch {
      lignes.push(`${langue} : injoignable`);
      continue;
    }

    if (reponse.status !== 200) {
      lignes.push(`${langue} : HTTP ${reponse.status}`);
      continue;
    }

    const html = await reponse.text();
    const titre = /<title>([^<]*)/.exec(html)?.[1] ?? "";
    const canonique = /rel="canonical" href="([^"]*)"/.exec(html)?.[1] ?? "";
    const alternatives = [...html.matchAll(/hrefLang="([a-z-]+)"/gi)].map((m) => m[1]);

    const manque = ["fr", "en", "es", "x-default"].filter((l) => !alternatives.includes(l));
    if (manque.length) lignes.push(`${langue} : hreflang manquant (${manque.join(", ")})`);

    // La canonique doit pointer sur la page elle-meme, pas sur une autre langue
    const attendue = langue === "fr" ? chemin : `/${langue}${chemin}`;
    if (canonique && !canonique.endsWith(attendue || "/") && !canonique.endsWith(attendue))
      lignes.push(`${langue} : canonique ${canonique}`);

    if (!titre) lignes.push(`${langue} : titre vide`);
  }

  if (lignes.length) {
    defauts += lignes.length;
    console.log(`\n${v2 || "/"}`);
    lignes.forEach((l) => console.log(`  ${l}`));
  }
}

console.log(
  defauts
    ? `\n${defauts} anomalie(s) sur ${ROUTES.length} pages.`
    : `\nLes ${ROUTES.length} pages repondent dans les trois langues, sous le meme chemin.`,
);
