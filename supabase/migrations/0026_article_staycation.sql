-- ---------------------------------------------------------------------------
-- Article « Offre Staycation à l'Hôtel Palladia Toulouse ».
--
-- Article long, entierement absent de l'archive hors accroche. Contenu et
-- visuels releves sur le site en ligne. Les photos etaient posees en image de
-- fond CSS par Elementor : recuperees via scripts/recuperer-images.mjs.
--
-- A jouer APRES 0024 (type de bloc `sections`).
-- Les emojis decoratifs ne sont pas repris, conformement a la demande.
--
-- Relançable sans risque.
-- ---------------------------------------------------------------------------

update public.articles
set seo_title = 'Staycation Toulouse | Luxe & Détente à l’Hôtel Palladia',
    seo_description = 'Évadez-vous le temps d’un staycation à Toulouse : hôtel 4*, spa, bar et dîner gourmand. Luxe et relaxation au rendez-vous, réservez vite !',
    image_hero = null
where slug = 'staycation-toulouse' and locale = 'fr';

delete from public.article_blocs
where article_id in (
  select id from public.articles where slug = 'staycation-toulouse' and locale = 'fr'
);

insert into public.article_blocs (article_id, ordre, type, contenu)
select a.id, v.ordre, v.type::bloc_type, v.contenu
from public.articles a,
(values
  -- Accroche : visuel a gauche, texte a droite, dans la largeur de contenu
  (0, 'texte_image', '{
    "position": "gauche",
    "image": "/images/blog/soiree-theme-hotel-palladia-1.jpg",
    "alt": "La piscine et la façade de l’Hôtel Palladia à Toulouse",
    "paragraphes": [
      "Offrez-vous une **expérience staycation Toulouse** inédite dans un **hôtel 4 étoiles** où chaque instant devient une **parenthèse de luxe**. Profitez d’une **nuit exceptionnelle** avec **petit-déjeuner gourmand en room service**, un **spa** avec **hammam et sauna**, et un **late check-out** pour prolonger le plaisir. **Sirotez un cocktail au bar**, installez-vous en terrasse et laissez-vous porter par l’atmosphère unique de **Toulouse**. À quelques minutes du **Capitole en métro**, notre **restaurant gastronomique** vous propose un **dîner sur-mesure**, accompagné d’une **bouteille de champagne** pour une **escapade romantique** inoubliable. Après une **soirée élégante**, détendez-vous dans votre **chambre king-size**, savourez un massage relaxant et réveillez-vous en douceur.",
      "Avec nos **offres**, découvrez l’un des **meilleurs hôtels de luxe à Toulouse**, alliant **services haut de gamme**, **piscine privée** et **personnel attentionné**. Matin ou soir, chaque heure est précieuse : commencez la **journée avec un petit-déjeuner en salle**, flânez au cœur du **centre-ville**, ou laissez-vous séduire par un **coucher de soleil en bord de Garonne**. **Réservez dès maintenant** votre **staycation Toulouse** et profitez d’une **expérience exceptionnelle**."
    ]
  }'::jsonb),

  (1, 'texte', '{
    "fond_gris": true,
    "titre": "Découvrez notre offre exclusive de staycation à Toulouse",
    "paragraphes": [
      "Un **staycation**, c’est la promesse d’une **évasion sans quitter la ville**. À l’**Hôtel Palladia**, nous avons imaginé une **expérience unique**, combinant **bien-être, gastronomie et détente** pour une pause hors du temps. Situé dans un cadre élégant, à quelques minutes du **centre-ville de Toulouse**, notre établissement vous invite à **profiter pleinement de chaque instant**, sans contrainte de transport ni de long trajet.",
      "Notre **offre staycation Toulouse** a été pensée pour répondre à toutes vos envies : **relaxation absolue au spa**, **dégustation de mets raffinés**, ou simplement **une nuit de repos dans un cadre luxueux**."
    ]
  }'::jsonb),

  -- Les quatre prestations : visuel bord a bord, texte sur l’autre moitie
  (2, 'texte_image', '{
    "pleine_largeur": true,
    "position": "gauche",
    "image": "/images/blog/chambre-prestige-terrasse-hotel-palladia.jpg",
    "alt": "Une chambre Prestige de l’Hôtel Palladia",
    "titre": "Séjournez dans nos chambres et suites élégantes",
    "paragraphes": ["Nos **chambres et suites** vous garantissent un **confort absolu** :"],
    "liste": [
      "**Literie king-size** pour un sommeil réparateur",
      "**Salle de bain moderne** avec douche à l’italienne ou baignoire",
      "**Connexion Wi-Fi haut débit** pour rester connecté",
      "**TV écran plat avec chaînes internationales**",
      "**Service en chambre** pour un confort optimal"
    ],
    "conclusion": "Chaque détail a été pensé pour faire de votre **nuit à Toulouse** un **moment d’exception**."
  }'::jsonb),

  (3, 'texte_image', '{
    "pleine_largeur": true,
    "position": "droite",
    "image": "/images/blog/acces-spa-hotel-toulouse.jpg",
    "alt": "L’espace détente du spa de l’Hôtel Palladia",
    "titre": "Détendez-vous dans notre spa et centre de bien-être",
    "paragraphes": ["Évadez-vous dans un **espace dédié à la relaxation** et laissez-vous envelopper par une **atmosphère apaisante** :"],
    "liste": [
      "**Hammam et sauna**, pour purifier votre peau et votre esprit",
      "**Massages personnalisés**, réalisés par des experts du bien-être",
      "**Soins du visage et du corps**, avec des produits haut de gamme",
      "**Espace détente**, où le temps suspend son vol"
    ],
    "conclusion": "Notre **spa** est l’endroit idéal pour **une pause bien-être à Toulouse**."
  }'::jsonb),

  (4, 'texte_image', '{
    "pleine_largeur": true,
    "position": "gauche",
    "image": "/images/blog/plats-restaurant-palladia-toulouse-00007.jpg",
    "alt": "Un dessert du restaurant de l’Hôtel Palladia",
    "titre": "Savourez une cuisine raffinée dans notre restaurant",
    "paragraphes": ["Notre **restaurant gastronomique** vous invite à un **voyage culinaire**, où saveurs locales et créativité se rencontrent."],
    "liste": [
      "**Plats raffinés** élaborés à partir de produits frais et de saison",
      "**Sélection de vins d’exception**",
      "**Ambiance élégante et chaleureuse** pour un dîner en tête-à-tête ou un repas d’affaires"
    ],
    "conclusion": "Un **dîner romantique à Toulouse**, un **déjeuner d’exception**, ou une **expérience culinaire mémorable** vous attendent à l’**Hôtel Palladia**."
  }'::jsonb),

  (5, 'texte_image', '{
    "pleine_largeur": true,
    "position": "droite",
    "image": "/images/blog/piscine-hotel-4-etoiles-palladia.jpg",
    "alt": "La piscine extérieure de l’Hôtel Palladia au crépuscule",
    "titre": "Profitez de notre piscine extérieure",
    "paragraphes": ["Envie d’un **moment de détente absolu** ?"],
    "liste": [
      "**Piscine extérieure**, idéale pour se rafraîchir en été",
      "**Bar-lounge**, où siroter un **cocktail signature** en terrasse",
      "**Ambiance cosy et raffinée**, parfaite pour prolonger la soirée"
    ],
    "conclusion": "Installez-vous, détendez-vous et **laissez-vous porter par le charme de Toulouse**."
  }'::jsonb),

  (6, 'sections', '{
    "fond_gris": true,
    "titre": "Les avantages de notre offre staycation",
    "taille_titre": "moyen",
    "sections": [
      {
        "titre": "Tarifs exclusifs et prestations haut de gamme",
        "items": [
          "**Séjournez dans un hôtel 4 étoiles à Toulouse**",
          "**Accès au spa, hammam et sauna inclus**",
          "**Expérience sur-mesure, selon vos envies**"
        ]
      },
      {
        "titre": "Petit-déjeuner gourmand inclus",
        "intro": "Commencez la journée avec un **petit-déjeuner savoureux** :",
        "items": [
          "Viennoiseries fraîches et croustillantes",
          "Jus de fruits pressés et boissons chaudes",
          "Produits locaux et bio"
        ],
        "conclusion": "Dégustez votre **petit-déjeuner en salle** ou **en room service**, pour une **expérience encore plus cosy**."
      },
      {
        "titre": "Late check-out pour une détente prolongée",
        "items": [
          "Départ tardif pour **profiter pleinement de votre séjour**",
          "Plus de temps pour savourer **chaque instant**"
        ]
      }
    ]
  }'::jsonb),

  (7, 'texte_image', '{
    "pleine_largeur": true,
    "position": "droite",
    "image": "/images/blog/staycation-toulouse.jpg",
    "alt": "Toulouse au printemps",
    "titre": "Explorez Toulouse lors de votre staycation",
    "paragraphes": ["L’**Hôtel Palladia** est idéalement situé pour **découvrir Toulouse** et profiter de ses **trésors cachés**."]
  }'::jsonb),

  (8, 'sections', '{
    "sections": [
      {
        "titre": "Activités culturelles et touristiques à proximité",
        "items": [
          "Visitez le **Capitole**, le cœur de la ville",
          "Flânez au **Musée des Augustins** pour une immersion artistique",
          "Admirez la **Garonne** au coucher du soleil"
        ]
      },
      {
        "titre": "Shopping et gastronomie locale",
        "items": [
          "Découvrez les boutiques du **quartier Saint-Georges**",
          "Savourez les spécialités locales dans les **meilleurs restaurants de Toulouse**"
        ]
      }
    ]
  }'::jsonb),

  (9, 'sections', '{
    "fond_gris": true,
    "titre": "Nos offres spéciales pour un staycation sur-mesure",
    "taille_titre": "moyen",
    "intro": "Nous avons conçu des **expériences uniques** pour répondre à toutes vos envies.",
    "deux_colonnes": true,
    "sections": [
      {
        "titre": "1. Offre Bien-être & Relaxation",
        "items": [
          "**Accès spa & massage**, pour une pause détente",
          "**Nuitée et petit-déjeuner inclus**, pour une expérience complète"
        ]
      },
      {
        "titre": "Ce qu’en disent nos clients",
        "intro": "Nos clients apprécient particulièrement :",
        "items": [
          "**Le confort de nos chambres**",
          "**La qualité du service**",
          "**Le spa et les prestations bien-être**",
          "**La cuisine raffinée de notre restaurant**"
        ],
        "conclusion": "**Note moyenne : 4/5 sur Google Avis**"
      },
      {
        "titre": "2. Expérience gastronomique",
        "items": [
          "**Dîner gastronomique**, signé par notre chef",
          "**Dégustation de vins**, en accord avec les mets"
        ]
      },
      {
        "titre": "3. Séjour Romantique",
        "items": [
          "**Chambre décorée**, avec pétales de **roses** et bougies",
          "**Bouteille de champagne offerte**, pour une soirée élégante"
        ]
      }
    ]
  }'::jsonb),

  (10, 'texte', '{
    "centre": true,
    "titre": "Réservez votre staycation à l’Hôtel Palladia dès maintenant",
    "paragraphes": [
      "Ne manquez pas l’opportunité de vivre une **expérience unique à Toulouse**.",
      "**Offrez-vous un séjour d’exception**, entre détente et raffinement, et laissez-vous porter par le luxe et la sérénité.",
      "**Réservez dès aujourd’hui votre staycation Toulouse** et profitez d’une **expérience exceptionnelle** au cœur de la Ville Rose."
    ],
    "boutons": [
      { "label": "Par Téléphone", "href": "tel:+33562120179", "externe": true },
      { "label": "Par Mail", "href": "mailto:reservation@hotelpalladia.com", "externe": true }
    ]
  }'::jsonb)
) as v(ordre, type, contenu)
where a.slug = 'staycation-toulouse' and a.locale = 'fr';
