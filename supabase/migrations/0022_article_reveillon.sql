-- ---------------------------------------------------------------------------
-- Article « Dîner Réveillon à Toulouse ».
--
-- L'archive ne contenait que l'accroche : le menu complet, les tarifs et les
-- formules manquaient. Contenu releve sur le site en ligne, qui signale par
-- ailleurs que la soiree est COMPLETE.
--
-- Les emojis decoratifs ne sont pas repris, conformement a la demande.
--
-- Relançable sans risque.
-- ---------------------------------------------------------------------------

update public.articles
set image_hero = '/images/blog/reveillon-toulouse-2048x708.jpg'
where slug = 'reveillon-toulouse' and locale = 'fr';

delete from public.article_blocs
where article_id in (
  select id from public.articles where slug = 'reveillon-toulouse' and locale = 'fr'
);

insert into public.article_blocs (article_id, ordre, type, contenu)
select a.id, v.ordre, v.type::bloc_type, v.contenu
from public.articles a,
(values
  (0, 'texte', '{
    "titre": "Réveillon du Nouvel An 2025 – Bal Vénitien à l’Hôtel Palladia Toulouse — complet",
    "centre": true,
    "paragraphes": [
      "Plongez dans la magie et l’élégance d’un **Bal Vénitien inoubliable** le **mercredi 31 décembre 2025** à l’**Hôtel Palladia**, établissement 4 étoiles à Toulouse.",
      "Cette année, nous vous invitons à vivre une **soirée d’exception** où le raffinement, la gastronomie et la fête se rencontrent pour célébrer l’arrivée de la nouvelle année.",
      "**Thème de la soirée : Bal Vénitien**\nLaissez-vous séduire par l’ambiance mystérieuse et chic de Venise… masques, musique et élégance seront au rendez-vous pour un réveillon unique.",
      "**Une soirée dansante haut de gamme**\nLa piste s’enflammera grâce au talentueux Orchestre [Mission 2](https://mission2.fr/), qui vous fera vivre un show live exceptionnel et vous accompagnera jusqu’au bout de la nuit.",
      "**Un dîner gastronomique d’exception**\nPour sublimer cette expérience, notre Chef et sa brigade vous proposent un **menu raffiné** élaboré autour de produits d’exception, accompagné d’un **accord mets & vins** pour éveiller toutes vos papilles."
    ]
  }'::jsonb),

  (1, 'menu', '{
    "titre": "Menu",
    "entree": ["**Champagne et assortiment de canapés**"],
    "sections": [
      { "titre": "Amuse-bouche", "lignes": ["Tartare de Noix de Saint-Jacques, pomme verte et caviar"] },
      { "titre": "Entrée", "lignes": ["Marbré de Foie gras de canard, pain brûlé et mandarine"] },
      { "titre": "Poisson", "lignes": ["Bar sauvage, panais confit et sauce au Champagne"] },
      { "titre": "Interlude", "lignes": [] },
      { "titre": "Viande", "lignes": ["Volaille de Bresse :\nSuprême contisé à la truffe d’hiver,\nCuisse en cromesquis parfumée à la main de Bouddha,\nBoulangère de butternut à l’oignon"] },
      { "titre": "Dessert", "lignes": ["La Dolce Venezia : chocolat au lait Jivara, mangue et gingembre"] },
      { "titre": "Café et Mignardise", "lignes": ["une bouteille de vin pour deux personnes\nDeux coupes de champagne, servies au dessert"] }
    ]
  }'::jsonb),

  (2, 'texte', '{
    "titre": "Tarifs et formules",
    "centre": true,
    "paragraphes": [
      "**Menu Réveillon** : **250 € / personne**",
      "**Formule Séjour & Réveillon** : **690 € pour 2 personnes**\ninclut le menu pour 2 personnes, une nuit en chambre double.",
      "Pour commencer 2026 en douceur… Notre **petit déjeuner gourmand** joue les prolongations : il sera servi exceptionnellement de **9h00 à 14h00**. Profitez également d’un **late check-out jusqu’à 17h00**.",
      "**Chambre seule (optionnelle)** : **190 €**\n(nuitée avec petit-déjeuner, hors menu du réveillon)",
      "**Réservez dès maintenant !**",
      "Le **Réveillon 2025** à l’Hôtel Palladia promet d’être **exceptionnel et unique**. Les places étant **très limitées**, nous vous conseillons de réserver rapidement pour garantir votre participation à cet événement d’exception."
    ]
  }'::jsonb),

  (3, 'texte', '{
    "titre": "Réservation",
    "centre": true,
    "paragraphes": []
  }'::jsonb)
) as v(ordre, type, contenu)
where a.slug = 'reveillon-toulouse' and a.locale = 'fr';
