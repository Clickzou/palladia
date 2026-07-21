#!/usr/bin/env node
/**
 * Blocs de l'article « Comment choisir le meilleur lieu… », structures d'apres
 * la mise en page reelle : cartes, bandeau photo et carrousel, et non une
 * simple suite de paragraphes.
 */
import { writeFileSync } from "node:fs";

const SLUG = "choisir-lieu-seminaire-toulouse";

const blocs = [
  // 1. Introduction, centree sous le visuel principal
  {
    type: "texte",
    contenu: {
      centre: true,
      paragraphes: [
        "Organiser un séminaire à Toulouse est une excellente opportunité pour fédérer ses équipes, lancer un nouveau projet ou réunir collaborateurs et partenaires dans un cadre propice aux échanges. Mais face à la diversité des lieux disponibles dans la Ville Rose, comment choisir l’établissement le plus adapté à votre événement professionnel ?",
        "Entre accessibilité, qualité des infrastructures, capacité d’accueil et services associés, plusieurs critères doivent être pris en compte pour garantir la réussite de votre séminaire.",
      ],
    },
  },

  // 2. Toulouse, destination ideale — visuel a gauche
  {
    type: "texte_image",
    contenu: {
      titre: "Toulouse : une destination idéale pour les événements professionnels",
      paragraphes: [
        "Capitale économique de l’Occitanie et berceau de l’industrie aéronautique européenne, Toulouse attire chaque année de nombreuses entreprises pour leurs réunions, conventions et séminaires.",
        "La ville bénéficie d’atouts majeurs :",
      ],
      liste: [
        "Une excellente accessibilité grâce à l’aéroport Toulouse-Blagnac.",
        "Un réseau de transports performant.",
        "Un cadre de vie reconnu pour sa qualité.",
        "Une forte attractivité économique.",
      ],
      image: "/images/blog/toulouse-garonne.jpg",
      alt: "La Garonne et le dôme de la Grave à Toulouse",
      position: "gauche",
    },
  },

  // 3. Les quatre criteres, en cartes
  {
    type: "cartes",
    contenu: {
      titre: "Les critères essentiels pour réussir un séminaire à Toulouse",
      cartes: [
        {
          titre: "Choisir un lieu\nfacilement accessible",
          image: "/images/blog/criteres/lieu-accessible.jpg",
          alt: "Entrée de l’Hôtel Palladia",
          paragraphes: [
            "Le premier critère concerne la localisation du lieu de séminaire.",
            "Vos collaborateurs doivent pouvoir rejoindre facilement l’établissement, qu’ils viennent de Toulouse ou d’autres régions.",
            "Un hôtel situé à proximité :",
          ],
          liste: ["de l’aéroport,", "du périphérique,", "du centre-ville,", "ou de la gare,"],
        },
        {
          titre: "Disposer de salles\nadaptées à chaque format",
          image: "/images/blog/criteres/salles-adaptees.webp",
          alt: "Salle de réunion équipée d’un écran",
          paragraphes: [
            "Toutes les entreprises n’ont pas les mêmes besoins.",
            "Un séminaire de direction de 10 personnes nécessite un espace différent d’une convention de plusieurs centaines de participants.",
            "Le lieu choisi doit pouvoir proposer :",
          ],
          liste: [
            "des salles de réunion modulables ;",
            "des espaces pour les ateliers ;",
            "des salons privatifs ;",
            "des équipements audiovisuels performants ;",
            "une connexion internet haut débit.",
          ],
        },
        {
          titre: "Proposer un hébergement\nsur place",
          image: "/images/blog/criteres/hebergement-sur-place.jpg",
          alt: "Chambre de l’Hôtel Palladia",
          paragraphes: [
            "Pour un séminaire résidentiel à Toulouse, la présence d’un hôtel constitue un avantage considérable.",
            "Les participants gagnent en confort et en disponibilité, tandis que l’entreprise simplifie considérablement l’organisation.",
            "L’hébergement sur place favorise également les moments informels entre collaborateurs, souvent essentiels à la cohésion d’équipe.",
          ],
        },
        {
          titre: "Offrir une restauration\nde qualité",
          image: "/images/blog/criteres/restauration-qualite.webp",
          alt: "Salle dressée pour un banquet",
          paragraphes: [
            "Les temps de repas participent pleinement à l’expérience globale d’un séminaire.",
            "Déjeuners d’affaires, cocktails, pauses gourmandes ou dîners d’entreprise permettent de prolonger les échanges dans un contexte plus convivial.",
            "Un établissement proposant une restauration sur place garantit davantage de fluidité dans l’organisation.",
          ],
        },
      ],
    },
  },

  // 4. Bandeau photo avec liste a coches et boutons
  {
    type: "bandeau_image",
    contenu: {
      image: "/images/salons/st-nicolas.png",
      titre: "Pourquoi choisir l’hôtel Palladia pour votre séminaire à Toulouse ?",
      paragraphes: [
        "De nombreuses entreprises privilégient aujourd’hui les hôtels séminaires pour centraliser l’ensemble de leurs besoins :",
      ],
      liste: [
        "salles de réunion ;",
        "hébergement ;",
        "restauration ;",
        "espaces de détente ;",
        "accompagnement logistique.",
      ],
      boutons: [
        { label: "Demandez un devis", href: "/devis?type=salle_reunion" },
        { label: "Voir toutes les salles", href: "/seminaire-evenement-professionnel" },
      ],
    },
  },
  {
    type: "texte",
    contenu: {
      centre: true,
      paragraphes: [
        "Cette formule permet de limiter les déplacements et d’offrir une expérience plus confortable aux participants.",
        "Les hôtels spécialisés dans l’événementiel professionnel disposent également d’équipes dédiées capables d’accompagner chaque projet de manière personnalisée.",
      ],
    },
  },

  // 5. L'hotel, reference — visuel a droite
  {
    type: "texte_image",
    contenu: {
      titre: "Hôtel Palladia : une référence pour les séminaires à Toulouse",
      paragraphes: [
        "Parmi les établissements dédiés aux événements professionnels, l’Hôtel Palladia s’impose comme l’un des lieux incontournables pour organiser un séminaire à Toulouse.",
        "Situé entre l’aéroport Toulouse-Blagnac et le centre-ville, l’établissement bénéficie d’un emplacement stratégique particulièrement apprécié des entreprises.",
      ],
      image: "/images/blog/palladia-piscine-exterieur.jpg",
      alt: "L’Hôtel Palladia et sa piscine extérieure",
      position: "droite",
    },
  },

  // 6. Infrastructures, en trois cartes
  {
    type: "cartes",
    contenu: {
      titre: "Des infrastructures uniques à Toulouse",
      titre_sous_image: true,
      cartes: [
        {
          titre: "L’Hôtel Palladia dispose notamment :",
          image: "/images/blog/infrastructures/amphitheatre.jpg",
          alt: "Amphithéâtre de 285 places",
          paragraphes: [],
          liste: [
            "d’un amphithéâtre de 285 places ;",
            "de 13 salles de réunion à la lumière du jour ;",
            "d’espaces modulables pouvant accueillir jusqu’à 400 participants ;",
            "d’une connexion internet haut débit ;",
            "d’un parking gratuit de 300 places.",
          ],
        },
        {
          titre: "Cette diversité permet d’organiser :",
          image: "/images/blog/infrastructures/salon-perchepinte.jpg",
          alt: "Salon Perchepinte en configuration réunion",
          paragraphes: [],
          liste: [
            "des réunions de direction ;",
            "des formations ;",
            "des conférences ;",
            "des conventions ;",
            "des lancements de produits ;",
            "des séminaires résidentiels.",
          ],
        },
        {
          titre: "Un accompagnement sur mesure",
          image: "/images/blog/infrastructures/soiree-privee.jpg",
          alt: "Soirée privée à l’Hôtel Palladia",
          paragraphes: [
            "L’équipe commerciale accompagne les entreprises dans la préparation de leur projet afin de proposer une solution adaptée aux objectifs, au nombre de participants et au budget.",
            "Cette approche personnalisée constitue un véritable atout pour garantir la réussite de chaque manifestation professionnelle.",
          ],
        },
      ],
    },
  },

  // 7. Offre complete + carrousel
  {
    type: "texte",
    contenu: {
      titre: "Une offre complète pour vos collaborateurs",
      paragraphes: ["Au-delà des espaces de travail, l’établissement propose :"],
      liste: [
        "90 chambres et suites ;",
        "un restaurant mettant à l’honneur les produits frais ;",
        "un espace bien-être ;",
        "une piscine extérieure ;",
        "des prestations adaptées aux séminaires résidentiels.",
      ],
    },
  },
  {
    type: "texte",
    contenu: {
      paragraphes: [
        "Les participants bénéficient ainsi d’un environnement favorable à la fois à la concentration et à la détente.",
      ],
    },
  },
  {
    type: "carrousel",
    contenu: {
      images: [
        { src: "/images/chambres/prestige-hero.jpg", alt: "Chambre de l’Hôtel Palladia" },
        { src: "/images/spa/vue-2.jpg", alt: "Espace bien-être et jacuzzi" },
        { src: "/images/salons/saint-georges.png", alt: "Salle de réunion équipée" },
      ],
    },
  },

  // 8. Tendances
  {
    type: "texte",
    contenu: {
      titre: "Les nouvelles tendances des séminaires d’entreprise",
      paragraphes: [
        "Les attentes des entreprises évoluent. Aujourd’hui, les organisateurs recherchent davantage :",
      ],
      liste: [
        "d’expériences collaboratives ;",
        "d’activités de team building ;",
        "de formats hybrides ;",
        "d’événements plus responsables ;",
        "d’espaces favorisant les échanges informels.",
      ],
    },
  },
  {
    type: "texte",
    contenu: {
      paragraphes: [
        "Les lieux capables de proposer des solutions flexibles et innovantes répondent mieux à ces nouvelles exigences.",
      ],
    },
  },

  // 9. Conclusion
  {
    type: "texte",
    contenu: {
      titre: "Organisez votre prochain séminaire à Toulouse",
      paragraphes: [
        "Le choix du lieu constitue l’un des facteurs clés de réussite d’un événement professionnel.",
        "Accessibilité, qualité des infrastructures, hébergement, restauration et accompagnement sont autant d’éléments qui influencent l’expérience des participants.",
        "Si vous recherchez un hôtel séminaire à Toulouse capable d’accueillir aussi bien une réunion de direction qu’une convention de grande envergure, découvrez notre offre dédiée aux entreprises et événements professionnels.",
        "Nos équipes vous accompagnent dans la conception de votre événement sur mesure afin de garantir une expérience réussie pour l’ensemble de vos collaborateurs.",
      ],
    },
  },
  {
    type: "bouton",
    contenu: {
      boutons: [{ label: "Séminaire à Toulouse", href: "/seminaire-evenement-professionnel" }],
    },
  },
];

const q = (v) => `'${String(v).replace(/'/g, "''")}'`;
const id = `(select id from public.articles where slug = ${q(SLUG)} and locale = 'fr')`;

const lignes = [
  "-- Corps de l'article « Comment choisir le meilleur lieu pour organiser un",
  "-- séminaire à Toulouse ? », structuré d'après la mise en page du site.",
  "-- Prérequis : 0011. Relançable sans risque.",
  "",
  "begin;",
  "",
  `delete from public.article_blocs where article_id = ${id};`,
  "",
];

blocs.forEach((b, i) => {
  lignes.push(
    "insert into public.article_blocs (article_id, ordre, type, contenu)",
    `values (${id}, ${i}, '${b.type}', ${q(JSON.stringify(b.contenu))}::jsonb);`,
  );
});

lignes.push(
  "",
  "-- Visuel principal : l'amphithéâtre, comme sur le site.",
  `update public.articles set image_hero = '/images/blog/seminaire-amphitheatre.webp',`,
  `  image_vignette = '/images/blog/seminaire-amphitheatre.webp', statut = 'publie'`,
  `  where slug = ${q(SLUG)} and locale = 'fr';`,
  "",
  "commit;",
);

writeFileSync("0012_blocs_choisir_lieu_seminaire.sql", lignes.join("\n"), "utf8");

const parType = blocs.reduce((a, b) => ({ ...a, [b.type]: (a[b.type] ?? 0) + 1 }), {});
console.log(`${blocs.length} blocs :`, JSON.stringify(parType));
