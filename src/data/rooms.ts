/**
 * Les 4 categories de chambres. Textes et URLs repris a l’identique du site
 * WordPress (cache WP Rocket du 2 decembre 2025).
 */
export type Room = {
  slug: string;
  /** Titre du hero (H1) */
  hero: string;
  /** Titre de la section editoriale (H2) */
  heading: string;
  /** Libelle du fil d’Ariane */
  breadcrumb: string;
  /** Titre court, utilise sur la page listing /chambres */
  titreCourt: string;
  /** Resume affiche sur la carte de la page listing */
  resume: string;
  metaTitle: string;
  metaDescription: string;
  ctaHero: string;
  surface: string;
  /** Chapo d’introduction, toujours affiche en gras */
  lead: string;
  paragraphs: string[];
  heroImage: string;
  gallery: { src: string; alt: string }[];
};

export const rooms: Room[] = [
  {
    slug: "preference",
    titreCourt: "Confort",
    resume:
      "Les chambres CONFORT de 27 m² incarnent l’élégance avec leurs lignes épurées et l’harmonie des teintes chaudes, enveloppant l’environnement d’une atmosphère accueillante et réconfortante",
    hero: "La Chambre confort",
    heading: "La Chambre Confort",
    breadcrumb: "La Chambre confort",
    metaTitle: "Chambre Confort - Le Palladia hôtel 4 étoiles Toulouse",
    metaDescription:
      "Les chambres CONFORT sont des chambres aux lignes épurées et couleurs chaudes, qui leurs confèrent une ambiance chaleureuse et cocooning.",
    ctaHero: "Réservez la Chambre Confort",
    surface: "27 m²",
    lead: "Les chambres CONFORT sont des chambres aux lignes épurées et couleurs chaudes, qui leurs confèrent une ambiance chaleureuse et cocooning.",
    paragraphs: [
      "Elles sont composées d’un lit de 180*200cm, d’un espace bureau et d’un coin lecture. Nous vous proposons une literie de qualité pour un confort optimal. Les écrans sont full HD et vous proposent un bouquet de chaînes internationales et Canal +. La salle de bains est bien sûr séparée des commodités.",
      "Cette catégorie de chambres est très agréable et invite à la détente. Un plateau de courtoisie est à votre disposition avec une bouilloire, des dosettes de thé, cafés et tisanes.",
      "WIFI par fibre optique vous est offerte. La chambre dispose également d’un coffre sécurisé pour vos objets de valeur. Ces chambres sont idéales si vous souhaitez profiter des services d’un hôtel 4 étoiles aussi bien pour un séjour d’affaires que pour un week-end de détente.",
    ],
    heroImage: "/images/chambres/confort-hero.jpg",
    // Une seule image sur cette page : le site n’y affiche pas de carrousel
    gallery: [
      { src: "/images/chambres/confort-1.jpg", alt: "Chambre Confort de l’Hôtel Palladia" },
    ],
  },
  {
    slug: "platinium",
    titreCourt: "Prestige",
    resume:
      "La chambre PRESTIGE, d’une surface de 27 m², offre une expérience luxueuse où les nuances chatoyantes de cuivre, de bronze et d’argent fusionnent harmonieusement avec un mobilier raffiné et des textures haut de gamme",
    hero: "La Chambre Prestige",
    heading: "La chambre Prestige",
    breadcrumb: "La Chambre Prestige",
    metaTitle: "Chambre Prestige - Le Palladia hôtel 4 étoiles Toulouse",
    metaDescription:
      "La chambre PRESTIGE est une chambre luxueuse de 27 m² où les couleurs cuivrées, bronze ou argentées se mêlent à un mobilier de grande qualité.",
    ctaHero: "Réservez la Chambre Prestige",
    surface: "27 m²",
    lead: "La chambre PRESTIGE est une chambre luxueuse de 27 m².",
    paragraphs: [
      "Notre literie est de grande qualité pour un confort optimal. Les écrans sont full HD et vous proposent un bouquet de chaînes internationales et Canal +. La salle de bains dispose de baignoire ou douche. Les WC sont indépendants.",
      "Cette chambre est résolument une chambre de standing. Un plateau de courtoisie est à votre disposition avec une machine à café, des dosettes de thé, cafés et tisanes. WIFI offerte. La chambre dispose également d’un coffre sécurisé pour vos objets de valeur et d’une table avec fer à repasser.",
    ],
    heroImage: "/images/chambres/prestige-hero.jpg",
    gallery: [
      { src: "/images/chambres/prestiges-matelassees.jpg", alt: "Chambre Prestige, tête de lit matelassée" },
      { src: "/images/chambres/prestige-bleue.jpg", alt: "Chambre Prestige aux teintes bleutées" },
      { src: "/images/chambres/prestige-doree.jpg", alt: "Chambre Prestige aux teintes dorées" },
      { src: "/images/chambres/prestiges-rayures.jpg", alt: "Chambre Prestige, décor à rayures" },
      { src: "/images/chambres/prestige-sdb.jpg", alt: "Salle de bains de la Chambre Prestige" },
    ],
  },
  {
    slug: "suite-junior",
    titreCourt: "Junior Suite",
    resume:
      "La JUNIOR SUITE, spacieuse avec ses 47 m², offre une expérience unique grâce à son salon intégré à la chambre. Dotée d’un design contemporain et de meubles vibrants, cette suite promet de captiver votre attention",
    hero: "Suites Juniors",
    heading: "La Junior Suite",
    breadcrumb: "Suite Junior",
    metaTitle: "Suite Junior - Le Palladia hôtel 4 étoiles Toulouse",
    metaDescription:
      "La chambre JUNIOR SUITE est une suite de 47 m² composée d’un réel espace salon dans la chambre. Colorée et contemporaine.",
    ctaHero: "Réservez la Suite Junior",
    surface: "47 m²",
    lead: "La chambre JUNIOR SUITE est une suite de 47 m² composée d’un réel espace salon dans la chambre. Coloré et contemporain, le mobilier et le design de cette chambre saura vous séduire.",
    paragraphs: [
      "Elle est composée d’un lit (180*200cm), d’un espace salon, d’une partie bureau et d’un coin lecture. Nous vous proposons une literie de qualité pour un confort optimal. Les écrans sont full HD et vous proposent un bouquet de chaînes internationales et Canal +. La salle de bains est équipée d’une baignoire d’angle deux places et double vasque. Les WC sont indépendants.",
      "Cette chambre spacieuse allie originalité, design et qualité. Une machine expresso est à votre disposition avec des dosettes de thé, cafés et tisanes. WIFI par fibre optique et une bouteille d’eau minérale vous sont offerts. Un coffre sécurisé pour vos objets de valeur est également à votre disposition ainsi qu’une planche et son fer à repasser, un peignoir, des chaussons et un assortiment varié de produits d’accueil.",
      "Décorée avec goût cette chambre est parfaite pour vous si l’harmonie et l’espace sont vos priorités autant que le raffinement et le soin apportés à un service haut de gamme.",
    ],
    heroImage: "/images/chambres/junior-hero.jpg",
    gallery: [
      { src: "/images/chambres/junior-1.jpg", alt: "Suite Junior de l’Hôtel Palladia" },
      { src: "/images/chambres/junior-2.jpg", alt: "Espace salon de la Suite Junior" },
    ],
  },
  {
    slug: "la-suite",
    titreCourt: "La Suite",
    resume:
      "LA SUITE se divise en deux espaces distincts, comprenant une chambre élégante et un salon lumineux avec un accès direct à une terrasse privée, offrant ainsi une surface généreuse de 47 m²",
    hero: "La Suite",
    heading: "La suite",
    breadcrumb: "La Suite",
    metaTitle: "La suite - Le Palladia hôtel 4 étoiles Toulouse",
    metaDescription:
      "La SUITE est composée de deux pièces séparées, une chambre et un salon donnant sur une terrasse privative, pour une superficie de 47 m².",
    ctaHero: "Réservez la Suite",
    // Le site d’origine se contredit : 47 m² dans le bandeau, 54 m² dans le
    // texte. L’hotelier a tranche pour 47 m², repris partout ci-dessous.
    surface: "47 m²",
    lead: "La SUITE est composée de deux pièces séparées, une chambre et un salon donnant sur une terrasse privative, pour une superficie totale de 47 m².",
    paragraphs: [
      "La chambre est composée d’un lit 180×200, d’une partie bureau et d’un coin lecture. Les écrans sont full HD avec un bouquet de 50 chaines internationales et Canal +. La suite dispose d’une salle de bains avec baignoire et d’une deuxième salle de bain comportant une douche.",
      "Le salon est composé d’un canapé deux places avec table basse, et d’une salle d’eau. Le salon donne sur une grande terrasse privative.",
      "Cette suite est superbe, le velours et les couleurs chaudes créent une atmosphère feutrée et intime. Un plateau de courtoisie est à votre disposition avec une bouilloire, machine à café, des dosettes de thé, cafés et tisanes. Le WIFI par fibre optique et une bouteille d’eau minérale vous sont offerts. Un coffre sécurisé pour vos objets de valeur est également à votre disposition ainsi qu’une planche et son fer à repasser, un peignoir, des chaussons et un assortiment varié de produits d’accueil. Vous pourrez également profiter des services avec supplément tels que le minibar, le service de blanchisserie et le room service.",
    ],
    heroImage: "/images/chambres/suite-hero.jpg",
    gallery: [
      { src: "/images/chambres/suite-1.jpg", alt: "Salon de la Suite avec terrasse privative" },
    ],
  },
];

export const getRoom = (slug: string) => rooms.find((r) => r.slug === slug);
