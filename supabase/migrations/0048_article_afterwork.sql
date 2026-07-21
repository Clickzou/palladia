-- ---------------------------------------------------------------------------
-- Article « Afterwork Toulouse ».
--
-- Ecarts releves sur le site :
--   * l'affiche s'affiche bord a bord (1900 px) ;
--   * « On vous propose donc de venir chiller… » est un paragraphe centre sur
--     deux lignes, pas un titre ;
--   * « Prochain afterwork » et sa date d'octobre 2019 ne figurent plus.
--
-- Relançable sans risque.
-- ---------------------------------------------------------------------------

do $$
declare
  id_article uuid;
begin
  select id into id_article
  from public.articles
  where slug = 'afterwork-toulouse' and locale = 'fr';

  update public.article_blocs
  set contenu = contenu || '{"pleine_largeur": true}'::jsonb
  where article_id = id_article and ordre = 0;

  -- L'accroche redevient un paragraphe
  update public.article_blocs
  set contenu = '{
    "centre": true,
    "paragraphes": [
      "On vous propose donc de venir chiller durant nos AFTERWORK…\nHistoire de prolonger le plaisir de ces belles journées toulousaines"
    ]
  }'::jsonb
  where article_id = id_article and ordre = 1;

  -- Annonce d'un afterwork passe, retiree du site
  delete from public.article_blocs
  where article_id = id_article
    and contenu->>'titre' in ('Prochain afterwork', 'Mardi 1er octobre 2019 au salon Opéra');
end $$;
