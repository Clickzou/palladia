-- ---------------------------------------------------------------------------
-- Article « Séminaire résidentiel à Toulouse » (/seminaire-residentiel-toulouse/).
--
-- Mot-cle vise : « seminaire residentiel toulouse ». Aucun article ni aucune
-- page ne le portait : /seminaire-evenement-professionnel vise « hotel
-- seminaire » et « choisir-lieu-seminaire-toulouse » le choix du lieu.
--
-- Texte fourni par l'hotel (« Seminaire residentiel a Toulouse - TON
-- FRIENDLY.odt »), repris dans son intention et sa progression. Les chiffres
-- absents du texte d'origine viennent de src/data/seminaires.ts et sont deja
-- publies ailleurs sur le site : 16 salles de 6 a 350 personnes, amphitheatre
-- de 285 places, salon Opera de 500 m² et 290 places en theatre, 90 chambres,
-- parking gratuit de 250 places.
--
-- Six photos fournies par l'hotel, importees dans public/images/blog. La
-- banniere est un recadrage de « soiree festive.jpg ».
--
-- Le maillage interne pose neuf liens editoriaux :
-- /seminaire-evenement-professionnel (x2), /chambres (x2), /restaurant,
-- /formats-evenements-professionnels-toulouse, /amphitheatre-hotel-palladia-renove,
-- /ou-dormir-proche-aeroport-toulouse, /visites-toulouse et
-- /choisir-lieu-seminaire-toulouse ; plus les boutons /devis.
--
-- Les traductions anglaise et espagnole sont dans messages/contenu.en.json et
-- messages/contenu.es.json.
--
-- Relançable sans risque : les blocs sont effaces puis reinseres.
-- ---------------------------------------------------------------------------

-- L'article ouvre la liste des actualites : les autres reculent d'un rang.
-- Le decalage n'a lieu qu'a la premiere execution, tant que l'article n'existe
-- pas encore ; rejouer le fichier ne le repousse donc pas indefiniment.
update public.articles
set position = position + 1
where locale = 'fr'
  and position >= 1
  and not exists (
    select 1 from public.articles where slug = 'seminaire-residentiel-toulouse' and locale = 'fr'
  );

insert into public.articles (
  slug, locale, titre, titre_page, sous_titre, chapo, image_hero, image_vignette, statut, date_publication, position, seo_title, seo_description
)
values (
  'seminaire-residentiel-toulouse',
  'fr',
  'Séminaire résidentiel à Toulouse',
  'Séminaire résidentiel à Toulouse : faites de votre événement un vrai moment d’équipe',
  'Et si votre prochain séminaire se vivait au même endroit, du premier café au dernier verre ?',
  'Réunions, hébergement, restauration, team building et soirée réunis dans un seul lieu : organisez votre séminaire résidentiel à Toulouse à l’Hôtel Palladia.',
  '/images/blog/seminaire-residentiel-toulouse-hotel-palladia-banniere.jpg',
  '/images/blog/soiree-festive-seminaire-entreprise-hotel-palladia.jpg',
  'publie',
  '2026-09-10 10:00:00',
  1,
  'Séminaire résidentiel à Toulouse — Hôtel Palladia',
  'Salles de réunion, 90 chambres, restaurant, team building et soirées : organisez votre séminaire résidentiel à Toulouse en un seul lieu, à l’Hôtel Palladia.'
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
  select id from public.articles where slug = 'seminaire-residentiel-toulouse' and locale = 'fr'
);

insert into public.article_blocs (article_id, ordre, type, contenu)
select a.id, v.ordre, v.type::bloc_type, v.contenu
from public.articles a,
(values
  (0, 'texte', '{
  "centre": true,
  "paragraphes": [
    "Organiser un séminaire résidentiel à Toulouse, c’est réunir vos équipes dans un même lieu pour travailler, échanger, respirer un peu… et surtout partager une expérience qui sort du quotidien.",
    "À l’Hôtel Palladia, nous avons imaginé un cadre où tout peut naturellement s’enchaîner : [réunions](/seminaire-evenement-professionnel), [hébergement](/chambres), [restauration](/restaurant), pauses, activités, team building et soirées. Vous arrivez, vous posez vos valises, vos équipes s’installent… et nous nous occupons du reste.",
    "Que vous prépariez un séminaire d’entreprise, une convention, une formation, une conférence ou un [événement professionnel avec hébergement](/formats-evenements-professionnels-toulouse), notre équipe vous accompagne pour construire un programme qui vous ressemble.",
    "Votre entreprise travaille, vos équipes profitent, nous nous occupons de l’organisation."
  ],
  "boutons": [
    {
      "label": "Demander un devis",
      "href": "/devis?type=salle_reunion"
    }
  ]
}'::jsonb),

  (1, 'texte_image', '{
  "pleine_largeur": true,
  "position": "gauche",
  "image": "/images/chambres/prestige-hero.jpg",
  "alt": "Chambre Prestige de l’Hôtel Palladia à Toulouse",
  "titre": "Un séminaire avec hébergement à Toulouse, tout simplement",
  "paragraphes": [
    "Le principal avantage d’un séminaire résidentiel ? Tout le monde reste au même endroit.",
    "Pas de trajets entre l’hôtel, les salles de réunion et le restaurant. Pas de transferts à prévoir après une longue journée de travail. Pas de logistique compliquée pour rejoindre une soirée.",
    "Vos collaborateurs peuvent travailler, déjeuner, participer à une activité, dîner, profiter de la soirée et dormir sur place. Et le lendemain, le programme reprend autour d’un petit-déjeuner avant une nouvelle journée de travail.",
    "Nos [90 chambres et suites](/chambres) offrent un cadre confortable et élégant pour permettre à chacun de se retrouver au calme après une journée bien remplie."
  ],
  "conclusion": "C’est plus simple pour l’organisateur, plus confortable pour les participants, et votre séminaire peut se dérouler sur une ou plusieurs nuits, selon votre programme."
}'::jsonb),

  (2, 'texte_image', '{
  "pleine_largeur": true,
  "position": "droite",
  "image": "/images/blog/salle-seminaire-table-en-u-hotel-palladia.jpg",
  "alt": "Salle de séminaire de l’Hôtel Palladia dressée en U, avec deux écrans",
  "titre": "16 salles pour imaginer votre séminaire à votre façon",
  "paragraphes": [
    "Petit comité, grande équipe, ateliers en parallèle ou grande plénière : chaque séminaire a ses propres besoins.",
    "L’Hôtel Palladia dispose de [16 salles de réunion à la lumière du jour](/seminaire-evenement-professionnel), de 6 à 350 personnes selon la configuration. Vous pouvez y organiser :"
  ],
  "liste": [
    "des réunions et comités de direction ;",
    "des formations et journées d’étude ;",
    "des ateliers en sous-groupes ;",
    "des conférences et conventions ;",
    "des présentations et lancements de produits ;",
    "des cocktails et soirées d’entreprise."
  ],
  "conclusion": "L’idée est de faire évoluer votre événement au fil de la journée, avec des espaces adaptés aux différents temps forts de votre programme."
}'::jsonb),

  (3, 'texte_image', '{
  "pleine_largeur": true,
  "position": "gauche",
  "image": "/images/blog/amphitheatre-285-places-seminaire-toulouse-palladia.jpg",
  "alt": "L’amphithéâtre de 285 places de l’Hôtel Palladia rempli lors d’un événement",
  "titre": "Et pour les grands rendez-vous : un auditorium de 285 places",
  "paragraphes": [
    "Vous organisez une convention, une conférence, une présentation ou un lancement de produit ?",
    "L’Hôtel Palladia dispose d’un [amphithéâtre de 285 places](/amphitheatre-hotel-palladia-renove), particulièrement adapté aux événements qui réunissent un grand nombre de participants.",
    "L’établissement propose également de grands espaces comme le salon Opéra, 500 m² en bord de piscine, jusqu’à 290 personnes en configuration théâtre, et le salon Capitouls, ainsi que des salons plus intimistes pour les réunions en petits groupes."
  ],
  "conclusion": "De quoi imaginer un programme qui alterne facilement grande plénière, ateliers, réunions en petits groupes, pause, déjeuner et nouvelle session."
}'::jsonb),

  (4, 'texte', '{
  "titre": "Vous avez le projet, nous vous aidons à le faire vivre",
  "paragraphes": [
    "Un séminaire réussi ne tient pas seulement à une belle salle.",
    "Il faut penser aux horaires, aux chambres, aux repas, aux pauses, aux équipements, aux activités, à la soirée… et à tous ces petits détails qui, mis bout à bout, font la différence.",
    "C’est justement là que notre équipe intervient. Nous vous accompagnons dans la préparation de votre événement afin de construire une organisation adaptée à votre entreprise et à vos participants.",
    "Vous nous donnez les grandes lignes de votre projet, nous vous aidons à construire le programme."
  ]
}'::jsonb),

  (5, 'texte', '{
  "fond_gris": true,
  "centre": true,
  "titre": "Une journée de séminaire où tout s’enchaîne naturellement",
  "taille_titre": "moyen",
  "paragraphes": [
    "Accueil des participants, café, réunion, pause gourmande, déjeuner, ateliers, activité, cocktail, dîner, soirée, nuit à l’hôtel, petit-déjeuner.",
    "Tout se passe au même endroit, sans perdre de temps dans les déplacements.",
    "Et surtout, chaque moment peut avoir son ambiance : concentrée pendant une réunion, conviviale autour d’un déjeuner, dynamique pendant une activité, festive le soir."
  ],
  "note": "C’est toute l’idée du séminaire résidentiel : travailler ensemble, mais aussi prendre le temps de vivre quelque chose ensemble."
}'::jsonb),

  (6, 'texte_image', '{
  "pleine_largeur": true,
  "position": "droite",
  "image": "/images/blog/soiree-entreprise-diner-hotel-palladia.jpg",
  "alt": "Dîner de soirée d’entreprise dans une salle de l’Hôtel Palladia",
  "titre": "Des pauses gourmandes aux dîners qui prolongent la journée",
  "paragraphes": [
    "Parce qu’un bon séminaire passe aussi par les bons moments autour de la table.",
    "À l’Hôtel Palladia, [la restauration](/restaurant) accompagne les différents temps de votre événement : petit-déjeuner, pauses gourmandes, déjeuner, cocktail, dîner et repas événementiel.",
    "Les repas peuvent être pensés en fonction du rythme de votre séminaire, du nombre de participants et de l’ambiance que vous souhaitez créer. Le déjeuner permet de faire une vraie pause et de poursuivre les échanges dans une atmosphère plus détendue."
  ],
  "conclusion": "Et le soir, pourquoi ne pas transformer le dîner en véritable temps fort ? Un bon repas, un cocktail, une animation… et la journée de travail change complètement de dimension."
}'::jsonb),

  (7, 'texte_image', '{
  "pleine_largeur": true,
  "position": "gauche",
  "image": "/images/blog/soiree-festive-seminaire-entreprise-hotel-palladia.jpg",
  "alt": "Participants d’un séminaire réunis sur la piste lors d’une soirée festive à l’Hôtel Palladia",
  "titre": "Et si votre soirée devenait le moment dont tout le monde se souvient ?",
  "paragraphes": [
    "Une journée de séminaire peut être studieuse. La soirée, elle, peut être tout autre chose.",
    "C’est souvent le moment où les équipes se retrouvent autrement, où les conversations changent, où l’on rit davantage et où les liens se créent naturellement.",
    "Vous imaginez plutôt une soirée élégante ? Ludique ? Festive ? Un peu décalée ? Selon votre projet, différentes animations peuvent être intégrées à votre événement :"
  ],
  "liste": [
    "soirée casino ;",
    "blind test musical ;",
    "soirée sur le thème du Joker ;",
    "quiz et challenges entre équipes ;",
    "animations musicales ;",
    "DJ et soirée dansante ;",
    "jeux et défis en équipe ;",
    "animations participatives ;",
    "soirée à thème personnalisée."
  ],
  "conclusion": "L’objectif n’est pas de faire une animation « pour faire une animation » : c’est de créer un moment qui correspond à votre entreprise et à vos équipes."
}'::jsonb),

  (8, 'cartes', '{
  "titre": "Une soirée à l’image de votre entreprise",
  "taille_titre": "moyen",
  "cartes": [
    {
      "titre": "Soirée casino",
      "image": "/images/blog/soiree-casino-seminaire-entreprise-hotel-palladia.jpg",
      "alt": "Participants sur la piste de danse et roue de casino lors d’une soirée d’entreprise à l’Hôtel Palladia",
      "paragraphes": [
        "Tables de jeu, roue de la fortune et faux billets : la soirée casino installe une ambiance de jeu où chacun se prend vite au jeu, sans avoir besoin de savoir jouer."
      ]
    },
    {
      "titre": "Soirée à thème",
      "image": "/images/blog/soiree-theme-joker-seminaire-hotel-palladia.jpg",
      "alt": "Comédiens costumés sur la scène de l’amphithéâtre lors d’une soirée sur le thème du Joker",
      "paragraphes": [
        "Comédiens, costumes et mise en scène : une soirée à thème transforme l’amphithéâtre en décor et embarque les participants dans une histoire, du premier au dernier rang."
      ]
    },
    {
      "titre": "DJ et soirée dansante",
      "image": "/images/blog/soiree-dansante-dj-hotel-palladia-toulouse.jpg",
      "alt": "DJ et piste de danse lors d’une soirée à l’Hôtel Palladia",
      "paragraphes": [
        "Blind test musical, quiz entre équipes, animations musicales puis DJ : de quoi prolonger la soirée aussi longtemps que vos équipes en ont envie."
      ]
    }
  ]
}'::jsonb),

  (9, 'texte', '{
  "centre": true,
  "titre": "Du séminaire à la vraie expérience collective",
  "taille_titre": "moyen",
  "paragraphes": [
    "Et si le séminaire devenait plus qu’une succession de réunions ?",
    "Réunion le matin, déjeuner, ateliers l’après-midi, cocktail, dîner puis blind test ou soirée casino : ce sont ces moments partagés qui permettent parfois aux équipes de se découvrir autrement."
  ]
}'::jsonb),

  (10, 'texte_image', '{
  "pleine_largeur": true,
  "position": "droite",
  "image": "/images/blog/animation-realite-virtuelle-seminaire-hotel-palladia.jpg",
  "alt": "Participant équipé d’un casque de réalité virtuelle lors d’une animation de séminaire à l’Hôtel Palladia",
  "titre": "Team building à Toulouse : créez des souvenirs avec vos équipes",
  "paragraphes": [
    "Changer de décor, sortir du cadre habituel et partager une expérience différente : le team building est une belle façon de renforcer la cohésion d’une équipe.",
    "Selon vos envies et le profil de vos collaborateurs, différentes activités peuvent être organisées à l’hôtel ou à proximité, à Toulouse et dans ses environs, grâce à différents partenaires.",
    "Activités créatives, challenges sportifs, jeux en équipe, réalité virtuelle ou expériences originales : le programme peut être imaginé en fonction de vos objectifs et de l’énergie que vous souhaitez donner à votre séminaire."
  ],
  "conclusion": "L’activité peut prendre place pendant l’après-midi ou devenir un véritable temps fort de votre événement."
}'::jsonb),

  (11, 'texte', '{
  "titre": "Un hôtel pour séminaire à Toulouse facilement accessible",
  "paragraphes": [
    "Le choix du lieu compte aussi pour vos participants.",
    "L’Hôtel Palladia se trouve dans le quartier de Purpan à Toulouse, avec un accès pratique depuis [l’aéroport Toulouse-Blagnac](/ou-dormir-proche-aeroport-toulouse), le centre-ville et les principaux axes routiers. Un parking gratuit de 250 places est également à la disposition des participants qui viennent en voiture.",
    "Que vos équipes viennent de Toulouse, de la région ou d’autres villes de France, l’organisation de leur arrivée est ainsi facilitée."
  ]
}'::jsonb),

  (12, 'caracteristiques', '{
  "items": [
    {
      "icone": "places",
      "label": "16 salles de réunion à la lumière du jour, de 6 à 350 personnes"
    },
    {
      "icone": "ecran",
      "label": "Un amphithéâtre de 285 places"
    },
    {
      "icone": "lit",
      "label": "90 chambres et suites pour votre séminaire résidentiel"
    },
    {
      "icone": "restauration",
      "label": "Restaurant, pauses gourmandes et dîners sur place"
    },
    {
      "icone": "parking",
      "label": "250 places de parking gratuites"
    }
  ]
}'::jsonb),

  (13, 'texte', '{
  "fond_gris": true,
  "titre": "Profitez aussi de Toulouse",
  "paragraphes": [
    "Un séminaire à Toulouse, c’est aussi l’occasion de faire découvrir la Ville Rose à vos collaborateurs.",
    "Entre patrimoine, gastronomie, culture et activités de plein air, [Toulouse](/visites-toulouse) offre de nombreuses possibilités pour compléter un programme professionnel.",
    "Pourquoi ne pas imaginer un temps de travail, une découverte de la ville, une activité de cohésion, un dîner puis une soirée événementielle ? Une façon de changer de cadre, de créer de nouveaux souvenirs et de donner au séminaire une dimension plus conviviale."
  ]
}'::jsonb),

  (14, 'texte', '{
  "centre": true,
  "titre": "« Notre plus beau séminaire d’entreprise en termes d’organisation »",
  "taille_titre": "moyen",
  "paragraphes": [
    "Les plus belles histoires sont souvent celles racontées par les personnes qui les ont vécues.",
    "À la suite d’un séminaire annuel organisé à l’Hôtel Palladia, Cécile Sicot, Executive Assistant and Project Manager, a particulièrement apprécié l’accompagnement de l’équipe, le confort des chambres, la qualité des prestations et l’amphithéâtre. Elle évoque également une organisation fluide, une équipe disponible et attentive, et une soirée finale particulièrement réussie."
  ]
}'::jsonb),

  (15, 'citation', '{
  "texte": "Nous pouvons le dire sans hésiter : il s’agit sans doute de notre plus beau séminaire d’entreprise en termes d’organisation…",
  "auteur": "Cécile Sicot, Executive Assistant and Project Manager"
}'::jsonb),

  (16, 'sections', '{
  "fond_gris": true,
  "deux_colonnes": true,
  "titre": "Pourquoi choisir l’Hôtel Palladia pour votre séminaire à Toulouse ?",
  "intro": "Parce qu’un séminaire, ce n’est pas seulement une salle avec des chaises. C’est un lieu où l’on travaille, où l’on échange, où l’on mange, où l’on se retrouve et parfois où l’on fait la fête.",
  "sections": [
    {
      "titre": "Tout au même endroit",
      "intro": "Salles de réunion, hébergement, restauration, activités et soirée sont réunis dans un seul établissement."
    },
    {
      "titre": "16 salles de réunion",
      "intro": "Des espaces permettant d’organiser aussi bien des réunions en petit comité que des événements professionnels de grande capacité."
    },
    {
      "titre": "Un auditorium de 285 places",
      "intro": "Un espace adapté aux conférences, conventions, présentations et grands rendez-vous professionnels."
    },
    {
      "titre": "Un salon Opéra de 500 m²",
      "intro": "Le plus vaste espace de l’hôtel, en bord de piscine, pour donner de l’ampleur à votre événement."
    },
    {
      "titre": "Des chambres sur place",
      "intro": "Vos participants rejoignent directement leur chambre après leur journée ou leur soirée, sans transfert ni taxi à prévoir."
    },
    {
      "titre": "Une équipe qui vous accompagne",
      "intro": "Vous n’êtes pas seul face à la logistique : notre équipe vous accompagne dans la préparation de votre événement."
    },
    {
      "titre": "Des soirées qui ne ressemblent pas à toutes les autres",
      "intro": "Casino, blind test, DJ, challenges, animations musicales ou concept personnalisé : à vous de choisir l’ambiance."
    },
    {
      "titre": "Toulouse à portée de main",
      "intro": "Purpan, l’aéroport Toulouse-Blagnac, le centre-ville et les principaux axes routiers sont facilement accessibles."
    }
  ]
}'::jsonb),

  (17, 'texte', '{
  "titre": "Quel événement organiser à l’Hôtel Palladia ?",
  "paragraphes": [
    "Vous préparez un événement professionnel à Toulouse ? L’Hôtel Palladia peut accueillir différents formats, parmi lesquels : séminaire résidentiel, séminaire d’entreprise, convention, conférence, formation, réunion, atelier, présentation, lancement de produit, cocktail ou soirée d’entreprise.",
    "Le choix des espaces, l’hébergement, la restauration et les possibilités d’activités permettent de construire un programme adapté à votre événement. Si vous en êtes encore à [comparer plusieurs lieux](/choisir-lieu-seminaire-toulouse), parlez-nous simplement de votre projet : donnez-nous vos dates, le nombre de participants et vos principales envies."
  ]
}'::jsonb),

  (18, 'sections', '{
  "fond_gris": true,
  "faq": true,
  "titre": "Questions fréquentes sur le séminaire résidentiel à Toulouse",
  "taille_titre": "moyen",
  "sections": [
    {
      "titre": "Qu’est-ce qu’un séminaire résidentiel ?",
      "intro": "Un séminaire résidentiel réunit les participants sur un même site pendant une ou plusieurs journées, avec nuitée sur place. Réunions, repas, activités, soirée et hébergement s’enchaînent au même endroit, sans transfert entre les étapes du programme. C’est le format le plus simple à organiser dès lors que l’événement dépasse une journée."
    },
    {
      "titre": "Combien de participants l’Hôtel Palladia peut-il accueillir ?",
      "intro": "L’hôtel compte 16 salles de réunion à la lumière du jour, de 6 à 350 personnes selon la configuration, un amphithéâtre de 285 places et 90 chambres et suites. Le salon Opéra, le plus vaste avec 500 m², reçoit jusqu’à 290 personnes en configuration théâtre et 350 en cocktail."
    },
    {
      "titre": "Un séminaire peut-il se dérouler sur plusieurs nuits ?",
      "intro": "Oui. Le programme se construit sur une ou plusieurs nuits, selon vos besoins : une journée de travail suivie d’une soirée et d’une nuit sur place, ou un format plus long alternant plénières, ateliers, activités et temps de convivialité."
    },
    {
      "titre": "Quelles animations de soirée peut-on prévoir pendant un séminaire ?",
      "intro": "Soirée casino, blind test musical, soirée à thème, quiz et challenges entre équipes, animations musicales, DJ et soirée dansante, jeux et défis en équipe ou concept personnalisé : l’animation se choisit en fonction de votre entreprise et de vos participants."
    },
    {
      "titre": "L’hôtel est-il facilement accessible depuis l’aéroport de Toulouse-Blagnac ?",
      "intro": "L’Hôtel Palladia se trouve dans le quartier de Purpan, à quelques minutes de l’aéroport Toulouse-Blagnac, du périphérique et du centre-ville de Toulouse. Un parking gratuit de 250 places est à la disposition des participants venus en voiture."
    },
    {
      "titre": "Peut-on organiser des activités de team building sur place ?",
      "intro": "Oui. Des activités créatives, des challenges sportifs, des jeux en équipe ou des expériences plus originales peuvent être organisés à l’hôtel ou à proximité, à Toulouse et dans ses environs, grâce à différents partenaires."
    }
  ]
}'::jsonb),

  (19, 'texte', '{
  "centre": true,
  "titre": "Parlons de votre prochain séminaire",
  "paragraphes": [
    "Vous avez une date ? Une idée ? Un nombre de participants ? Même si votre programme n’est pas encore complètement défini, échangeons sur votre projet.",
    "Indiquez-nous vos dates, le nombre de participants et vos besoins en hébergement, salles de réunion, restauration et animations. Notre équipe vous accompagnera pour construire votre événement à Toulouse."
  ],
  "boutons": [
    {
      "label": "Demander un devis",
      "href": "/devis?type=salle_reunion"
    },
    {
      "label": "Voir toutes nos salles",
      "href": "/seminaire-evenement-professionnel"
    }
  ]
}'::jsonb)
) as v(ordre, type, contenu)
where a.slug = 'seminaire-residentiel-toulouse' and a.locale = 'fr';
