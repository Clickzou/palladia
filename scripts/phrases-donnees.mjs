/**
 * Liste les phrases des fichiers de src/data qui n'ont pas encore de traduction.
 *
 * Remplace le releve par expression reguliere : celui-ci appariait mal les
 * guillemets et laissait passer des paragraphes entiers — les mentions legales
 * et la politique de confidentialite sont restees en français sans que rien ne
 * le signale. On importe ici les modules pour de vrai (Node sait lire le
 * TypeScript depuis la v22) et on parcourt les valeurs.
 *
 *   node scripts/phrases-donnees.mjs en
 */
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { join, resolve } from "node:path";
import { registerHooks } from "node:module";

/** L'alias `@/` de tsconfig, que Node ne connait pas. */
registerHooks({
  resolve(specifier, contexte, suivant) {
    if (specifier.startsWith("@/")) {
      // L'alias omet l'extension, que Node exige : on essaie celles du projet.
      const base = resolve("src", specifier.slice(2));
      for (const suffixe of [".ts", ".tsx", "/index.ts", ".json", ""]) {
        if (existsSync(base + suffixe)) {
          return {
            url: pathToFileURL(base + suffixe).href,
            importAttributes: (base + suffixe).endsWith(".json")
              ? { type: "json" }
              : contexte.importAttributes,
            shortCircuit: true,
          };
        }
      }
    }
    // Les dictionnaires sont importes par chemin relatif depuis src/i18n.
    if (specifier.endsWith(".json")) {
      const cible = suivant(specifier, contexte);
      return { ...cible, importAttributes: { type: "json" }, shortCircuit: true };
    }
    return suivant(specifier, contexte);
  },
});

const langue = process.argv[2] ?? "en";
const sortie = process.argv[3];
const dico = JSON.parse(readFileSync(`messages/contenu.${langue}.json`, "utf8"));

/** Champs qui pilotent le rendu : leur valeur n'est pas du texte. */
const TECHNIQUES = new Set([
  "position",
  "place",
  "taille_titre",
  "ratio",
  "icone",
  "type",
  "variante",
  "slug",
  "locale",
  "statut",
  "href",
  "image",
  "src",
]);

const phrases = new Map(); // texte -> fichiers d'origine

const collecter = (v, cle, fichier) => {
  if (TECHNIQUES.has(cle)) return;
  if (typeof v === "string") {
    const t = v.trim();
    if (!t) return;
    if (/^(https?:|mailto:|tel:|\/|#)/.test(t)) return;
    if (/\.(jpe?g|png|webp|avif|pdf|svg|mp4)$/i.test(t)) return;
    if (!/[a-zàâçéèêëîïôûùüÿñæœ]/i.test(t)) return;
    if (dico[t] !== undefined) return;
    (phrases.get(t) ?? phrases.set(t, new Set()).get(t)).add(fichier);
    return;
  }
  if (Array.isArray(v)) return v.forEach((x) => collecter(x, cle, fichier));
  if (v && typeof v === "object") {
    return Object.entries(v).forEach(([k, x]) => collecter(x, k, fichier));
  }
};

for (const f of readdirSync("src/data").filter((f) => f.endsWith(".ts"))) {
  const mod = await import(pathToFileURL(resolve(join("src/data", f))).href);
  for (const [nom, valeur] of Object.entries(mod)) {
    if (typeof valeur === "function") continue; // metadonnees(), getRoom()...
    collecter(valeur, nom, f);
  }
}

console.error(`${phrases.size} phrases sans traduction en ${langue}`);
const objet = Object.fromEntries([...phrases].map(([t, f]) => [t, [...f].join(", ")]));
if (sortie) writeFileSync(sortie, JSON.stringify(objet, null, 2));
else console.log(JSON.stringify(objet, null, 2));
