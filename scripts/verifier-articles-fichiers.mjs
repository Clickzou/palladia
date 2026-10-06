#!/usr/bin/env node
/**
 * Contrôle des articles fichiers (contenu/articles/*.json), lancé avant chaque
 * build (`prebuild` de package.json, donc aussi sur Vercel).
 *
 * Une ERREUR fait échouer le build : rien n'est déployé et la version en ligne
 * reste en place. Une ALERTE (année ou prix écrits, correction du client à
 * reporter et retraduire) s'affiche sans bloquer.
 *
 * Usage : node scripts/verifier-articles-fichiers.mjs
 * Mêmes règles que le site : src/lib/articles-fichiers/valider.mjs.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { validerArticle } from "../src/lib/articles-fichiers/valider.mjs";

const racine = process.cwd();
const dossier = path.join(racine, "contenu", "articles");
const noms = existsSync(dossier) ? readdirSync(dossier).filter((n) => n.endsWith(".json")) : [];

// Routes fixes : les dossiers de src/app/[locale] (hors segments dynamiques).
const dossierApp = path.join(racine, "src", "app", "[locale]");
const routesReservees = readdirSync(dossierApp)
  .filter((n) => !n.startsWith("[") && statSync(path.join(dossierApp, n)).isDirectory())
  .map((n) => `/${n}`)
  .concat(["/", "/api", "/blog"]);

const imageExiste = (chemin) => existsSync(path.join(racine, "public", chemin.split(/[?#]/)[0]));

let corrections = {};
try {
  corrections = JSON.parse(readFileSync(path.join(racine, "contenu", "corrections-client.json"), "utf8"));
} catch (e) {
  if (existsSync(path.join(racine, "contenu", "corrections-client.json"))) {
    console.error(`✗ contenu/corrections-client.json illisible : ${e.message}`);
    process.exit(1);
  }
}

let erreursTotal = 0;
const slugs = new Set();
for (const nom of noms) {
  let article;
  try {
    article = JSON.parse(readFileSync(path.join(dossier, nom), "utf8"));
  } catch (e) {
    console.error(`✗ ${nom} : JSON invalide (${e.message})`);
    erreursTotal++;
    continue;
  }
  const { erreurs, alertes } = validerArticle(article, { nomFichier: nom, routesReservees, imageExiste });
  if (slugs.has(article.slug)) erreurs.push("slug en double");
  slugs.add(article.slug);
  if (corrections[article.slug]?.champs && Object.keys(corrections[article.slug].champs).length) {
    alertes.push("corrections du client en attente : les reporter dans le fichier (fr), retraduire en et es, puis retirer l'entrée de contenu/corrections-client.json");
  }
  const etat = article.brouillon ? "brouillon" : article.datePublication;
  if (erreurs.length) {
    erreursTotal += erreurs.length;
    console.error(`✗ ${nom} (${etat})`);
    for (const e of erreurs) console.error(`    erreur : ${e}`);
  } else {
    console.log(`✓ ${nom} (${etat})`);
  }
  for (const a of alertes) console.warn(`    alerte : ${a}`);
}

for (const slug of Object.keys(corrections)) {
  if (!slugs.has(slug)) console.warn(`  alerte : corrections-client.json vise « ${slug} », qui n'est pas un article fichier`);
}

console.log(`Articles fichiers : ${noms.length} fichier(s), ${erreursTotal} erreur(s).`);
if (erreursTotal) process.exit(1);
