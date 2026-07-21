#!/usr/bin/env node
/**
 * Compare la structure des pages : suite des titres et nombre de visuels.
 *
 * La comparaison de texte ne dit pas si une section est mal placee, ni si
 * un bloc entier manque. Les titres, eux, donnent le plan de la page.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

const RACINE = process.argv[2];
const LOCAL = process.argv[3] ?? "http://localhost:3000";

const PAGES = [
  ["/", "accueil.html"],
  ["/hotel", "hotel.html"],
  ["/offres-hebergement-toulouse", "offres-hebergement-toulouse.html"],
  ["/chambres", "chambres.html"],
  ["/preference", "preference.html"],
  ["/platinium", "platinium.html"],
  ["/suite-junior", "suite-junior.html"],
  ["/la-suite", "la-suite.html"],
  ["/seminaire-evenement-professionnel", "seminaire-evenement-professionnel.html"],
  ["/restaurant", "restaurant.html"],
  ["/spa", "spa.html"],
  ["/spectacle-toulouse", "spectacle-toulouse.html"],
  ["/visites-toulouse", "visites-toulouse.html"],
  ["/engagements", "engagements.html"],
  ["/presse", "presse.html"],
  ["/coffret-cadeau-hotel-restaurant-toulouse", "coffret-cadeau-hotel-restaurant-toulouse.html"],
  ["/recrutement", "recrutement.html"],
  ["/actualites", "actualites.html"],
  ["/devis", "devis.html"],
];

const dec = (s) =>
  s
    .replace(/&nbsp;/g, " ")
    .replace(/&#8217;|&rsquo;/g, "’")
    .replace(/&amp;/g, "&")
    .replace(/&#8211;|&ndash;/g, "-")
    .replace(/&quot;/g, "")
    .replace(/&eacute;/g, "é")
    .replace(/&egrave;/g, "è")
    .replace(/&agrave;/g, "à")
    .replace(/&#0*39;/g, "’");

const cle = (s) =>
  dec(s)
    .replace(/<[^>]+>/g, " ")
    .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}️‍]/gu, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .toLowerCase();

/** Titres de la page, dans l'ordre, hors navigation. */
function titres(html) {
  const debut = html.indexOf("elementor-location-header") + 1;
  const fin = html.indexOf("elementor-location-footer");
  const corps = html.slice(debut > 0 ? debut : 0, fin > 0 ? fin : html.length);

  return [...corps.matchAll(/<(h[123])[^>]*>([\s\S]*?)<\/\1>/gi)]
    .map((m) => cle(m[2]))
    .filter((t) => t.length > 2 && t.length < 90);
}

/** Nombre de visuels de contenu. */
const compterImages = (html) =>
  // Next.js sert les images via /_next/image?url=… : on compte les deux formes
  (html.match(/<img[^>]+src="[^"]*(?:\/(?:uploads|images)\/|_next\/image)/gi) ?? []).length;

console.log("=== STRUCTURE : TITRES DU SITE ABSENTS DE LA V2 ===\n");

let manquants = 0;
for (const [route, fichier] of PAGES) {
  let html;
  try {
    html = readFileSync(join(RACINE, "en-ligne", fichier), "utf8");
  } catch {
    continue;
  }

  const attendus = titres(html);
  const r = await fetch(LOCAL + route);
  const rendu = await r.text();
  const obtenus = new Set(titres(rendu));

  const absents = attendus.filter((t) => !obtenus.has(t));
  manquants += absents.length;

  const imgSite = compterImages(html);
  const imgV2 = compterImages(rendu);

  const etat = absents.length === 0 ? "OK  " : "  ! ";
  console.log(
    `${etat}${route.padEnd(42)} titres ${attendus.length - absents.length}/${attendus.length}   visuels site ${imgSite} / v2 ${imgV2}`,
  );
  absents.forEach((t) => console.log(`       – ${t.slice(0, 95)}`));
}

console.log(`\n${manquants} titre(s) absent(s)`);
