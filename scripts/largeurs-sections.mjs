/**
 * Compare, section par section, la largeur du contenu entre le site et la v2.
 *
 * Le site ne compose pas tout dans son gabarit de 1140 px : plusieurs articles
 * s'etendent presque bord a bord. Ce releve dit lesquels, et a quel rang.
 *
 *   node scripts/largeurs-sections.mjs            # toutes les routes
 *   node scripts/largeurs-sections.mjs adelya     # une seule
 */
import { chromium } from "playwright-core";
import { readFileSync } from "node:fs";

const ORIGINE = "https://www.hotelpalladia.com";
const LOCAL = process.env.LOCAL ?? "http://localhost:3000";
const ROUTES = JSON.parse(readFileSync(new URL("./routes.json", import.meta.url), "utf8"));

const filtre = process.argv[2]?.split(/[\\/]/).filter(Boolean).pop();
const aTraiter = filtre ? ROUTES.filter((r) => r.v2.endsWith("/" + filtre)) : ROUTES;

/** Largeur reellement occupee par le contenu de chaque section. */
async function largeurs(page, url) {
  await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(600);

  return page.evaluate(() => {
    const zone = document.querySelector("main") ?? document.body;
    for (const hors of zone.querySelectorAll(
      "footer,.elementor-location-footer,.elementor-location-header,#masthead",
    ))
      hors.remove();

    const visible = (el) => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    };

    const norm = (t) =>
      t
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/[’‘]/g, "'")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();

    /**
     * Largeur de la rangee qui porte chaque paragraphe : on remonte au parent
     * qui occupe plus de la moitie de l'ecran. C'est lui qui traduit le
     * gabarit choisi, independamment du decoupage HTML.
     */
    return [...zone.querySelectorAll("p")]
      .filter(visible)
      .filter((el) => el.textContent.trim().length > 60)
      .map((el) => {
        let rangee = el;
        for (let n = el; n && n !== zone; n = n.parentElement) {
          if (n.getBoundingClientRect().width > window.innerWidth * 0.55) {
            rangee = n;
            break;
          }
          rangee = n;
        }
        return {
          largeur: Math.round(rangee.getBoundingClientRect().width),
          texte: norm(el.textContent).slice(0, 60),
        };
      });
  });
}

const navigateur = await chromium.launch({ channel: "chrome" });
const page = await navigateur.newPage({ viewport: { width: 1920, height: 1080 } });

for (const route of aTraiter) {
  let site, v2;
  try {
    site = await largeurs(page, ORIGINE + route.origine);
    v2 = await largeurs(page, LOCAL + route.v2);
  } catch {
    continue;
  }

  // Seuls les ecarts francs interessent : au-dela de 200 px, ce n'est plus un
  // arrondi de mise en page mais un gabarit different.
  const larges = site.filter((s) => s.largeur > 1250);
  if (!larges.length) continue;

  const maxV2 = Math.max(0, ...v2.map((s) => s.largeur));
  if (maxV2 > 1250) continue;

  console.log(`\n### ${route.v2}`);
  for (const s of larges) console.log(`  ${s.largeur}px — ${s.texte}`);
}

await navigateur.close();
