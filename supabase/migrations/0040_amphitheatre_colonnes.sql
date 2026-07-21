-- ---------------------------------------------------------------------------
-- Article « L'amphithéâtre » : proportions de la rangee texte + photo.
--
-- Mesure sur le site : la rangee occupe 1609 px, le texte 880 px et la photo
-- 522 px — soit environ 60 / 40, et non deux colonnes egales. Sans cela la
-- photo en portrait s'affiche presque deux fois trop grande.
--
-- Relançable sans risque.
-- ---------------------------------------------------------------------------

update public.article_blocs b
set contenu = b.contenu || '{"texte_dominant": true}'::jsonb
from public.articles a
where b.article_id = a.id
  and a.slug = 'amphitheatre-hotel-palladia-renove' and a.locale = 'fr'
  and b.type = 'texte_image';
