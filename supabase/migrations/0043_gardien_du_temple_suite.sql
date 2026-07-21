-- ---------------------------------------------------------------------------
-- Article « Séjour en famille — Le Gardien du Temple » : suite de la page.
--
-- Le bloc tarifaire portait une photo qui n'a rien a y faire : sur le site il
-- est centre a 800 px, sans visuel. La photo appartient a la section suivante,
-- sur fond gris, qui presente l'evenement — section absente de l'import.
--
-- Les deux sections « Un spectacle d'envergure » et « Un parcours artistique »
-- occupent 1830 px.
--
-- Relançable sans risque.
-- ---------------------------------------------------------------------------

do $$
declare
  id_article uuid;
begin
  select id into id_article
  from public.articles
  where slug = 'sejour-en-famille-le-gardien-du-temple' and locale = 'fr';

  -- Le bloc tarifaire : centre, sans photo
  update public.article_blocs
  set type = 'sections',
      contenu = '{
        "titre": "Séjour en famille à l’Hôtel Palladia du 25 octobre au 28 octobre 2024",
        "sections": [
          {
            "titre": "Chambre Familiale pour 2 adultes & 2 enfants max",
            "items": [
              "Chambre Famille avec petits déjeuners : 119€ /nuit",
              "(2 Petits déjeuners adultes inclus, offert pour les enfants de -12 ans)",
              "Chambre Famille hors petit déjeuner : 99€ /nuit"
            ]
          }
        ]
      }'::jsonb
  where article_id = id_article and ordre = 2;

  -- Les deux sections illustrees s'etendent hors du gabarit
  update public.article_blocs
  set contenu = contenu || '{"large": true}'::jsonb
  where article_id = id_article and ordre in (3, 4);

  -- La presentation de l'evenement, sur fond gris, manquait
  if exists (
    select 1 from public.article_blocs
    where article_id = id_article and contenu->>'image' = '/images/blog/P1680987ok.jpg'
      and coalesce((contenu->>'fond_gris')::boolean, false)
  ) then
    return;  -- deja en place
  end if;

  update public.article_blocs set ordre = ordre + 100
  where article_id = id_article and ordre >= 3;

  insert into public.article_blocs (article_id, ordre, type, contenu)
  values (id_article, 3, 'texte_image', '{
    "fond_gris": true,
    "position": "droite",
    "image": "/images/blog/P1680987ok.jpg",
    "alt": "Le Gardien du Temple dans les rues de Toulouse",
    "paragraphes": [
      "Toulouse, connue pour ses façades en briques roses qui lui valent son surnom de « Ville Rose », est une ville où l’art et la culture ne cessent de se réinventer. **Cette année, un événement unique s’apprête à marquer la ville d’une manière inédite** : « Le Gardien du Temple ». Les 25, 26 et 27 octobre, Toulouse se transformera en un immense décor à ciel ouvert pour accueillir cet événement hors du commun. Plongeons ensemble dans cette aventure artistique et découvrez pourquoi vous ne voudrez pas manquer ce rendez-vous."
    ]
  }'::jsonb);

  update public.article_blocs set ordre = ordre - 99
  where article_id = id_article and ordre >= 100;
end $$;
