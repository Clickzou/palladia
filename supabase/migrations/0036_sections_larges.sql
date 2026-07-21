-- ---------------------------------------------------------------------------
-- Sections composees hors du gabarit de 1140 px.
--
-- Plusieurs articles s'etendent presque bord a bord sur le site : la rangee
-- visuel + texte y mesure 1680 px et non 1120. Largeurs relevees au pixel.
--
-- Relançable sans risque.
-- ---------------------------------------------------------------------------

update public.article_blocs b
set contenu = b.contenu || '{"large": true}'::jsonb
from public.articles a
where b.article_id = a.id
  and a.locale = 'fr'
  and b.type = 'texte_image'
  and coalesce((b.contenu->>'pleine_largeur')::boolean, false) = false
  and a.slug in (
    'lhotel-palladia-un-voyage-dans-lexcellence-hoteliere-et-levenementiel-a-toulouse'
  );
