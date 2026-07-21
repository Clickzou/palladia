/** Page Hôtel : présentation de l'établissement et liste des services. */
export const hotel = {
  metaTitle: "Hôtel - Hôtel Palladia 4 étoiles Toulouse",
  metaDescription:
    "L’Hôtel Palladia, établissement 4 étoiles indépendant fondé en 1992 à Toulouse : 90 chambres, piscine extérieure, spa, restaurant et parking gratuit.",
  title: "L’Hôtel Palladia",
  subtitle: "Votre hôtel indépendant et haut de gamme à Toulouse",

  presentation: [
    "Si Toulouse est aujourd’hui surnommée la « Ville Rose », c’est aux Romains qu’elle le doit. C’est en effet durant la Pax Romana que la cité, alors appelée Palladia Tolosa, a hérité des techniques de la tuile et de la brique qui façonnent encore son identité architecturale. Carrefour du commerce entre les îles britanniques et le monde méditerranéen, elle s’est enrichie de temples, remparts et amphithéâtres, dont certains vestiges sont encore visibles aujourd’hui, notamment les arènes de Purpan et les collections du musée Saint-Raymond.",
    "C’est dans cet héritage culturel que s’inscrit l’hôtel Palladia, établissement 4 étoiles indépendant fondé en 1992 par Monsieur Georges Miatto. Le nom de l’hôtel perpétue la tradition de culture et de beauté associée à Pallas Athéna, déesse de la raison et de l’intelligence, évoquée par plusieurs poètes antiques.",
    "Le Palladia cultive l’art de vivre à la française. Sa cuisine, inspirée du terroir du Sud-Ouest, varie au rythme des saisons et privilégie les produits frais et soigneusement sélectionnés. À la belle saison, la terrasse ombragée devient un lieu convivial pour savourer grillades, cocktails et assiettes estivales. L’hôtel allie ainsi héritage antique, confort contemporain et raffinement gastronomique.",
  ],

  /** Tableau exposé dans l'hôtel, présenté sous le texte d'introduction. */
  tableau: {
    src: "/images/hotel/gorgone-palladia-tolosa.jpg",
    legende: "« La Gorgone Palladia Tolosa » Dany Monné 1999",
  },

  galerie: [
    { src: "/images/hotel/vue-2.jpg", alt: "Piscine extérieure de l’Hôtel Palladia" },
    { src: "/images/hotel/vue-3.jpg", alt: "Espace bien-être et jacuzzi" },
    { src: "/images/hotel/vue-4.jpg", alt: "Chambre de l’Hôtel Palladia" },
    { src: "/images/hotel/vue-5.jpg", alt: "Suite de l’Hôtel Palladia" },
  ],

  servicesTitre: "Services",
  services: [
    { nom: "Piscine extérieure", detail: "Piscine extérieure (ouverte de juin à fin septembre)", icone: "piscine" },
    { nom: "Sport", detail: "Espace Fitness et salle de sport", icone: "sport" },
    { nom: "Bien-être", detail: "SPA / Institut de beauté (tarifs selon prestations)", icone: "spa" },
    { nom: "Room Service", detail: "Room Service 7j/7 – 24h/24", icone: "service" },
    // Le site indique 280 places ici et 300 sur la page Seminaires : a trancher.
    { nom: "Parking", detail: "Parking de 280 places gratuit, emplacements bornes électriques", icone: "parking" },
    { nom: "Équipements spéciaux Bus", detail: "Prise 220/380 volts + branchement eau", icone: "bus" },
    { nom: "Navette Aéroport-Hôtel", detail: "Sur réservation et sous réserve de disponibilité", icone: "navette" },
    { nom: "Business center", detail: "2 ordinateurs connectés à internet et une imprimante", icone: "business" },
    { nom: "Pressing", detail: "Pressing à disposition", icone: "pressing" },
    { nom: "Wifi", detail: "Wifi gratuit et fibre optique", icone: "wifi" },
    { nom: "Pour les petits", detail: "Lits et chaise bébé, produits d’accueil", icone: "enfant" },
    { nom: "Animaux", detail: "Animaux acceptés", icone: "animaux" },
    {
      nom: "Accessibilité PMR",
      detail:
        "Toilettes et ascenseurs accessibles en fauteuil roulant · Chambre Prestige entièrement adaptée aux personnes en situation de handicap · Téléphone à grosses touches · Espace nécessaire au déplacement en fauteuil roulant · Équipements à hauteur adéquate · Salle de bain aménagée",
      icone: "pmr",
    },
  ],
} as const;
