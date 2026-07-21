/**
 * Compare le rendu reel du site d'origine et celui de la v2, page par page.
 *
 * Contrairement a comparer-pages.mjs (qui ne compare que le texte), ce script
 * ouvre les deux pages dans Chrome et confronte ce que l'oeil voit :
 * textes, niveaux de titre, tailles de police, couleurs de fond de section,
 * largeur du contenu et proportions des visuels.
 *
 *   node scripts/comparer-rendu.mjs                 # toutes les routes
 *   node scripts/comparer-rendu.mjs /restaurant     # une seule
 */
import { chromium } from "playwright-core";
import { readFileSync } from "node:fs";

const ORIGINE = "https://www.hotelpalladia.com";
const LOCAL = process.env.LOCAL ?? "http://localhost:3000";

/** Routes v2 → chemin correspondant sur le site d'origine. */
const ROUTES = JSON.parse(readFileSync(new URL("./routes.json", import.meta.url), "utf8"));

/** Ecarts assumes, comptes a part pour ne pas masquer les vrais defauts. */
const ACCEPTES = JSON.parse(
  readFileSync(new URL("./ecarts-acceptes.json", import.meta.url), "utf8"),
);

// Git Bash reecrit les arguments commençant par « / » en chemin Windows :
// on ne retient que le dernier segment pour retrouver la route.
const filtre = process.argv[2]?.split(/[\\/]/).filter(Boolean).pop();
const aTraiter = filtre ? ROUTES.filter((r) => r.v2.endsWith("/" + filtre)) : ROUTES;

/** Releve homogene d'une page, exploitable des deux cotes. */
async function mesurer(page, url) {
  await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });

  // Deroule la page pour declencher le chargement differe des visuels, sans
  // quoi la moitie d'entre eux restent des placeholders.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(800);

  return page.evaluate(() => {
    const visible = (el) => {
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      return r.width > 0 && r.height > 0 && s.visibility !== "hidden";
    };
    // Normalisation large : le site melange apostrophes droites et courbes,
    // tirets courts et longs, capitales accentuees ou non. Ces variantes ne
    // sont pas des ecarts de contenu.
    const norm = (t) =>
      t
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/[’‘]/g, "'")
        .replace(/[“”]/g, '"')
        .replace(/[–—]/g, "-")
        .replace(/^[•·▪]\s*/, "")
        .replace(/[​-‍﻿]/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();

    // Le site d'origine n'englobe pas toujours son contenu dans <main> : on
    // ecarte explicitement en-tete et pied de page, hors du perimetre compare.
    // Seuls la navigation et le pied de page sortent du perimetre : les
    // <header> internes portent les en-tetes de page, qui eux comptent.
    const zone = document.querySelector("main") ?? document.body;
    for (const hors of zone.querySelectorAll(
      "footer,.elementor-location-footer,.elementor-location-header,#masthead",
    ))
      hors.remove();

    /** Texte percu : les elements purement decoratifs ne comptent pas. */
    const texteUtile = (el) => {
      const copie = el.cloneNode(true);
      for (const deco of copie.querySelectorAll('[aria-hidden="true"]')) deco.remove();
      return norm(copie.textContent);
    };

    const titres = [...zone.querySelectorAll("h1,h2,h3,h4,h5,h6")]
      .filter(visible)
      .map((el) => ({
        niveau: el.tagName.toLowerCase(),
        texte: texteUtile(el),
        taille: Math.round(parseFloat(getComputedStyle(el).fontSize)),
      }));

    // Le fil d'Ariane n'est pas du contenu : il est balise differemment de
    // chaque cote et ne doit pas ressortir comme un ecart.
    const textes = [...zone.querySelectorAll("p,li")]
      .filter(visible)
      .filter((el) => !el.closest("nav") && !/^accueil »/.test(norm(el.textContent)))
      .map((el) => norm(el.textContent))
      .filter((t) => t.length > 25);

    // Les visuels encore en attente de chargement portent un placeholder SVG
    // en data-URI : leurs proportions ne veulent rien dire.
    const images = [...zone.querySelectorAll("img")]
      .filter(visible)
      .filter((el) => !/^data:/.test(el.currentSrc))
      .map((el) => {
        const r = el.getBoundingClientRect();
        return {
          fichier: decodeURIComponent(el.currentSrc.split("/").pop() ?? "").split("?")[0],
          ratio: +(r.width / r.height).toFixed(2),
        };
      });

    /**
     * Suite des fonds de section, en ne retenant que les aplats opaques :
     * les voiles semi-transparents poses sur les visuels ne sont pas des
     * fonds de section et bruitent la comparaison.
     */
    const fonds = [];
    for (const el of zone.querySelectorAll("section,div")) {
      const r = el.getBoundingClientRect();
      if (r.width < 800 || r.height < 60) continue;
      const c = getComputedStyle(el).backgroundColor;
      const rgb = /^rgba?\((\d+), (\d+), (\d+)(?:, ([\d.]+))?\)$/.exec(c);
      if (!rgb || (rgb[4] !== undefined && +rgb[4] < 1)) continue;
      const aplat = `${rgb[1]},${rgb[2]},${rgb[3]}`;
      if (fonds.at(-1) !== aplat) fonds.push(aplat);
    }

    return { titres, textes, images, fonds };
  });
}

const navigateur = await chromium.launch({ channel: "chrome" });
const page = await navigateur.newPage({ viewport: { width: 1920, height: 1080 } });

let totalEcarts = 0;
let totalAcceptes = 0;

for (const route of aTraiter) {
  let site, v2;
  try {
    site = await mesurer(page, ORIGINE + route.origine);
    v2 = await mesurer(page, LOCAL + route.v2);
  } catch (e) {
    console.log(`\n### ${route.v2} — page inaccessible : ${e.message.split("\n")[0]}`);
    continue;
  }

  const ecarts = [];
  const acceptes = [];

  /** Range l'ecart dans la bonne pile selon les regles documentees. */
  const noter = (message, categorie, texte) => {
    const regles = ACCEPTES[categorie] ?? [];
    const regle = regles.find(
      (r) =>
        new RegExp(r.motif, `i${r.flags ?? ""}`).test(texte) &&
        (!r.pages || r.pages.includes(route.v2)),
    );
    (regle ? acceptes : ecarts).push(message);
  };

  // Textes presents sur le site et absents de la v2. On compare sans les
  // espaces : le site colle des lignes separees par <br>, la v2 les aere.
  const sansEspace = (t) => t.replace(/\s/g, "");
  const corpusV2 = v2.textes.map(sansEspace).join("|");
  for (const t of site.textes) {
    if (!corpusV2.includes(sansEspace(t).slice(0, 50)))
      noter(`texte absent : « ${t.slice(0, 80)} »`, "textes_absents", t);
  }

  // Titres : presence et taille. Un meme libelle peut apparaitre deux fois
  // sur une page (titre d'en-tete puis titre de section) : on consomme les
  // correspondances au fur et a mesure plutot que de les indexer par texte.
  const restants = [...v2.titres];
  for (const t of site.titres) {
    const i = restants.findIndex((r) => r.texte === t.texte);
    if (i === -1) {
      noter(
        `titre absent (${t.niveau}, ${t.taille}px) : « ${t.texte.slice(0, 70)} »`,
        "titres_absents",
        t.texte,
      );
      continue;
    }
    const [eq] = restants.splice(i, 1);
    if (Math.abs(eq.taille - t.taille) > 3)
      ecarts.push(`taille titre « ${t.texte.slice(0, 50)} » : site ${t.taille}px / v2 ${eq.taille}px`);
  }

  // Visuels : seules les proportions sont fiables. Le decompte depend du
  // chargement differe, et l'ordre varie ; on apparie par nom de fichier.
  if (!ACCEPTES.ignorer_images?.actif) {
    const parNom = new Map(v2.images.map((i) => [i.fichier, i]));
    for (const img of site.images) {
      const e = parNom.get(img.fichier);
      if (e && Math.abs(e.ratio - img.ratio) > 0.15)
        ecarts.push(`proportions ${img.fichier} : site ${img.ratio} / v2 ${e.ratio}`);
    }
  }

  if (!ACCEPTES.ignorer_fonds?.actif) {
    const suite = (l) => l.join(" › ");
    if (suite(site.fonds) !== suite(v2.fonds))
      ecarts.push(`fonds\n      site : ${suite(site.fonds)}\n      v2   : ${suite(v2.fonds)}`);
  }

  totalEcarts += ecarts.length;
  totalAcceptes += acceptes.length;
  const suffixe = acceptes.length ? ` (+ ${acceptes.length} assumé(s))` : "";
  console.log(`\n### ${route.v2}  —  ${ecarts.length} écart(s)${suffixe}`);
  ecarts.slice(0, 25).forEach((e) => console.log("  • " + e));
  if (ecarts.length > 25) console.log(`  … ${ecarts.length - 25} de plus`);
}

await navigateur.close();
console.log(
  `\n=== ${totalEcarts} écart(s) à traiter, ${totalAcceptes} assumé(s), sur ${aTraiter.length} page(s) ===`,
);
