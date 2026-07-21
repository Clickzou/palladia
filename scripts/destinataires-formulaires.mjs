/**
 * Retrouve les destinataires des formulaires WPForms dans l'archive .wpress.
 *
 * Les adresses ne sont pas visibles cote navigateur : elles vivent dans la
 * configuration du formulaire, stockee en base WordPress. On parcourt donc
 * database.sql en flux — 134 Mo, jamais charges en entier — a la recherche
 * des blocs de notification.
 *
 *   node scripts/destinataires-formulaires.mjs <archive.wpress>
 */
import { createReadStream } from "node:fs";

const archive = process.argv[2];
if (!archive) {
  console.error("Usage : node scripts/destinataires-formulaires.mjs <archive.wpress>");
  process.exit(1);
}

/**
 * Les formulaires sont serialises en JSON echappe dans le dump SQL. On glisse
 * une fenetre sur le flux pour ne pas couper un bloc a la frontiere de deux
 * morceaux.
 */
// Les formulaires sont ceux d'Elementor Pro : le destinataire vit dans le
// reglage `email_to` de l'action « Email », et le nom du formulaire dans
// `form_name`. Cibler ces cles evite d'attraper les adresses des auteurs de
// plugins, qui pullulent dans les composer.json de l'archive.
const NOTIF = new RegExp(
  String.raw`\\?"(?:email_to|email_to_2|email_cc|email_bcc)\\?":\s*\\?"([^"\\]{4,200})`,
  "g",
);
const TITRE = new RegExp(
  String.raw`\\?"(?:form_name|form_title)\\?":\s*\\?"([^"\\]{2,80})`,
  "g",
);

const adresses = new Map();
let titreCourant = null;
let reste = "";
let vus = 0;

await new Promise((resolve, reject) => {
  createReadStream(archive)
    .on("data", (bloc) => {
      const texte = reste + bloc.toString("latin1");
      vus += bloc.length;

      for (const m of texte.matchAll(TITRE)) titreCourant = m[1];

      for (const m of texte.matchAll(NOTIF)) {
        const valeur = m[1].replace(/\\+/g, "");
        // On ne garde que ce qui ressemble a une adresse ou a un jeton WPForms
        if (!/@|\{field_id=/.test(valeur)) continue;
        const cle = `${titreCourant ?? "(formulaire inconnu)"} → ${valeur}`;
        adresses.set(cle, (adresses.get(cle) ?? 0) + 1);
      }

      // On conserve la fin du bloc, au cas ou un motif soit a cheval
      reste = texte.slice(-4000);
    })
    .on("end", resolve)
    .on("error", reject);
});

console.log(`${Math.round(vus / 1024 / 1024)} Mo parcourus\n`);

if (!adresses.size) {
  console.log("Aucun destinataire trouve : le format de stockage a peut-etre change.");
} else {
  for (const [ligne, n] of [...adresses].sort()) console.log(`  ${ligne}${n > 1 ? `  (×${n})` : ""}`);
}
