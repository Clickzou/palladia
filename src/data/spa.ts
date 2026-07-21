/**
 * Contenu de la page Spa.
 * Les tarifs des forfaits evoluent : candidats a une table Supabase `forfaits`.
 */
export const spa = {
  metaTitle: "Spa - Le Palladia hôtel 4 étoiles Toulouse",
  metaDescription:
    "Le spa de 300 m² de l’Hôtel Palladia à Toulouse : jacuzzi, hammam, massages et soins du visage. Ouvert à tous, 7 jours sur 7.",
  title: "Le Spa",
  subtitle: "Un havre de tranquillité niché au cœur de Toulouse",

  intro:
    "Bienvenue au spa de l’Hôtel Palladia, un havre de tranquillité niché au cœur de Toulouse, où le luxe et la détente se rencontrent harmonieusement. Notre spa offre une expérience sensorielle conçue pour apaiser l’esprit, revitaliser le corps et raviver les sens.",

  presentation:
    "Le SPA de 300m2 est situé dans le Batiment 2, sur le site de l’hôtel PALLADIA. Découvrez cet espace entièrement dédié à la détente et à la beauté. Nous vous précisons que le Spa est ouvert à tous et n’est pas réservé à l’unique clientèle de l’hôtel Palladia.",

  horaires: [
    "Lundi de 13h00 à 19h00",
    "Mardi de 14h00 à 19h00",
    "Mercredi de 14h00 à 20h00",
    "Jeudi de 10h00 à 19h00",
    "Vendredi de 10h00 à 20h00",
    "Samedi 10h00 à 19h00",
    "Dimanche de 10h00 à 18h00",
  ],
  fermeture: "Fermeture les jours fériés.",
  telephone: "05 62 86 94 09",
  telephoneHref: "tel:+33562869409",

  carrousel: [
    { src: "/images/spa/carrousel-1.jpg", alt: "Jacuzzi du spa" },
    { src: "/images/spa/carrousel-2.jpg", alt: "Cabine de soin" },
    { src: "/images/spa/carrousel-3.jpg", alt: "Espace détente" },
    { src: "/images/spa/carrousel-4.jpg", alt: "Hammam" },
    { src: "/images/spa/carrousel-5.jpg", alt: "Salle de repos" },
    { src: "/images/spa/carrousel-7.jpg", alt: "Espace bien-être" },
  ],

  forfaitsTitre: "Les formules Hôtel & Spa",
  forfaits: [
    {
      nom: "Forfait Bien Être Duo",
      prix: "299 €",
      pour: "pour 2 personnes",
      inclus: [
        "Une Nuit en chambre double Confort",
        "Deux petits-déjeuners",
        "Deux accès au Spa de 30 minutes",
        "Un massage de 45 minutes par personne",
      ],
    },
    {
      nom: "Forfait Plaisir & Détente",
      prix: "365 €",
      pour: "pour 2 personnes",
      inclus: [
        "Une nuit en chambre Prestige",
        "Accueil VIP avec une 1/2 bouteille de champagne et mignardises",
        "Restauration : bénéficiez de 30 euros par personne, valable sur l’ensemble de la carte du restaurant ou le menu du jour (hors boissons).",
        "Deux petits-déjeuners",
        "Un massage de 30 min par personne",
      ],
    },
    {
      nom: "Forfait Palladia",
      prix: "440 €",
      pour: "pour 2 personnes",
      inclus: [
        "Une nuit en Suite Junior et 2 petits-déjeuners",
        "Restauration : bénéficiez de 30 euros par personne, valable sur l’ensemble de la carte du restaurant ou le menu du jour (hors boissons) et d’une 1/2 bouteille de Champagne servie à l’apéritif ou au dessert et douceurs en fin de repas",
        "Massage relaxant de 30 minutes + un soin de visage coup d’éclat",
      ],
    },
  ],

  cgvTitre: "* Extrait de nos conditions générales de ventes",
  cgv: [
    "Nous remercions notre aimable clientèle de bien vouloir se présenter au Spa dix minutes avant l’horaire de la prestation.",
    "Tout retard sera décompté sur le temps du soin. Toute prestation non annulée 48h avant sera due.",
    "Accès au Jacuzzi et hammam muni obligatoirement d’un maillot de bain.",
    "L’entrée au Spa est exclusivement réservée aux plus de 16 ans.",
    "Certains soins sont déconseillés pendant la grossesse. Nous vous recommandons de demander conseil à votre médecin.",
    "Les massages sont effectués par un personnel formé au massage femme enceinte (en fonction du personnel présent)",
  ],
} as const;
