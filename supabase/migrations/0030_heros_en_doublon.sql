-- ---------------------------------------------------------------------------
-- Onze articles affichaient deux fois le meme visuel : en bandeau pleine
-- largeur, puis dans le contenu. Le site ne l'affiche qu'une fois, dans le
-- contenu et a sa taille naturelle.
--
-- On retire le bandeau : l'image reste servie par son bloc, et l'image de
-- partage retombe sur la vignette (voir [slug]/page.tsx).
--
-- Relançable sans risque.
-- ---------------------------------------------------------------------------

update public.articles a
set image_hero = null
where a.locale = 'fr'
  and exists (
    select 1
    from public.article_blocs b
    where b.article_id = a.id
      and b.ordre = 0
      and b.type = 'carrousel'
      -- meme fichier de part et d'autre, aux suffixes de taille pres
      and regexp_replace(
            split_part(b.contenu->'images'->0->>'src', '/', -1),
            '(-scaled|-[0-9]+x[0-9]+)?\.[a-z]+$', '')
        = regexp_replace(
            split_part(a.image_hero, '/', -1),
            '(-scaled|-[0-9]+x[0-9]+)?\.[a-z]+$', '')
  );
