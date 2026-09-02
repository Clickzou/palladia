-- ---------------------------------------------------------------------------
-- Textes alternatifs manquants sur quatre photos d'articles.
--
-- Releve par scripts/audit-seo.mjs : ces visuels portaient un `alt` vide.
-- Un `alt` vide est le bon balisage pour une image decorative — fond de
-- section, pictogramme, affiche de video dont le bouton porte deja
-- l'intitule — mais pas pour une photo qui apporte du contenu. Les quatre
-- traitees ici sont dans le second cas ; les autres signalements de l'audit
-- sont des faux positifs et restent en l'etat.
--
-- Les traductions anglaise et espagnole sont dans messages/contenu.en.json et
-- messages/contenu.es.json.
--
-- Relançable sans risque : l'`alt` n'est pose que la ou il est vide.
-- ---------------------------------------------------------------------------

-- le-jardin-du-barry-a-toulouse-le-poumon-vert-de-la-cartoucherie — bloc 3 (port-saint-sauveur.jpg)
update public.article_blocs b
set contenu = replace(b.contenu::text, '"alt": ""', '"alt": ' || '"Le port Saint-Sauveur à Toulouse au crépuscule, péniches amarrées le long du canal"')::jsonb
from public.articles a
where a.id = b.article_id and a.slug = 'le-jardin-du-barry-a-toulouse-le-poumon-vert-de-la-cartoucherie' and b.ordre = 3
  and b.contenu::text like '%port-saint-sauveur.jpg%';

-- sejour-en-famille-a-toulouse-hotel-palladia — bloc 0 (offre-famille-ete-2025-VB-1.jpg)
update public.article_blocs b
set contenu = replace(b.contenu::text, '"alt": ""', '"alt": ' || '"Offre séjour en famille à l’Hôtel Palladia : deux chambres communicantes et quatre petits déjeuners, à partir de 215 €"')::jsonb
from public.articles a
where a.id = b.article_id and a.slug = 'sejour-en-famille-a-toulouse-hotel-palladia' and b.ordre = 0
  and b.contenu::text like '%offre-famille-ete-2025-VB-1.jpg%';

-- sejour-en-famille-le-gardien-du-temple — bloc 4 (P1680591okok.jpg)
update public.article_blocs b
set contenu = replace(b.contenu::text, '"alt": ""', '"alt": ' || '"Créature mécanique géante aux cornes de bélier, spectacle Le Gardien du Temple à Toulouse"')::jsonb
from public.articles a
where a.id = b.article_id and a.slug = 'sejour-en-famille-le-gardien-du-temple' and b.ordre = 4
  and b.contenu::text like '%P1680591okok.jpg%';

-- sejour-en-famille-le-gardien-du-temple — bloc 5 (P1680477okok.jpg)
update public.article_blocs b
set contenu = replace(b.contenu::text, '"alt": ""', '"alt": ' || '"La créature du Gardien du Temple crache une gerbe de feu au-dessus de son araignée mécanique"')::jsonb
from public.articles a
where a.id = b.article_id and a.slug = 'sejour-en-famille-le-gardien-du-temple' and b.ordre = 5
  and b.contenu::text like '%P1680477okok.jpg%';
