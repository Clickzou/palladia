-- ---------------------------------------------------------------------------
-- Article « Les temps forts de l'Hôtel Palladia ».
--
-- Ecarts releves au pixel sur le site :
--   * la photo d'ouverture s'affiche bord a bord (1900 px) ;
--   * le texte est accompagne d'une photo a sa droite, dans une rangee de
--     1680 px — l'import l'avait laisse seul, sans visuel ;
--   * le site n'affiche plus la galerie de 22 photos heritee de l'archive ;
--   * « Contactez-nous » porte deux boutons, telephone et courriel.
--
-- Le site affiche « 05 62 120 120 » mais son lien appelle le 120 179.
-- L'hotelier confirme que le bon numero est le 05 62 120 120 : c'est le lien
-- du site qui est errone, pas son libelle.
--
-- Relançable sans risque.
-- ---------------------------------------------------------------------------

do $$
declare
  id_article uuid;
begin
  select id into id_article
  from public.articles
  where slug = 'les-temps-forts-de-lhotel-palladia' and locale = 'fr';

  -- Photo d'ouverture, bord a bord
  update public.article_blocs
  set contenu = contenu || '{"pleine_largeur": true}'::jsonb
  where article_id = id_article and ordre = 0;

  -- Le texte retrouve la photo qui l'accompagne, a sa droite
  update public.article_blocs
  set type = 'texte_image',
      contenu = contenu || '{
        "position": "droite",
        "image": "/images/blog/13.jpg",
        "alt": "Une soirée d’entreprise dans les espaces de l’Hôtel Palladia"
      }'::jsonb
  where article_id = id_article and ordre = 1;

  -- Galerie retiree du site : on ne la reproduit pas
  delete from public.article_blocs
  where article_id = id_article and ordre = 2 and type = 'carrousel';

  -- Meme correction sur « Séjour en famille », ou 0025 avait retenu le lien
  -- errone du site plutot que le numero affiche.
  update public.article_blocs b
  set contenu = jsonb_set(
        b.contenu, '{boutons}',
        '[
          { "label": "05 62 120 120", "href": "tel:+33562120120", "externe": true },
          { "label": "Par Mail", "href": "mailto:reservation@hotelpalladia.com", "externe": true }
        ]'::jsonb)
  from public.articles a
  where b.article_id = a.id
    and a.slug = 'sejour-en-famille-a-toulouse-hotel-palladia' and a.locale = 'fr'
    and b.contenu->>'titre' = 'Réservation';

  -- Les deux boutons de contact
  update public.article_blocs
  set contenu = contenu || '{
        "centre": true,
        "boutons": [
          { "label": "05 62 120 120", "href": "tel:+33562120120", "externe": true },
          { "label": "Par Mail", "href": "mailto:reservation@hotelpalladia.com", "externe": true }
        ]
      }'::jsonb
  where article_id = id_article and contenu->>'titre' = 'Contactez-nous';
end $$;
