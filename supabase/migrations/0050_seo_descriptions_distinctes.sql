-- Deux articles partageaient mot pour mot leur meta description, heritee du
-- site WordPress : « Découvrez le cadre idéal pour vos séminaires à Toulouse… ».
-- Google n'en retient qu'une dans ce cas, et l'autre perd son extrait.
--
-- L'article « Un Voyage dans l'Excellence Hôtelière » parle de l'etablissement
-- dans son ensemble, pas seulement des seminaires : sa description le dit
-- desormais. Celle de « choisir-lieu-seminaire-toulouse » reste inchangee, le
-- texte lui correspondant.

update articles
set seo_description =
  'Découvrez l’Hôtel Palladia à Toulouse : 90 chambres et suites, un amphithéâtre de 285 places, '
  || '16 salles de réunion, un restaurant et un spa, au service de vos séjours comme de vos événements.'
where slug = 'lhotel-palladia-un-voyage-dans-lexcellence-hoteliere-et-levenementiel-a-toulouse';
