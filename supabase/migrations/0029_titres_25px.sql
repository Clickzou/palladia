-- ---------------------------------------------------------------------------
-- Trois articles ont un titre de section a 25 px la ou le blog est a 19 px.
-- Taille relevee au pixel sur le site en ligne, titre par titre.
--
-- Relançable sans risque.
-- ---------------------------------------------------------------------------

update public.article_blocs b
set contenu = b.contenu || '{"taille_titre":"moyen"}'::jsonb
from public.articles a
where b.article_id = a.id
  and a.locale = 'fr'
  and (
    (a.slug = 'afterwork-toulouse'
      and b.contenu->>'titre' ilike 'On vous propose donc de venir chiller%')
    or (a.slug = 'mariage-hotel-palladia-toulouse'
      and b.contenu->>'titre' = 'Notre salle de réception')
    or (a.slug = 'hotel-palladia-x-orchestre-de-chambre-de-toulouse'
      and b.contenu->>'titre' ilike 'Ainsi les polyphonies classiques%')
  );
