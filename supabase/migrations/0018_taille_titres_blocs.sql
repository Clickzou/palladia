-- ---------------------------------------------------------------------------
-- Tailles de titre relevees au pixel sur le site d'origine.
--
-- Le bareme du site : 19 px par defaut pour un titre interne a un article,
-- 25 px (« moyen ») ou 40 px (« grand ») selon le reglage Elementor de la page.
--
-- Relançable sans risque.
-- ---------------------------------------------------------------------------

-- « Nos forfaits romantiques » est affiche a 40 px
update public.article_blocs b
set contenu = b.contenu || '{"taille_titre":"grand"}'::jsonb
from public.articles a
where b.article_id = a.id
  and a.slug = 'saint-valentin-toulouse' and a.locale = 'fr'
  and b.contenu->>'titre' = 'Nos forfaits romantiques';
