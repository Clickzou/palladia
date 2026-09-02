-- ---------------------------------------------------------------------------
-- « Nos formats d'événements » en tete des actualites, et ses liens entrants.
--
-- L'article etait en position 13, donc en page 3 de la liste des actualites,
-- et aucune page ne pointait vers lui : Google jauge l'importance d'une page
-- a ses liens internes entrants, le signal etait nul. Il passe en position 1,
-- les autres articles reculent d'un rang.
--
-- Quatre liens sont poses sur des expressions deja presentes dans les textes,
-- sans rien reecrire. La page /seminaire-evenement-professionnel en pose un
-- cinquieme, depuis src/data/seminaires.ts.
--
-- Les traductions anglaise et espagnole suivent dans messages/contenu.en.json
-- et messages/contenu.es.json.
--
-- Relançable sans risque : une fois le lien pose, l'expression nue n'existe
-- plus et le remplacement ne trouve rien. Le decalage des positions, lui, est
-- calcule a partir du rang de l'article et non incremente aveuglement.
-- ---------------------------------------------------------------------------

-- Les autres articles reculent d'un rang, puis l'article passe en tete.
update public.articles
set position = position + 1
where locale = 'fr'
  and slug <> 'formats-evenements-professionnels-toulouse'
  and position >= (
    select position from public.articles where slug = 'formats-evenements-professionnels-toulouse' and locale = 'fr'
  );

update public.articles
set position = 1
where slug = 'formats-evenements-professionnels-toulouse' and locale = 'fr';

-- choisir-lieu-seminaire-toulouse — bloc 1
update public.article_blocs b
set contenu = replace(b.contenu::text, 'les plus recherchées du sud de la France pour les événements professionnels.', 'les plus recherchées du sud de la France pour les [événements professionnels](/formats-evenements-professionnels-toulouse).')::jsonb
from public.articles a
where a.id = b.article_id and a.slug = 'choisir-lieu-seminaire-toulouse' and b.ordre = 1;

-- choisir-lieu-seminaire-toulouse — bloc 12
update public.article_blocs b
set contenu = replace(b.contenu::text, 'découvrez notre offre dédiée aux entreprises et événements professionnels.', 'découvrez notre offre dédiée aux [entreprises et événements professionnels](/formats-evenements-professionnels-toulouse).')::jsonb
from public.articles a
where a.id = b.article_id and a.slug = 'choisir-lieu-seminaire-toulouse' and b.ordre = 12;

-- lhotel-palladia-un-voyage-dans-lexcellence-hoteliere-et-levenementiel-a-toulouse — bloc 0
update public.article_blocs b
set contenu = replace(b.contenu::text, 'il se positionne comme un lieu incontournable pour les séminaires, conférences et événements professionnels à Toulouse.', 'il se positionne comme un lieu incontournable pour les [séminaires, conférences et événements professionnels à Toulouse](/formats-evenements-professionnels-toulouse).')::jsonb
from public.articles a
where a.id = b.article_id and a.slug = 'lhotel-palladia-un-voyage-dans-lexcellence-hoteliere-et-levenementiel-a-toulouse' and b.ordre = 0;

-- amphitheatre-hotel-palladia-renove — bloc 2
update public.article_blocs b
set contenu = replace(b.contenu::text, 'parfaits pour assurer le bon déroulement de vos présentations, conférences ou spectacles.', 'parfaits pour assurer le bon déroulement de vos [présentations, conférences ou spectacles](/formats-evenements-professionnels-toulouse).')::jsonb
from public.articles a
where a.id = b.article_id and a.slug = 'amphitheatre-hotel-palladia-renove' and b.ordre = 2;
