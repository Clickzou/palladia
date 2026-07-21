-- ---------------------------------------------------------------------------
-- Correctifs releves en comparant la v2 au site en ligne.
--
-- L'article Saint-Valentin a ete renomme en 2026 sur le site depuis l'archive
-- de decembre 2025 : le titre importe etait donc perime.
--
-- Relançable sans risque.
-- ---------------------------------------------------------------------------

update public.articles
set titre = 'Soirée Saint Valentin 2026',
    seo_title = 'Soirée Saint Valentin 2026'
where slug = 'saint-valentin-toulouse' and locale = 'fr';
