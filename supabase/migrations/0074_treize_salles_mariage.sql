-- ---------------------------------------------------------------------------
-- Salles de reunion : 13, plus l'amphitheatre. Mariage : 250 assis, 300 cocktail.
--
-- Reponse ecrite de l'hotel du 08/10/2026 : « 13 salles + amphitheatre », ce
-- que dit aussi sa plaquette (« 14 salles de reunion, de 2 a 350 personnes »).
-- Annule 0037_seize_salles.sql. La capacite maximale passe de 400, sans source,
-- a 350, chiffre de la plaquette et du salon Opera.
--
-- Mariages : « au salon Opera, 250 en banquet, 300 en cocktail ». Chiffres
-- propres au mariage ; la fiche technique des salons (300 / 350) n'est pas
-- touchee.
--
-- Relançable sans risque.
-- ---------------------------------------------------------------------------

update public.article_blocs
set contenu = replace(replace(replace(contenu::text, '16 salles', '13 salles'), 'jusqu’à 400 personnes', 'jusqu’à 350 personnes'), 'jusqu’à 400 participants', 'jusqu’à 350 participants')::jsonb
where contenu::text like '%16 salles%' or contenu::text like '%jusqu’à 400 p%';

update public.articles
set seo_description = replace(replace(replace(seo_description, '16 salles', '13 salles'), 'jusqu’à 400 personnes', 'jusqu’à 350 personnes'), 'jusqu’à 400 participants', 'jusqu’à 350 participants')
where seo_description like '%16 salles%' or seo_description like '%jusqu’à 400 p%';

-- Page mariage, bloc « Notre salle de réception » : la capacite en mariage
update public.article_blocs b
set contenu = jsonb_set(b.contenu, '{paragraphes}', (b.contenu->'paragraphes') || to_jsonb('Pour votre mariage, le salon Opéra accueille jusqu’à 250 invités en repas assis et jusqu’à 300 en cocktail.'::text))
from public.articles a
where a.id = b.article_id and a.slug = 'mariage-hotel-palladia-toulouse' and a.locale = 'fr' and b.ordre = 2
  and not (b.contenu->'paragraphes') ? 'Pour votre mariage, le salon Opéra accueille jusqu’à 250 invités en repas assis et jusqu’à 300 en cocktail.';
