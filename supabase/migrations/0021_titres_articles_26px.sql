-- ---------------------------------------------------------------------------
-- Articles « Adelya » et « Staycation » : titres de section a 25 px.
--
-- Ces deux articles sont regles plus grand que le reste du blog (19 px).
-- Taille relevee au pixel sur le site en ligne.
--
-- Relançable sans risque.
-- ---------------------------------------------------------------------------

update public.article_blocs b
set contenu = b.contenu || '{"taille_titre":"moyen"}'::jsonb
from public.articles a
where b.article_id = a.id
  and a.slug in ('adelya', 'staycation-toulouse')
  and a.locale = 'fr'
  and b.contenu ? 'titre';
