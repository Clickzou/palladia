/**
 * Offres d'emploi. À terme, candidates à une table Supabase `offres_emploi`
 * avec une date de clôture : une annonce pourvue ne doit pas rester en ligne.
 */
export const recrutement = {
  metaTitle: "Recrutement - Hôtel Palladia Toulouse",
  metaDescription:
    "L’Hôtel Palladia 4 étoiles à Toulouse recrute. Découvrez nos offres d’emploi et envoyez votre candidature.",
  titre: "Le restaurant de l’hôtel **** Palladia recrute !",
  accroche: "L’Hôtel Palladia recrute !",
  emailCandidature: "candidature@hotelpalladia.com",

  offres: [
    {
      poste: "Un(e) Maître d’hôtel",
      accroche:
        "Vous êtes passionné(e) par l’art de la restauration et recherchez un nouveau défi motivant ? Notre restaurant au sein d’un hôtel 4 étoiles est à la recherche d’un(e) Maître d’hôtel talentueux(se) pour rejoindre notre équipe.",
      responsabilites: [
        "Assurer un service impeccable aux clients avec professionnalisme.",
        "Assurer la coordination avec la cuisine.",
        "Avoir une expérience en banquet + restauration",
        "Service en chambre (room service)",
        "Formation du personnel",
        "Effectuer la présentation, la finition de certains plats (flambage, découpe de viandes ou poissons)",
        "Encaissement des notes",
        "Comptage des fonds de caisse",
        "Avoir une excellente présentation.",
        "Principalement travail du soir",
      ],
      conditions: [
        "Restaurant fermé le dimanche.",
        "2 jours de repos par semaine.",
        "1 an d’expérience",
        "Anglais courant",
        "Permis B",
        "Salaire selon profil",
      ],
    },
  ],
} as const;
