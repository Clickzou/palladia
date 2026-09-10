/**
 * Page « Nos offres » — textes permanents, et repli des offres.
 *
 * Les offres elles-mêmes vivent désormais dans Supabase, table `offres`, avec
 * une fenêtre d’affichage : une offre échue disparaît d’elle-même (voir
 * supabase/migrations/0069_offres.sql et src/lib/offres.ts). Le tableau
 * `offres` ci-dessous ne sert plus qu’au repli tant que la migration n’est pas
 * jouée — il est à supprimer ensuite.
 *
 * Ce qui reste ici est ce qui ne dépend d’aucune saison : le titre de la page,
 * les arguments de la réservation en direct, les coordonnées, le bandeau
 * photo. Le titre et le chapô étaient datés (« automne 2026 ») ; ils ne le
 * sont plus, sans quoi il aurait fallu les réécrire chaque trimestre — au même
 * titre que le libellé du menu, qui annonçait « Offre automne » sur toutes les
 * pages du site.
 */
export const offresSaison = {
  title: "Nos offres d’hébergement à Toulouse",
  chapo:
    "Profitez d’**offres exclusives pour vos séjours à Toulouse**. Que vous voyagiez en famille, en couple, pour affaires ou à l’occasion d’un spectacle au Zénith, l’Hôtel Palladia vous propose des conditions privilégiées pour découvrir la Ville Rose dans un cadre confortable et raffiné.",

  /** Affiché entre deux saisons, quand aucune offre n’est en cours. */
  aucuneOffre:
    "Aucune offre n’est en cours pour le moment. Nos meilleurs tarifs restent garantis en réservation directe, et notre équipe reste à votre écoute pour préparer votre séjour.",

  /** Période de validité du repli, reprise dans la table `offres`. */
  validite: { debut: "2026-10-16", fin: "2026-11-02" },

  offres: [
    {
      slug: "sejour-famille",
      titre: "Séjour en famille",
      prix: "À partir de 218 €",
      paragraphes: [
        "Profitez d’un séjour en famille dans le confort d’un hôtel 4 étoiles à Toulouse. Grâce à deux chambres communicantes en catégorie supérieure, parents et enfants bénéficient d’un espace adapté pour partager des moments privilégiés tout en conservant leur intimité. Les petits-déjeuners buffet inclus permettent de démarrer la journée en toute sérénité avant de partir à la découverte de Toulouse et de ses nombreux sites touristiques.",
      ],
      conditions:
        "Pour vos séjours du vendredi 16 octobre 2026 au lundi 2 novembre 2026. Sous réserve de disponibilités.",
      inclus: [
        "2 chambres communicantes en catégorie supérieure",
        "2 adultes & 2 enfants (jusqu’à 16 ans)",
        "4 petits-déjeuners buffet inclus",
      ],
      affiche: "/images/sejour-en-famille-palladia.jpg",
      afficheAlt: "Affiche de l’offre séjour en famille automne 2026",
    },
    {
      slug: "sejour-automne",
      titre: "Séjour automne",
      prix: "À partir de 120 €",
      paragraphes: [
        "Pour un week-end ou une étape automnale à Toulouse, profitez d’une nuit en chambre Confort avec petit-déjeuner buffet offert. Cette offre inclut également un départ tardif jusqu’à 14h00 afin de prolonger votre séjour en toute tranquillité.",
        "Une formule idéale pour découvrir Toulouse, ses monuments, ses restaurants et son patrimoine culturel.",
      ],
      conditions:
        "Offre valable sur réservation, pour vos séjours du vendredi 16 octobre 2026 au lundi 2 novembre 2026. Sous réserve de disponibilités.",
      inclus: [
        "1 nuit en chambre Confort (jusqu’à 2 personnes)",
        "Petit-déjeuner buffet offert",
        "Départ tardif jusqu’à 14h00",
      ],
      affiche: "/images/sejour-automne-palladia.jpg",
      afficheAlt: "Affiche de l’offre séjour automne à 120 €",
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
