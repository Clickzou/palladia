/**
 * Verifie que la mesure d'audience respecte le consentement.
 *
 * Trois points, dans l'ordre ou un visiteur les rencontre : rien ne part vers
 * Google avant l'accord, la vue de page est bien transmise apres, et le
 * retrait du consentement coupe la mesure et efface les cookies.
 *
 *   node scripts/verifier-analytics.mjs
 */
import { chromium } from "playwright-core";

const BASE = process.argv[2] ?? "http://localhost:3000";
const GOOGLE = /googletagmanager\.com|google-analytics\.com|analytics\.google\.com/;

const navigateur = await chromium.launch({ channel: "chrome" });
const page = await navigateur.newPage({ viewport: { width: 1280, height: 900 } });

const appels = [];
page.on("request", (r) => {
  if (GOOGLE.test(r.url())) appels.push(r.url());
});

const cookiesGa = async () =>
  (await page.context().cookies()).filter((c) => c.name.startsWith("_ga")).map((c) => c.name);

/* 1. Avant tout choix */
await page.goto(BASE, { waitUntil: "networkidle" });
await page.waitForTimeout(2000);
console.log(`avant le choix        : ${appels.length} appel(s) vers Google — ${(await cookiesGa()).length} cookie(s) _ga`);

/* 2. Refus explicite */
await page.getByRole("button", { name: "Tout refuser" }).click();
await page.waitForTimeout(2000);
console.log(`apres un refus        : ${appels.length} appel(s) vers Google — ${(await cookiesGa()).length} cookie(s) _ga`);

/* 3. Acceptation */
appels.length = 0;
await page.getByRole("button", { name: /Gérer mes cookies/ }).click();
await page.getByRole("button", { name: "Tout accepter" }).click();
await page.waitForTimeout(3000);
const collecte = appels.filter((u) => /\/g\/collect|\/collect/.test(u));
console.log(`apres acceptation     : ${appels.length} appel(s) vers Google, dont ${collecte.length} envoi(s) de mesure`);
console.log(`                        cookies : ${(await cookiesGa()).join(", ") || "aucun"}`);

/* 4. Navigation interne : une vue de page par changement d'URL */
appels.length = 0;
await page.goto(`${BASE}/restaurant`, { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
const vues = appels.filter((u) => /en=page_view|\bt=pageview/.test(u) || /\/g\/collect/.test(u));
console.log(`apres navigation      : ${vues.length} envoi(s) de vue de page`);

/* 5. Retrait du consentement */
await page.getByRole("button", { name: /Gérer mes cookies/ }).click();
await page.getByRole("button", { name: "Tout refuser" }).click();
await page.waitForTimeout(1500);
console.log(`apres retrait         : ${(await cookiesGa()).length} cookie(s) _ga restant(s)`);

await navigateur.close();
