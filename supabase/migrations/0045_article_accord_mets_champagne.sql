-- ---------------------------------------------------------------------------
-- Article « Dîner Accord mets & Champagne ».
--
-- Ecarts releves au pixel sur le site :
--   * l'affiche s'affiche bord a bord (1900 px) ;
--   * « Le menu du jeudi 21 Novembre » titre la section, et « Menu à 75€ TTC »
--     coiffe l'encadre gris qui contient la carte ;
--   * les accords champagne sont en italique sous chaque service.
--
-- Relançable sans risque.
-- ---------------------------------------------------------------------------

do $$
declare
  id_article uuid;
begin
  select id into id_article
  from public.articles
  where slug = 'diner-accord-mets-champagne' and locale = 'fr';

  -- L'affiche, bord a bord
  update public.article_blocs
  set contenu = contenu || '{"pleine_largeur": true}'::jsonb
  where article_id = id_article and ordre = 0;

  -- Le bloc titre seul fait doublon avec l'intitule de la carte
  delete from public.article_blocs
  where article_id = id_article
    and type = 'texte'
    and contenu->>'titre' = 'Le menu du jeudi 21 Novembre';

  -- La carte : intitule de section, encadre gris, accords en italique
  update public.article_blocs
  set contenu = '{
    "titre_section": "Le menu du jeudi 21 Novembre",
    "titre": "Menu à 75€ TTC",
    "sections": [
      {
        "titre": "Apéritif",
        "lignes": ["Champagne Duval Leroy, Réserve brut et ses pièces apéritives"]
      },
      {
        "titre": "Entrée",
        "lignes": [
          "Homard Bleu Breton,\nCéleri et carottes anisées,\nEspuma de bisque de homard",
          "*Champagne Duval Leroy, Fleur de champagne*"
        ]
      },
      {
        "titre": "Plat",
        "lignes": [
          "Filet de bœuf,\nPurée de pommes de terre truffée,\nJus au Porto rouge",
          "*Champagne Duval Leroy, Blanc de blanc prestige grand cru*"
        ]
      },
      {
        "titre": "Dessert",
        "lignes": [
          "Moelleux chocolat 44%, sorbet maison au Champagne Duval Leroy",
          "*Champagne Duval Leroy, Rosé brut Prestige Premier cru*",
          "Eaux minérales & Café"
        ]
      }
    ]
  }'::jsonb
  where article_id = id_article and type = 'menu';
end $$;
