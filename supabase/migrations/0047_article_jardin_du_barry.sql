-- ---------------------------------------------------------------------------
-- Article « Le Jardin du Barry à Toulouse ».
--
-- Sur le site : photo bord a bord, puis trois pictos d'acces sous leur
-- intitule, puis deux rangees de 1880 px — texte a gauche et photo a droite,
-- puis l'inverse pour le port Saint-Sauveur.
--
-- L'import avait fait du titre des pictos celui du premier texte, et les
-- trois temps d'acces n'avaient pas ete repris.
--
-- Relançable sans risque.
-- ---------------------------------------------------------------------------

do $$
declare
  id_article uuid;
begin
  select id into id_article
  from public.articles
  where slug = 'le-jardin-du-barry-a-toulouse-le-poumon-vert-de-la-cartoucherie'
    and locale = 'fr';

  -- Photo d'ouverture, bord a bord
  update public.article_blocs
  set contenu = contenu || '{"pleine_largeur": true}'::jsonb
  where article_id = id_article and ordre = 0;

  -- Les deux rangees illustrees s'etendent hors du gabarit ; la seconde a son
  -- visuel a gauche.
  update public.article_blocs
  set contenu = contenu - 'titre' || '{"large": true}'::jsonb
  where article_id = id_article and ordre = 1;

  update public.article_blocs
  set contenu = contenu || '{"large": true, "position": "gauche"}'::jsonb
  where article_id = id_article and ordre = 2;

  -- Les trois temps d'acces, sous leur intitule
  if exists (
    select 1 from public.article_blocs
    where article_id = id_article and type = 'caracteristiques'
  ) then
    return;
  end if;

  update public.article_blocs set ordre = ordre + 100
  where article_id = id_article and ordre >= 1;

  insert into public.article_blocs (article_id, ordre, type, contenu)
  values (id_article, 1, 'caracteristiques', '{
    "titre": "Une échappée VERTE à proximité de l’Hôtel Palladia",
    "items": [
      { "icone": "velo", "label": "Vélo et trottinette : 5 mn" },
      { "icone": "pieton", "label": "A pied : 17 mn" },
      { "icone": "gps", "label": "GPS : 43.599623310492994" }
    ]
  }'::jsonb);

  update public.article_blocs set ordre = ordre - 99
  where article_id = id_article and ordre >= 100;
end $$;
