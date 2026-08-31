-- ---------------------------------------------------------------------------
-- Maillage interne : liens des articles vers les pages commerciales.
--
-- Les articles ne renvoyaient vers aucune page de l'hotel : ils n'etaient
-- relies au reste du site que par la liste des actualites, et les pages
-- /hotel, /chambres, /restaurant, /spa et /seminaire ne recevaient que les
-- liens du menu, tous portant la meme ancre. Or c'est l'ancre posee dans un
-- texte qui dit a Google de quoi parle la page visee.
--
-- Dix liens sont poses sur des expressions deja presentes dans les textes,
-- sans rien reecrire. Les traductions anglaise et espagnole suivent dans
-- messages/contenu.en.json et messages/contenu.es.json.
--
-- Les liens internes passent par le routeur localise : la cible reste la meme
-- dans les trois langues.
--
-- Relançable sans risque : une fois le lien pose, l'expression nue n'existe
-- plus et le remplacement ne trouve rien.
-- ---------------------------------------------------------------------------

-- ou-dormir-proche-aeroport-toulouse — /hotel
update article_blocs b
set contenu = replace(b.contenu::text, 'Ne cherchez plus : l’Hôtel Palladia est l’adresse qu’il vous faut. Situé à seulement 10 minutes de l’aéroport, notre établissement 4 étoiles combine confort, services hauts de gamme et ambiance chaleureuse pour rendre votre séjour inoubliable.', 'Ne cherchez plus : l’Hôtel Palladia est l’adresse qu’il vous faut. Situé à seulement 10 minutes de l’aéroport, [notre établissement 4 étoiles](/hotel) combine confort, services hauts de gamme et ambiance chaleureuse pour rendre votre séjour inoubliable.')::jsonb
from articles a
where a.id = b.article_id and a.slug = 'ou-dormir-proche-aeroport-toulouse' and b.ordre = 0;

-- ou-dormir-proche-aeroport-toulouse — /chambres
update article_blocs b
set contenu = replace(b.contenu::text, 'À l’Hôtel Palladia, chaque détail compte. Nos chambres spacieuses et lumineuses sont pensées pour votre bien-être :', 'À l’Hôtel Palladia, chaque détail compte. [Nos chambres spacieuses et lumineuses](/chambres) sont pensées pour votre bien-être :')::jsonb
from articles a
where a.id = b.article_id and a.slug = 'ou-dormir-proche-aeroport-toulouse' and b.ordre = 2;

-- ou-dormir-proche-aeroport-toulouse — /restaurant
update article_blocs b
set contenu = replace(b.contenu::text, 'Dormir près de l’aéroport, c’est bien. Bien manger, c’est encore mieux ! Notre restaurant vous propose une cuisine inventive, élaborée à partir de produits frais et locaux. Que ce soit pour un dîner en amoureux, un déjeuner d’affaires ou un repas avant de reprendre l’avion, le chef et son équipe vous réservent une expérience gustative unique.', 'Dormir près de l’aéroport, c’est bien. Bien manger, c’est encore mieux ! [Notre restaurant](/restaurant) vous propose une cuisine inventive, élaborée à partir de produits frais et locaux. Que ce soit pour un dîner en amoureux, un déjeuner d’affaires ou un repas avant de reprendre l’avion, le chef et son équipe vous réservent une expérience gustative unique.')::jsonb
from articles a
where a.id = b.article_id and a.slug = 'ou-dormir-proche-aeroport-toulouse' and b.ordre = 3;

-- staycation-toulouse — /chambres
update article_blocs b
set contenu = replace(b.contenu::text, 'Nos **chambres et suites** vous garantissent un **confort absolu** :', 'Nos [chambres et suites](/chambres) vous garantissent un **confort absolu** :')::jsonb
from articles a
where a.id = b.article_id and a.slug = 'staycation-toulouse' and b.ordre = 2;

-- staycation-toulouse — /spa
update article_blocs b
set contenu = replace(b.contenu::text, 'Évadez-vous dans un **espace dédié à la relaxation** et laissez-vous envelopper par une **atmosphère apaisante** :', 'Évadez-vous dans un [espace dédié à la relaxation](/spa) et laissez-vous envelopper par une **atmosphère apaisante** :')::jsonb
from articles a
where a.id = b.article_id and a.slug = 'staycation-toulouse' and b.ordre = 3;

-- staycation-toulouse — /restaurant
update article_blocs b
set contenu = replace(b.contenu::text, 'Notre **restaurant gastronomique** vous invite à un **voyage culinaire**, où saveurs locales et créativité se rencontrent.', 'Notre [restaurant gastronomique](/restaurant) vous invite à un **voyage culinaire**, où saveurs locales et créativité se rencontrent.')::jsonb
from articles a
where a.id = b.article_id and a.slug = 'staycation-toulouse' and b.ordre = 4;

-- lhotel-palladia-un-voyage-dans-lexcellence-hoteliere-et-levenementiel-a-toulouse — /chambres, /seminaire-evenement-professionnel
update article_blocs b
set contenu = replace(b.contenu::text, 'Avec ses 90 chambres élégamment aménagées, ses 16 salles de réunion modulables et son amphithéâtre de 285 places, il se positionne comme un lieu incontournable pour les séminaires, conférences et événements professionnels à Toulouse.', 'Avec ses [90 chambres élégamment aménagées](/chambres), ses [16 salles de réunion modulables](/seminaire-evenement-professionnel) et son amphithéâtre de 285 places, il se positionne comme un lieu incontournable pour les séminaires, conférences et événements professionnels à Toulouse.')::jsonb
from articles a
where a.id = b.article_id and a.slug = 'lhotel-palladia-un-voyage-dans-lexcellence-hoteliere-et-levenementiel-a-toulouse' and b.ordre = 0;

-- mariage-hotel-palladia-toulouse — /hotel
update article_blocs b
set contenu = replace(b.contenu::text, 'Pour l’organisation de votre mariage à Toulouse, l’hôtel Palladia vous propose des prestations haut de gamme dans un cadre luxueux et harmonieux. L’équipe commerciale est à votre écoute pour l’ensemble de l’organisation de votre mariage (vin d’honneur, dîner gastronomique, brunch…).', 'Pour l’organisation de votre mariage à Toulouse, [l’hôtel Palladia vous propose des prestations haut de gamme](/hotel) dans un cadre luxueux et harmonieux. L’équipe commerciale est à votre écoute pour l’ensemble de l’organisation de votre mariage (vin d’honneur, dîner gastronomique, brunch…).')::jsonb
from articles a
where a.id = b.article_id and a.slug = 'mariage-hotel-palladia-toulouse' and b.ordre = 1;

-- amphitheatre-hotel-palladia-renove — /seminaire-evenement-professionnel
update article_blocs b
set contenu = replace(b.contenu::text, 'Pour vos événements les plus prestigieux, l’Hôtel Palladia vous ouvre les portes de son amphithéâtre récemment rénové.', 'Pour [vos événements les plus prestigieux](/seminaire-evenement-professionnel), l’Hôtel Palladia vous ouvre les portes de son amphithéâtre récemment rénové.')::jsonb
from articles a
where a.id = b.article_id and a.slug = 'amphitheatre-hotel-palladia-renove' and b.ordre = 2;
