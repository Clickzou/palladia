-- ---------------------------------------------------------------------------
-- Suite de 0030, qui ne regardait que les blocs de type `carrousel`.
--
-- Le meme doublon existe des que le premier bloc porte deja le visuel de
-- l'article, quel que soit son type : bandeau plein ecran, puis la meme image
-- dans le contenu. On generalise la regle.
--
-- Relançable sans risque.
-- ---------------------------------------------------------------------------

update public.articles a
set image_hero = null
where a.image_hero is not null
  and exists (
    select 1
    from public.article_blocs b
    where b.article_id = a.id
      and b.ordre = 0
      -- le visuel du bloc, quel que soit l'endroit ou il est range
      and regexp_replace(
            split_part(
              coalesce(b.contenu->>'image', b.contenu->'images'->0->>'src'),
              '/', -1),
            '(-scaled|-[0-9]+x[0-9]+)?\.[a-z]+$', '')
        = regexp_replace(
            split_part(a.image_hero, '/', -1),
            '(-scaled|-[0-9]+x[0-9]+)?\.[a-z]+$', '')
  );
