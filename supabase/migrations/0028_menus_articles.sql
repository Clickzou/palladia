-- ---------------------------------------------------------------------------
-- Cartes de menu de deux articles.
--
-- « Dîner accord mets & Champagne » : les intitules de service (Apéritif,
-- Entrée, Plat, Dessert) manquaient, les plats etaient alignes d'affilee.
--
-- « Réveillon » : le site n'y titre pas les services, il les met en gras dans
-- le paragraphe. On reproduit cette seconde forme.
--
-- Relançable sans risque.
-- ---------------------------------------------------------------------------

-- Le Réveillon n'affiche pas ses services en titre
update public.article_blocs b
set contenu = b.contenu || '{"services_en_titre": false}'::jsonb
from public.articles a
where b.article_id = a.id
  and a.slug = 'reveillon-toulouse' and a.locale = 'fr'
  and b.type = 'menu';

-- Dîner accord mets & Champagne : le bloc de plats devient une carte de menu
delete from public.article_blocs b
using public.articles a
where b.article_id = a.id
  and a.slug = 'diner-accord-mets-champagne' and a.locale = 'fr'
  and b.ordre = 2;

insert into public.article_blocs (article_id, ordre, type, contenu)
select a.id, 2, 'menu'::bloc_type, '{
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
        "Champagne Duval Leroy, Fleur de champagne"
      ]
    },
    {
      "titre": "Plat",
      "lignes": [
        "Filet de bœuf,\nPurée de pommes de terre truffée,\nJus au Porto rouge",
        "Champagne Duval Leroy, Blanc de blanc prestige grand cru"
      ]
    },
    {
      "titre": "Dessert",
      "lignes": [
        "Moelleux chocolat 44%, sorbet maison au Champagne Duval Leroy",
        "Champagne Duval Leroy, Rosé brut Prestige Premier cru",
        "Eaux minérales & Café"
      ]
    }
  ]
}'::jsonb
from public.articles a
where a.slug = 'diner-accord-mets-champagne' and a.locale = 'fr';
