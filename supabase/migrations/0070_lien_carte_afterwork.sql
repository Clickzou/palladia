-- ---------------------------------------------------------------------------
-- La carte afterwork pointait encore sur l'ancien WordPress.
--
-- Le bouton « Découvrez la carte » de l'article afterwork renvoyait vers
-- https://www.hotelpalladia.com/wp-content/uploads/2024/03/… , une adresse qui
-- repond 403 depuis la mise en ligne de la v2. Le fichier, lui, avait bien ete
-- repris dans public/images/blog : c'est le lien qui n'avait pas suivi.
--
-- Aucun script ne l'avait vu : audit-seo.mjs ne releve que les liens commençant
-- par « / », et celui-ci etait absolu.
--
-- Relançable sans risque : une fois corrige, l'ancienne adresse n'existe plus.
-- ---------------------------------------------------------------------------

update public.article_blocs b
set contenu = replace(b.contenu::text, 'https://www.hotelpalladia.com/wp-content/uploads/2024/03/CARTE-AFTERWORK-OCTOBRE.pdf', '/images/blog/CARTE-AFTERWORK-OCTOBRE.pdf')::jsonb
from public.articles a
where a.id = b.article_id and a.slug = 'afterwork-toulouse';
