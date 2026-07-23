-- ---------------------------------------------------------------------------
-- Le parking compte 250 places, non 300.
--
-- Correction relevee par l'hotel le 23 juillet 2026. Le chiffre etait repris
-- partout : fiches de services, page Seminaires, descriptions Google et cinq
-- blocs d'articles. Les trois premiers sont corriges dans le code ; ces
-- articles-la vivent en base, d'ou cette migration.
--
-- Le remplacement passe par le texte du jsonb : « 300 places » n'apparait dans
-- aucune cle ni aucune URL, seulement dans des paragraphes et un libelle de
-- pictogramme.
--
-- A APPLIQUER AVEC LE MEME DEPLOIEMENT que la mise a jour de
-- messages/contenu.{en,es}.json : les articles ne sont stockes qu'en français,
-- leurs traductions sont indexees par la phrase française. Corriger l'un sans
-- l'autre ferait reapparaitre du français sur les pages anglaise et espagnole.
-- ---------------------------------------------------------------------------

update public.article_blocs
   set contenu = replace(contenu::text, '300 places', '250 places')::jsonb
 where contenu::text like '%300 places%';
