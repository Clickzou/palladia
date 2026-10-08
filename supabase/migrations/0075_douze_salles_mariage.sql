-- ---------------------------------------------------------------------------
-- Salles de reunion : 12, plus l'amphitheatre. Page mariage completee.
--
-- Seconde reponse ecrite de l'hotel du 08/10/2026. A la question « quelle est
-- la treizieme salle ? », il repond « 12 + amphi » : les « 13 salles » de sa
-- premiere reponse comptaient l'amphitheatre. Corrige 0074_treize_salles_mariage.sql,
-- qui avait lu 13 salles plus l'amphitheatre. La fiche technique liste bien
-- 12 salons : Opera, Capitouls, Saint-Nicolas, Saint-Georges, VIP, Dalbade,
-- Velane, Daurade, Ozenne, Perchepinte, Croix-Baragnon, Filatiers.
--
-- Parking : 250 places, confirme (la plaquette dit 300, l'hotel l'a reduit).
--
-- Mariages : devis sur mesure, invites heberges sur place a tarif
-- preferentiel, soiree jusqu'a 4 h.
--
-- Relançable sans risque.
-- ---------------------------------------------------------------------------

update public.article_blocs
set contenu = replace(contenu::text, '13 salles', '12 salles')::jsonb
where contenu::text like '%13 salles%';

update public.articles
set seo_description = replace(seo_description, '13 salles', '12 salles')
where seo_description like '%13 salles%';

-- Page mariage, bloc d'introduction : devis, hebergement, heure de fin
update public.article_blocs b
set contenu = jsonb_set(b.contenu, '{paragraphes}', jsonb_insert(b.contenu->'paragraphes', '{1}', to_jsonb('Chaque mariage fait l’objet d’un devis sur mesure. Vos invités peuvent dormir sur place et bénéficient d’un tarif préférentiel sur les chambres. La soirée peut se prolonger jusqu’à 4 h du matin.'::text)))
from public.articles a
where a.id = b.article_id and a.slug = 'mariage-hotel-palladia-toulouse' and a.locale = 'fr' and b.ordre = 1
  and not (b.contenu->'paragraphes') ? 'Chaque mariage fait l’objet d’un devis sur mesure. Vos invités peuvent dormir sur place et bénéficient d’un tarif préférentiel sur les chambres. La soirée peut se prolonger jusqu’à 4 h du matin.';
