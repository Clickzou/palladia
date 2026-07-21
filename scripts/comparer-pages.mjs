#!/usr/bin/env node
/**
 * Compare chaque page de la v2 avec sa version en ligne et signale les
 * contenus reellement absents.
 *
 * Deux precautions pour eviter les faux positifs :
 *  - la comparaison se fait par inclusion dans le texte complet de la page,
 *    car le site coupe souvent une meme phrase en plusieurs balises ;
 *  - les textes du bandeau cookies (Complianz) sont ignores : ce composant
 *    n'existe pas encore dans la v2, il fera l'objet d'un lot a part.
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
  ["/mentions-legales", "mentions-legales.html"],
  ["/politique-de-confidentialite", "politique-de-confidentialite.html"],
  ["/politique-de-cookies-ue", "politique-de-cookies-ue.html"],
];

/** Textes du bandeau de consentement, hors perimetre de la comparaison. */
const COOKIES =
  /Pour offrir les meilleures expériences|technologies telles que les cookies|stockage technique|finalité d’intérêt légitime|profils d’internautes|préférences qui ne sont pas demandées|fins statistiques|Gérer le consentement|Voir les préférences|politique de cookies|Fonctionnel\b|Statistiques\b|Marketing\b/i;

const nettoyer = (s) =>
  s
    .replace(/\s+/g, " ")
    .replace(/[’'`]/g, "’")
    .replace(/[«»"“”]/g, "")
    .replace(/[–—]/g, "-")
    .replace(/ /g, " ")
    .trim()
    .toLowerCase();

function segments(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, "\n")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8217;|&rsquo;/g, "’")
    .replace(/&amp;/g, "&")
    .replace(/&#8211;|&ndash;/g, "-")
    .replace(/&#0*39;|&apos;/g, "’")
    .replace(/&quot;/g, "")
    .replace(/&eacute;/g, "é")
    .replace(/&egrave;/g, "è")
    .replace(/&agrave;/g, "à")
    .replace(/&ccedil;/g, "ç")
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s.length > 45 && !COOKIES.test(s));
}

const rapport = [];

for (const [route, fichier] of PAGES) {
  let enLigne;
  try {
    enLigne = segments(readFileSync(join(RACINE, "en-ligne", fichier), "utf8"));
  } catch {
    rapport.push({ route, etat: "absente du site" });
    continue;
  }

  let texteV2;
  try {
    const r = await fetch(LOCAL + route);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    // Texte complet en un seul bloc : la recherche par inclusion tolere
    // les decoupages de balises differents.
    texteV2 = nettoyer(segments(await r.text()).join(" "));
  } catch (e) {
    rapport.push({ route, etat: `v2 injoignable (${e.message})` });
    continue;
  }

  const absents = enLigne.filter((p) => {
    const n = nettoyer(p);
    if (texteV2.includes(n)) return false;
    // Tolerance : un extrait significatif suffit a considerer le texte present
    const extrait = n.slice(0, 60);
    return !texteV2.includes(extrait);
  });

  rapport.push({ route, total: enLigne.length, absents });
}

console.log("=== CONTENUS DU SITE ABSENTS DE LA V2 ===");
console.log("(bandeau cookies exclu)\n");

let totalAbsents = 0;
for (const r of rapport) {
  if (r.etat) {
    console.log(`${r.route}  —  ${r.etat}\n`);
    continue;
  }
  totalAbsents += r.absents.length;
  const taux = r.total ? Math.round(((r.total - r.absents.length) / r.total) * 100) : 100;
  const symbole = r.absents.length === 0 ? "OK  " : "  ! ";
  console.log(`${symbole}${route(r)}  ${taux}%  (${r.absents.length}/${r.total} absents)`);
  r.absents.slice(0, 8).forEach((p) => console.log(`       – ${p.slice(0, 120)}`));
  if (r.absents.length > 8) console.log(`       … +${r.absents.length - 8} autres`);
}

function route(r) {
  return r.route.padEnd(42);
}

console.log(`\nTOTAL : ${totalAbsents} contenus absents`);
