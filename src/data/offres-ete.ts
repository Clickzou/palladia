/**
 * Page « Offre été » — offres d'hébergement estivales.
 *
 * Ces offres sont datées (été 2026) : elles devront basculer vers Supabase
 * avec une période de validité, comme la table `evenements`, pour ne pas
 * rester affichées une fois la saison passée. C'est exactement le défaut
 * relevé sur l'ancien site (offre famille 2025 encore en ligne en 2026).
 */
export const offresEte = {
  metaTitle: "Offres hébergement été 2026 - Hôtel Palladia 4 étoiles Toulouse",
  metaDescription:
    "Séjour en famille, séjour été, offre spéciale Zénith et journée piscine : découvrez les offres estivales de l’Hôtel Palladia à Toulouse.",
  title: "Nos offres hébergement été 2026",
  chapo:
    "Profitez d’**offres exclusives pour vos séjours estivaux à Toulouse**. Que vous voyagiez en famille, en couple ou à l’occasion d’un spectacle au Zénith de Toulouse, l’Hôtel Palladia vous propose des conditions privilégiées pour découvrir la Ville Rose dans un cadre confortable et raffiné.",

  /** Période de validité commune, pour un futur passage en base. */
  validite: { debut: "2026-07-01", fin: "2026-08-30" },

  offres: [
    {
      slug: "sejour-famille",
      titre: "Séjour en famille",
      prix: "À partir de 218 €",
      paragraphes: [
        "Profitez d’un séjour en famille dans le confort d’un hôtel 4 étoiles à Toulouse. Grâce à deux chambres communicantes en catégorie supérieure, parents et enfants bénéficient d’un espace adapté pour partager des moments privilégiés tout en conservant leur intimité. Les petits-déjeuners buffet inclus permettent de démarrer la journée en toute sérénité avant de partir à la découverte de Toulouse et de ses nombreux sites touristiques.",
      ],
      conditions: "Offre valable pour vos séjours du 1er juillet 2026 au 30 août 2026. Sous réserve de disponibilités.",
      inclus: [
        "2 chambres communicantes en catégorie supérieure",
        "2 adultes & 2 enfants (jusqu’à 16 ans)",
        "4 petits-déjeuners buffet inclus",
      ],
      affiche: "/images/offres/famille.jpg",
      afficheAlt: "Affiche de l’offre séjour en famille été 2026",
    },
    {
      slug: "sejour-ete",
      titre: "Séjour été",
      prix: "À partir de 120 €",
      paragraphes: [
        "Pour un week-end ou une étape estivale à Toulouse, profitez d’une nuit en chambre Confort avec petit-déjeuner buffet offert. Cette offre inclut également un départ tardif jusqu’à 14h00 afin de prolonger votre séjour en toute tranquillité. Une formule idéale pour découvrir Toulouse, ses monuments, ses restaurants et son patrimoine culturel.",
      ],
      conditions: null,
      inclus: [
        "1 nuit en chambre Confort (jusqu’à 2 personnes)",
        "Petit-déjeuner buffet offert",
        "Départ tardif jusqu’à 14h00",
      ],
      affiche: "/images/offres/sejour-ete.jpg",
      afficheAlt: "Affiche de l’offre séjour été à 120 €",
    },
    {
      slug: "special-zenith",
      titre: "Spécial Zénith",
      prix: "−20 % sur votre chambre la nuit du spectacle",
      paragraphes: [
        "Situé à proximité immédiate du Zénith de Toulouse, l’Hôtel Palladia est l’adresse idéale pour profiter pleinement de vos concerts, spectacles et événements. Après votre soirée, retrouvez le confort d’une chambre spacieuse, un environnement calme et un parking gratuit. Grâce au code promotionnel ZENITH2026, bénéficiez de 20 % de réduction sur votre chambre les soirs de spectacle au Zénith de Toulouse.",
      ],
      conditions:
        "Offre valable uniquement les soirs de spectacle au Zénith de Toulouse, sur présentation d’un justificatif. Sous réserve de disponibilités.",
      inclus: [
        "Idéalement situé à proximité du Zénith (15 minutes à pied et 4 minutes en voiture)",
        "Chambres tout confort",
        "Calme & détente",
        "Parking gratuit",
      ],
      affiche: "/images/offres/zenith.jpg",
      afficheAlt: "Affiche de l’offre spéciale Zénith, code ZENITH2026",
    },
    {
      slug: "journee-piscine",
      titre: "Journée Piscine & Chambre climatisée",
      prix: "Les pieds dans l’eau, la tête en vacances, à partir de 99 €",
      paragraphes: [
        "Profitez d’une chambre confortable avec accès à la piscine de 10h à 18h. Toute occupation de la chambre au-delà de 18h entraînera la facturation d’une nuitée. Cette offre est idéale pour profiter des belles journées ensoleillées à Toulouse. Détendez-vous au bord de la piscine et bénéficiez de 2 glaces ou 2 boissons sans alcool incluses dans l’offre.",
        "Toute consommation supplémentaire sera facturée. Vous disposerez également d’une chambre climatisée pour vous reposer et profiter pleinement de votre journée. Pour le déjeuner, notre restaurant vous accueille de 12h à 13h45, du lundi au vendredi (hors week-ends).",
      ],
      conditions: "Offre limitée à 4 personnes par chambre.",
      inclus: [],
      affiche: "/images/offres/journee-piscine.jpg",
      afficheAlt: "Affiche de la journée piscine et chambre climatisée à 99 €",
    },
  ],

  argumentsTitre: "Pourquoi réserver en direct ?",
  arguments: [
    "Meilleur tarif garanti",
    "Parking gratuit",
    "Petit-déjeuner buffet",
    "Hôtel 4 étoiles",
    "Spa & bien-être",
    "Réservation sécurisée",
  ],

  reservation: {
    titre: "Réservez votre séjour à l’Hôtel Palladia",
    telephone: "05 62 120 120",
    telephoneHref: "tel:+33562120120",
    siteWeb: "www.hotelpalladia.com",
  },

  bandeau: [
    { src: "/images/spa/carrousel-3.jpg", alt: "Espace détente du spa" },
    { src: "/images/hotel-piscine.jpg", alt: "Piscine extérieure de l’hôtel" },
    { src: "/images/bandeau-exterieur.jpg", alt: "Entrée de l’Hôtel Palladia" },
    { src: "/images/bandeau-bar.jpg", alt: "Bar-lounge de l’hôtel" },
  ],
} as const;
