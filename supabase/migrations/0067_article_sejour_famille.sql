-- ---------------------------------------------------------------------------
-- Reecriture de « Sejour en famille a Toulouse » en article de fond.
--
-- L'article ne contenait que deux blocs : l'affiche de l'offre famille ETE
-- 2025 (« a partir de 215 € ») et un bouton de reservation. Il etait toujours
-- publie en septembre 2026, avec un prix faux — exactement le defaut que le
-- commentaire en tete de src/data/offres-saison.ts signale comme herite de
-- WordPress. Le sous-titre disait « Cet ete venez en famille ».
--
-- Il devient un article qui ne perime pas : aucun prix, aucune date, aucune
-- affiche. Les faits viennent de src/data/hotel.ts (lits et chaise bebe,
-- room service 24h/24, parking gratuit de 250 places, wifi fibre, animaux
-- acceptes), src/data/restaurant.ts (menu enfant Moussaillon),
-- src/data/offres-saison.ts (chambres communicantes en categorie superieure)
-- et src/data/tourisme.ts (les sites et leurs adresses).
--
-- Les tarifs et les conditions vivent desormais au seul endroit tenu a jour
-- chaque saison : /offres-hebergement-toulouse, vers laquelle l'article
-- renvoie par une ancre neutre en saison (« nos offres d'hebergement »), qui
-- ne vieillira pas au changement d'offre.
--
-- L'affiche ete 2025 n'est plus referencee ; le fichier reste dans
-- public/images/blog, aucune autre page ne l'employait.
--
-- Relançable sans risque : les blocs sont effaces puis reinseres.
-- ---------------------------------------------------------------------------

update public.articles set
  titre = 'Séjour en famille à Toulouse',
  titre_page = 'Séjour en famille à Toulouse : l’hôtel comme camp de base',
  sous_titre = 'Chambres communicantes, piscine extérieure et la Ville Rose à portée de main',
  chapo = 'Deux chambres communicantes plutôt qu’une chambre trop petite, une piscine extérieure pour la fin d’après-midi et un quartier calme pour la nuit : voilà ce qui change un week-end en famille à Toulouse.',
  image_hero = '/images/blog/piscine-hotel-4-etoiles-palladia.jpg',
  image_vignette = '/images/blog/palladia-piscine-exterieur.jpg',
  statut = 'publie',
  date_publication = '2026-09-10 12:00:00',
  seo_title = 'Séjour en famille à Toulouse — Hôtel Palladia 4 étoiles',
  seo_description = 'Chambres communicantes, lits bébé, piscine extérieure et parking gratuit : préparez votre séjour en famille à Toulouse à l’Hôtel Palladia, quartier de Purpan.'
where slug = 'sejour-en-famille-a-toulouse-hotel-palladia' and locale = 'fr';

delete from public.article_blocs
where article_id in (
  select id from public.articles where slug = 'sejour-en-famille-a-toulouse-hotel-palladia' and locale = 'fr'
);

insert into public.article_blocs (article_id, ordre, type, contenu)
select a.id, v.ordre, v.type::bloc_type, v.contenu
from public.articles a,
(values
  (0, 'texte', '{
  "centre": true,
  "paragraphes": [
    "Partir à Toulouse en famille pose toujours les mêmes questions : où loger sans s’entasser à quatre dans vingt mètres carrés, comment occuper les enfants entre deux visites, et où se garer sans y passer la matinée.",
    "L’Hôtel Palladia y répond de façon simple : des [chambres communicantes](/chambres), une piscine extérieure, un [restaurant](/restaurant) qui prévoit un menu pour les enfants, et un parking gratuit devant la porte.",
    "Voici comment s’organise un séjour en famille à l’hôtel, et ce qu’il y a à faire autour."
  ]
}'::jsonb),

  (1, 'texte_image', '{
  "pleine_largeur": true,
  "position": "gauche",
  "image": "/images/chambres/confort-hero.jpg",
  "alt": "Chambre Confort de l’Hôtel Palladia à Toulouse, avec lit double et grand miroir",
  "titre": "Deux chambres communicantes plutôt qu’une chambre trop petite",
  "paragraphes": [
    "C’est la vraie différence d’un séjour en famille réussi : les parents ont leur chambre, les enfants la leur, et une porte entre les deux.",
    "Chacun garde son espace et son heure de coucher, sans que personne ne dorme sur un lit d’appoint au pied du grand lit. Nos chambres communicantes en catégorie supérieure sont pensées exactement pour cela.",
    "Pour les plus petits, l’hôtel met à disposition des lits et chaises bébé ainsi que des produits d’accueil adaptés, sur simple demande à la réservation."
  ],
  "conclusion": "L’Hôtel Palladia compte [90 chambres et suites](/chambres), de la Confort à la Junior Suite de 47 m² avec salon intégré."
}'::jsonb),

  (2, 'texte_image', '{
  "pleine_largeur": true,
  "position": "droite",
  "image": "/images/blog/palladia-piscine-exterieur.jpg",
  "alt": "Bouées flamant rose et licorne dans la piscine extérieure de l’Hôtel Palladia à Toulouse",
  "titre": "La piscine extérieure, l’argument qui sauve les fins d’après-midi",
  "paragraphes": [
    "Après une matinée de musée et un déjeuner en ville, les enfants n’ont généralement plus aucune envie de marcher.",
    "La piscine extérieure, entourée de transats et de pelouse, règle la question : une heure dans l’eau avant le dîner, et la journée se termine bien pour tout le monde. Elle est ouverte de juin à fin septembre.",
    "Pendant ce temps, les parents peuvent souffler au bord du bassin — ou pousser la porte de [l’espace bien-être](/spa) quand l’âge des enfants le permet."
  ]
}'::jsonb),

  (3, 'texte', '{
  "fond_gris": true,
  "titre": "À table, personne n’est oublié",
  "paragraphes": [
    "Le [restaurant de l’hôtel](/restaurant) propose un menu enfant, le Moussaillon, avec plat, dessert et boisson : de quoi éviter la négociation du soir et le plat trop copieux qui reste dans l’assiette.",
    "Le petit-déjeuner se prend en buffet, ce qui laisse chacun composer le sien. Et si la journée s’est terminée plus tard que prévu, le room service fonctionne 24 h/24, tous les jours : dîner en chambre reste une option parfaitement acceptable en vacances."
  ]
}'::jsonb),

  (4, 'caracteristiques', '{
  "titre": "Les détails qui comptent quand on voyage à quatre",
  "items": [
    {
      "icone": "lit",
      "label": "Lits et chaise bébé, produits d’accueil pour les petits"
    },
    {
      "icone": "parking",
      "label": "250 places de parking gratuites devant l’hôtel"
    },
    {
      "icone": "restauration",
      "label": "Room service 24 h/24, menu enfant au restaurant"
    },
    {
      "icone": "wifi",
      "label": "Wifi gratuit par fibre optique dans tout l’hôtel"
    }
  ]
}'::jsonb),

  (5, 'sections', '{
  "deux_colonnes": true,
  "titre": "Que faire à Toulouse avec des enfants ?",
  "intro": "Toulouse est une ville d’aviation et de sciences : c’est une chance, ce sont exactement les sujets qui tiennent les enfants en haleine une journée entière.",
  "sections": [
    {
      "titre": "La Cité de l’Espace",
      "intro": "Le parc à thème scientifique dédié à l’espace et aux planètes, avenue Jean Gonord, à l’est de la ville. La visite occupe facilement une journée complète."
    },
    {
      "titre": "La Halle de la Machine",
      "intro": "Des machines de spectacle géantes, à l’ancienne piste de Montaudran. Le Minotaure et l’Araignée impressionnent autant les adultes que les enfants."
    },
    {
      "titre": "Aeroscopia et l’Envol des Pionniers",
      "intro": "À Blagnac, tout près de l’hôtel : un Concorde et des Airbus à visiter au musée Aeroscopia, et l’histoire de l’Aéropostale à l’Envol des Pionniers."
    },
    {
      "titre": "Le Muséum et le Jardin des Plantes",
      "intro": "Un muséum interactif sur la biodiversité, prolongé par un grand parc arboré avec ses volières, rue Alfred Duméril. Pratique quand la météo hésite."
    },
    {
      "titre": "Les Jardins du Barry",
      "intro": "Huit hectares de verdure à la Cartoucherie, à quelques minutes de l’hôtel. Nous leur avons consacré [un article entier](/le-jardin-du-barry-a-toulouse-le-poumon-vert-de-la-cartoucherie)."
    },
    {
      "titre": "La Coulée Verte du Touch",
      "intro": "Neuf kilomètres et demi de voie verte au départ du chemin des Capelles, à vélo ou à pied. L’itinéraire commence dans le quartier de l’hôtel."
    }
  ]
}'::jsonb),

  (6, 'texte', '{
  "titre": "Purpan : le calme le soir, la ville en quelques minutes",
  "paragraphes": [
    "L’hôtel se trouve dans le quartier de Purpan, à l’ouest de Toulouse. C’est un quartier résidentiel : les enfants dorment sans le bruit de l’hypercentre, et la voiture reste garée gratuitement.",
    "L’[aéroport de Toulouse-Blagnac](/ou-dormir-proche-aeroport-toulouse), le périphérique et le centre-ville sont facilement accessibles, ce qui simplifie autant l’arrivée que les allers-retours de la journée.",
    "Pour préparer votre programme, notre [sélection de visites à Toulouse](/visites-toulouse) recense les sites, les parcs et les marchés, avec leurs adresses."
  ]
}'::jsonb),

  (7, 'sections', '{
  "fond_gris": true,
  "faq": true,
  "titre": "Questions fréquentes sur un séjour en famille à l’Hôtel Palladia",
  "taille_titre": "moyen",
  "sections": [
    {
      "titre": "L’hôtel propose-t-il des chambres communicantes ?",
      "intro": "Oui. Deux chambres communicantes en catégorie supérieure permettent de loger deux adultes et deux enfants tout en gardant un espace pour chacun. Elles sont à demander au moment de la réservation, sous réserve de disponibilité."
    },
    {
      "titre": "L’hôtel prête-t-il un lit ou une chaise bébé ?",
      "intro": "Oui. Des lits et chaises bébé sont mis à disposition, ainsi que des produits d’accueil pour les tout-petits. Il suffit de le signaler lors de la réservation."
    },
    {
      "titre": "Y a-t-il un menu pour les enfants au restaurant ?",
      "intro": "Le restaurant de l’hôtel sert un menu enfant, le Moussaillon, composé d’un plat, d’un dessert et d’une boisson. Le room service fonctionne par ailleurs 24 h/24 si vous préférez dîner en chambre."
    },
    {
      "titre": "La piscine est-elle ouverte toute l’année ?",
      "intro": "Non. La piscine extérieure est ouverte de juin à fin septembre. En dehors de cette période, l’hôtel reste accessible avec son espace bien-être, son espace fitness et son restaurant."
    },
    {
      "titre": "Le parking est-il payant ?",
      "intro": "Non. L’hôtel dispose d’un parking gratuit de 250 places, avec des emplacements équipés de bornes de recharge électrique. C’est un vrai confort quand on voyage avec des bagages et des poussettes."
    },
    {
      "titre": "Les animaux sont-ils acceptés ?",
      "intro": "Oui, les animaux sont acceptés à l’Hôtel Palladia. Signalez-le à la réservation afin que nous puissions préparer votre arrivée."
    }
  ]
}'::jsonb),

  (8, 'texte', '{
  "centre": true,
  "titre": "Préparer votre séjour",
  "taille_titre": "moyen",
  "paragraphes": [
    "L’hôtel propose régulièrement des formules dédiées aux familles, avec chambres communicantes et petits-déjeuners inclus. Elles changent au fil de la saison : le détail des conditions en cours est toujours sur la page des offres."
  ],
  "boutons": [
    {
      "label": "Voir nos offres d’hébergement",
      "href": "/offres-hebergement-toulouse"
    },
    {
      "label": "Découvrir les chambres",
      "href": "/chambres"
    }
  ]
}'::jsonb),

  (9, 'texte', '{
  "centre": true,
  "titre": "Réservation",
  "taille_titre": "sous-titre",
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
where a.slug = 'sejour-en-famille-a-toulouse-hotel-palladia' and a.locale = 'fr';
