/**
 * Page « Nos offres » — ce qui ne dépend d’aucune saison.
 *
 * Les offres elles-mêmes vivent dans Supabase, table `offres`, avec une
 * fenêtre d’affichage : une offre échue disparaît d’elle-même (voir
 * supabase/migrations/0069_offres.sql et src/lib/offres.ts). Rien de daté ne
 * doit donc revenir ici.
 *
 * Ne restent que les textes permanents : le titre de la page, les arguments de
 * la réservation en direct, les coordonnées, le bandeau photo. Le titre et le
 * chapô ont été datés (« automne 2026 ») ; ils ne le sont plus, sans quoi il
 * aurait fallu les réécrire chaque trimestre — au même titre que le libellé du
 * menu, qui annonçait « Offre automne » sur toutes les pages du site.
 */
export const offresSaison = {
  title: "Nos offres d’hébergement à Toulouse",
  chapo:
    "Profitez d’**offres exclusives pour vos séjours à Toulouse**. Que vous voyagiez en famille, en couple, pour affaires ou à l’occasion d’un spectacle au Zénith, l’Hôtel Palladia vous propose des conditions privilégiées pour découvrir la Ville Rose dans un cadre confortable et raffiné.",

  /** Affiché entre deux saisons, quand aucune offre n’est en cours. */
  aucuneOffre:
    "Aucune offre n’est en cours pour le moment. Nos meilleurs tarifs restent garantis en réservation directe, et notre équipe reste à votre écoute pour préparer votre séjour.",

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
