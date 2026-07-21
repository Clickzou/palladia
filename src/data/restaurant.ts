/**
 * Contenu de la page Restaurant.
 *
 * NOTE — `menuSemaine` et `menuJour` changent chaque semaine : ce sont les
 * premiers candidats a migrer vers Supabase (table `menus`), pour que l'hotel
 * puisse les mettre a jour sans passer par un deploiement. La forme des objets
 * ci-dessous correspond deja au schema prevu.
 */

export const restaurant = {
  metaTitle: "Restaurant - Le Palladia hôtel 4 étoiles Toulouse",
  metaDescription:
    "Le restaurant de l’hôtel Palladia à Toulouse vous accueille dans son décor contemporain et élégant. Cuisine de qualité à base de produits frais.",
  title: "Le Restaurant",
  subtitle: "Cuisine de qualité à base de produits frais",

  intro: [
    "Pour le plaisir ou pour les affaires, en amoureux ou entre amis, le restaurant de l’hôtel Palladia à Toulouse vous accueille dans son décor contemporain et élégant.",
    "Nous pouvons y privatiser des espaces pour vos déjeuners d’affaires ou vos repas séminaire.",
    "La carte change au gré des saisons. Notre Chef de cuisine et son équipe vous prépareront des petits plats savoureux typiques de la gastronomie française et du sud ouest, préparés à base d’ingrédients frais, choisis avec soin.",
    "Quand les beaux jours arrivent, profitez de la terrasse ombragée et déjeunez confortablement. Cocktails, grandes assiettes d’été sont autant de propositions gourmandes qui raviront vos papilles.",
    "L’hôtel Palladia cultive pour ses clients « l’art de vivre à la française ».",
  ],

  chef: { name: "Jeremy Gabarrot", href: "/actualites" },

  horaires: [
    { texte: "Restaurant ouvert du lundi au vendredi de 12h à 14h00 et de 19h à 21h45", fort: true },
    { texte: "Samedi de 19h00 à 21h45", fort: true },
    { texte: "Le petit déjeuner est servi au restaurant sous forme de buffet de 6h30 à 10h00 du lundi au samedi.", fort: false },
    { texte: "Dimanche et jours fériés le petit déjeuner est servi jusqu’à 11h00.", fort: false },
  ],

  menuSemaine: {
    titre: "Menu de la semaine",
    sections: [
      {
        titre: "Entrée",
        choix: [
          "Hareng à l’huile,\nsalade de pommes de terre et pickles",
          "Tartare de boeuf, sauce aux huîtres,\npak-choï et shimeji",
        ],
      },
      {
        titre: "Plat",
        choix: [
          "Poisson du jour, conchiglioni farcis à la\npiperade et sabayon au kalamansi",
          "Cochon grillé, purée de petits pois parfumée\nà la menthe et radis rôtis",
        ],
      },
      {
        titre: "Dessert",
        choix: [
          "Comme un chocolat frappé et mousse de lait",
          "Fraîcheur de pamplemousse, fraises et meringue",
          "Assiette de fromages du chef",
        ],
      },
    ],
    note: "Nos préparations dépendent du marché. Il se peut que certains plats puissent varier, nous vous remercions de votre compréhension.",
  },

  menuJour: {
    titre: "Menu du jour",
    sousTitre: "Midi & soir",
    intro: "2 formules au choix :",
    formules: [
      { prix: "25 €", detail: "(entrée + plat **ou** plat + dessert)" },
      { prix: "30 €", detail: "(entrée + plat + dessert)" },
    ],
    tarifsTitre: "Tarifs des plats hors suppléments :",
    tarifs: ["Entrées : 12 €", "plats : 22 €", "Desserts : 10 €"],
    enfant: {
      titre: "Menu Moussaillon",
      prix: "12 €",
      detail: "Plat + dessert + boisson",
    },
  },

  bar: {
    titre: "Le Bar Lounge",
    sousTitre: "Idéal pour déguster un cocktail",
    paragraphes: [
      "Calme et accueillant, décoré de teintes or, noir et blanc, design et cosy, l’atmosphère vous invite à la détente.",
      "En soirée, il devient le lieu idéal pour déguster un cocktail, que notre barman se fera un plaisir de vous concocter.",
    ],
    privatisation: "Possibilité de privatiser le bar sur demande.",
    horaires: "Ouvert tous les jours de 10h00 à 23h00, fermé dimanche et jours fériés.",
    paiement: "Cartes de crédit, chèques, espèces, tickets restaurant.",
  },

  galerieTitre: "Dégustez avec les yeux !",
  galerie: [
    { src: "/images/restaurant/plat-47.jpg", alt: "Création du chef" },
    { src: "/images/restaurant/plat-49.jpg", alt: "Dessert chocolat" },
    { src: "/images/restaurant/plat-50.jpg", alt: "Assiette gastronomique" },
    { src: "/images/restaurant/plat-51.jpg", alt: "Plat de saison" },
    { src: "/images/restaurant/plat-52.jpg", alt: "Poisson du jour" },
    { src: "/images/restaurant/plat-53.jpg", alt: "Entrée fraîcheur" },
    { src: "/images/restaurant/plat-54.jpg", alt: "Viande et légumes" },
    { src: "/images/restaurant/plat-55.jpg", alt: "Suggestion du chef" },
    { src: "/images/restaurant/plat-56.jpg", alt: "Dessert de saison" },
    { src: "/images/restaurant/plat-choco.jpg", alt: "Chocolat praliné" },
    { src: "/images/restaurant/salle-1.jpg", alt: "Salle du restaurant" },
    { src: "/images/restaurant/salle-5.jpg", alt: "Table dressée" },
  ],
} as const;
