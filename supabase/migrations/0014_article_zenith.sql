-- ---------------------------------------------------------------------------
-- Article « Zenith de Toulouse & Hôtel Palladia ».
--
-- L'archive All-in-One datait de la version 2024 (code ZENITH24, remise 10 %).
-- L'article a ete entierement reecrit depuis : contenu, structure et visuels
-- releves sur https://www.hotelpalladia.com/zenith-de-toulouse-hotel-palladia/
--
-- Ajoute au passage `titre_page` : le site affiche un titre d'article different
-- du titre WordPress utilise dans le fil d'Ariane et les vignettes.
--
-- Relançable sans risque.
-- ---------------------------------------------------------------------------

alter table public.articles add column if not exists titre_page text;

update public.articles
set titre_page   = 'Hôtel près du Zénith de Toulouse : séjournez à l’Hôtel Palladia',
    sous_titre   = 'Prolongez votre concert en réservant une nuit à l’Hôtel Palladia !',
    seo_title    = 'Zénith de Toulouse : Séjournez au Luxueux Hôtel Palladia 4*',
    seo_description = 'Découvrez le confort exceptionnel de l’Hôtel Palladia, situé près du Zénith de Toulouse. Luxe et détente assurés pour tous les visiteurs.',
    chapo        = 'À deux pas du Zénith de Toulouse, l’Hôtel Palladia 4 étoiles offre une expérience de luxe inoubliable, parfaite pour les amateurs de concerts et événements.'
where slug = 'zenith-de-toulouse-hotel-palladia' and locale = 'fr';

delete from public.article_blocs
where article_id in (
  select id from public.articles
  where slug = 'zenith-de-toulouse-hotel-palladia' and locale = 'fr'
);

insert into public.article_blocs (article_id, ordre, type, contenu)
select a.id, v.ordre, v.type::bloc_type, v.contenu
from public.articles a,
(values
  -- Bandeau doré : l'offre tarifaire
  (0, 'bandeau', '{
    "texte": "Nous vous proposons un avantage tarifaire de",
    "accent": "20% sur votre nuitée",
    "suite": "le soir de votre événement",
    "sous_texte": "en renseignant le code : ZENITH26"
  }'::jsonb),

  -- Chapeau, fond blanc
  (1, 'texte', '{
    "paragraphes": [
      "Vous recherchez un hôtel près du Zénith de Toulouse pour assister à un concert, un spectacle ou un événement ? Situé à seulement quelques minutes de la salle, [Hôtel Palladia](/) est l’adresse idéale pour profiter pleinement de votre soirée dans la Ville Rose.",
      "Cet hôtel 4 étoiles proche du Zénith Toulouse permet de rejoindre facilement les concerts et spectacles tout en profitant d’un cadre confortable et haut de gamme. Grâce à sa situation privilégiée dans le quartier de Purpan, l’établissement offre un accès rapide au Zénith, à l’aéroport Toulouse-Blagnac et au centre-ville."
    ]
  }'::jsonb),

  -- Proximité — fond gris, visuel à droite
  (2, 'texte_image', '{
    "fond_gris": true,
    "titre": "Un hôtel proche du Zénith Toulouse pour vos concerts et spectacles",
    "position": "droite",
    "ratio": "1024 / 611",
    "image": "/images/hotel-toulouse-luxe-4-1024x611.jpg",
    "alt": "La piscine extérieure de l’Hôtel Palladia à Toulouse",
    "paragraphes": [
      "Après un concert ou un spectacle, il est particulièrement agréable de retrouver rapidement le confort de sa chambre sans devoir traverser toute la ville. L’[Hôtel Palladia](/hotel) se trouve à proximité immédiate du Zénith de Toulouse : environ 15 minutes à pied ou seulement 4 minutes en voiture.",
      "C’est la solution idéale pour :"
    ],
    "liste": [
      "dormir près du Zénith Toulouse après un concert",
      "éviter les transports tardifs",
      "profiter d’un hôtel calme et confortable",
      "prolonger votre soirée en toute sérénité"
    ],
    "apres": [
      "Que vous veniez pour un concert, un spectacle humoristique ou une tournée nationale, choisir un hôtel à côté du Zénith Toulouse permet de vivre votre événement sans stress."
    ]
  }'::jsonb),

  -- Parking — fond blanc, visuel à gauche
  (3, 'texte_image', '{
    "titre": "Hôtel avec parking proche Zénith Toulouse",
    "position": "gauche",
    "ratio": "1024 / 472",
    "image": "/images/hotel-palladia-toulouse-1024x472.webp",
    "alt": "La façade illuminée de l’Hôtel Palladia à Toulouse",
    "paragraphes": [
      "L’un des grands avantages du Palladia est son parking gratuit de 300 places, particulièrement apprécié les soirs d’événements.",
      "De nombreux visiteurs recherchent un hôtel proche Zénith Toulouse avec parking gratuit afin d’éviter les difficultés de stationnement autour de la salle de spectacle. En séjournant au Palladia, vous profitez d’un accès simple et pratique avant et après votre concert.",
      "**Hôtel 4 étoiles avec spa près du Zénith de Toulouse**"
    ],
    "apres": ["L’établissement propose :"],
    "apres_liste": [
      "un espace bien-être et spa",
      "une salle de fitness",
      "une piscine extérieure",
      "des chambres spacieuses et confortables",
      "un restaurant raffiné",
      "un room service 24h/24"
    ]
  }'::jsonb),

  -- Où dormir — fond gris, visuel à droite
  (4, 'texte_image', '{
    "fond_gris": true,
    "titre": "Où dormir après un concert au Zénith de Toulouse ?",
    "position": "droite",
    "ratio": "1024 / 611",
    "image": "/images/chambre-prestige-terrasse-hotel-palladia-1024x611.jpg",
    "alt": "Une chambre Prestige avec terrasse de l’Hôtel Palladia",
    "paragraphes": [
      "Pour savoir où dormir après un concert au Zénith de Toulouse, l’Hôtel Palladia représente un excellent choix grâce à son emplacement, son confort et ses services premium.",
      "L’établissement propose régulièrement des offres dédiées avec des avantages tarifaires pour les spectateurs du Zénith.",
      "Que vous recherchiez :"
    ],
    "liste": [
      "un hôtel concert Toulouse",
      "un hébergement Zénith Toulouse",
      "un hôtel proche salle de spectacle Toulouse",
      "une nuit d’hôtel après un concert au Zénith de Toulouse…"
    ],
    "conclusion": "le Palladia combine parfaitement accessibilité, confort et prestations 4 étoiles."
  }'::jsonb),

  -- Appel à la réservation
  (5, 'bouton', '{
    "boutons": [{
      "label": "Réservez votre hôtel proche du Zénith Toulouse",
      "href": "https://reservations.verticalbooking.com/premium/index.html?id_albergo=12425&dc=5376&lingua_int=fra&id_stile=19042",
      "externe": true
    }]
  }'::jsonb),

  (6, 'texte', '{
    "centre": true,
    "paragraphes": [
      "Les soirs de grands concerts, les hôtels proches du Zénith de Toulouse sont très demandés. Il est conseillé de réserver votre chambre à l’avance afin de bénéficier des meilleurs tarifs et de garantir votre place de parking.",
      "Pour votre prochain spectacle au Zénith, choisissez un hôtel proche, confortable et élégant avec spa, parking gratuit et accès rapide au centre de Toulouse."
    ],
    "note": "Lors de votre arrivée, le justificatif de votre billet vous sera demandé."
  }'::jsonb),

  -- Infos pratiques — fond gris, grand titre
  (7, 'texte', '{
    "fond_gris": true,
    "centre": true,
    "titre": "Infos Pratiques",
    "taille_titre": "grand",
    "paragraphes": [
      "Nous disposons d’un Parking de 300 places gratuit.",
      "**Pour se rendre au zénith :**",
      "A pieds : 15 minutes\nEn voiture : 4 minutes\nTransport en commun : Avec les bus 45 ou L2 (arrêt devant le PALLADIA) ou le tram T1 (Arrêt Purpan)"
    ],
    "boutons": [{
      "label": "Retrouvez la Programmation du zénith de Toulouse",
      "href": "https://zenith-toulousemetropole.com/",
      "externe": true
    }]
  }'::jsonb)
) as v(ordre, type, contenu)
where a.slug = 'zenith-de-toulouse-hotel-palladia' and a.locale = 'fr';
