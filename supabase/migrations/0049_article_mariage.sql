-- ---------------------------------------------------------------------------
-- Article « Mariage Hôtel Palladia Toulouse ».
--
-- Ecarts releves au pixel sur le site :
--   * la photo d'ouverture s'affiche bord a bord (1920 px) ;
--   * « Célébrez le plus beau jour de votre vie » est un sous-titre de 22 px
--     en Roboto, pas un titre dore ;
--   * « Notre salle de réception » forme une section grise centree : texte,
--     puis photo de 775 px, superficie, et un bouton « Détails » vers la page
--     Séminaire — la v2 en avait fait une rangee texte + image.
--
-- Relançable sans risque.
-- ---------------------------------------------------------------------------

do $$
declare
  id_article uuid;
begin
  select id into id_article
  from public.articles
  where slug = 'mariage-hotel-palladia-toulouse' and locale = 'fr';

  update public.article_blocs
  set contenu = contenu || '{"pleine_largeur": true}'::jsonb
  where article_id = id_article and ordre = 0;

  update public.article_blocs
  set contenu = contenu || '{"centre": true, "taille_titre": "sous-titre"}'::jsonb
  where article_id = id_article and ordre = 1;

  -- La salle de reception : section grise, photo centree, bouton
  update public.article_blocs
  set type = 'texte',
      contenu = '{
        "fond_gris": true,
        "centre": true,
        "titre": "Notre salle de réception",
        "taille_titre": "moyen",
        "paragraphes": [
          "Situé en bord de piscine, ce salon s’inscrit dans un cadre très agréable (baies vitrées donnant sur la terrasse, entrée indépendante, salle climatisée)"
        ],
        "image": "/images/blog/salon-opera-hotel-palladia-toulouse.jpg",
        "alt": "Le salon Opéra de l’Hôtel Palladia dressé pour un mariage",
        "note": "Superficie : 500 m²",
        "boutons": [
          { "label": "Détails", "href": "/seminaire-evenement-professionnel" }
        ]
      }'::jsonb
  where article_id = id_article and ordre = 2;
end $$;
