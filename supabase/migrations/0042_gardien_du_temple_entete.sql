-- ---------------------------------------------------------------------------
-- Article « Séjour en famille — Le Gardien du Temple » : en-tete.
--
-- Le premier bloc regroupait deux visuels dans un carrousel : l'affiche du
-- spectacle et la banniere des partenaires. Le site les separe — l'affiche
-- occupe toute la largeur (1920 px), la banniere vient plus bas, centree a
-- 800 px au-dessus des tarifs.
--
-- Relançable sans risque.
-- ---------------------------------------------------------------------------

-- L'affiche seule, bord a bord
update public.article_blocs b
set contenu = '{
  "pleine_largeur": true,
  "images": [
    {
      "src": "/images/blog/gardien-du-temple-toulouse.webp",
      "alt": "Affiche du spectacle « Le Gardien du Temple » dans les rues de Toulouse"
    }
  ]
}'::jsonb
from public.articles a
where b.article_id = a.id
  and a.slug = 'sejour-en-famille-le-gardien-du-temple' and a.locale = 'fr'
  and b.ordre = 0;

-- La banniere des partenaires, au-dessus du bloc tarifaire.
--
-- Le couple (article_id, ordre) est unique : incrementer les rangs d'un cran
-- les ferait entrer en collision en cours de route. On les ecarte largement,
-- on insere, puis on resserre.
do $$
declare
  id_article uuid;
begin
  select id into id_article
  from public.articles
  where slug = 'sejour-en-famille-le-gardien-du-temple' and locale = 'fr';

  if exists (
    select 1 from public.article_blocs
    where article_id = id_article and ordre = 1 and type = 'carrousel'
  ) then
    return;  -- deja en place
  end if;

  update public.article_blocs set ordre = ordre + 100
  where article_id = id_article and ordre >= 1;

  insert into public.article_blocs (article_id, ordre, type, contenu)
  values (id_article, 1, 'carrousel', '{
    "images": [
      {
        "src": "/images/blog/banniere-.png",
        "alt": "Le Gardien du Temple, avec Tisséo et Toulouse Métropole"
      }
    ]
  }'::jsonb);

  update public.article_blocs set ordre = ordre - 99
  where article_id = id_article and ordre >= 100;
end $$;
