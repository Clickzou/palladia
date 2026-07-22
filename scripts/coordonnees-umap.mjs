/**
 * Releve les coordonnees des lieux de la carte uMap de l'hotel.
 *
 * La carte etait integree en iframe : ses fiches, stockees chez
 * OpenStreetMap, restaient en français dans les trois langues. On rapatrie
 * ici les positions pour dessiner la carte nous-memes, a partir des lieux de
 * src/data/tourisme.ts qui, eux, sont traduits.
 *
 *   node scripts/coordonnees-umap.mjs
 */
const CARTE = 1241892;
const COUCHES = [
  "730b6aca-b91c-40ec-a804-10bebc1813c4",
  "ca115bc6-f79c-47e0-bf53-9fa8d8beca15",
  "b74a45f0-4810-4845-9071-a8293fe5c699",
];

/** uMap enrobe les intitules de balises de mise en forme. */
const nettoyer = (v) =>
  (v ?? "")
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

/** Comparaison tolerante aux accents, a la casse et a la ponctuation. */
const clef = (v) =>
  nettoyer(v)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]/gi, "")
    .toLowerCase();

/**
 * Cinq lieux sont nommes autrement sur la carte que dans nos donnees — dont
 * « Citée de l'Espace », coquille heritee du site WordPress.
 */
const ALIAS = {
  "Canal du Midi": "Canal du Midi : Location & Balade en vélo",
  "Citée de l’Espace": "Cité de l'Espace",
  "Let’s Visit Airbus": "Let’s Visit Airbus - Manatour",
  "Muséum Histoire Naturelle": "Muséum d'Histoire Naturelle",
  "Wam Park Toulouse": "Wam Park - Toulouse - Sesquières",
};

const points = new Map();
for (const couche of COUCHES) {
  const rep = await fetch(`https://umap.openstreetmap.fr/fr/datalayer/${CARTE}/${couche}/`);
  const { features } = await rep.json();
  for (const f of features) {
    if (f.geometry?.type !== "Point") continue;
    const nom = nettoyer(f.properties.name);
    if (!nom) continue;
    const [lng, lat] = f.geometry.coordinates;
    points.set(clef(nom), { nom, lat: +lat.toFixed(6), lng: +lng.toFixed(6) });
  }
}

const { tourisme } = await import("../src/data/tourisme.ts");

const trouves = [];
const absents = [];
for (const lieu of tourisme.lieux) {
  const p = points.get(clef(ALIAS[lieu.nom] ?? lieu.nom));
  if (p) trouves.push({ nom: lieu.nom, lat: p.lat, lng: p.lng });
  else absents.push(lieu.nom);
}

console.error(`${trouves.length} lieux situes, ${absents.length} sans position`);
if (absents.length) console.error("Sans position : " + absents.join(", "));
console.error("Points uMap inutilises : " + [...points.values()].map((p) => p.nom).join(" | "));

console.log(
  trouves.map((l) => `    { nom: ${JSON.stringify(l.nom)}, lat: ${l.lat}, lng: ${l.lng} },`).join("\n"),
);
