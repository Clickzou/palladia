/**
 * Page Séminaires & événements professionnels.
 *
 * Deux incohérences du site d'origine ont été tranchées ici :
 *  - nombre de salles : 13 (valeur de cette page et de l'accueil ; deux articles
 *    annonçaient 15 et 16) ;
 *  - Capitouls : 265 m² sur la fiche technique, 300 m² dans le tableau des
 *    capacités. On retient 265 m², à confirmer par l'hôtel.
 */

export const seminaires = {
  metaTitle: "Séminaires - Le Palladia hôtel 4 étoiles Toulouse",
  metaDescription:
    "Hôtel séminaire à Toulouse : un amphithéâtre de 285 places, 13 salles de réunion à la lumière du jour et un parking gratuit de 300 places.",
  title: "Votre hôtel séminaire à Toulouse",
  subtitle: "Pour vos séminaires et conférences à Toulouse",

  atouts: [
    "13 salles de réunion pouvant accueillir jusqu’à 400 personnes",
    "1 Amphithéâtre de 285 places",
    "Wifi 1 giga",
    "Parking Gratuit",
    "Restauration sur place avec des produits frais",
    "Accompagnement personnalisé pour vos événements",
  ],

  presentation: [
    "L’Hôtel Palladia propose une gamme très variée de salles de réunion et de services haut de gamme, l’un des plus beaux hotel seminaire Toulouse pouvant accueillir les évènements les plus prestigieux aussi bien que les réunions et cocktails.",
    "L’Hôtel Palladia est le seul hôtel a posséder un amphithéâtre de 285 places sur Toulouse et 13 salles de réunion à la lumière du jour, idéal pour des séminaires résidentiels.",
    "Un grand parking de 300 places est à la disposition des clients de l’hôtel. Elégance du décor et fonctionnalité des installations font de l’hôtel Palladia un endroit idéal pour vos séminaires et vos réceptions à Toulouse.",
    "Réactivité et souplesse de notre équipe commerciale permettent une adaptation à tous vos besoins pour la réussite de vos manifestations professionnelles ou privées, évènementielles, caritatives…",
  ],

  /** Fiches techniques des salons, dans l'ordre du site. */
  salons: [
    { nom: "Amphithéâtre",     places: "285 places", detail: "285 places",              image: "/images/salons/amphitheatre.jpg" },
    { nom: "Salon Opéra",      places: "350 places", detail: "Superficie : 500 m²",     image: "/images/salons/opera.jpg" },
    { nom: "Capitouls",        places: "200 places", detail: "Superficie : 265 m²",     image: "/images/salons/capitoul.jpg" },
    { nom: "St Nicolas",       places: "6 places",   detail: "Superficie : 16 m²",      image: "/images/salons/st-nicolas.jpg" },
    { nom: "Saint Georges",    places: "6 places",   detail: "Superficie : 15 m²",      image: "/images/salons/saint-georges.jpg" },
    { nom: "VIP",              places: "2 places",   detail: "Superficie : 14 m²",      image: "/images/salons/vip.jpg" },
    { nom: "Dalbade",          places: "18 places",  detail: "Superficie : 33 m²",      image: "/images/salons/dalbade.jpg" },
    { nom: "Velane",           places: "24 places",  detail: "Superficie : 35 m²",      image: "/images/salons/velane.jpg" },
    { nom: "Daurade",          places: "18 places",  detail: "Superficie : 33 m²",      image: "/images/salons/daurade.jpg" },
    { nom: "Ozenne (DVD)",     places: "70 places",  detail: "Superficie Plateau : 200 m²", image: "/images/salons/ozenne.jpg" },
    { nom: "Perchepinte",      places: "20 places",  detail: "Superficie : 34 m²",      image: "/images/salons/perchepinte.jpg" },
    { nom: "Croix-Baragnon",   places: "50 places",  detail: "Superficie : 58 m²",      image: "/images/salons/croix-baragnon.jpg" },
    { nom: "Filatiers",        places: "25 places",  detail: "Superficie : 40 m²",      image: "/images/salons/filatiers.jpg" },
  ],

  noteModulables:
    "3 salons modulables (Dalbade, Velane, Daurade) pour une superficie de 100 m²",

  /**
   * Tableau des capacités. Le site d'origine le publiait en image :
   * ici c'est un vrai tableau, lisible par Google et par un lecteur d'écran.
   */
  configurations: ["Pavé", "En U", "Classe", "Théâtre", "Cocktail", "Banquet", "Cabaret"],
  capacites: [
    { salle: "Capitouls",                    surface: "300 m²", valeurs: [48, 44, 52, 130, 200, 200, 48] },
    { salle: "Amphithéâtre",                 surface: null,     valeurs: [null, null, null, 285, null, null, null] },
    { salle: "Opéra",                        surface: "500 m²", valeurs: [52, 48, 100, 290, 350, 300, 180] },
    { salle: "Saint-Georges",                surface: "15 m²",  valeurs: [6, null, null, null, null, null, null] },
    { salle: "Saint-Nicolas",                surface: "16 m²",  valeurs: [6, null, null, null, null, null, null] },
    { salle: "Ozenne",                       surface: "100 m²", valeurs: [null, null, null, null, 80, null, null] },
    { salle: "Dalbade + Vélane + Daurade",   surface: "100 m²", valeurs: [null, 34, 36, 70, null, null, null] },
    { salle: "V.I.P.",                       surface: "14 m²",  valeurs: [6, null, null, null, null, null, null] },
    { salle: "Perchepinte",                  surface: "34 m²",  valeurs: [16, 12, 12, 20, null, null, null] },
    { salle: "Filatiers",                    surface: "40 m²",  valeurs: [16, 12, 12, 25, null, null, null] },
    { salle: "Croix-Baragnon",               surface: "58 m²",  valeurs: [24, 20, 20, 50, null, null, null] },
  ],

  hybride: {
    titre: "Votre séminaire hybride",
    sousTitre: "Le Digital Studio",
    accroche: "Créez des synergies entre l’univers physique et l’univers virtuel.",
    texte:
      "L’Hôtel Palladia vous propose de concevoir, d’organiser et de superviser des événements tout-digitaux ou hybrides, à votre image et dans le respect de vos objectifs.",
    image: "/images/salons/hybride.jpg",
  },

  /** Contenu éditorial de bas de page, structuré en sections numérotées. */
  sections: [
    {
      titre: "Le Palladia : votre hôtel séminaire à Toulouse",
      intro: [
        "À la recherche d’un lieu parfait pour organiser votre séminaire à Toulouse ? L’Hôtel Palladia est le lieu idéal en Haute-Garonne. Notre hôtel 4 étoiles combine élégance, confort, et des installations modernes pour vous offrir une expérience inoubliable. Que vous planifiez une réunion d’affaires, une conférence ou tout autre événement professionnel, L’Hôtel Palladia est le choix par excellence.",
        "Avec une gamme complète de salles de séminaires équipées des dernières technologies, des services haut de gamme, et une équipe dédiée à faire de votre événement un succès, L’Hôtel Palladia s’impose comme la référence pour les séminaires à Toulouse. Découvrez pourquoi cet établissement est le partenaire parfait pour vos besoins professionnels.",
      ],
      sousTitre: "Pourquoi choisir l’Hôtel Palladia pour vos séminaires à Toulouse ?",
      chapo:
        "L’organisation d’un séminaire est une tâche complexe qui nécessite une planification minutieuse et des installations adéquates. Voici pourquoi L’Hôtel Palladia se démarque comme la meilleure option pour vos événements professionnels à Toulouse.",
      points: [
        {
          num: "1.1",
          titre: "Un emplacement idéal",
          texte:
            "Situé proche du cœur de Toulouse, L’Hôtel Palladia bénéficie d’un emplacement stratégique. Facilement accessible depuis l’aéroport de Toulouse-Blagnac et le centre-ville, il offre une connectivité optimale pour les participants locaux et internationaux lors d’un séminaire.",
        },
        {
          num: "1.2",
          titre: "Une infrastructure de haute qualité",
          texte:
            "L’Hôtel Palladia propose des salles de séminaires modernes et bien équipées. Ces salles sont conçues pour répondre à tous les besoins, qu’il s’agisse de petites réunions ou de grandes conférences. Chaque salle dispose d’un équipement professionnel, incluant des projecteurs, des systèmes audio et vidéo sur mesure, ainsi qu’un accès internet haut débit.",
        },
        {
          num: "1.3",
          titre: "Un service personnalisé",
          texte:
            "L’équipe de L’Hôtel Palladia est dédiée à vous offrir un service personnalisé. Dès la prise de contact, vous serez accueilli par un personnel professionnel et courtois, prêt à répondre à toutes vos attentes. Que ce soit pour des besoins spécifiques en matière de restauration ou des aménagements techniques, l’équipe est à votre disposition pour garantir le succès de votre événement.",
        },
      ],
    },
    {
      titre: "Les salles de séminaires de l’Hôtel Palladia : une solution adaptée à chaque besoin",
      fondGris: true,
      chapo:
        "Le grand hôtel Palladia est un hôtel d’affaire qui dispose d’une variété de salles de séminaires pour votre journée de travail, chacune adaptée à des besoins spécifiques. Voici un aperçu des différentes options disponibles pour une location de salles : des prix attractifs pour votre demi-journée d’étude ou votre journée d’étude.",
      points: [
        {
          num: "2.1",
          titre: "La salle de conférence",
          texte:
            "La salle de conférence est idéale pour les grands événements d’entreprise. Elle peut accueillir jusqu’à 285 pers et est équipée des dernières technologies audiovisuelles. Cette salle est parfaite pour les conférences, les lancements de produits, et les grands séminaires.",
        },
        {
          num: "2.2",
          titre: "Les salles de réunion",
          texte:
            "Pour les réunions de travail plus intimes, L’Hôtel Palladia propose plusieurs salles de réunion pouvant accueillir de 2 à 290 personnes. Ces salles de séminaire offrent un cadre professionnel et sont équipées de tout le nécessaire pour garantir des réunions productives et efficaces pour vos collaborateurs.",
        },
        {
          num: "2.3",
          titre: "Les espaces polyvalents",
          texte:
            "En plus des salles de conférence et de réunion, L’Hôtel Palladia dispose d’espaces polyvalents qui peuvent être configurés selon vos besoins spécifiques lors de votre séminaire. Que vous ayez besoin d’un espace pour des ateliers, des sessions de formation, ou des réunions de groupe, ces espaces peuvent être aménagés pour répondre à vos exigences.",
        },
      ],
    },
    {
      titre: "Les services supplémentaires offerts par l’Hôtel Palladia",
      chapo:
        "L’Hôtel Palladia ne se contente pas de fournir des salles de séminaires, il offre également une gamme de services supplémentaires pour garantir le bon déroulement de vos événements.",
      points: [
        {
          num: "3.1",
          titre: "Restauration et pause-café",
          texte:
            "L’hôtel propose des services de restauration personnalisés pour vos événements. Que ce soit pour un déjeuner d’affaires, un dîner de gala ou des pauses café, le chef et son équipe créent des menus adaptés à vos besoins et à vos préférences culinaires. Les repas sont préparés avec des ingrédients frais et de qualité.",
          image: "/images/restaurant/plat-47.jpg",
        },
        {
          num: "3.2",
          titre: "Hébergement de qualité",
          texte:
            "Avec ses chambres confortables et élégamment décorées, L’Hôtel Palladia offre un hébergement de qualité pour vos participants. Les chambres sont équipées de toutes les commodités modernes, garantissant un séjour agréable et reposant. De plus, les tarifs préférentiels pour les participants aux séminaires ajoutent un avantage supplémentaire.",
          image: "/images/chambres/confort-hero.jpg",
        },
        {
          num: "3.3",
          titre: "Activités de team-building",
          texte:
            "Pour renforcer les liens entre les membres de votre équipe, L’Hôtel Palladia propose des activités de team-building via ses partenaires. Des ateliers créatifs aux défis sportifs, ces activités sont conçues pour favoriser la coopération, la communication et l’esprit d’équipe. Que ce soit des animations à l’hôtel, en plein centre de Toulouse, sur le Canal du Midi ou dans un parc en bord de Garonne, nous vous proposons des activités diverses et variées grâce à nos partenaires sur le lieu de votre choix.",
          image: "/images/salons/team-building.jpg",
        },
      ],
    },
    {
      titre: "Un lieu exceptionnel au cœur de Toulouse",
      fondGris: true,
      chapo:
        "L’emplacement de L’Hôtel Palladia est un atout majeur. Situé à proximité des principales attractions de Toulouse, il offre un cadre idéal pour les moments de détente après les sessions de travail.",
      points: [
        {
          num: "4.1",
          titre: "Une accessibilité optimale",
          texte:
            "L’Hôtel Palladia, situé dans le quartier de « Purpan », est facilement accessible depuis l’aéroport de Toulouse-Blagnac, à quelques minutes de la gare de Toulouse-Matabiau et du périphérique. Cette accessibilité facilite les déplacements de vos participants, qu’ils viennent de Toulouse ou d’ailleurs. L’hôtel dispose de 300 places de parking gratuites.",
        },
        {
          num: "4.2",
          titre: "La proximité des attractions touristiques",
          texte:
            "En séjournant à L’Hôtel Palladia, vos participants pourront découvrir le charme de Toulouse, connue sous le nom de « La Ville Rose ». La Place du Capitole, la Basilique Saint-Sernin, le Canal du Midi et la cartoucherie sont quelques-unes des attractions touristiques à proximité.",
        },
        {
          num: "4.3",
          titre: "Un environnement propice à la détente",
          texte:
            "Après une journée de séminaire, vos participants pourront profiter des installations de détente de l’hôtel. Le spa, la piscine extérieure et le centre de fitness offrent des options parfaites pour se relaxer et se ressourcer.",
        },
      ],
    },
  ],

  devis: {
    titre: "Demandez un devis pour votre séminaire",
    texte:
      "Vous pouvez contacter l’équipe de réservation de l’hôtel par téléphone, par email, ou via le formulaire de contact disponible sur le site web. Un membre de l’équipe vous assistera pour comprendre vos besoins spécifiques et vous proposer les options les plus adaptées pour votre séminaire.",
    cta: "Faire une demande",
  },

  faq: [
    {
      question: "Comment organiser un séminaire à Toulouse ?",
      reponse:
        "Pour organiser un séminaire réussi à Toulouse, il est essentiel de choisir une salle séminaire adaptée à vos besoins : location salle réunion pour un petit groupe, espace modulable pour des événements plus importants, ou encore salle équipée avec tout le matériel nécessaire. Selon le format de votre réunion professionnelle, vous pouvez opter pour un séminaire résidentiel, une formation ou une conférence. Les organisateurs d’événements toulousains privilégient les lieux offrant flexibilité, confort et services adaptés.",
    },
    {
      question: "Quels services pour séminaire à Toulouse ?",
      reponse:
        "Les hôtels et espaces événementiels proposent une large gamme de services sur mesure pour vos séminaires. Vous bénéficiez d’un accueil professionnel, d’une offre de restauration complète (du déjeuner au cocktail, sans oublier la pause café), ainsi que de prestations techniques comme le matériel audiovisuel et le wifi gratuit. De nombreux établissements mettent également à disposition un parking privé et une salle privatisable pour assurer confort et confidentialité à vos participants.",
    },
    {
      question: "Quel est le prix d’un séminaire à Toulouse ?",
      reponse:
        "Le tarif séminaire varie selon le type d’hôtel, le nombre de participants et les services choisis. Les établissements communiquent généralement un devis personnalisé en fonction de votre budget. Pour un séminaire résidentiel, un forfait séminaire comprenant l’hébergement, la restauration et les salles est souvent proposé. Le coût location peut bénéficier de tarifs négociés ou d’une offre spéciale selon la période. En moyenne, le prix par personne est calculé pour plus de transparence et d’optimisation de vos dépenses.",
    },
  ],
} as const;
