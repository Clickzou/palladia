-- ---------------------------------------------------------------------------
-- Article « L'amphithéâtre de l'Hôtel Palladia rénové ».
--
-- L'import avait tout regroupe dans un seul bloc : les trois chiffres cles
-- (285 places, parking, salle de restauration) se retrouvaient melanges aux
-- paragraphes, et le visuel etait a gauche au lieu d'etre a droite.
--
-- Sur le site : photo bord a bord, puis les trois pictos sous un intitule
-- centre, puis le texte a gauche et la photo en portrait a droite.
--
-- Relançable sans risque.
-- ---------------------------------------------------------------------------

delete from public.article_blocs
where article_id in (
  select id from public.articles
  where slug = 'amphitheatre-hotel-palladia-renove' and locale = 'fr'
);

insert into public.article_blocs (article_id, ordre, type, contenu)
select a.id, v.ordre, v.type::bloc_type, v.contenu
from public.articles a,
(values
  (0, 'carrousel', '{
    "pleine_largeur": true,
    "images": [
      {
        "src": "/images/blog/amphitheatre-hotel-palladia-renove.webp",
        "alt": "L’amphithéâtre de l’Hôtel Palladia : sièges rouges en gradins face à la scène"
      }
    ]
  }'::jsonb),

  (1, 'caracteristiques', '{
    "titre": "Un Amphithéâtre Élégant pour vos Événements",
    "items": [
      { "icone": "places", "label": "285 places" },
      { "icone": "parking", "label": "Parking de 300 places" },
      { "icone": "restauration", "label": "Salle de restauration dédiée" }
    ]
  }'::jsonb),

  (2, 'texte_image', '{
    "large": true,
    "position": "droite",
    "image": "/images/blog/amphitheatre-palladia.jpg",
    "alt": "Les fauteuils de l’amphithéâtre de l’Hôtel Palladia",
    "paragraphes": [
      "Pour vos événements les plus prestigieux, l’Hôtel Palladia vous ouvre les portes de son amphithéâtre récemment rénové.",
      "**Son agencement en gradins a été soigneusement pensé pour favoriser l’interaction entre les conférenciers et l’ensemble de l’auditoire**, garantissant ainsi une expérience fluide et immersive.",
      "Plongez dans une atmosphère moderne et captivante, où chaque détail a été conçu pour sublimer vos événements d’envergure. Avec une capacité de 285 participants, cet amphithéâtre est équipé d’une régie technique complète, d’une scène spacieuse et de systèmes audiovisuels de pointe, parfaits pour assurer le bon déroulement de vos présentations, conférences ou spectacles.",
      "**Une équipe dédiée se tient à votre disposition pour vous accompagner à chaque étape de l’organisation**, qu’il s’agisse de la coordination logistique, des besoins techniques ou des services de restauration sur mesure, adaptés à vos exigences.",
      "L’amphithéâtre bénéficie d’une entrée privative pour garantir la discrétion et la fluidité des arrivées, ainsi que d’une salle de restauration adjacente, idéale pour vos pauses gourmandes et vos repas d’affaires.",
      "Afin d’assurer le confort de vos invités, l’Hôtel Palladia propose également un parking privé de 300 places, facilement accessible et sécurisé."
    ]
  }'::jsonb)
) as v(ordre, type, contenu)
where a.slug = 'amphitheatre-hotel-palladia-renove' and a.locale = 'fr';
