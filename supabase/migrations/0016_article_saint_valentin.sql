-- ---------------------------------------------------------------------------
-- Article « Soirée Saint-Valentin 2026 ».
--
-- L'archive All-in-One ne contenait que l'edition 2025. Le menu, les forfaits
-- et les coordonnees de reservation ont ete releves sur le site en ligne :
-- https://www.hotelpalladia.com/saint-valentin-toulouse/
--
-- Ajoute le type de bloc `menu` (services d'un repas + tarif), reutilisable
-- pour les autres articles gastronomiques.
--
-- Relançable sans risque.
-- ---------------------------------------------------------------------------

alter type public.bloc_type add value if not exists 'menu';
