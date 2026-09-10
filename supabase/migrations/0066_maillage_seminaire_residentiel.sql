-- ---------------------------------------------------------------------------
-- Liens entrants vers « Séminaire résidentiel à Toulouse ».
--
-- L'article est nouveau : sans lien interne, Google n'a aucun signal sur son
-- importance. Trois liens sont poses sur des expressions deja presentes dans
-- les textes, sans rien reecrire. La page /seminaire-evenement-professionnel
-- en pose un quatrieme, depuis src/data/seminaires.ts.
--
-- Aucun lien n'est place dans une reponse de FAQ : le balisage FAQPage reprend
-- ces reponses telles quelles, le markdown y apparaitrait en clair.
--
-- Relançable sans risque : une fois le lien pose, l'expression nue n'existe
-- plus et le remplacement ne trouve rien.
-- ---------------------------------------------------------------------------

-- choisir-lieu-seminaire-toulouse — bloc 2
update public.article_blocs b
set contenu = replace(b.contenu::text, 'Pour un séminaire résidentiel à Toulouse, la présence d’un hôtel', 'Pour un [séminaire résidentiel à Toulouse](/seminaire-residentiel-toulouse), la présence d’un hôtel')::jsonb
from public.articles a
where a.id = b.article_id and a.slug = 'choisir-lieu-seminaire-toulouse' and b.ordre = 2;

-- choisir-lieu-seminaire-toulouse — bloc 7
update public.article_blocs b
set contenu = replace(b.contenu::text, 'des prestations adaptées aux séminaires résidentiels.', 'des prestations adaptées aux [séminaires résidentiels](/seminaire-residentiel-toulouse).')::jsonb
from public.articles a
where a.id = b.article_id and a.slug = 'choisir-lieu-seminaire-toulouse' and b.ordre = 7;

-- formats-evenements-professionnels-toulouse — bloc 8
update public.article_blocs b
set contenu = replace(b.contenu::text, 'Le format résidentiel permet aux participants', '[Le format résidentiel](/seminaire-residentiel-toulouse) permet aux participants')::jsonb
from public.articles a
where a.id = b.article_id and a.slug = 'formats-evenements-professionnels-toulouse' and b.ordre = 8;
