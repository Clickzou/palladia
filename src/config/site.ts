/**
 * Constantes du site : coordonnees, reseaux et moteurs de reservation externes.
 * URLs reprises telles quelles du site WordPress d’origine.
 */
export const site = {
  name: "Hôtel Palladia",
  email: "info@hotelpalladia.com",
  phone: "+33 5 62 12 01 20",
  phoneHref: "tel:+33562120120",
  address: "271 Av. de Grande Bretagne, 31300 Toulouse",
  maps: "https://www.google.fr/maps/place/Le+Palladia/@43.6053379,1.3978489,17z",
  /** Position relevee sur la carte uMap de l'hotel, pour la page Tourisme. */
  lat: 43.605523,
  lng: 1.400424,
} as const;

/**
 * Destinataires des formulaires, releves dans la configuration Elementor de
 * l'ancien site (scripts/destinataires-formulaires.mjs). Ces adresses ne sont
 * pas visibles cote navigateur : elles vivaient dans la base WordPress.
 */
export const destinataires = {
  /** Demande de devis : la communication, les ventes et les deux commerciales */
  devis: [
    "communication@hotelpalladia.com",
    "salesmanager@hotelpalladia.com",
    "commercial1@hotelpalladia.com",
    "commercial2@hotelpalladia.com",
  ],
  /** Candidatures spontanees et reponses aux offres */
  recrutement: ["candidature@hotelpalladia.com"],
  /** Inscriptions a la lettre d'information */
  newsletter: ["communication@hotelpalladia.com"],
} as const;

export const booking = {
  /** Moteur VerticalBooking — reservation chambre */
  rooms:
    "https://reservations.verticalbooking.com/reservations/index.html?id_stile=10751&lingua_int=fra&id_albergo=12425&dc=5376&countryCode=FR",
  /** Page offres premium VerticalBooking */
  premium:
    "https://reservations.verticalbooking.com/premium/index.html?id_albergo=12425&dc=5376&lingua_int=fra&id_stile=19042",
  /** Reservation restaurant TheFork (avec suivi de provenance) */
  restaurant:
    "https://widget.thefork.com/fr/f4fd4f59-4b37-4601-8acc-a7d63d4ae849?step=date&utm_source=hotelpalladia.com",
  /** Reservation spa Secretbox */
  spa: "https://hotelpalladia.secretbox.fr/",
} as const;

/**
 * Codes de langue de VerticalBooking. Ce ne sont ni les codes ISO du site ni
 * ceux des balises `lang` du moteur : « es » et « spa » sont refuses, seul
 * « esp » repond. Verifie sur le moteur de l'hotel le 22 juillet 2026.
 */
const LANGUE_MOTEUR: Record<string, string> = { fr: "fra", en: "eng", es: "esp" };

/**
 * Un lien de reservation dans la langue du visiteur : sans cela, un
 * anglophone arrive sur un moteur en français. Les liens qui ne portent pas
 * `lingua_int` (TheFork, Secretbox) sont rendus tels quels.
 */
export function reserverEn(lien: string, locale: string): string {
  const langue = LANGUE_MOTEUR[locale];
  if (!langue) return lien;
  return lien.replace(/lingua_int=[a-z]+/, `lingua_int=${langue}`);
}

export const social = {
  facebook: "https://www.facebook.com/hotelpalladia/",
  linkedin: "https://www.linkedin.com/in/h%C3%B4tel-palladia-b2b50b153/",
  youtube: "https://www.youtube.com/@Palladia31",
  instagram: "https://www.instagram.com/hotelpalladia/",
} as const;

/**
 * Navigation principale. `key` renvoie vers messages/*.json (nav.*),
 * `href` reprend exactement les URLs du site actuel pour ne rien casser en SEO.
 */
export const mainNav = [
  { key: "accueil", href: "/" },
  { key: "hotel", href: "/hotel" },
  { key: "offre", href: "/offres-hebergement-toulouse" },
  {
    key: "chambres",
    href: "/chambres",
    children: [
      { key: "chambresConforts", href: "/preference" },
      { key: "chambresPrestiges", href: "/platinium" },
      { key: "suitesJuniors", href: "/suite-junior" },
      { key: "laSuite", href: "/la-suite" },
    ],
  },
  { key: "seminaires", href: "/seminaire-evenement-professionnel" },
  { key: "restaurant", href: "/restaurant" },
  { key: "spa", href: "/spa" },
  {
    key: "actu",
    href: "/actualites",
    children: [
      { key: "actualites", href: "/actualites" },
      { key: "presse", href: "/presse" },
    ],
  },
  { key: "spectacles", href: "/spectacle-toulouse" },
  { key: "tourisme", href: "/visites-toulouse" },
  { key: "engagements", href: "/engagements" },
] as const;
