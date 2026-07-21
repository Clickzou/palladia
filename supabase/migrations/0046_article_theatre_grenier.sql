-- ---------------------------------------------------------------------------
-- Article « Cravate club — Le grenier de Toulouse ».
--
-- Page courte sur le site : l'affiche bord a bord, la phrase d'accroche, puis
-- les trois boutons de reservation. Deux blocs herites de l'archive — le titre
-- du spectacle et sa date — n'y figurent plus.
--
-- Relançable sans risque.
-- ---------------------------------------------------------------------------

do $$
declare
  id_article uuid;
begin
  select id into id_article
  from public.articles
  where slug = 'theatre-le-grenier-de-toulouse' and locale = 'fr';

  update public.article_blocs
  set contenu = contenu || '{"pleine_largeur": true}'::jsonb
  where article_id = id_article and ordre = 0;

  delete from public.article_blocs
  where article_id = id_article
    and contenu->>'titre' in (
      'Cravate club - le grenier de Toulouse',
      'Vendredi 17/02/2023 - 21:00 à 22:15'
    );
end $$;
