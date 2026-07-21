/**
 * Extrait un article du site en ligne : en-tete, sections et visuels.
 *
 * Le rendu est mesure dans Chrome plutot que devine depuis le HTML : on
 * recupere donc la taille reelle de chaque titre et les proportions reelles
 * de chaque image, ainsi que le fond de la section qui les porte.
 *
 * Les visuels absents de public/images sont telecharges et compresses.
 *
 *   node scripts/extraire-article.mjs saint-valentin-toulouse
 *   node scripts/extraire-article.mjs --tous
 */
import { chromium } from "playwright-core";
import { readFileSync, existsSync } from "node:fs";
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ORIGINE = "https://www.hotelpalladia.com";
const IMAGES = fileURLToPath(new URL("../public/images/blog", import.meta.url));
const ROUTES = JSON.parse(
  readFileSync(new URL("./routes.json", import.meta.url), "utf8"),
);

const arg = process.argv[2]?.split(/[\\/]/).filter(Boolean).pop();
if (!arg) {
  console.error("Usage : node scripts/extraire-article.mjs <slug> | --tous");
  process.exit(1);
}

/** Un article est une route dont le chemin d'origine n'est pas une page fixe. */
const PAGES_FIXES = new Set(ROUTES.slice(0, 19).map((r) => r.v2));
const cibles =
  arg === "tous"
    ? ROUTES.filter((r) => !PAGES_FIXES.has(r.v2))
    : ROUTES.filter((r) => r.v2.endsWith("/" + arg));

if (!cibles.length) {
  console.error(`Aucune route ne correspond à « ${arg} »`);
  process.exit(1);
}

/** Telecharge un visuel absent du depot et le recompresse. */
async function recupererImage(url) {
  const nom = decodeURIComponent(url.split("/").pop().split("?")[0]);
  const cible = join(IMAGES, nom);
  if (existsSync(cible)) return { nom, etat: "déjà présent" };

  const reponse = await fetch(url);
  if (!reponse.ok) return { nom, etat: `échec ${reponse.status}` };

  const brut = Buffer.from(await reponse.arrayBuffer());
  await mkdir(dirname(cible), { recursive: true });

  // Recompression au meme format, qualite 80 : les originaux WordPress sont
  // souvent deux a trois fois plus lourds que necessaire.
  const image = sharp(brut);
  const { format } = await image.metadata();
  const compresse =
    format === "png"
      ? await image.png({ compressionLevel: 9 }).toBuffer()
      : format === "webp"
        ? await image.webp({ quality: 80 }).toBuffer()
        : await image.jpeg({ quality: 80, mozjpeg: true }).toBuffer();

  const retenu = compresse.length < brut.length ? compresse : brut;
  await writeFile(cible, retenu);
  return { nom, etat: `récupéré (${Math.round(retenu.length / 1024)} Ko)` };
}

const navigateur = await chromium.launch({ channel: "chrome" });
const page = await navigateur.newPage({ viewport: { width: 1920, height: 1080 } });

for (const route of cibles) {
  await page.goto(ORIGINE + route.origine, { waitUntil: "networkidle", timeout: 60_000 });
  // Deux passes lentes : le chargement differe ne se declenche qu'au moment
  // ou le visuel approche de la fenetre, et la page s'allonge en chargeant.
  await page.evaluate(async () => {
    for (let passe = 0; passe < 2; passe++) {
      for (let y = 0; y < document.body.scrollHeight; y += 400) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 150));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 300));
    }
  });
  await page.waitForTimeout(1500);

  const releve = await page.evaluate(() => {
    const visible = (el) => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    };
    const propre = (t) => t.replace(/\s+/g, " ").trim();

    const zone = document.querySelector("main") ?? document.body;
    for (const hors of zone.querySelectorAll("header,footer,nav")) hors.remove();

    const fond = (el) => {
      for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
        const c = getComputedStyle(n).backgroundColor;
        if (c && c !== "rgba(0, 0, 0, 0)") return c;
      }
      return "rgb(255, 255, 255)";
    };

    // Elementor pose la moitie de ses visuels en image de fond CSS : sans les
    // relever, on ne recupere qu'une fraction des photos de l'article.
    const fondsImages = [...zone.querySelectorAll("*")].filter(visible).filter((el) => {
      const u = getComputedStyle(el).backgroundImage;
      return u && u !== "none" && /url\((["']?)https?:/.test(u);
    });

    const elements = [...zone.querySelectorAll("h1,h2,h3,h4,h5,h6,p,li,img"), ...fondsImages]
      .filter(visible)
      .map((el) => {
        const r = el.getBoundingClientRect();

        if (fondsImages.includes(el) && el.tagName !== "IMG") {
          const u = /url\(["']?([^"')]+)/.exec(getComputedStyle(el).backgroundImage);
          return {
            type: "image",
            url: u[1],
            ratio: +(r.width / r.height).toFixed(2),
            largeur: Math.round(r.width),
            fond: "image de fond",
          };
        }

        if (el.tagName === "IMG")
          return {
            type: "image",
            url: el.currentSrc,
            ratio: +(r.width / r.height).toFixed(2),
            largeur: Math.round(r.width),
            fond: fond(el),
          };
        const c = getComputedStyle(el);
        return {
          type: el.tagName.toLowerCase(),
          texte: propre(el.textContent),
          taille: Math.round(parseFloat(c.fontSize)),
          graisse: c.fontWeight,
          align: c.textAlign,
          fond: fond(el),
          gras: [...el.querySelectorAll("strong,b")].map((s) => propre(s.textContent)),
          liens: [...el.querySelectorAll("a[href]")].map((a) => ({
            texte: propre(a.textContent),
            href: a.getAttribute("href"),
          })),
        };
      })
      .filter((e) => e.type === "image" || e.texte.length > 0);

    return {
      seo: {
        titre: document.title,
        description: document.querySelector('meta[name="description"]')?.content ?? null,
      },
      elements,
    };
  });

  console.log(`\n${"=".repeat(70)}\n${route.v2}\n${"=".repeat(70)}`);
  console.log(`<title> ${releve.seo.titre}`);
  console.log(`<desc>  ${releve.seo.description}\n`);

  for (const e of releve.elements) {
    if (e.type === "image") {
      const { nom, etat } = await recupererImage(e.url);
      console.log(`  [IMG ratio ${e.ratio} larg ${e.largeur} fond ${e.fond}] ${nom} — ${etat}`);
    } else {
      const gras = e.gras.length ? `  gras:${JSON.stringify(e.gras)}` : "";
      const liens = e.liens.length ? `  liens:${JSON.stringify(e.liens)}` : "";
      console.log(
        `  <${e.type}> ${e.taille}px ${e.graisse} ${e.align} fond ${e.fond} — ${e.texte}${gras}${liens}`,
      );
    }
  }
}

await navigateur.close();
