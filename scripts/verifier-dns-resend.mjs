/**
 * Controle les quatre enregistrements DNS attendus par Resend pour que
 * hotelpalladia.com puisse envoyer du courriel.
 *
 * Interroge un resolveur public plutot que celui du poste : on voit ce que
 * voit Resend, pas un cache local. Utile aussi apres coup, le jour ou un
 * enregistrement disparait d'une zone remaniee.
 *
 *   node scripts/verifier-dns-resend.mjs
 */
const DOMAINE = process.argv[2] ?? "hotelpalladia.com";

const ATTENDUS = [
  {
    nom: `resend._domainkey.${DOMAINE}`,
    type: "TXT",
    intitule: "DKIM — signature des messages",
    verifie: (v) => v.startsWith("p=") && v.length > 200,
    attendu: "une cle publique commençant par p=",
  },
  {
    nom: `send.${DOMAINE}`,
    type: "MX",
    intitule: "MX — retours d’erreur",
    verifie: (v) => /feedback-smtp\..*\.amazonses\.com/.test(v),
    attendu: "feedback-smtp.<region>.amazonses.com",
  },
  {
    nom: `send.${DOMAINE}`,
    type: "TXT",
    intitule: "SPF — serveurs autorises",
    verifie: (v) => v.includes("v=spf1") && v.includes("amazonses.com"),
    attendu: "v=spf1 include:amazonses.com ~all",
  },
  {
    nom: `_dmarc.${DOMAINE}`,
    type: "TXT",
    intitule: "DMARC — politique de traitement",
    verifie: (v) => v.startsWith("v=DMARC1"),
    attendu: "v=DMARC1; p=none;",
  },
];

/** DNS over HTTPS : pas de dependance au resolveur du poste. */
const interroger = async (nom, type) => {
  const rep = await fetch(`https://cloudflare-dns.com/dns-query?name=${nom}&type=${type}`, {
    headers: { accept: "application/dns-json" },
  });
  const { Answer = [] } = await rep.json();
  return Answer.map((a) => String(a.data).replace(/^"|"$/g, "").replace(/" "/g, ""));
};

let manquants = 0;
for (const e of ATTENDUS) {
  const valeurs = await interroger(e.nom, e.type);
  const bon = valeurs.find((v) => e.verifie(v));
  if (bon) {
    console.log(`✓ ${e.intitule}\n    ${e.type} ${e.nom}\n    ${bon.slice(0, 90)}`);
  } else {
    manquants++;
    console.log(
      `✗ ${e.intitule}\n    ${e.type} ${e.nom}\n    attendu : ${e.attendu}` +
        (valeurs.length ? `\n    trouve  : ${valeurs.join(" | ").slice(0, 120)}` : "\n    trouve  : rien"),
    );
  }
}

console.log(
  manquants
    ? `\n${manquants} enregistrement(s) sur 4 encore absent(s). La propagation peut prendre jusqu'a une heure.`
    : "\nLes quatre enregistrements sont en place. Resend peut verifier le domaine.",
);
