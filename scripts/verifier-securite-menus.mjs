/**
 * Verifie ce qu'un visiteur anonyme peut faire des menus : lire ce qui est en
 * ligne, rien d'autre. Ni les brouillons, ni la carte programmee, ni la
 * moindre ecriture.
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
  await (
    await fetch(`${url}/rest/v1/menus_versions?select=id,cle,fr,publie_le`, { headers: entetes })
  ).json();

let defauts = 0;

const avant = await lire();
if (!Array.isArray(avant) || !avant.length) {
  console.error("✗ Les menus sont illisibles anonymement — la page publique ne s’affichera pas.");
  process.exit(1);
}
console.log(`✓ lecture anonyme : ${avant.length} version(s) visible(s)`);

/* Aucune version non encore effective ne doit filtrer : ni brouillon, ni
   carte programmee pour la semaine prochaine. */
const maintenant = Date.now();
const fuite = avant.filter((v) => !v.publie_le || Date.parse(v.publie_le) > maintenant);
if (fuite.length) {
  defauts++;
  console.error(`✗ ${fuite.length} version(s) non publiee(s) visible(s) du public`);
} else {
  console.log("✓ brouillons et versions programmees invisibles");
}

/* Tentative d'ecriture sur une version en ligne. */
const TEMOIN = "TENTATIVE NON AUTORISEE";
const cible = avant[0];
await fetch(`${url}/rest/v1/menus_versions?id=eq.${cible.id}`, {
  method: "PATCH",
  headers: { ...entetes, Prefer: "return=minimal" },
  body: JSON.stringify({ fr: { titre: TEMOIN } }),
}).catch(() => {});

const apres = await lire();
if (apres.find((v) => v.id === cible.id)?.fr?.titre === TEMOIN) {
  defauts++;
  console.error("✗ FAILLE : un visiteur anonyme a modifie un menu en ligne.");
} else {
  console.log("✓ ecriture anonyme sans effet");
}

/* Insertion : aucune politique ne l'autorise a l'anonyme. */
const insertion = await fetch(`${url}/rest/v1/menus_versions`, {
  method: "POST",
  headers: entetes,
  body: JSON.stringify({ cle: "semaine", fr: { titre: TEMOIN }, publie_le: new Date().toISOString() }),
});
if (insertion.status < 400) {
  defauts++;
  console.error(`✗ insertion anonyme acceptee (${insertion.status})`);
} else {
  console.log("✓ insertion anonyme refusee");
}

process.exit(defauts ? 1 : 0);
