/**
 * Mesure le rendu reel d'une page : pour chaque section de premier niveau,
 * releve la couleur de fond, la largeur du contenu, et la taille/graisse/
 * couleur de chaque titre et paragraphe.
 *
 * Pilote le Chrome installe sur la machine (aucun telechargement de navigateur).
 *
 *   node scripts/mesurer-page.mjs https://www.hotelpalladia.com/restaurant/
 *   node scripts/mesurer-page.mjs http://localhost:3000/restaurant
 */
import { chromium } from "playwright-core";

const url = process.argv[2];
if (!url) {
  console.error("Usage : node scripts/mesurer-page.mjs <url>");
  process.exit(1);
}

const navigateur = await chromium.launch({ channel: "chrome" });
const page = await navigateur.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });

const releve = await page.evaluate(() => {
  const px = (v) => Math.round(parseFloat(v));
  const visible = (el) => {
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };

  /** Remonte jusqu'a trouver un fond non transparent. */
  const fond = (el) => {
    for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
      const c = getComputedStyle(n).backgroundColor;
      if (c && c !== "rgba(0, 0, 0, 0)" && c !== "transparent") return c;
    }
    return "rgb(255, 255, 255)";
  };

  const racine =
    document.querySelector("main .elementor > *")?.parentElement ??
    document.querySelector("main") ??
    document.body;

  const sections = [...racine.children].filter(visible);

  return sections.map((s, i) => {
    const rs = s.getBoundingClientRect();
    const st = getComputedStyle(s);

    const contenus = [...s.querySelectorAll("h1,h2,h3,h4,h5,h6,p,li,img")]
      .filter(visible)
      .slice(0, 40)
      .map((el) => {
        const c = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        if (el.tagName === "IMG")
          return {
            tag: "img",
            src: el.currentSrc.split("/").pop(),
            largeur: Math.round(r.width),
            hauteur: Math.round(r.height),
            ratio: (r.width / r.height).toFixed(2),
          };
        return {
          tag: el.tagName.toLowerCase(),
          texte: el.textContent.trim().replace(/\s+/g, " ").slice(0, 90),
          taille: px(c.fontSize),
          graisse: c.fontWeight,
          couleur: c.color,
          police: c.fontFamily.split(",")[0].replace(/"/g, ""),
          align: c.textAlign,
        };
      });

    // Largeur reellement occupee par le contenu (bornes des enfants visibles)
    const bornes = contenus.length
      ? [...s.querySelectorAll("h1,h2,h3,h4,h5,h6,p,li,img")].filter(visible).reduce(
          (a, el) => {
            const r = el.getBoundingClientRect();
            return [Math.min(a[0], r.left), Math.max(a[1], r.right)];
          },
          [Infinity, -Infinity],
        )
      : [0, 0];

    return {
      i,
      fond: fond(s),
      hauteur: Math.round(rs.height),
      padding: `${px(st.paddingTop)}/${px(st.paddingBottom)}`,
      contenu_de: Math.round(bornes[0]),
      contenu_a: Math.round(bornes[1]),
      contenu_largeur: Math.round(bornes[1] - bornes[0]),
      contenus,
    };
  });
});

await navigateur.close();

for (const s of releve) {
  console.log(
    `\n===== section ${s.i} | fond ${s.fond} | h ${s.hauteur}px | padding ${s.padding} | contenu ${s.contenu_largeur}px (${s.contenu_de}→${s.contenu_a})`,
  );
  for (const c of s.contenus) {
    if (c.tag === "img") console.log(`  [img ${c.largeur}x${c.hauteur} r=${c.ratio}] ${c.src}`);
    else
      console.log(
        `  <${c.tag}> ${c.taille}px ${c.graisse} ${c.police} ${c.couleur} ${c.align} — ${c.texte}`,
      );
  }
}
