import type { Metadata } from "next";
import { traduire } from "@/i18n/contenu";

/** Domaine de production, base des URLs canoniques et des alternatives. */
const SITE = "https://www.hotelpalladia.com";

/**
 * Titres et descriptions de reference, repris a l'identique du site
 * WordPress en ligne.
 *
 * Ce sont ces libelles qui sont indexes par Google et affiches dans les
 * resultats de recherche : les modifier ferait perdre le benefice du
 * referencement acquis. Ils font donc autorite sur toute reformulation.
 */
export const seo = {
  "/": {
    titre: "Le Palladia Hôtel 4 étoiles Toulouse",
    description:
      "Le Palladia Toulouse : Hôtel luxe 4 étoiles, 90 chambres & suites, SPA, piscine, restaurant, bar lounge, salles et salons pour séminaires.",
  },
  "/hotel": {
    titre: "Hôtel - Hôtel Palladia",
    // Le site ne renseigne pas de description sur cette page : on en fournit
    // une plutot que de laisser Google en composer une.
    description:
      "L’Hôtel Palladia, établissement 4 étoiles indépendant fondé en 1992 à Toulouse : 90 chambres, piscine extérieure, spa, restaurant et parking gratuit.",
  },
  "/offres-hebergement-toulouse": {
    titre: "Offre hébergement été toulouse - Palladia Hôtel 4 étoiles",
    description:
      "Découvrez nos offres et promotions pour votre hébergement à Toulouse pour cet été. Hôtel 4 étoile à Toulouse avec piscine.",
  },
  "/chambres": {
    titre: "Découvrez les Chambres & Suites de Luxe de l’Hôtel Palladia 4*",
    description:
      "Explorez le confort ultime des chambres et suites luxueuses du Palladia 4 étoiles à Toulouse. Un séjour inoubliable vous attend.",
  },
  "/preference": {
    titre: "Chambre Confort - Le Palladia hôtel 4 étoiles Toulouse",
    description:
      "Les chambres CONFORT sont des chambres aux lignes épurées et couleurs chaudes, qui leurs confèrent une ambiance chaleureuse et cocooning.",
  },
  "/platinium": {
    titre: "Chambre Prestige - Le Palladia hôtel 4 étoiles Toulouse",
    description:
      "La chambre PRESTIGE est une chambre luxueuse de 27 m² où les couleurs cuivrées, bronze ou argentées se mêlent à un mobilier de grande qualité.",
  },
  "/suite-junior": {
    titre: "Suite Junior - Le Palladia hôtel 4 étoiles Toulouse",
    description:
      "La chambre JUNIOR SUITE est une suite de 47 m² composée d’un réel espace salon dans la chambre. Colorée et contemporaine.",
  },
  "/la-suite": {
    titre: "La suite - Le Palladia hôtel 4 étoiles Toulouse",
    description:
      // 47 m² et non 54 : surface confirmee par l’hotelier, le site se contredisait.
      "La SUITE est composée de deux pièces séparées, une chambre et un salon donnant sur une terrasse privative, pour une superficie de 47 m².",
  },
  "/seminaire-evenement-professionnel": {
    titre: "Séminaires - Le Palladia hôtel 4 étoiles Toulouse",
    description:
      "L’Hôtel Palladia c’est 16 salles de réunion (jusqu’à 400 personnes), 1 Amphithéâtre, Parking gratuit 300 places, Restauration sur place.",
  },
  "/restaurant": {
    titre: "Restaurant - Le Palladia hôtel 4 étoiles Toulouse",
    description:
      "Ouvert tous les jours de 10h00 à 23h00, fermé dimanche et jours fériés. Modes de paiement acceptés : Cartes de crédit, espèces...",
  },
  "/spa": {
    titre: "Spa - Le Palladia hôtel 4 étoiles Toulouse",
    description:
      "Le SPA de 300m2 est situé dans le Batiment 2, sur le site de l’hôtel. Découvrez cet espace entièrement dédié à la détente et à la beauté.",
  },
  "/spectacle-toulouse": {
    titre: "Instigateur de spectacle à Toulouse - Hôtel Palladia",
    description:
      "Concert de Musique Classique, théâtre, Jazz, Dîner & Spectacle, Brunchs. L’hôtel Palladia met la culture à l’honneur.",
  },
  "/visites-toulouse": {
    titre: "Visiter Toulouse : les lieux et visites incontournables à Toulouse",
    description:
      "Découvrez les 34 meilleures idées de visites à faire et lieux à visiter à Toulouse : monuments, musées, balades et activités à Toulouse.",
  },
  "/engagements": {
    titre: "Hôtel Palladia - Engagement Clef Verte | Éco-Responsabilité",
    description:
      "L’engagement Clef Verte de l’Hôtel Palladia à Toulouse. Des pratiques éco-responsables pour un séjour respectueux de l’environnement.",
  },
  "/presse": {
    titre: "Découvrez les actualités dans la presse de l’hôtel Palladia",
    description:
      "Découvrez les dernières nouveautés de l’hôtel Palladia 4* dans les diverses revues de presse. Ils parlent de nous et donnent leur avis.",
  },
  "/coffret-cadeau-hotel-restaurant-toulouse": {
    titre: "Coffrets Cadeaux - Hôtel, Spa & Restaurant Le Palladia 4★",
    description:
      "Découvrez les coffrets cadeaux exclusifs du Palladia. Expériences gastronomiques, bien-être et séjours de luxe vous attendent.",
  },
  "/recrutement": {
    titre: "Recrutement Hôtel Palladia Toulouse | Offres d’Emploi en Hôtellerie",
    description:
      "Rejoignez l’Hôtel Palladia à Toulouse ! Découvrez nos offres d’emploi en hôtellerie et restauration. Postulez dès maintenant.",
  },
  "/actualites": {
    titre: "Actualités Le Palladia 4*: Luxe et Gastronomie au Coeur de la Ville",
    description:
      "Découvrez les dernières nouveautés du Palladia 4*, un univers de luxe et de saveurs uniques. Vivez l’expérience d’exception.",
  },
  "/devis": {
    titre: "Demande de Devis Hôtel Palladia ****",
    description:
      "Séminaire, soirée entreprise, mariage ou journée d’étude, demandez un devis pour votre événement à l’Hôtel Palladia à Toulouse.",
  },
  "/contact": {
    // Le WordPress avait bien une page /contact, mais vide : titre et
    // description sont repris de ses metadonnees, le contenu est nouveau.
    titre: "Contactez Le Palladia 4*, Hôtel & Restaurant de Luxe à Toulouse",
    description:
      "Découvrez comment joindre Le Palladia, votre hôtel 4 étoiles et restaurant gourmet à Toulouse. Service client premium.",
  },
  "/mentions-legales": {
    titre: "Mentions Légales du Palladia 4 étoiles - Luxe & Hospitalité",
    description:
      "Découvrez les mentions légales de l’Hôtel-Restaurant Le Palladia. Engagement envers nos clients pour un séjour d’exception.",
  },
  "/politique-de-confidentialite": {
    titre: "Politique de confidentialité : Hôtel Palladia",
    description:
      "Découvrez comment Le Palladia 4 étoiles protège vos données. Engagement fort pour votre confidentialité et sécurité.",
  },
  "/politique-de-cookies-ue": {
    titre: "Politique de Cookies de Le Palladia : Sécurité & Confort",
    description:
      "Découvrez comment Le Palladia 4 étoiles respecte votre vie privée avec notre politique de cookies. Sécurité et confort assurés.",
  },
} as const;

export type RouteSeo = keyof typeof seo;

/**
 * Métadonnées Next d'une route, dans la langue demandée.
 *
 * Le titre et la description sont ce que Google affiche dans ses résultats :
 * les laisser en français sur les versions anglaise et espagnole reviendrait
 * à ne pas exister dans ces langues.
 *
 * L'URL canonique et les alternatives `hreflang` déclarent à Google que les
 * trois versions sont la même page, et laquelle servir à qui.
 */
/** Code de langue OpenGraph attendu par Facebook et LinkedIn. */
export const ogLocale = (locale: string) =>
  ({ fr: "fr_FR", en: "en_GB", es: "es_ES" })[locale] ?? "fr_FR";

/**
 * Visuel affiche quand une page est partagee sur les reseaux ou messageries.
 * Sans lui, le lien s'affiche en texte nu. Format 1200 × 630, celui qu'attendent
 * Facebook, LinkedIn et X pour la grande carte.
 */
export const IMAGE_PARTAGE = {
  url: `${SITE}/images/partage-hotel-palladia.jpg`,
  width: 1200,
  height: 630,
  alt: "Le hall de l’Hôtel Palladia, hôtel 4 étoiles à Toulouse",
} as const;

export function metadonnees(route: RouteSeo, locale = "fr"): Metadata {
  const { titre, description } = seo[route];
  const chemin = route === "/" ? "" : route;

  return {
    title: traduire(titre, locale),
    description: traduire(description, locale),
    alternates: {
      canonical: locale === "fr" ? `${SITE}${chemin}` : `${SITE}/${locale}${chemin}`,
      languages: {
        fr: `${SITE}${chemin}`,
        en: `${SITE}/en${chemin}`,
        es: `${SITE}/es${chemin}`,
        "x-default": `${SITE}${chemin}`,
      },
    },
    openGraph: {
      title: traduire(titre, locale),
      description: traduire(description, locale),
      url: locale === "fr" ? `${SITE}${chemin}` : `${SITE}/${locale}${chemin}`,
      siteName: "Hôtel Palladia",
      locale: ogLocale(locale),
      type: "website",
      images: [{ ...IMAGE_PARTAGE, alt: traduire(IMAGE_PARTAGE.alt, locale) }],
    },
  };
}
