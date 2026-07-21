-- ---------------------------------------------------------------------------
-- Article « Comment choisir le meilleur lieu pour un séminaire à Toulouse ».
--
-- Deux phrases de cloture, placees sous une liste a puces, n'avaient pas ete
-- reprises : la structure importee n'admettait pas de texte apres la liste.
--
-- Relançable sans risque.
-- ---------------------------------------------------------------------------

-- « Un hôtel situé à proximité : … facilitera grandement la logistique »
update public.article_blocs b
set contenu = jsonb_set(
  b.contenu,
  '{cartes,0,conclusion}',
  '"facilitera grandement la logistique de votre événement."'::jsonb
)
from public.articles a
where b.article_id = a.id
  and a.slug = 'choisir-lieu-seminaire-toulouse' and a.locale = 'fr'
  and b.contenu->'cartes'->0->>'titre' like 'Choisir un lieu%';

-- « La ville bénéficie d’atouts majeurs : … »
update public.article_blocs b
set contenu = b.contenu || jsonb_build_object(
  'conclusion',
  'Ces éléments font de Toulouse l’une des destinations les plus recherchées du sud de la France pour les événements professionnels.'
)
from public.articles a
where b.article_id = a.id
  and a.slug = 'choisir-lieu-seminaire-toulouse' and a.locale = 'fr'
  and b.contenu->>'titre' like 'Toulouse : une destination idéale%';
