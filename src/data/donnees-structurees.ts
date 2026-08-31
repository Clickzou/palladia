import { site, social } from "@/config/site";
import { traduire } from "@/i18n/contenu";
import { seo } from "@/data/seo";

/** Domaine de production, comme dans data/seo.ts. */
const SITE = "https://www.hotelpalladia.com";

/**
 * Equipements declares a Google. Repris des services affiches sur /hotel :
 * ce sont ceux qu'un moteur de recherche sait interpreter pour un hotel.
 */
const EQUIPEMENTS = [
  "Piscine extérieure",
  "Spa",
  "Salle de sport",
  "Restaurant",
  "Bar lounge",
  "Parking gratuit",
  "Bornes de recharge électrique",
  "Wifi gratuit",
  "Room service 24h/24",
  "Salles de séminaire",
  "Navette aéroport",
  "Accès PMR",
];

/**
 * Fiche de l'etablissement au format schema.org.
 *
 * C'est elle qui permet a Google d'afficher l'hotel autrement qu'en lien bleu :
 * panneau de connaissance, classement en etoiles, adresse et equipements dans
 * les resultats. Elle n'est posee que sur l'accueil, page qui represente
 * l'etablissement ; la repeter partout n'apporterait rien.
 *
 * Aucune valeur n'est inventee : tout provient de config/site.ts et des pages
 * du site. Les horaires d'arrivee et de depart en sont volontairement absents,
 * faute d'une source sure.
 */
export function schemaHotel(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "@id": `${SITE}/#hotel`,
    name: site.name,
    description: traduire(seo["/"].description, locale),
    url: locale === "fr" ? SITE : `${SITE}/${locale}`,
    logo: `${SITE}/images/logo-palladia.png`,
    image: `${SITE}/images/partage-hotel-palladia.jpg`,
    telephone: site.phone,
    email: site.email,
    foundingDate: "1992",
    starRating: { "@type": "Rating", ratingValue: 4 },
    numberOfRooms: 90,
    petsAllowed: true,
    address: {
      "@type": "PostalAddress",
      streetAddress: "271 avenue de Grande Bretagne",
      postalCode: "31300",
      addressLocality: "Toulouse",
      addressRegion: "Occitanie",
      addressCountry: "FR",
    },
    geo: { "@type": "GeoCoordinates", latitude: site.lat, longitude: site.lng },
    hasMap: site.maps,
    amenityFeature: EQUIPEMENTS.map((nom) => ({
      "@type": "LocationFeatureSpecification",
      name: traduire(nom, locale),
      value: true,
    })),
    sameAs: [social.facebook, social.instagram, social.linkedin, social.youtube],
  };
}

/** Un maillon du fil d'Ariane : son libelle et le chemin vers lequel il pointe. */
export type Maillon = { nom: string; chemin?: string };

/**
 * Fil d'Ariane au format schema.org.
 *
 * Le site affiche deja un fil d'Ariane ; sans ce balisage, Google montre
 * l'URL brute sous le titre du resultat plutot que le chemin de navigation,
 * ce qui est illisible sur les adresses longues des articles.
 *
 * Le premier maillon est toujours l'accueil, dans la langue de la page.
 */
export function schemaFilAriane(maillons: Maillon[], locale: string) {
  const racine = locale === "fr" ? SITE : `${SITE}/${locale}`;
  const complet: Maillon[] = [{ nom: traduire("Accueil", locale), chemin: "/" }, ...maillons];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: complet.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: m.nom,
      // Le dernier maillon est la page courante : schema.org demande de ne pas
      // lui donner d'URL.
      ...(m.chemin && i < complet.length - 1
        ? { item: m.chemin === "/" ? racine : `${racine}${m.chemin}` }
        : {}),
    })),
  };
}
