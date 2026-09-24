-- ---------------------------------------------------------------------------
-- Liens entrants vers « Sortir à Toulouse : les spectacles de fin d’année ».
--
-- Trois liens poses sur des expressions deja presentes, sans rien reecrire.
-- Les pages /spectacle-toulouse et /diner-spectacles-toulouse en portent deux
-- autres, dans leur code.
--
-- L’article du Zenith est ecarte a dessein : son « spectacle humoristique »
-- parle des spectacles du Zenith, l’ancre aurait trompe le lecteur.
--
-- Relançable sans risque : une fois le lien pose, l’expression nue n’existe
-- plus et le remplacement ne trouve rien.
-- ---------------------------------------------------------------------------

-- ou-dormir-proche-aeroport-toulouse — bloc 4
update public.article_blocs b
set contenu = replace(b.contenu::text, 'nous organisons des dîners-spectacles et des événements', 'nous organisons des [dîners-spectacles](/sortir-a-toulouse-spectacles) et des événements')::jsonb
from public.articles a
where a.id = b.article_id and a.slug = 'ou-dormir-proche-aeroport-toulouse' and b.ordre = 4;

-- hotel-palladia-x-orchestre-de-chambre-de-toulouse — bloc 2
update public.article_blocs b
set contenu = replace(b.contenu::text, 'le gospel et des dîners-spectacles.', 'le gospel et des [dîners-spectacles](/sortir-a-toulouse-spectacles).')::jsonb
from public.articles a
where a.id = b.article_id and a.slug = 'hotel-palladia-x-orchestre-de-chambre-de-toulouse' and b.ordre = 2;

-- les-temps-forts-de-lhotel-palladia — bloc 1
update public.article_blocs b
set contenu = replace(b.contenu::text, 'pour les soirées et célébrations à Toulouse.', 'pour les [soirées et célébrations à Toulouse](/sortir-a-toulouse-spectacles).')::jsonb
from public.articles a
where a.id = b.article_id and a.slug = 'les-temps-forts-de-lhotel-palladia' and b.ordre = 1;
