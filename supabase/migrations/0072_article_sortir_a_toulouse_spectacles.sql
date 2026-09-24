-- ---------------------------------------------------------------------------
-- Article « Sortir à Toulouse : les spectacles de fin d’année » (/sortir-a-toulouse-spectacles).
--
-- Genere par scripts/generate-article-spectacles.mjs : ne pas editer a la main.
--
-- Texte et affiches fournis par l’hotel en septembre 2026, pour remplir les
-- deux prochaines dates. Mots-cles vises : « sortir a Toulouse », « diner
-- spectacle Toulouse », « que faire a Toulouse le soir ».
--
-- L’adresse ne porte pas l’annee : elle doit survivre a la saison. Apres le
-- 12 decembre 2026, on reecrit l’article avec la programmation suivante
-- plutot que de l’archiver — les liens entrants poses par 0073 restent bons.
--
-- Relançable sans risque : les blocs sont effaces puis reinseres.
-- ---------------------------------------------------------------------------

-- L’article ouvre la liste des actualites : les autres reculent d’un rang,
-- a la premiere execution seulement.
update public.articles
set position = position + 1
where locale = 'fr'
  and position >= 1
  and not exists (
    select 1 from public.articles where slug = 'sortir-a-toulouse-spectacles' and locale = 'fr'
  );

insert into public.articles (
  slug, locale, titre, titre_page, sous_titre, chapo, image_hero, image_vignette, statut, date_publication, position, seo_title, seo_description
)
values (
  'sortir-a-toulouse-spectacles', 'fr', 'Sortir à Toulouse : les spectacles de fin d’année à l’Hôtel Palladia', null, 'Envie de sortir à Toulouse, de rire, de profiter et de passer une belle soirée ?', 'Improvisation, magie et mentalisme, gospel, tribute Céline Dion & Jean-Jacques Goldman : quatre soirées spectacle d’octobre à décembre 2026 à l’Hôtel Palladia, à Toulouse, dont trois en formule dîner & spectacle.',
  '/images/blog/spectacles-fin-annee-toulouse-hotel-palladia-banniere.jpg', '/images/blog/spectacles-fin-annee-toulouse-hotel-palladia.jpg', 'publie', '2026-09-24 10:00:00', 1,
  'Sortir à Toulouse : spectacles de fin d’année — Hôtel Palladia', 'Humour, magie, gospel, tribute Dion & Goldman : 4 soirées spectacle à Toulouse d’octobre à décembre 2026, avec dîner & spectacle à l’Hôtel Palladia.'
)
on conflict (slug, locale) do update set
  titre = excluded.titre, titre_page = excluded.titre_page, sous_titre = excluded.sous_titre,
  chapo = excluded.chapo, image_hero = excluded.image_hero, image_vignette = excluded.image_vignette,
  statut = excluded.statut, date_publication = excluded.date_publication, position = excluded.position,
  seo_title = excluded.seo_title, seo_description = excluded.seo_description;

delete from public.article_blocs
where article_id in (select id from public.articles where slug = 'sortir-a-toulouse-spectacles' and locale = 'fr');

insert into public.article_blocs (article_id, ordre, type, contenu)
select a.id, v.ordre, v.type::bloc_type, v.contenu
from public.articles a,
(values
  (0, 'texte', '{
  "centre": true,
  "paragraphes": [
    "Vous cherchez une idée pour sortir à Toulouse, passer une soirée conviviale entre amis, profiter d’un dîner et spectacle ou simplement vous offrir une parenthèse pour rire et vous amuser ?",
    "L’Hôtel Palladia à Toulouse vous propose une [programmation culturelle](/spectacle-toulouse) variée pour vivre de belles soirées festives et conviviales dans un cadre élégant et chaleureux.",
    "Spectacle d’humour, improvisation, magie, mentalisme, gospel, concert et tribute musical : il y en a pour toutes les envies. Une programmation pensée pour celles et ceux qui souhaitent sortir à Toulouse autrement, partager un bon moment et profiter pleinement de leur soirée."
  ]
}'::jsonb),

  (1, 'liste_cochee', '{
  "fond_gris": true,
  "titre": "En bref : quatre soirées d’octobre à décembre 2026",
  "items": [
    "**Samedi 3 octobre** — Olivier & Max improvisent, à 21h",
    "**Samedi 7 novembre** — Kevin Micoud, dîner & spectacle",
    "**Samedi 28 novembre** — Gospel Experience, dîner & spectacle",
    "**Samedi 12 décembre** — Tribute Dion & Goldman, dîner & spectacle"
  ],
  "conclusion": "Dîner à 19h30 pour les formules dîner & spectacle. Toutes les soirées ont lieu à l’Hôtel Palladia, 271 avenue de Grande-Bretagne à Toulouse, avec parking gratuit sur place."
}'::jsonb),

  (2, 'texte_image', '{
  "pleine_largeur": true,
  "position": "gauche",
  "image": "/images/blog/amphitheatre-285-places-seminaire-toulouse-palladia.jpg",
  "alt": "Public réuni dans l’amphithéâtre de 285 places de l’Hôtel Palladia à Toulouse pendant un concert",
  "titre": "Une soirée spectacle à Toulouse pour rire, s’émerveiller et partager",
  "paragraphes": [
    "Et si votre prochaine sortie à Toulouse devenait une véritable expérience ?",
    "Au Palladia, la soirée ne se résume pas à assister à un spectacle. Selon la programmation, vous pouvez commencer par un [dîner au restaurant de l’hôtel](/restaurant), profiter d’un moment convivial autour de la table, puis rejoindre la salle de spectacle pour découvrir des artistes aux univers très différents.",
    "Une formule idéale pour une soirée entre amis, une sortie en couple, un anniversaire, une soirée en famille ou tout simplement pour le plaisir de rire, de s’amuser et de profiter."
  ],
  "conclusion": "L’Hôtel Palladia dispose notamment d’un [amphithéâtre de 285 places](/amphitheatre-hotel-palladia-renove) et d’espaces dédiés aux événements et aux spectacles, dont le salon Opéra."
}'::jsonb),

  (3, 'texte', '{
  "centre": true,
  "titre": "Les spectacles à ne pas manquer au Palladia à Toulouse",
  "taille_titre": "grand",
  "paragraphes": [
    "Quatre soirées, quatre univers, une seule adresse : voici la programmation d’octobre à décembre 2026."
  ]
}'::jsonb),

  (4, 'texte_image', '{
  "texte_dominant": true,
  "position": "droite",
  "image": "/images/blog/olivier-max-improvisent-spectacle-humour-toulouse.jpg",
  "alt": "Affiche du spectacle d’improvisation Olivier & Max improvisent, samedi 3 octobre 2026 à l’Hôtel Palladia à Toulouse",
  "titre": "Olivier & Max improvisent : une soirée placée sous le signe du rire",
  "sous_titre": "Samedi 3 octobre 2026",
  "paragraphes": [
    "Pour celles et ceux qui recherchent une soirée humour à Toulouse, Olivier & Max vous donnent rendez-vous pour un spectacle d’improvisation.",
    "L’improvisation, c’est l’assurance d’un spectacle vivant, spontané et plein de surprises. Une excellente idée pour sortir à Toulouse, rire entre amis et partager une soirée légère et décontractée."
  ],
  "liste": [
    "Spectacle à 21h ;",
    "Hôtel Palladia, Toulouse."
  ],
  "conclusion": "Une soirée parfaite pour ceux qui ont envie de rire, de se détendre et de profiter d’un spectacle convivial.",
  "boutons": [
    {
      "label": "Réserver ma place",
      "href": "https://my.weezevent.com/improvisent",
      "externe": true
    }
  ]
}'::jsonb),

  (5, 'texte_image', '{
  "texte_dominant": true,
  "position": "gauche",
  "image": "/images/blog/kevin-micoud-magicien-mentaliste-toulouse.jpg",
  "alt": "Affiche du spectacle Best Of de Kevin Micoud, magicien mentaliste, samedi 7 novembre 2026 à l’Hôtel Palladia à Toulouse",
  "titre": "Kevin Micoud : magie et mentalisme à Toulouse",
  "sous_titre": "Samedi 7 novembre 2026",
  "paragraphes": [
    "Vous aimez la magie ? Vous êtes intrigué par le mentalisme ? Le spectacle de Kevin Micoud, magicien mentaliste, promet une soirée pleine de mystère et de surprises.",
    "Révélé notamment par La France a un incroyable talent, Kevin Micoud propose un spectacle mêlant magie, mentalisme, illusion et interaction avec le public.",
    "Pour une sortie originale à Toulouse, c’est l’occasion de vivre une expérience différente et de se laisser surprendre.",
    "Et pour prolonger la soirée, le Palladia propose une [formule dîner & spectacle](/diner-spectacles-toulouse) : commencez la soirée autour d’un dîner à 19h30 avant de découvrir le spectacle à 21h."
  ],
  "liste": [
    "Dîner à 19h30 ;",
    "Spectacle à 21h ;",
    "Hôtel Palladia, Toulouse."
  ],
  "conclusion": "Une idée parfaite pour une soirée en couple, une sortie entre amis ou une occasion particulière.",
  "boutons": [
    {
      "label": "Réserver ma place",
      "href": "https://my.weezevent.com/kevin-micoud-magicien-mentaliste",
      "externe": true
    }
  ]
}'::jsonb),

  (6, 'texte_image', '{
  "texte_dominant": true,
  "position": "droite",
  "image": "/images/blog/gospel-experience-kathy-boye-diner-spectacle-toulouse.jpg",
  "alt": "Affiche du dîner & spectacle Gospel Experience avec Kathy Boyé, de Chicago à la Nouvelle-Orléans, samedi 28 novembre 2026 à l’Hôtel Palladia",
  "titre": "Gospel Experience avec Kathy Boyé : une soirée musicale et festive",
  "sous_titre": "Samedi 28 novembre 2026",
  "paragraphes": [
    "Envie d’une soirée musicale à Toulouse ? Le Gospel Experience avec Kathy Boyé vous invite à voyager musicalement de Chicago à la Nouvelle-Orléans.",
    "Une soirée placée sous le signe de la voix, du partage et de l’énergie, idéale pour les amateurs de concert à Toulouse, de musique live et de spectacles chaleureux.",
    "La formule dîner & spectacle permet de commencer la soirée autour d’un repas avant de profiter du concert."
  ],
  "liste": [
    "Dîner à 19h30 ;",
    "Spectacle à 21h ;",
    "Hôtel Palladia, Toulouse."
  ],
  "conclusion": "Une belle occasion de sortir à Toulouse, de dîner, d’écouter de la musique et de partager un moment festif.",
  "boutons": [
    {
      "label": "Réserver ma place",
      "href": "https://my.weezevent.com/concert-de-gospel-6",
      "externe": true
    }
  ]
}'::jsonb),

  (7, 'texte_image', '{
  "texte_dominant": true,
  "position": "gauche",
  "image": "/images/blog/tribute-celine-dion-goldman-diner-spectacle-toulouse.jpg",
  "alt": "Affiche du tribute D’eux, Céline Dion et Jean-Jacques Goldman, en dîner & spectacle à l’Hôtel Palladia à Toulouse",
  "titre": "Tribute Céline Dion & Jean-Jacques Goldman : une soirée musicale incontournable",
  "sous_titre": "Samedi 12 décembre 2026",
  "paragraphes": [
    "Pour terminer l’année en musique, le Palladia propose une soirée dédiée à deux grandes figures de la chanson française : Céline Dion et Jean-Jacques Goldman.",
    "Ce tribute Céline Dion & Jean-Jacques Goldman à Toulouse s’adresse à tous ceux qui aiment chanter, retrouver des chansons emblématiques et partager une soirée musicale dans une ambiance conviviale.",
    "Au programme : un dîner à 19h30, suivi du spectacle au salon Opéra."
  ],
  "liste": [
    "Dîner à 19h30 ;",
    "Spectacle au salon Opéra ;",
    "Hôtel Palladia, Toulouse."
  ],
  "conclusion": "Une excellente idée pour une soirée festive de fin d’année, une sortie entre amis ou une soirée en couple.",
  "boutons": [
    {
      "label": "Réserver ma place",
      "href": "https://my.weezevent.com/tribute-celine-dion-jean-jacques-goldman",
      "externe": true
    }
  ]
}'::jsonb),

  (8, 'texte_image', '{
  "pleine_largeur": true,
  "fond_gris": true,
  "position": "droite",
  "image": "/images/restaurant/salle-1.jpg",
  "alt": "Assiette dressée par le chef du restaurant de l’Hôtel Palladia à Toulouse",
  "titre": "Dîner & spectacle à Toulouse : profitez d’une soirée complète",
  "paragraphes": [
    "Pourquoi choisir entre restaurant et spectacle quand vous pouvez profiter des deux ?",
    "Le concept [dîner & spectacle à Toulouse](/diner-spectacles-toulouse) permet de prendre le temps de se retrouver autour d’un bon repas avant de profiter d’un spectacle.",
    "Au [restaurant du Palladia](/restaurant), la cuisine évolue au fil des saisons et privilégie des produits frais.",
    "C’est donc une formule idéale pour celles et ceux qui recherchent une soirée conviviale à Toulouse, un moment de détente après une journée de travail ou une occasion spéciale à partager."
  ],
  "conclusion": "On dîne, on discute, on rit, on profite du spectacle… et surtout, on prend le temps de s’amuser !"
}'::jsonb),

  (9, 'liste_cochee', '{
  "titre": "Que faire à Toulouse le soir ? Pensez spectacle !",
  "intro": "Vous vous demandez que faire à Toulouse le soir ? La Ville Rose offre de nombreuses possibilités : restaurant, concert, théâtre, humour, événements culturels et sorties entre amis. Parmi toutes ces idées, une soirée spectacle au Palladia permet de réunir plusieurs plaisirs en une seule soirée. Vous pouvez venir pour :",
  "items": [
    "une soirée humour à Toulouse ;",
    "un spectacle de magie à Toulouse ;",
    "une soirée mentalisme et illusion ;",
    "un concert à Toulouse ;",
    "une soirée gospel ;",
    "un dîner spectacle à Toulouse ;",
    "un tribute musical ;",
    "une sortie en couple ;",
    "une soirée entre amis ;",
    "une soirée festive de fin d’année ;",
    "ou simplement pour rire et vous amuser."
  ],
  "conclusion": "Vous venez de plus loin ? Notre sélection de [visites à Toulouse](/visites-toulouse) vous aidera à compléter le week-end."
}'::jsonb),

  (10, 'texte', '{
  "fond_gris": true,
  "titre": "Une soirée chill, conviviale et festive au Palladia",
  "paragraphes": [
    "Vous avez plutôt envie d’une soirée chill à Toulouse ?",
    "Le Palladia est aussi un lieu où l’on vient prendre son temps. Avant ou après le spectacle, profitez de l’ambiance du [bar lounge](/restaurant) pour prolonger la soirée autour d’un verre.",
    "L’atmosphère du bar est pensée comme un espace calme, accueillant et cosy, idéal pour prendre un cocktail et prolonger les échanges après une soirée spectacle.",
    "Et pour ne pas reprendre la route, [nos chambres](/chambres) vous attendent à quelques pas de la salle.",
    "Que vous soyez plutôt soirée détente, soirée festive, dîner entre amis ou grande sortie culturelle, l’objectif reste le même : profiter, rire, s’amuser et partager un bon moment."
  ]
}'::jsonb),

  (11, 'texte', '{
  "titre": "Une idée de sortie pour les fêtes de fin d’année à Toulouse",
  "paragraphes": [
    "La fin d’année est le moment idéal pour se retrouver.",
    "Après une journée de travail, pour célébrer une occasion particulière, organiser une sortie entre collègues ou simplement passer une bonne soirée avec ses proches, un dîner spectacle à Toulouse est une idée originale pour créer de beaux souvenirs.",
    "Le Palladia propose une programmation éclectique qui permet de varier les plaisirs : humour, improvisation, magie, mentalisme, gospel et musique.",
    "Alors, plutôt que de chercher pendant des heures où sortir à Toulouse, choisissez votre spectacle, invitez vos proches et profitez de la soirée !",
    "Et pour le 31 décembre, pensez à notre [soirée du réveillon](/reveillon-toulouse)."
  ]
}'::jsonb),

  (12, 'sections', '{
  "faq": true,
  "fond_gris": true,
  "titre": "Questions fréquentes sur les spectacles du Palladia",
  "taille_titre": "moyen",
  "sections": [
    {
      "titre": "Quels spectacles sont programmés à l’Hôtel Palladia en fin d’année 2026 ?",
      "intro": "Quatre soirées : Olivier & Max improvisent le samedi 3 octobre 2026, Kevin Micoud, magicien mentaliste, le samedi 7 novembre, Gospel Experience avec Kathy Boyé le samedi 28 novembre et un tribute Céline Dion & Jean-Jacques Goldman le samedi 12 décembre."
    },
    {
      "titre": "Comment se déroule une soirée dîner & spectacle au Palladia ?",
      "intro": "Le dîner est servi à 19h30, puis place au spectacle. La formule est proposée pour les soirées Kevin Micoud et Gospel Experience, dont le spectacle commence à 21h, et pour le tribute Céline Dion & Jean-Jacques Goldman, joué au salon Opéra. Le spectacle d’Olivier & Max, à 21h, est proposé sans formule dîner."
    },
    {
      "titre": "Comment réserver ses places ?",
      "intro": "Les places se réservent en ligne, sur la billetterie de chaque spectacle, accessible depuis la page Nos spectacles du site de l’hôtel. Il est conseillé de réserver à l’avance."
    },
    {
      "titre": "Où se déroulent les spectacles ?",
      "intro": "À l’Hôtel Palladia, 271 avenue de Grande-Bretagne, 31300 Toulouse, dans le quartier de Purpan. Selon la soirée, le spectacle a lieu dans l’amphithéâtre de 285 places ou au salon Opéra."
    },
    {
      "titre": "Peut-on se garer facilement ?",
      "intro": "Oui. L’hôtel dispose d’un parking gratuit de 250 places, avec des emplacements équipés de bornes de recharge électrique."
    },
    {
      "titre": "Peut-on dormir sur place après le spectacle ?",
      "intro": "Oui. L’Hôtel Palladia est un hôtel 4 étoiles de 90 chambres : il suffit de réserver une chambre pour prolonger la soirée sans reprendre la route."
    }
  ]
}'::jsonb),

  (13, 'texte', '{
  "centre": true,
  "titre": "Sortez, profitez et amusez-vous au Palladia",
  "paragraphes": [
    "Le Palladia à Toulouse vous donne rendez-vous pour des soirées placées sous le signe de la culture, de la musique, de l’humour et du partage.",
    "Que vous soyez amateur de spectacle vivant, passionné de musique, fan de Céline Dion ou Jean-Jacques Goldman, curieux de découvrir le mentalisme ou simplement à la recherche d’une bonne idée de sortie à Toulouse, la programmation du Palladia vous offre plusieurs occasions de vivre une soirée différente.",
    "Un dîner, un spectacle, des rires, de la musique et surtout le plaisir d’être ensemble.",
    "Découvrez la programmation, choisissez votre soirée et réservez vos places pour profiter des spectacles de fin d’année à Toulouse au Palladia."
  ],
  "boutons": [
    {
      "label": "Voir toute la programmation",
      "href": "/spectacle-toulouse"
    },
    {
      "label": "La formule dîner & spectacle",
      "href": "/diner-spectacles-toulouse"
    }
  ],
  "note": "Hôtel Palladia – 271 avenue de Grande-Bretagne – 31300 Toulouse"
}'::jsonb)
) as v(ordre, type, contenu)
where a.slug = 'sortir-a-toulouse-spectacles' and a.locale = 'fr';
