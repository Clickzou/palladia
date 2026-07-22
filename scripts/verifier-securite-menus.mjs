/**
 * Verifie qu'un visiteur anonyme peut lire les menus mais pas les modifier.
 *
 * Le controle porte sur la donnee, jamais sur le code de retour : quand une
 * politique RLS ecarte une ligne, la mise a jour ne correspond a rien et
 * PostgREST repond 204 — un « rien fait » qui ressemble a un « fait ». S'y
 * fier ferait passer une faille pour un succes, ou l'inverse.
 *
 *   node scripts/verifier-securite-menus.mjs
 */
import { readFileSync } from "node:fs";

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split(/\r?\n/)
    .filter((l) => l.includes("=") && !l.trimStart().startsWith("#"))
    .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()]),
);

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const cle = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const entetes = { apikey: cle, Authorization: `Bearer ${cle}`, "Content-Type": "application/json" };

const lire = async () =>
  (await (await fetch(`${url}/rest/v1/menus?select=cle,fr`, { headers: entetes })).json());

const avant = await lire();
if (!Array.isArray(avant) || !avant.length) {
  console.error("Les menus sont illisibles anonymement — la page publique ne s’affichera pas.");
  process.exit(1);
}
console.log(`✓ lecture anonyme : ${avant.length} menus visibles`);

/* Tentative d'ecriture, avec une valeur qu'on saurait reconnaitre. */
const TEMOIN = "TENTATIVE NON AUTORISEE";
await fetch(`${url}/rest/v1/menus?cle=eq.jour`, {
  method: "PATCH",
  headers: { ...entetes, Prefer: "return=minimal" },
  body: JSON.stringify({ fr: { titre: TEMOIN } }),
}).catch(() => {});

const apres = await lire();
const touche = apres.find((l) => l.cle === "jour")?.fr?.titre === TEMOIN;

if (touche) {
  console.error(
    "\n✗ FAILLE : un visiteur anonyme a modifie les menus.\n" +
      "  Verifiez la politique d’update sur public.menus (elle doit viser `authenticated`)\n" +
      "  et que les inscriptions publiques sont fermees dans Supabase.",
  );
  process.exit(1);
}

console.log("✓ ecriture anonyme sans effet : les menus sont proteges");

/* Tentative d'insertion : aucune politique ne l'autorise, meme authentifie. */
const insertion = await fetch(`${url}/rest/v1/menus`, {
  method: "POST",
  headers: entetes,
  body: JSON.stringify({ cle: "semaine", fr: { titre: TEMOIN } }),
});
console.log(
  insertion.status >= 400
    ? "✓ insertion anonyme refusee"
    : `✗ insertion anonyme acceptee (${insertion.status}) — a corriger`,
);
