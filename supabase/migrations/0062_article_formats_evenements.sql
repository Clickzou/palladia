-- ---------------------------------------------------------------------------
-- Article « Nos formats d'événements » (/formats-evenements-professionnels-toulouse/).
--
-- Texte fourni par l'hotel, repris tel quel a trois exceptions pres :
--   * les emojis decoratifs de chaque intitule ne sont pas repris, comme pour
--     les autres articles du site ;
--   * « Au Hôtel Palladia » devient « À l'Hôtel Palladia » ;
--   * trois phrases factuelles ont ete ajoutees (amphitheatre de 285 places,
--     90 chambres, et le bloc de chiffres) : le texte d'origine ne portait
--     aucun chiffre, ce qui le rendait interchangeable avec celui de n'importe
--     quel confrere. Ces chiffres sont ceux deja publies sur le site.
--
-- Neuf photos fournies par l'hotel, importees dans public/images/blog.
--
-- Le maillage interne pose sept liens editoriaux :
-- /seminaire-evenement-professionnel, /restaurant (x2), /chambres (x2),
-- l'article amphitheatre et l'article afterwork ; plus le bouton /devis.
--
-- Les traductions anglaise et espagnole sont dans messages/contenu.en.json et
-- messages/contenu.es.json.
--
-- Relançable sans risque : les blocs sont effaces puis reinseres.
-- ---------------------------------------------------------------------------

insert into public.articles (
  slug, locale, titre, titre_page, sous_titre, chapo, image_hero, image_vignette, statut, date_publication, position, seo_title, seo_description
)
values (
  'formats-evenements-professionnels-toulouse',
  'fr',
  'Nos formats d’événements',
  'Un événement professionnel, un format adapté à chaque besoin',
  'Séminaire, réunion, formation, conférence, cocktail ou soirée d’entreprise à Toulouse',
  'Séminaire, réunion, formation, conférence, cocktail ou soirée d’entreprise : découvrez les formats d’événements professionnels de l’Hôtel Palladia à Toulouse.',
  '/images/blog/formats-evenements-hotel-palladia-banniere.jpg',
  '/images/blog/soiree-entreprise-salle-reception-hotel-palladia.jpg',
  'publie',
  '2026-09-02 10:00:00',
  1,
  'Formats d’événements professionnels à Toulouse — Palladia',
  'Séminaire, réunion, formation, conférence, cocktail, soirée d’entreprise ou team building : le format de votre événement professionnel à Toulouse.'
)
on conflict (slug, locale) do update set
  titre = excluded.titre,
  titre_page = excluded.titre_page,
  sous_titre = excluded.sous_titre,
  chapo = excluded.chapo,
  image_hero = excluded.image_hero,
  image_vignette = excluded.image_vignette,
  statut = excluded.statut,
  date_publication = excluded.date_publication,
  position = excluded.position,
  seo_title = excluded.seo_title,
  seo_description = excluded.seo_description;

delete from public.article_blocs
where article_id in (
  select id from public.articles where slug = 'formats-evenements-professionnels-toulouse' and locale = 'fr'
);

insert into public.article_blocs (article_id, ordre, type, contenu)
select a.id, v.ordre, v.type::bloc_type, v.contenu
from public.articles a,
(values
  (0, 'texte', '{
  "paragraphes": [
    "Organiser un événement professionnel ne consiste pas simplement à réserver une salle. Chaque rendez-vous a ses propres objectifs, son rythme et ses contraintes.",
    "À l’Hôtel Palladia, nous vous accompagnons dans l’organisation de vos événements professionnels à Toulouse, avec des [espaces modulables](/seminaire-evenement-professionnel), des [solutions de restauration](/restaurant) et des prestations pensées pour faciliter chaque étape de votre événement.",
    "Séminaire, réunion, formation, conférence, cocktail ou soirée d’entreprise : choisissez le format qui correspond à votre projet."
  ]
}'::jsonb),

  (1, 'texte_image', '{
  "pleine_largeur": true,
  "position": "gauche",
  "image": "/images/blog/salle-seminaire-table-en-u-hotel-palladia.jpg",
  "alt": "Salle de séminaire de l’Hôtel Palladia dressée en U, avec deux écrans",
  "titre": "Séminaire d’entreprise",
  "paragraphes": [
    "Vous souhaitez réunir vos équipes pour travailler, échanger et prendre du recul dans un cadre différent ?",
    "Le séminaire est idéal pour alterner temps de travail, moments de convivialité et activités collectives.",
    "Selon la durée et les objectifs de votre événement, nous pouvons imaginer un format à la demi-journée, à la journée ou sur plusieurs jours, avec [hébergement sur place](/chambres).",
    "Nos [16 salles de réunion à la lumière du jour](/seminaire-evenement-professionnel) accueillent de 6 à 350 personnes, en configuration pavé, en U, classe, théâtre, cocktail, banquet ou cabaret."
  ],
  "conclusion": "**Idéal pour :** séminaire d’équipe, séminaire annuel, réunion de direction, séminaire commercial ou événement managérial."
}'::jsonb),

  (2, 'texte_image', '{
  "pleine_largeur": true,
  "position": "droite",
  "image": "/images/blog/salle-reunion-comite-direction-hotel-palladia.jpg",
  "alt": "Salle de réunion de l’Hôtel Palladia avec table ovale et vue sur la verdure",
  "titre": "Réunion professionnelle",
  "paragraphes": [
    "Pour une réunion d’équipe, un comité de direction ou un rendez-vous avec vos collaborateurs, l’essentiel est de disposer d’un environnement confortable et adapté aux échanges.",
    "Nos espaces permettent d’organiser des réunions dans différentes configurations, avec les équipements nécessaires au bon déroulement de vos rendez-vous professionnels.",
    "Pour les petits comités, les salons Saint-Georges, Saint-Nicolas et VIP réunissent 6 personnes autour d’une table. Perchepinte, Filatiers et Croix-Baragnon vont de 12 à 24 places en pavé ou en U."
  ],
  "conclusion": "**Idéal pour :** réunions d’équipe, CODIR, réunions commerciales, rendez-vous clients ou réunions de travail."
}'::jsonb),

  (3, 'texte_image', '{
  "pleine_largeur": true,
  "position": "gauche",
  "image": "/images/blog/formation-journee-etude-hotel-palladia.jpg",
  "alt": "Salle de formation de l’Hôtel Palladia équipée d’un écran et d’un paperboard",
  "titre": "Formation et journée d’étude",
  "paragraphes": [
    "Une formation réussie nécessite un environnement propice à la concentration, mais aussi des pauses permettant aux participants de souffler et d’échanger.",
    "L’Hôtel Palladia vous permet de réunir vos participants dans un même lieu et de construire une journée d’étude avec salle de travail, pauses, restauration et, si besoin, hébergement.",
    "En configuration classe, les salons Dalbade, Vélane et Daurade réunis offrent 36 places sur 100 m², et le salon Opéra jusqu’à 100 places."
  ],
  "conclusion": "**Idéal pour :** formations, ateliers, journées d’étude, formations internes ou sessions professionnelles."
}'::jsonb),

  (4, 'texte_image', '{
  "pleine_largeur": true,
  "position": "droite",
  "image": "/images/blog/conference-amphitheatre-hotel-palladia.jpg",
  "alt": "L’amphithéâtre de l’Hôtel Palladia, scène éclairée et fauteuils rouges",
  "titre": "Conférence, convention et présentation",
  "paragraphes": [
    "Vous préparez une présentation, une conférence ou une convention pour un groupe de collaborateurs, de clients ou de partenaires ?",
    "La configuration de l’espace peut être pensée pour favoriser l’écoute et la visibilité de vos intervenants, tout en permettant d’intégrer les différents temps forts de votre événement.",
    "Pour les formats les plus larges, [notre amphithéâtre](/amphitheatre-hotel-palladia-renove) accueille 285 personnes, et le salon Opéra jusqu’à 290 en configuration théâtre."
  ],
  "conclusion": "**Idéal pour :** conférences, conventions, présentations, lancements, réunions plénières ou prises de parole."
}'::jsonb),

  (5, 'texte_image', '{
  "pleine_largeur": true,
  "position": "gauche",
  "image": "/images/blog/cocktail-entreprise-terrasse-hotel-palladia.jpg",
  "alt": "Cocktail d’entreprise sur la terrasse de l’Hôtel Palladia à Toulouse",
  "titre": "Cocktail et événement professionnel",
  "paragraphes": [
    "Un événement professionnel peut aussi être l’occasion de créer un véritable moment de convivialité.",
    "Cocktail, apéritif professionnel ou réception : nous vous accompagnons pour imaginer un format plus informel, propice aux échanges et au networking.",
    "Le salon Opéra reçoit jusqu’à 350 personnes en cocktail, le salon Capitouls 200 et le plateau Ozenne 80."
  ],
  "conclusion": "**Idéal pour :** cocktail d’entreprise, réception clients, [afterwork](/afterwork-toulouse), networking ou événement de lancement."
}'::jsonb),

  (6, 'texte_image', '{
  "pleine_largeur": true,
  "position": "droite",
  "image": "/images/blog/soiree-entreprise-diner-hotel-palladia.jpg",
  "alt": "Dîner de soirée d’entreprise dans une salle de l’Hôtel Palladia",
  "titre": "Soirée d’entreprise",
  "paragraphes": [
    "Vous souhaitez remercier vos collaborateurs, célébrer une réussite ou marquer une étape importante de la vie de votre entreprise ?",
    "Une soirée d’entreprise permet de sortir du cadre habituel et de proposer à vos équipes un moment privilégié.",
    "Selon votre projet, l’événement peut associer réception, [restauration](/restaurant), animations et hébergement pour profiter pleinement de la soirée.",
    "En banquet, le salon Opéra accueille 300 convives et Capitouls 200 ; en configuration cabaret, l’Opéra monte à 180 places."
  ],
  "conclusion": "**Idéal pour :** soirée annuelle, repas d’entreprise, remise de prix, anniversaire d’entreprise ou événement collaborateurs."
}'::jsonb),

  (7, 'texte_image', '{
  "pleine_largeur": true,
  "position": "gauche",
  "image": "/images/blog/networking-terrasse-hotel-palladia.jpg",
  "alt": "Moment convivial entre collaborateurs sur la terrasse de l’Hôtel Palladia",
  "titre": "Team building et événement fédérateur",
  "paragraphes": [
    "Créer du lien entre les collaborateurs est devenu un véritable enjeu pour les entreprises.",
    "Un événement peut être conçu autour d’un objectif fédérateur : renforcer la cohésion, favoriser les échanges entre services, accueillir de nouveaux collaborateurs ou simplement partager un moment différent.",
    "Le format peut associer temps de travail, activité collective, restauration et convivialité."
  ],
  "conclusion": "**Idéal pour :** team building, cohésion d’équipe, intégration de collaborateurs ou événement interne."
}'::jsonb),

  (8, 'texte_image', '{
  "pleine_largeur": true,
  "position": "droite",
  "image": "/images/blog/chambre-prestige-terrasse-hotel-palladia.jpg",
  "alt": "Chambre Prestige de l’Hôtel Palladia, pour un séminaire résidentiel à Toulouse",
  "titre": "Séminaire résidentiel",
  "paragraphes": [
    "Lorsque l’événement se déroule sur plusieurs jours, pouvoir travailler, dîner et dormir au même endroit simplifie considérablement l’organisation.",
    "Le format résidentiel permet aux participants de profiter pleinement du programme, sans multiplier les déplacements. [Nos 90 chambres et suites](/chambres) accueillent vos participants sur le lieu même de l’événement.",
    "Un parking gratuit de 250 places reçoit ceux qui viennent en voiture, et l’aéroport de Toulouse-Blagnac est à dix minutes."
  ],
  "conclusion": "**Idéal pour :** séminaires de direction, séminaires d’entreprise sur plusieurs jours, conventions ou événements réunissant des équipes venant de différentes villes."
}'::jsonb),

  (9, 'caracteristiques', '{
  "titre": "L’Hôtel Palladia pour vos événements professionnels",
  "items": [
    {
      "icone": "places",
      "label": "16 salles de réunion modulables, jusqu’à 400 personnes"
    },
    {
      "icone": "lit",
      "label": "90 chambres et suites pour vos séminaires résidentiels"
    },
    {
      "icone": "parking",
      "label": "250 places de parking gratuites"
    }
  ]
}'::jsonb),

  (10, 'texte', '{
  "fond_gris": true,
  "centre": true,
  "titre": "Un événement sur mesure, pensé selon vos objectifs",
  "taille_titre": "moyen",
  "paragraphes": [
    "Vous avez un format précis en tête ou un projet qui ne rentre dans aucune catégorie ?",
    "Notre équipe peut vous aider à construire un événement adapté à votre nombre de participants, vos objectifs, votre programme et votre budget.",
    "De la configuration des espaces à la restauration, en passant par les pauses, l’hébergement et les différents temps forts de votre événement, nous vous accompagnons pour créer une expérience cohérente de bout en bout."
  ],
  "image": "/images/blog/buffet-cocktail-entreprise-hotel-palladia.jpg",
  "alt": "Buffet dressé pour un événement d’entreprise à l’Hôtel Palladia"
}'::jsonb),

  (11, 'sections', '{
  "fond_gris": true,
  "faq": true,
  "titre": "Questions fréquentes sur les événements professionnels",
  "taille_titre": "moyen",
  "sections": [
    {
      "titre": "Quel format choisir pour son événement professionnel ?",
      "intro": "Le choix dépend de vos objectifs et de la durée. Une réunion ou un comité de direction tient sur une demi-journée en petit comité ; un séminaire alterne travail et convivialité sur une ou plusieurs journées ; une conférence privilégie l’écoute, en configuration théâtre ; un cocktail ou une soirée d’entreprise mise sur les échanges. Lorsque l’événement se déroule sur plusieurs jours, le format résidentiel réunit travail, restauration et hébergement au même endroit."
    },
    {
      "titre": "Quelle est la capacité des salles de l’Hôtel Palladia ?",
      "intro": "L’hôtel compte 16 salles de réunion à la lumière du jour, de 6 à 350 personnes selon la configuration, et un amphithéâtre de 285 places. Le salon Opéra, le plus vaste avec 500 m², reçoit jusqu’à 290 personnes en théâtre, 350 en cocktail et 300 en banquet."
    },
    {
      "titre": "Peut-on organiser un séminaire résidentiel à Toulouse ?",
      "intro": "Oui. L’Hôtel Palladia réunit sur un même site 16 salles de réunion, un restaurant et 90 chambres et suites : les participants travaillent, dînent et dorment sur place, sans déplacement entre les étapes du programme. Un parking gratuit de 250 places complète l’ensemble."
    },
    {
      "titre": "Peut-on privatiser un espace pour une soirée d’entreprise ?",
      "intro": "Le salon Opéra, 500 m² en bord de piscine, dispose d’une entrée indépendante et de baies vitrées ouvrant sur la terrasse : il se privatise pour une réception, un dîner ou une remise de prix. Le salon Capitouls, 300 m², accueille quant à lui jusqu’à 200 personnes en cocktail comme en banquet."
    }
  ]
}'::jsonb),

  (12, 'texte', '{
  "centre": true,
  "titre": "Quel est votre projet ?",
  "taille_titre": "moyen",
  "paragraphes": [
    "Parlez-nous de votre événement et construisons ensemble le format qui vous correspond."
  ],
  "boutons": [
    {
      "label": "Demander un devis",
      "href": "/devis?type=salle_reunion"
    }
  ]
}'::jsonb)
) as v(ordre, type, contenu)
where a.slug = 'formats-evenements-professionnels-toulouse' and a.locale = 'fr';
