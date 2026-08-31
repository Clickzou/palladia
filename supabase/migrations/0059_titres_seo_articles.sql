-- ---------------------------------------------------------------------------
-- Titres et description des articles hors gabarit d'affichage Google.
--
-- Google coupe un titre au-dela d'environ 65 signes et une description au-dela
-- de 165 : la fin du libelle n'est jamais lue. Quatre articles depassaient,
-- un cinquieme etait trop court pour porter le moindre terme de recherche.
--
-- Les titres sont poses dans `seo_title`, laisse vide jusqu'ici : le champ
-- `titre` continue de porter le titre editorial affiche en h1, dans les
-- vignettes et le fil d'Ariane. Seule la balise <title> change.
--
-- Les traductions anglaise et espagnole de ces libelles sont dans
-- messages/contenu.en.json et messages/contenu.es.json.
--
-- Relançable sans risque.
-- ---------------------------------------------------------------------------

-- 79 signes : « Adelya : La fidélisation client réinventée pour l'hôtellerie
-- et la restauration »
update articles
set seo_title = 'Adelya : la fidélisation client pour l’hôtellerie'
where slug = 'adelya';

-- 78 signes : « Où dormir près de l'aéroport de Toulouse : pourquoi choisir
-- l'Hôtel Palladia ? »
update articles
set seo_title = 'Où dormir près de l’aéroport de Toulouse — Hôtel Palladia'
where slug = 'ou-dormir-proche-aeroport-toulouse';

-- 73 signes : « Comment choisir le meilleur lieu pour organiser un séminaire
-- à Toulouse ? »
update articles
set seo_title = 'Comment choisir son lieu de séminaire à Toulouse'
where slug = 'choisir-lieu-seminaire-toulouse';

-- 20 signes : « Réveillon à Toulouse », sans le nom de l'hotel ni l'occasion.
update articles
set seo_title = 'Réveillon du Nouvel An à Toulouse — Hôtel Palladia'
where slug = 'reveillon-toulouse';

-- 191 signes, coupee dans les resultats. Meme contenu, resserre a 162 : le
-- texte de 0050_seo_descriptions_distinctes.sql perd son verbe d'attaque et
-- sa formule de fin.
update articles
set seo_description =
  'L’Hôtel Palladia à Toulouse : 90 chambres et suites, un amphithéâtre de 285 places, '
  || '16 salles de réunion, un restaurant et un spa, pour vos séjours et événements.'
where slug = 'lhotel-palladia-un-voyage-dans-lexcellence-hoteliere-et-levenementiel-a-toulouse';
