-- ---------------------------------------------------------------------------
-- PERIME : annule par 0074_treize_salles_mariage.sql (l'hotel a confirme par
-- ecrit 13 salles + l'amphitheatre le 08/10/2026). Ne pas rejouer seul.
--
-- Nombre de salles de reunion : 16.
--
-- Le site se contredit d'une page a l'autre — 13 dans la description SEO du
-- seminaire, 15 dans l'article « Un voyage dans l'excellence ». L'hotelier a
-- tranche : 16. Valeur alignee partout, code et base.
--
-- Relançable sans risque.
-- ---------------------------------------------------------------------------

update public.article_blocs
set contenu = replace(replace(contenu::text, '13 salles', '16 salles'), '15 salles', '16 salles')::jsonb
where contenu::text like '%1_ salles%';
