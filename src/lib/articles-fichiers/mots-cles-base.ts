/**
 * Requête visée (`motCle`) de chaque article publié EN BASE, pour le tableau
 * de bord Clickzou. Les articles fichiers portent la leur dans leur JSON.
 *
 * Établi le 06/10/2026, sans aucun volume inventé, dans cet ordre de sources :
 *   1. le mot-clé déclaré par la migration qui a créé l'article ;
 *   2. sinon la requête hors marque qui apporte le plus d'impressions à la
 *      page dans la Search Console (90 jours, 05/07 → 03/10/2026 ; règle
 *      Clickzou « top requête GSC = cible »), recoupée avec l'audit
 *      clickzou-v2 docs/audits-articles/2026-10/palladia.md ;
 *   3. sinon (aucune requête hors marque), le sujet du slug, dit comme tel.
 * Les chiffres ne sont PAS repris ici : le tableau de bord lit lui-même la
 * Search Console.
 */
export const MOTS_CLES_BASE: Record<string, { motCle: string; source: string }> = {
  "sortir-a-toulouse-spectacles": { motCle: "sortir à Toulouse", source: "migration 0072" },
  "seminaire-residentiel-toulouse": { motCle: "séminaire résidentiel toulouse", source: "migration 0065" },
  "formats-evenements-professionnels-toulouse": {
    motCle: "format événement professionnel",
    source: "question Pulse « Quel format choisir pour un événement professionnel ? » (GSC trop faible)",
  },
  "choisir-lieu-seminaire-toulouse": { motCle: "séminaire toulouse", source: "GSC" },
  "zenith-de-toulouse-hotel-palladia": { motCle: "hotel zenith toulouse", source: "GSC" },
  "saint-valentin-toulouse": { motCle: "hotel toulouse saint valentin", source: "GSC" },
  // « soirée nouvel an toulouse 2026 » est la première requête, mais l'article
  // est intemporel (décision du 10/09/2026) : la variante sans année.
  "reveillon-toulouse": { motCle: "nouvel an toulouse", source: "GSC + audit 2026-10" },
  "ou-dormir-proche-aeroport-toulouse": { motCle: "hotel aeroport toulouse", source: "GSC" },
  "diner-spectacles-toulouse": { motCle: "diner spectacle toulouse", source: "GSC + audit 2026-10" },
  "sejour-en-famille-a-toulouse-hotel-palladia": { motCle: "hotel famille toulouse", source: "GSC + audit 2026-10" },
  adelya: { motCle: "adelya fidélité", source: "GSC" },
  "lhotel-palladia-un-voyage-dans-lexcellence-hoteliere-et-levenementiel-a-toulouse": {
    motCle: "georges miatto",
    source: "GSC",
  },
  "amphitheatre-hotel-palladia-renove": { motCle: "amphithéâtre toulouse", source: "GSC + audit 2026-10" },
  "staycation-toulouse": { motCle: "staycation toulouse", source: "GSC + audit 2026-10" },
  "les-temps-forts-de-lhotel-palladia": { motCle: "hotel palladia spectacle", source: "GSC (seule requête, de marque)" },
  "le-jardin-du-barry-a-toulouse-le-poumon-vert-de-la-cartoucherie": { motCle: "jardin du barry", source: "GSC" },
  "theatre-le-grenier-de-toulouse": { motCle: "théâtre le grenier de toulouse", source: "slug (aucune requête GSC)" },
  "afterwork-toulouse": { motCle: "afterwork toulouse", source: "GSC + audit 2026-10" },
  "hotel-palladia-x-orchestre-de-chambre-de-toulouse": {
    motCle: "orchestre de chambre de toulouse",
    source: "slug (seule requête GSC : la marque)",
  },
  "mariage-hotel-palladia-toulouse": { motCle: "hôtel mariage toulouse", source: "GSC + audit 2026-10" },
};
