-- ---------------------------------------------------------------------------
-- Suite de 0036 : cinq articles composent hors du gabarit de 1140 px.
--
-- Releve automatique par scripts/largeurs-sections.mjs, qui compare la largeur
-- occupee par chaque paragraphe de part et d'autre. C'est ce releve qui a
-- permis de les trouver tous d'un coup plutot qu'un par un.
--
-- Relançable sans risque.
-- ---------------------------------------------------------------------------

update public.article_blocs b
set contenu = b.contenu || '{"large": true}'::jsonb
from public.articles a
where b.article_id = a.id
  and a.locale = 'fr'
  and b.type in ('texte_image', 'sections', 'texte')
  -- les rangees bord a bord ont deja leur propre gabarit
  and coalesce((b.contenu->>'pleine_largeur')::boolean, false) = false
  and a.slug in (
    'amphitheatre-hotel-palladia-renove',
    'sejour-en-famille-le-gardien-du-temple',
    'les-temps-forts-de-lhotel-palladia',
    'diner-accord-mets-champagne',
    'le-jardin-du-barry-a-toulouse-le-poumon-vert-de-la-cartoucherie'
  );
