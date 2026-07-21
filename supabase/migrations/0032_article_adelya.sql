-- ---------------------------------------------------------------------------
-- Article « Carte de fidélité Adelya ».
--
-- Le contenu etait present mais mis en page a plat : le logo s'affichait en
-- pleine page au lieu d'occuper la moitie de l'ecran a cote du texte, et les
-- deux dernieres sections se suivaient au lieu d'etre cote a cote.
--
-- Corrige au passage le sous-titre : « Qu'est-ce que la carte de fidélité
-- Adelya ? » est un titre de section, pas un sous-titre d'article. Le site
-- n'en affiche aucun sous le titre.
--
-- Relançable sans risque.
-- ---------------------------------------------------------------------------

update public.articles
set sous_titre = null
where slug = 'adelya' and locale = 'fr';

delete from public.article_blocs
where article_id in (
  select id from public.articles where slug = 'adelya' and locale = 'fr'
);

insert into public.article_blocs (article_id, ordre, type, contenu)
select a.id, v.ordre, v.type::bloc_type, v.contenu
from public.articles a,
(values
  -- Logo a gauche, presentation a droite
  (0, 'texte_image', '{
    "position": "gauche",
    "image": "/images/blog/logo-fidelite-.png",
    "alt": "Le programme de fidélité de l’Hôtel Palladia",
    "paragraphes": [
      "Et si votre fidélité vous rapportait plus ? À l’Hôtel Palladia, nous avons à cœur de récompenser nos clients les plus fidèles. C’est pourquoi nous avons mis en place un **programme de fidélité simple, digital et avantageux** grâce à la carte Adelya. Séjours, petits-déjeuners, dîners au restaurant… chacun de vos passages chez nous vous permet désormais **d’accumuler des avantages exclusifs**.",
      "Découvrez comment fonctionne notre carte de fidélité et tout ce qu’elle peut vous offrir."
    ],
    "sous_titre": "Qu’est-ce que la carte de fidélité Adelya ?",
    "conclusion": "Fini les cartes à tamponner ou à ne jamais retrouver : tout se passe en ligne ou sur votre smartphone. **Simple, pratique et sans engagement**, ce programme est pensé pour vous faciliter la vie tout en vous faisant profiter d’avantages concrets."
  }'::jsonb),

  (1, 'texte', '{
    "paragraphes": [
      "La carte de fidélité Adelya est une **carte digitale gratuite** qui vous permet de cumuler des points à chaque passage à l’Hôtel Palladia. Ces points sont ensuite convertibles en **réductions, cadeaux ou services offerts**."
    ],
    "boutons": [
      {
        "label": "Souscrire Gratuitement",
        "href": "https://www.adelyashop.com/Adelyaview/hotel6/aggregate/H%C3%B4tel-Palladia.html?lang=fr",
        "externe": true
      }
    ]
  }'::jsonb),

  -- Les trois etapes, sur fond gris
  (2, 'sections', '{
    "fond_gris": true,
    "titre": "Comment ça fonctionne ?",
    "taille_titre": "moyen",
    "sections": [
      {
        "titre": "1. Inscrivez-vous en quelques clics",
        "intro": "Lors de votre réservation ou directement à la réception, demandez votre carte de fidélité Adelya. Vous recevrez un lien d’activation par e-mail vous permettant de **créer votre espace personnel**.",
        "conclusion": "Aucun document n’est requis. L’inscription est **100 % gratuite et sans contrainte**."
      },
      {
        "titre": "2. Cumulez des points à chaque séjour",
        "intro": "À chaque euro dépensé à l’hôtel (hébergement, restaurant, etc.), vous cumulez automatiquement des **points fidélité**. Il vous suffit de présenter votre carte (digitale ou physique) à chaque passage."
      },
      {
        "titre": "3. Transformez vos points en avantages",
        "intro": "Une fois un certain seuil atteint, vous pourrez échanger vos points contre :",
        "items": [
          "Des **réductions immédiates** sur votre prochain séjour",
          "Des **petits-déjeuners offerts**",
          "Des **surclassements en chambre supérieure**",
          "Des **cadeaux exclusifs réservés aux membres**"
        ],
        "conclusion": "Tout est pensé pour que **votre fidélité soit récompensée rapidement et généreusement**."
      }
    ]
  }'::jsonb),

  -- Photo de la carte a gauche, avantages a droite, bord a bord
  (3, 'texte_image', '{
    "pleine_largeur": true,
    "position": "gauche",
    "image": "/images/blog/adelya-carte-fidelite.jpg",
    "alt": "La carte de fidélité Adelya sur un smartphone",
    "titre": "Vos avantages en tant que membre",
    "paragraphes": ["En rejoignant notre programme de fidélité, vous bénéficiez de **nombreux privilèges**, en toute simplicité :"]
  }'::jsonb),

  (4, 'sections', '{
    "sections": [
      {
        "titre": "Des réductions sur vos séjours",
        "intro": "Grâce à vos points, bénéficiez de **tarifs préférentiels** sur vos prochaines réservations, directement en ligne ou sur place."
      },
      {
        "titre": "Des offres personnalisées rien que pour vous",
        "intro": "Nous vous envoyons ponctuellement des **offres exclusives**, en fonction de vos préférences et de vos habitudes. Anniversaire, week-end romantique, offre détente… soyez les premiers informés !"
      },
      { "titre": "Des surprises à chaque étape" },
      {
        "titre": "Un espace client dédié",
        "intro": "Depuis votre espace personnel en ligne, vous pouvez :",
        "items": [
          "Consulter votre solde de points",
          "Voir vos avantages en attente",
          "Réserver plus facilement"
        ]
      },
      {
        "titre": "Une carte simple et toujours accessible",
        "intro": "Pas besoin de carte physique : tout est **digitalisé**. Votre carte est accessible depuis votre smartphone, votre boîte mail, ou simplement à la réception."
      }
    ]
  }'::jsonb),

  -- Les deux dernieres sections sont cote a cote sur le site
  (5, 'sections', '{
    "fond_gris": true,
    "deux_colonnes": true,
    "sections": [
      {
        "titre": "Qui peut en bénéficier ?",
        "intro": "Tout le monde ! Que vous soyez un habitué de l’Hôtel Palladia, un client occasionnel ou un nouveau visiteur, vous pouvez **adhérer gratuitement au programme de fidélité**. Il n’y a aucun critère d’ancienneté ou d’engagement."
      },
      {
        "titre": "Comment activer votre carte Adelya ?",
        "items": [
          "Demandez [votre carte via ce lien](https://www.adelyashop.com/Adelyaview/hotel6/aggregate/H%C3%B4tel-Palladia.html?lang=fr).",
          "Recevez un lien d’activation par e-mail.",
          "Créez votre espace personnel en quelques clics.",
          "Commencez à cumuler des points dès votre première visite !"
        ]
      }
    ]
  }'::jsonb),

  (6, 'texte', '{
    "centre": true,
    "titre": "Rejoignez le programme dès aujourd’hui",
    "paragraphes": [
      "Vous venez bientôt séjourner à l’Hôtel Palladia ? C’est le moment parfait pour profiter de la carte Adelya et commencer à cumuler vos avantages. Demandez-la simplement à votre arrivée, ou contactez notre équipe pour toute question.",
      "**Votre fidélité mérite mieux qu’un simple merci.**"
    ],
    "boutons": [
      {
        "label": "Souscrire Gratuitement",
        "href": "https://www.adelyashop.com/Adelyaview/hotel6/aggregate/H%C3%B4tel-Palladia.html?lang=fr",
        "externe": true
      }
    ]
  }'::jsonb)
) as v(ordre, type, contenu)
where a.slug = 'adelya' and a.locale = 'fr';
