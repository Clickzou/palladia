-- ---------------------------------------------------------------------------
-- Correctif : la migration 0021 avait passe TOUS les titres d'Adelya et de
-- Staycation a 25 px. Mesure faite, seuls les intitules de grande section le
-- sont ; les sous-titres restent a 19 px, taille par defaut du blog.
--
-- Relançable sans risque.
-- ---------------------------------------------------------------------------

-- On repart du defaut sur l'ensemble des blocs d'Adelya…
update public.article_blocs b
set contenu = b.contenu - 'taille_titre'
from public.articles a
where b.article_id = a.id
  and a.slug = 'adelya' and a.locale = 'fr';

-- … puis on remonte le seul titre affiche a 26 px sur le site.
update public.article_blocs b
set contenu = b.contenu || '{"taille_titre":"moyen"}'::jsonb
from public.articles a
where b.article_id = a.id
  and a.slug = 'adelya' and a.locale = 'fr'
  and b.contenu->>'titre' = 'Comment ça fonctionne ?';
