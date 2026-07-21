-- ---------------------------------------------------------------------------
-- Article « Séjour en famille — Le Gardien du Temple ».
--
-- Le bloc tarifaire est introduit sur le site par un intitule dore que
-- l'archive n'avait pas repris.
--
-- Relançable sans risque.
-- ---------------------------------------------------------------------------

update public.article_blocs b
set contenu = b.contenu || '{"sous_titre":"Chambre Familiale pour 2 adultes & 2 enfants max"}'::jsonb
from public.articles a
where b.article_id = a.id
  and a.slug = 'sejour-en-famille-le-gardien-du-temple' and a.locale = 'fr'
  and b.ordre = 1;
