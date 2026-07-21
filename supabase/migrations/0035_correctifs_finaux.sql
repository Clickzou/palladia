-- ---------------------------------------------------------------------------
-- Derniers ecarts releves au pixel sur le site.
--
-- Adelya compose hors du gabarit de 1140 px : ses deux grandes rangees
-- s'etendent sur pres de toute la largeur (1680 et 1720 px mesures).
-- « Comment ça fonctionne ? » est bien sur fond gris, contrairement a ce que
-- 0034 supposait.
--
-- Relançable sans risque.
-- ---------------------------------------------------------------------------

update public.article_blocs b
set contenu = b.contenu || '{"large": true}'::jsonb
from public.articles a
where b.article_id = a.id
  and a.slug = 'adelya' and a.locale = 'fr'
  and b.ordre in (0, 3);

update public.article_blocs b
set contenu = b.contenu || '{"fond_gris": true}'::jsonb
from public.articles a
where b.article_id = a.id
  and a.slug = 'adelya' and a.locale = 'fr'
  and b.contenu->>'titre' = 'Comment ça fonctionne ?';

-- Le Jardin du Barry : le visuel est a droite sur le site
update public.article_blocs b
set contenu = b.contenu || '{"position": "droite"}'::jsonb
from public.articles a
where b.article_id = a.id
  and a.slug = 'le-jardin-du-barry-a-toulouse-le-poumon-vert-de-la-cartoucherie'
  and a.locale = 'fr'
  and b.contenu->>'image' like '%jardin-du-barry%';

-- Saint-Valentin : « Menu Saint-Valentin » est affiche a 40 px
update public.article_blocs b
set contenu = b.contenu || '{"taille_titre": "grand"}'::jsonb
from public.articles a
where b.article_id = a.id
  and a.slug = 'saint-valentin-toulouse' and a.locale = 'fr'
  and b.contenu->>'titre' = 'Menu Saint-Valentin';

-- Saint-Valentin : le bloc porte « Réservations » et non « Réservation »,
-- les boutons de 0025 ne l'avaient donc pas trouve.
update public.article_blocs b
set contenu = b.contenu || '{
  "boutons": [
    { "label": "05 62 120 179", "href": "tel:+33562120179", "externe": true },
    { "label": "Par Mail", "href": "mailto:reservation@hotelpalladia.com", "externe": true }
  ]
}'::jsonb
from public.articles a
where b.article_id = a.id
  and a.slug = 'saint-valentin-toulouse' and a.locale = 'fr'
  and b.contenu->>'titre' = 'Réservations';
