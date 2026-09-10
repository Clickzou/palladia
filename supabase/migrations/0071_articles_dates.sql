-- ---------------------------------------------------------------------------
-- Les articles dates cessent de vieillir.
--
-- Un releve de la base a trouve neuf articles au contenu date. Deux etaient de
-- faux positifs (le « 2014 » du Jardin du Barry est la date de creation du
-- parc ; le « 2024 » du Zenith n'est que le nom de sa vignette). Restaient six
-- cas, traites ici selon leur nature.
--
-- Reecrits, parce que le rendez-vous revient chaque annee et que seul le
-- millesime etait perime :
--   * reveillon-toulouse — annonçait le « mercredi 31 decembre 2025 » et un
--     bal venitien deja « complet », avec ses tarifs (250 / 690 / 190 €) ;
--   * saint-valentin-toulouse — un menu et trois tarifs (90 / 320 / 249 €) ;
--   * diner-spectacles-toulouse — les quatre spectacles de la saison 2025,
--     recopies en dur alors que la table `evenements` les gere avec leurs
--     dates et que /spectacle-toulouse les affiche a jour.
-- Dans les trois cas, la trame de la soiree est conservee et les chiffres
-- renvoient vers la source qui, elle, se met a jour.
--
-- Reecrit aussi, mais au passe : l'article de l'Orchestre de chambre listait
-- quatre concerts de juin 2023 a mai 2024 et leurs tarifs. Aucune date de
-- l'orchestre ne figure dans la programmation en cours : le partenariat est
-- donc raconte au passe, sans laisser croire a des concerts a venir, et
-- l'article renvoie vers la programmation du moment.
--
-- Archives, parce qu'un evenement unique et passe n'a pas de version
-- intemporelle :
--   * sejour-en-famille-le-gardien-du-temple — sejour du 25 au 28 octobre
--     2024, 119 € et 99 € la nuit ;
--   * diner-accord-mets-champagne — jeudi 21 novembre 2024, menu a 75 €.
-- Leur position est conservee : `statut` suffit a les retirer de la liste et
-- du sitemap, et un retour en arriere ne demande qu'un mot.
--
-- A noter : /diner-spectacles-toulouse est aussi une route statique, qui prend
-- le pas sur l'article. Le contenu reecrit ici n'est donc pas affiche — seule
-- sa fiche dans les actualites l'est. Il est corrige tout de meme : la fiche
-- doit dire vrai, et rien ne garantit que le conflit de route dure.
--
-- Relançable sans risque : les blocs sont effaces puis reinseres.
-- ---------------------------------------------------------------------------

update public.articles set statut = 'archive'
where locale = 'fr' and slug in ('sejour-en-famille-le-gardien-du-temple', 'diner-accord-mets-champagne');

-- reveillon-toulouse
update public.articles set
  titre_page = 'Réveillon du Nouvel An à Toulouse',
  sous_titre = 'Fêtez le nouvel an à l’Hôtel Palladia'
where slug = 'reveillon-toulouse' and locale = 'fr';

delete from public.article_blocs
where article_id in (select id from public.articles where slug = 'reveillon-toulouse' and locale = 'fr');

insert into public.article_blocs (article_id, ordre, type, contenu)
select a.id, v.ordre, v.type::bloc_type, v.contenu
from public.articles a,
(values
  (0, 'texte', '{
  "centre": true,
  "titre": "Le réveillon du Nouvel An à l’Hôtel Palladia",
  "paragraphes": [
    "Chaque 31 décembre, l’Hôtel Palladia ouvre son salon Opéra pour la soirée du réveillon : un dîner gastronomique, un orchestre en direct et une piste de danse jusqu’au bout de la nuit.",
    "Le thème change d’une année sur l’autre, mais la trame reste la même : un apéritif au champagne, un menu en plusieurs services signé par notre chef, un accord mets et vins, puis la fête.",
    "Les places sont limitées et la soirée affiche souvent complet. Le programme, le menu et les tarifs de l’édition en cours vous sont communiqués sur simple demande."
  ]
}'::jsonb),

  (1, 'liste_cochee', '{
  "fond_gris": true,
  "titre": "Ce que comprend la soirée",
  "items": [
    "un apéritif au champagne et ses canapés ;",
    "un menu gastronomique en plusieurs services ;",
    "un accord mets et vins ;",
    "un orchestre en direct et une soirée dansante ;",
    "le salon Opéra, 500 m² en bord de piscine."
  ]
}'::jsonb),

  (2, 'texte', '{
  "titre": "Prolonger la soirée sur place",
  "paragraphes": [
    "Une formule séjour associe le dîner du réveillon à une [nuit sur place](/chambres) et à un petit-déjeuner servi plus tard que d’ordinaire, pour commencer l’année sans réveil.",
    "Le détail des formules et leurs conditions figurent sur la page de [nos offres d’hébergement](/offres-hebergement-toulouse) dès l’ouverture des réservations."
  ]
}'::jsonb),

  (3, 'texte', '{
  "titre": "Réservation",
  "centre": true,
  "paragraphes": [],
  "boutons": [
    {
      "label": "05 62 120 179",
      "href": "tel:+33562120179",
      "externe": true
    },
    {
      "label": "Par Mail",
      "href": "mailto:reservation@hotelpalladia.com",
      "externe": true
    }
  ]
}'::jsonb)
) as v(ordre, type, contenu)
where a.slug = 'reveillon-toulouse' and a.locale = 'fr';


-- saint-valentin-toulouse
update public.articles set
  titre = 'Soirée Saint-Valentin',
  titre_page = 'Soirée Saint-Valentin à Toulouse'
where slug = 'saint-valentin-toulouse' and locale = 'fr';

delete from public.article_blocs
where article_id in (select id from public.articles where slug = 'saint-valentin-toulouse' and locale = 'fr');

insert into public.article_blocs (article_id, ordre, type, contenu)
select a.id, v.ordre, v.type::bloc_type, v.contenu
from public.articles a,
(values
  (0, 'texte', '{
  "centre": true,
  "fond_gris": true,
  "titre": "La Saint-Valentin à l’Hôtel Palladia",
  "taille_titre": "grand",
  "paragraphes": [
    "Au salon Opéra, un dîner gourmand rythmé par un orchestre en direct, pour une soirée placée sous le signe de l’amour, de la gastronomie et de la musique live.",
    "Le menu change chaque année : il est composé par notre chef et annoncé quelques semaines avant la soirée, en même temps que les tarifs."
  ]
}'::jsonb),

  (1, 'sections', '{
  "titre": "Le déroulé du dîner",
  "intro": "La trame reste la même d’une année sur l’autre ; seuls les plats changent.",
  "sections": [
    {
      "titre": "À l’arrivée",
      "intro": "Un cocktail et ses canapés, puis un amuse-bouche."
    },
    {
      "titre": "À table",
      "intro": "Une entrée, un plat, un fromage et un dessert, composés par le chef autour de produits de saison."
    },
    {
      "titre": "Les vins",
      "intro": "Un accord mets et vins accompagne le repas, servi au verre."
    },
    {
      "titre": "La soirée",
      "intro": "Un orchestre en direct prend le relais au salon Opéra, 500 m² en bord de piscine."
    }
  ]
}'::jsonb),

  (2, 'cartes', '{
  "titre": "Nos forfaits romantiques",
  "taille_titre": "grand",
  "cartes": [
    {
      "titre": "Forfait Séjour Romantique",
      "paragraphes": [
        "Le dîner de la Saint-Valentin, prolongé par une nuit sur place."
      ],
      "liste": [
        "dîner pour deux personnes ;",
        "nuit en [chambre double Prestige](/platinium) ;",
        "deux petits-déjeuners buffet."
      ]
    },
    {
      "titre": "Forfait Rêve à deux",
      "paragraphes": [
        "Une parenthèse à deux, sans le dîner, autour de [l’espace bien-être](/spa)."
      ],
      "liste": [
        "nuit en [chambre double Prestige](/platinium) ;",
        "deux petits-déjeuners buffet ;",
        "deux massages de 30 minutes."
      ],
      "conclusion": "Les tarifs de l’année en cours sont annoncés avec le menu, et repris sur la page de [nos offres d’hébergement](/offres-hebergement-toulouse)."
    }
  ]
}'::jsonb),

  (3, 'texte', '{
  "titre": "Réservations",
  "centre": true,
  "taille_titre": "grand",
  "paragraphes": [
    "**Contact Hôtel Palladia**\n[05 62 12 01 79](tel:+33562120179) — [reservation@hotelpalladia.com](mailto:reservation@hotelpalladia.com)",
    "**Réservation de votre soin auprès du Spa**\n[05 62 86 94 09](tel:+33562869409)"
  ],
  "boutons": [
    {
      "label": "05 62 120 179",
      "href": "tel:+33562120179",
      "externe": true
    },
    {
      "label": "Par Mail",
      "href": "mailto:reservation@hotelpalladia.com",
      "externe": true
    }
  ]
}'::jsonb)
) as v(ordre, type, contenu)
where a.slug = 'saint-valentin-toulouse' and a.locale = 'fr';


-- diner-spectacles-toulouse

delete from public.article_blocs
where article_id in (select id from public.articles where slug = 'diner-spectacles-toulouse' and locale = 'fr');

insert into public.article_blocs (article_id, ordre, type, contenu)
select a.id, v.ordre, v.type::bloc_type, v.contenu
from public.articles a,
(values
  (0, 'carrousel', '{
  "images": [
    {
      "src": "/images/blog/Actu-programmation-culturelle-site-.jpg",
      "alt": "Programmation culturelle de l’Hôtel Palladia"
    }
  ]
}'::jsonb),

  (1, 'texte', '{
  "centre": true,
  "titre": "Ambiance assurée !",
  "paragraphes": [
    "Humour, théâtre, musique classique, gospel ou dîner-spectacle : l’Hôtel Palladia programme des soirées tout au long de la saison, dans son amphithéâtre de 285 places ou au salon Opéra.",
    "La programmation change au fil de l’année : [les prochaines dates](/spectacle-toulouse) sont toujours à jour sur la page des spectacles."
  ]
}'::jsonb),

  (2, 'texte', '{
  "titre": "Réservation",
  "paragraphes": [],
  "boutons": [
    {
      "label": "Réservation",
      "href": "/spectacle-toulouse"
    },
    {
      "label": "Infos groupes",
      "href": "mailto:communication@hotelpalladia.com",
      "externe": true
    }
  ]
}'::jsonb)
) as v(ordre, type, contenu)
where a.slug = 'diner-spectacles-toulouse' and a.locale = 'fr';


-- hotel-palladia-x-orchestre-de-chambre-de-toulouse
update public.articles set
  sous_titre = 'Des concerts de musique classique dans l’amphithéâtre de l’hôtel',
  chapo = 'Au cœur de Toulouse, l’Hôtel Palladia 4★ et l’Orchestre de chambre de Toulouse se retrouvent pour des concerts dominicaux dans l’amphithéâtre de l’hôtel.'
where slug = 'hotel-palladia-x-orchestre-de-chambre-de-toulouse' and locale = 'fr';

delete from public.article_blocs
where article_id in (select id from public.articles where slug = 'hotel-palladia-x-orchestre-de-chambre-de-toulouse' and locale = 'fr');

insert into public.article_blocs (article_id, ordre, type, contenu)
select a.id, v.ordre, v.type::bloc_type, v.contenu
from public.articles a,
(values
  (0, 'carrousel', '{
  "images": [
    {
      "src": "/images/blog/orchestre-de-chambre-toulouse-scaled.jpg",
      "alt": "L’Orchestre de chambre de Toulouse à l’Hôtel Palladia"
    }
  ]
}'::jsonb),

  (1, 'texte', '{
  "titre": "Un dimanche matin au concert",
  "paragraphes": [
    "L’Hôtel Palladia a reçu l’Orchestre de chambre de Toulouse pour une série de concerts dominicaux dans son [amphithéâtre de 285 places](/amphitheatre-hotel-palladia-renove) : Vivaldi, Mozart, Bach, Schubert, mais aussi des programmes plus inattendus, comme ces airs classiques repris par la publicité et le cinéma.",
    "Le principe : un concert le dimanche en fin de matinée, prolongé pour ceux qui le souhaitaient par un déjeuner au [restaurant de l’hôtel](/restaurant)."
  ]
}'::jsonb),

  (2, 'texte', '{
  "fond_gris": true,
  "centre": true,
  "titre": "La programmation d’aujourd’hui",
  "taille_titre": "moyen",
  "paragraphes": [
    "Ces rendez-vous s’inscrivent dans la programmation culturelle de l’hôtel, qui accueille aussi l’humour, le théâtre, le gospel et des dîners-spectacles.",
    "Les dates, les tarifs et la billetterie changent au fil de la saison : la page des spectacles est la seule à jour."
  ],
  "boutons": [
    {
      "label": "Voir la programmation",
      "href": "/spectacle-toulouse"
    }
  ]
}'::jsonb)
) as v(ordre, type, contenu)
where a.slug = 'hotel-palladia-x-orchestre-de-chambre-de-toulouse' and a.locale = 'fr';
