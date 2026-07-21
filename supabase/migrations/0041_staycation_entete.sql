-- ---------------------------------------------------------------------------
-- Article « Offre Staycation » : en-tete et premiere rangee.
--
-- Deux ecarts releves au pixel :
--   * le site n'affiche aucun sous-titre sous le titre. « Découvrez notre
--     offre exclusive… » est le titre de la section suivante, que le releve
--     automatique des titres (0015) avait pris pour un sous-titre d'article.
--   * la rangee photo + texte occupe 1815 px, pas la largeur de contenu.
--
-- Relançable sans risque.
-- ---------------------------------------------------------------------------

update public.articles
set sous_titre = null
where slug = 'staycation-toulouse' and locale = 'fr';

update public.article_blocs b
set contenu = b.contenu || '{"large": true}'::jsonb
from public.articles a
where b.article_id = a.id
  and a.slug = 'staycation-toulouse' and a.locale = 'fr'
  and b.ordre = 0;
