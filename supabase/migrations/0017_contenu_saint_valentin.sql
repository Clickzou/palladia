-- ---------------------------------------------------------------------------
-- Contenu de l'article « Soirée Saint-Valentin 2026 ».
--
-- A jouer APRES 0016, dans une execution separee : PostgreSQL refuse
-- d'employer une valeur d'enum ajoutee dans la meme transaction.
--
-- Menu, forfaits et coordonnees releves sur le site en ligne. Les emojis
-- decoratifs des titres ne sont pas repris, conformement a la demande.
--
-- Relançable sans risque.
-- ---------------------------------------------------------------------------

update public.articles
set image_hero = '/images/blog/repas-saint-valentin-toulouse-palladia-2048x708.jpg',
    seo_title = 'Saint Valentin Magique au Palladia: Dîner 4 étoiles et Romance',
    seo_description = 'Célébrez l’amour avec une soirée inoubliable au Palladia. Gastronomie et ambiance romantique garanties pour la Saint Valentin.'
where slug = 'saint-valentin-toulouse' and locale = 'fr';

delete from public.article_blocs
where article_id in (
  select id from public.articles
  where slug = 'saint-valentin-toulouse' and locale = 'fr'
);

insert into public.article_blocs (article_id, ordre, type, contenu)
select a.id, v.ordre, v.type::bloc_type, v.contenu
from public.articles a,
(values
  (0, 'texte', '{
    "titre": "Saint-Valentin 2026 – Hôtel Palladia",
    "taille_titre": "grand",
    "centre": true,
    "fond_gris": true,
    "paragraphes": [
      "Au Salon Opéra, laissez-vous séduire par un **dîner gourmand** rythmé par l’orchestre [Mission 2](https://mission2.fr/), pour une soirée placée sous le signe de l’amour, de la gastronomie et de la musique live."
    ]
  }'::jsonb),

  (1, 'menu', '{
    "titre": "Menu Saint-Valentin",
    "entree": [
      "**Cocktail et ses canapés**",
      "**Amuse-bouche** Cappuccino de foie gras et champignons"
    ],
    "sections": [
      { "titre": "Entrée", "lignes": ["Lotte pochée, chou-fleur à l’hibiscus et vinaigrette aux agrumes"] },
      { "titre": "Plat", "lignes": ["Filet de bœuf poêlé, millefeuille de céleris au beurre noisette et grenade"] },
      { "titre": "Fromage", "lignes": ["Fromage de chez Betty"] },
      { "titre": "Dessert", "lignes": ["**Fleur d’amour** Biscuit amande, crémeux citron, chantilly parfumée à la menthe"] },
      { "titre": "Accord Mets et vins", "lignes": ["Deux verres de vin par personne"] }
    ],
    "tarif": { "label": "Tarif dîner", "montant": "90 € par personne" }
  }'::jsonb),

  (2, 'cartes', '{
    "titre": "Nos forfaits romantiques",
    "cartes": [
      {
        "titre": "Forfait Séjour Romantique",
        "paragraphes": ["320 € pour deux personnes"],
        "liste": [
          "Dîner pour deux personnes",
          "Nuit en chambre double Prestige",
          "Deux petits-déjeuners buffet"
        ]
      },
      {
        "titre": "Forfait Rêve à deux",
        "paragraphes": ["249 € pour deux personnes"],
        "liste": [
          "Nuit en chambre double Prestige",
          "Deux petits-déjeuners buffet",
          "Deux massages de 30 minutes"
        ]
      }
    ]
  }'::jsonb),

  (3, 'texte', '{
    "titre": "Réservations",
    "taille_titre": "grand",
    "centre": true,
    "paragraphes": [
      "**Contact Hôtel Palladia**\n[05 62 12 01 79](tel:+33562120179) — [reservation@hotelpalladia.com](mailto:reservation@hotelpalladia.com)",
      "**Réservation de votre soin auprès du Spa**\n[05 62 86 94 09](tel:+33562869409)"
    ]
  }'::jsonb)
) as v(ordre, type, contenu)
where a.slug = 'saint-valentin-toulouse' and a.locale = 'fr';
