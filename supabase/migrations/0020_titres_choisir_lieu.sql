-- ---------------------------------------------------------------------------
-- Article « Comment choisir le meilleur lieu pour un séminaire à Toulouse ».
--
-- Cet article est regle a 25 px pour ses titres de section, la ou le reste du
-- blog est a 19 px. Taille relevee au pixel sur le site en ligne.
--
-- Relançable sans risque.
-- ---------------------------------------------------------------------------

update public.article_blocs b
set contenu = b.contenu || '{"taille_titre":"moyen"}'::jsonb
from public.articles a
where b.article_id = a.id
  and a.slug = 'choisir-lieu-seminaire-toulouse' and a.locale = 'fr'
  and b.contenu ? 'titre';
