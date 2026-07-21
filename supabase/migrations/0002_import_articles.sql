-- Import des articles du blog depuis l'archive WordPress.
-- Genere automatiquement — relancable sans risque (on conflict do update).

begin;

-- Où dormir près de l’aéroport de Toulouse : pourquoi choisir l’Hôtel Palladia ?
insert into public.articles (slug, locale, titre, chapo, image_hero, image_vignette, statut, date_publication, seo_description)
values ('ou-dormir-proche-aeroport-toulouse', 'fr', 'Où dormir près de l’aéroport de Toulouse : pourquoi choisir l’Hôtel Palladia ?', 'Vous cherchez un hôtel confortable, élégant et idéalement situé près de l’aéroport de Toulouse-Blagnac ?', '/images/blog/hotel-proche-aeroport-toulouse.jpg', '/images/blog/hotel-proche-aeroport-toulouse.jpg', 'publie', '2025-09-11 09:32:08', 'Vous cherchez un hôtel confortable, élégant et idéalement situé près de l’aéroport de Toulouse-Blagnac ?')
on conflict (slug, locale) do update set
  titre = excluded.titre, chapo = excluded.chapo, image_hero = excluded.image_hero,
  image_vignette = excluded.image_vignette, date_publication = excluded.date_publication,
  seo_description = excluded.seo_description;

delete from public.article_blocs where article_id = (select id from public.articles where slug = 'ou-dormir-proche-aeroport-toulouse' and locale = 'fr');

insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'ou-dormir-proche-aeroport-toulouse' and locale = 'fr'), 0, 'texte_image', '{"titre":"Pourquoi choisir l’Hôtel Palladia ?","paragraphes":["Vous cherchez un hôtel confortable, élégant et idéalement situé près de l’aéroport de Toulouse-Blagnac ?","Ne cherchez plus : l’Hôtel Palladia est l’adresse qu’il vous faut. Situé à seulement 10 minutes de l’aéroport, notre établissement 4 étoiles combine confort, services hauts de gamme et ambiance chaleureuse pour rendre votre séjour inoubliable."],"image":"/images/blog/hotel-proche-aeroport-toulouse.jpg","alt":"Montage photos avec différentes photo de l''hôtel Palladia.","position":"droite"}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'ou-dormir-proche-aeroport-toulouse' and locale = 'fr'), 1, 'texte_image', '{"titre":"Un emplacement stratégique proche de l’aéroport de Toulouse","paragraphes":["Voyager peut-être fatigant, surtout lorsque votre vol décolle tôt ou arrive tard. Grâce à sa proximité avec l’aéroport de Toulouse-Blagnac, l’Hôtel PALLADIA est la solution idéale pour :","Que vous soyez en déplacement professionnel, en voyage en famille ou en séjour touristique, notre localisation vous offre un confort inégalé."],"liste":["Passer une nuit reposante avant un vol.","Éviter le stress des embouteillages le jour du départ.","Profiter d’un accès rapide aux grands axes routiers et au centre-ville de Toulouse."],"image":"/images/blog/soiree-theme-hotel-palladia-1.jpg","alt":"Piscine de l''hôtel Palladia lors d''une soirée à thème","position":"gauche"}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'ou-dormir-proche-aeroport-toulouse' and locale = 'fr'), 2, 'texte_image', '{"titre":"Des chambres élégantes et tout le confort nécessaire","paragraphes":["À l’Hôtel Palladia, chaque détail compte. Nos chambres spacieuses et lumineuses sont pensées pour votre bien-être :","Après un long voyage, offrez-vous un moment de détente dans un cadre élégant et apaisant, tout en profitant de votre série préférée grâce au Chromecast."],"liste":["Literie haut de gamme pour un sommeil réparateur","Service en chambre disponible"],"image":"/images/blog/chambre-prestige-terrasse.jpg","alt":"Photo de la chambre prestige.","position":"droite"}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'ou-dormir-proche-aeroport-toulouse' and locale = 'fr'), 3, 'texte_image', '{"titre":"Une expérience culinaire raffinée","paragraphes":["Dormir près de l’aéroport, c’est bien. Bien manger, c’est encore mieux ! Notre restaurant vous propose une cuisine inventive, élaborée à partir de produits frais et locaux. Que ce soit pour un dîner en amoureux, un déjeuner d’affaires ou un repas avant de reprendre l’avion, le chef et son équipe vous réservent une expérience gustative unique.","Et pour un moment de convivialité, notre bar-lounge vous accueille dans une ambiance cosy, parfaite pour savourer un cocktail ou un verre de vin."],"image":"/images/blog/interieur-restaurant-palladia-toulouse-00047.jpg","alt":"Table du restaurant de l''hôtel Palladia","position":"gauche"}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'ou-dormir-proche-aeroport-toulouse' and locale = 'fr'), 4, 'texte_image', '{"titre":"Des soirées spectacles et une expérience unique","paragraphes":["L’Hôtel Palladia, ce n’est pas seulement un endroit où dormir : c’est aussi un lieu de vie et de divertissement.","Tout au long de l’année, nous organisons des dîners-spectacles et des événements exclusifs qui attirent autant les Toulousains que les voyageurs.","C’est l’occasion idéale de prolonger votre séjour avec une soirée mémorable, sans même avoir besoin de sortir de l’hôtel."],"image":"/images/blog/spectacle-toulouse-hotel-palladia.jpg","alt":"Orchestre symphonique de corde exécutant une musique","position":"droite"}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'ou-dormir-proche-aeroport-toulouse' and locale = 'fr'), 5, 'texte_image', '{"titre":"Services et confort pour un séjour sans stress","paragraphes":["Nous mettons tout en œuvre pour faciliter votre voyage :","Avec ces services, vous profitez d’un séjour sans contrainte à quelques minutes seulement de l’aéroport."],"liste":["Parking privé gratuit et sécurisé","Réception ouverte 24h/24","Salle de sport et espaces de détente","Espaces de réunion pour les voyageurs d’affaires"],"image":"/images/blog/salle-de-reunion-dalbade-palladia.jpg","alt":"La salle de réunion Dalbade","position":"gauche"}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'ou-dormir-proche-aeroport-toulouse' and locale = 'fr'), 6, 'texte', '{"titre":"Le choix évident pour dormir près de l’aéroport de Toulouse","paragraphes":["Que vous voyagiez pour affaires ou pour le plaisir, l’Hôtel Palladia est l’adresse incontournable pour un séjour alliant proximité, confort et raffinement.À seulement 10 minutes de l’aéroport de Toulouse-Blagnac, nous vous offrons bien plus qu’une simple nuitée : une véritable expérience.","Réservez dès maintenant et découvrez le charme et l’élégance de l’Hôtel Palladia."]}'::jsonb);

-- Réveillon à Toulouse
insert into public.articles (slug, locale, titre, chapo, image_hero, image_vignette, statut, date_publication, seo_description)
values ('reveillon-toulouse', 'fr', 'Réveillon à Toulouse', 'Plongez dans la magie et l’élégance d’un Bal Vénitien inoubliable le mercredi 31 décembre 2025 à l’Hôtel Palladia, établissement 4 étoiles à Toulouse.', '/images/blog/reveillon-toulouse-scaled.jpg', '/images/blog/reveillon-toulouse-scaled.jpg', 'publie', '2025-08-20 14:43:00', 'Plongez dans la magie et l’élégance d’un Bal Vénitien inoubliable le mercredi 31 décembre 2025 à l’Hôtel Palladia, établissement 4 étoiles à Toulouse.')
on conflict (slug, locale) do update set
  titre = excluded.titre, chapo = excluded.chapo, image_hero = excluded.image_hero,
  image_vignette = excluded.image_vignette, date_publication = excluded.date_publication,
  seo_description = excluded.seo_description;

delete from public.article_blocs where article_id = (select id from public.articles where slug = 'reveillon-toulouse' and locale = 'fr');

insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'reveillon-toulouse' and locale = 'fr'), 0, 'carrousel', '{"images":[{"src":"/images/blog/reveillon-toulouse-scaled.jpg","alt":"Célébration des toasts au champagne - Bonne année - Flûtes avec paillettes dorées sur fond abstrait bleu avec lumières bokeh défocalisées"}]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'reveillon-toulouse' and locale = 'fr'), 1, 'texte', '{"titre":"✨ Réveillon du Nouvel An 2025 – Bal Vénitien à l’Hôtel Palladia Toulouse ✨","paragraphes":["Plongez dans la magie et l’élégance d’un Bal Vénitien inoubliable le mercredi 31 décembre 2025 à l’Hôtel Palladia, établissement 4 étoiles à Toulouse.","Cette année, nous vous invitons à vivre une soirée d’exception où le raffinement, la gastronomie et la fête se rencontrent pour célébrer l’arrivée de la nouvelle année.","🎭 Thème de la soirée : Bal VénitienLaissez-vous séduire par l’ambiance mystérieuse et chic de Venise… masques, musique et élégance seront au rendez-vous pour un réveillon unique.","💃 Une soirée dansante haut de gammeLa piste s’enflammera grâce au talentueux Orchestre Mission 2, qui vous fera vivre un show live exceptionnel et vous accompagnera jusqu’au bout de la nuit.","🍴 Un dîner gastronomique d’exceptionPour sublimer cette expérience, notre Chef et sa brigade vous proposent un menu raffiné élaboré autour de produits d’exception, accompagné d’un accord mets & vins pour éveiller toutes vos papilles.","MENU","Champagne et assortiment de 3 canapés","Amuse-boucheTartare de Noix de Saint-Jacques, pomme verte et caviar","EntréeMarbré de Foie gras de canard ,Pain brûlé et mandarine","PoissonBar sauvage, panais confit et sauce au Champagne","Interlude","ViandeVolaille de Bresse :Suprême contisé à la truffe d’hiver,Cuisse en cromesquis parfumée à la main de Bouddha,Boulangère de butternut à l’oignon","DessertLa Dolce Venezia : chocolat au lait Jivara, mangue et gingembre","Café et Mignardises","une bouteille de vin pour deux personnesDeux coupes de champagne, servies au dessert","💎 Tarifs et formules","Menu Réveillon : 250€ / personne","Formule Séjour & Réveillon : 690€ pour 2 personnesinclut le menu pour 2 personnes, une nuit en chambre double.","Pour commencer 2026 en douceur…Notre petit déjeuner gourmand joue les prolongations :","il sera servi exceptionnellement de 9h00 à 14h00 🍽️Profitez également d’un late check-out jusqu’à 17h00 ✨","Chambre seule (optionnelle) : 190€(nuitée avec petit-déjeuner, hors menu du réveillon)","🎟 Réservez dès maintenant !","Le Réveillon 2025 à l’Hôtel Palladia promet d’être exceptionnel et unique. Les places étant très limitées, nous vous conseillons de réserver rapidement pour garantir votre participation à cet événement d’exception."]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'reveillon-toulouse' and locale = 'fr'), 2, 'texte', '{"titre":"Réservation","paragraphes":[]}'::jsonb);

-- Séjour en famille à Toulouse
insert into public.articles (slug, locale, titre, chapo, image_hero, image_vignette, statut, date_publication, seo_description)
values ('sejour-en-famille-a-toulouse-hotel-palladia', 'fr', 'Séjour en famille à Toulouse', NULL, '/images/blog/offre-famille-ete-2025-VB-1.jpg', '/images/blog/offre-famille-ete-2025-VB-1.jpg', 'publie', '2025-06-21 11:57:00', NULL)
on conflict (slug, locale) do update set
  titre = excluded.titre, chapo = excluded.chapo, image_hero = excluded.image_hero,
  image_vignette = excluded.image_vignette, date_publication = excluded.date_publication,
  seo_description = excluded.seo_description;

delete from public.article_blocs where article_id = (select id from public.articles where slug = 'sejour-en-famille-a-toulouse-hotel-palladia' and locale = 'fr');

insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'sejour-en-famille-a-toulouse-hotel-palladia' and locale = 'fr'), 0, 'carrousel', '{"images":[{"src":"/images/blog/offre-famille-ete-2025-VB-1.jpg","alt":""}]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'sejour-en-famille-a-toulouse-hotel-palladia' and locale = 'fr'), 1, 'texte', '{"titre":"Réservation","paragraphes":[]}'::jsonb);

-- Adelya : La fidélisation client réinventée pour l’hôtellerie et la restauration
insert into public.articles (slug, locale, titre, chapo, image_hero, image_vignette, statut, date_publication, seo_description)
values ('adelya', 'fr', 'Adelya : La fidélisation client réinventée pour l’hôtellerie et la restauration', 'Et si votre fidélité vous rapportait plus ? À l’Hôtel Palladia, nous avons à cœur de récompenser nos clients les plus fidèles. C’est pourquoi nous avons mis en place un programme de fidélité simple, digital et avantageux grâce à la carte Adelya. Séjours, petits-déjeuners, dîners ', '/images/blog/logo-fidelite-.png', '/images/blog/logo-fidelite-.png', 'publie', '2025-04-11 10:52:19', 'Et si votre fidélité vous rapportait plus ? À l’Hôtel Palladia, nous avons à cœur de récompenser nos clients les plus fidèles. C’est pourquoi nous avons mis en place un programme de fidélité simple, digital et avantageux grâce à la carte Adelya. Séjours, petits-déjeuners, dîners ')
on conflict (slug, locale) do update set
  titre = excluded.titre, chapo = excluded.chapo, image_hero = excluded.image_hero,
  image_vignette = excluded.image_vignette, date_publication = excluded.date_publication,
  seo_description = excluded.seo_description;

delete from public.article_blocs where article_id = (select id from public.articles where slug = 'adelya' and locale = 'fr');

insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'adelya' and locale = 'fr'), 0, 'texte_image', '{"paragraphes":["Et si votre fidélité vous rapportait plus ? À l’Hôtel Palladia, nous avons à cœur de récompenser nos clients les plus fidèles. C’est pourquoi nous avons mis en place un programme de fidélité simple, digital et avantageux grâce à la carte Adelya. Séjours, petits-déjeuners, dîners au restaurant… chacun de vos passages chez nous vous permet désormais d’accumuler des avantages exclusifs.","Découvrez comment fonctionne notre carte de fidélité et tout ce qu’elle peut vous offrir."],"image":"/images/blog/logo-fidelite-.png","alt":"","position":"droite"}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'adelya' and locale = 'fr'), 1, 'texte', '{"titre":"Qu’est-ce que la carte de fidélité Adelya ?","paragraphes":["La carte de fidélité Adelya est une carte digitale gratuite qui vous permet de cumuler des points à chaque passage à l’Hôtel Palladia. Ces points sont ensuite convertibles en réductions, cadeaux ou services offerts.","Fini les cartes à tamponner ou à ne jamais retrouver : tout se passe en ligne ou sur votre smartphone. Simple, pratique et sans engagement, ce programme est pensé pour vous faciliter la vie tout en vous faisant profiter d’avantages concrets."]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'adelya' and locale = 'fr'), 2, 'texte', '{"titre":"Comment ça fonctionne ?","paragraphes":[]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'adelya' and locale = 'fr'), 3, 'texte', '{"titre":"1️⃣ Inscrivez-vous en quelques clics","paragraphes":["Lors de votre réservation ou directement à la réception, demandez votre carte de fidélité Adelya. Vous recevrez un lien d’activation par e-mail vous permettant de créer votre espace personnel.","Aucun document n’est requis. L’inscription est 100 % gratuite et sans contrainte."]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'adelya' and locale = 'fr'), 4, 'texte', '{"titre":"2️⃣ Cumulez des points à chaque séjour","paragraphes":["À chaque euro dépensé à l’hôtel (hébergement, restaurant, etc.), vous cumulez automatiquement des points fidélité. Il vous suffit de présenter votre carte (digitale ou physique) à chaque passage."]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'adelya' and locale = 'fr'), 5, 'texte', '{"titre":"3️⃣ Transformez vos points en avantages","paragraphes":["Une fois un certain seuil atteint, vous pourrez échanger vos points contre :","Tout est pensé pour que votre fidélité soit récompensée rapidement et généreusement."],"liste":["Des réductions immédiates sur votre prochain séjour","Des petits-déjeuners offerts","Des surclassements en chambre supérieure","Des cadeaux exclusifs réservés aux membres"]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'adelya' and locale = 'fr'), 6, 'texte', '{"titre":"Vos avantages en tant que membre","paragraphes":["En rejoignant notre programme de fidélité, vous bénéficiez de nombreux privilèges, en toute simplicité :"]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'adelya' and locale = 'fr'), 7, 'texte', '{"titre":"✅ Des réductions sur vos séjours","paragraphes":["Grâce à vos points, bénéficiez de tarifs préférentiels sur vos prochaines réservations, directement en ligne ou sur place."]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'adelya' and locale = 'fr'), 8, 'texte', '{"titre":"✅ Des offres personnalisées rien que pour vous","paragraphes":["Nous vous envoyons ponctuellement des offres exclusives, en fonction de vos préférences et de vos habitudes. Anniversaire, week-end romantique, offre détente… soyez les premiers informés !"]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'adelya' and locale = 'fr'), 9, 'texte', '{"titre":"✅ Des surprises à chaque étape","paragraphes":[]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'adelya' and locale = 'fr'), 10, 'texte', '{"titre":"✅ Un espace client dédié","paragraphes":["Depuis votre espace personnel en ligne, vous pouvez :"],"liste":["Consulter votre solde de points","Voir vos avantages en attente","Réserver plus facilement"]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'adelya' and locale = 'fr'), 11, 'texte', '{"titre":"✅ Une carte simple et toujours accessible","paragraphes":["Pas besoin de carte physique : tout est digitalisé. Votre carte est accessible depuis votre smartphone, votre boîte mail, ou simplement à la réception."]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'adelya' and locale = 'fr'), 12, 'texte', '{"titre":"Qui peut en bénéficier ?","paragraphes":["Tout le monde ! Que vous soyez un habitué de l’Hôtel Palladia, un client occasionnel ou un nouveau visiteur, vous pouvez adhérer gratuitement au programme de fidélité. Il n’y a aucun critère d’ancienneté ou d’engagement."]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'adelya' and locale = 'fr'), 13, 'texte', '{"titre":"Comment activer votre carte Adelya ?","paragraphes":[],"liste":["Demandez votre carte via ce lien.","Recevez un lien d’activation par e-mail.","Créez votre espace personnel en quelques clics.","Commencez à cumuler des points dès votre première visite !"]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'adelya' and locale = 'fr'), 14, 'texte', '{"titre":"Rejoignez le programme dès aujourd’hui","paragraphes":["Vous venez bientôt séjourner à l’Hôtel Palladia ? C’est le moment parfait pour profiter de la carte Adelya et commencer à cumuler vos avantages. Demandez-la simplement à votre arrivée, ou contactez notre équipe pour toute question.","🎁 Votre fidélité mérite mieux qu’un simple merci."]}'::jsonb);

-- L'Escapade Parfaite pour un Staycation
insert into public.articles (slug, locale, titre, chapo, image_hero, image_vignette, statut, date_publication, seo_description)
values ('staycation-toulouse', 'fr', 'L''Escapade Parfaite pour un Staycation', 'Offrez-vous une expérience staycation Toulouse inédite dans un hôtel 4 étoiles où chaque instant devient une parenthèse de luxe. Profitez d’une nuit exceptionnelle avec petit-déjeuner gourmand en room service, un spa avec hammam et sauna, et un late check-out pour prolonger le pl', '/images/blog/soiree-theme-hotel-palladia-1.jpg', '/images/blog/soiree-theme-hotel-palladia-1.jpg', 'publie', '2025-03-05 10:39:54', 'Offrez-vous une expérience staycation Toulouse inédite dans un hôtel 4 étoiles où chaque instant devient une parenthèse de luxe. Profitez d’une nuit exceptionnelle avec petit-déjeuner gourmand en room service, un spa avec hammam et sauna, et un late check-out pour prolonger le pl')
on conflict (slug, locale) do update set
  titre = excluded.titre, chapo = excluded.chapo, image_hero = excluded.image_hero,
  image_vignette = excluded.image_vignette, date_publication = excluded.date_publication,
  seo_description = excluded.seo_description;

delete from public.article_blocs where article_id = (select id from public.articles where slug = 'staycation-toulouse' and locale = 'fr');

insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'staycation-toulouse' and locale = 'fr'), 0, 'texte_image', '{"paragraphes":["Offrez-vous une expérience staycation Toulouse inédite dans un hôtel 4 étoiles où chaque instant devient une parenthèse de luxe. Profitez d’une nuit exceptionnelle avec petit-déjeuner gourmand en room service, un spa avec hammam et sauna, et un late check-out pour prolonger le plaisir. Sirotez un cocktail au bar, installez-vous en terrasse et laissez-vous porter par l’atmosphère unique de Toulouse. À quelques minutes du Capitole en métro, notre restaurant gastronomique vous propose un dîner sur-mesure, accompagné d’une bouteille de champagne pour une escapade romantique inoubliable. Après une soirée élégante, détendez-vous dans votre chambre king-size, savourez un massage relaxant et réveillez-vous en douceur.","Avec nos offres, découvrez l’un des meilleurs hôtels de luxe à Toulouse, alliant services haut de gamme, piscine privée et personnel attentionné. Matin ou soir, chaque heure est précieuse : commencez la journée avec un petit-déjeuner en salle, flânez au cœur du centre-ville, ou laissez-vous séduire par un coucher de soleil en bord de Garonne. Réservez dès maintenant votre staycation Toulouse et profitez d’une expérience exceptionnelle."],"image":"/images/blog/soiree-theme-hotel-palladia-1.jpg","alt":"Piscine de l''hôtel Palladia lors d''une soirée à thème","position":"droite"}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'staycation-toulouse' and locale = 'fr'), 1, 'texte', '{"titre":"Découvrez notre offre exclusive de staycation à Toulouse","paragraphes":["Un staycation, c’est la promesse d’une évasion sans quitter la ville. À l’Hôtel Palladia, nous avons imaginé une expérience unique, combinant bien-être, gastronomie et détente pour une pause hors du temps. Situé dans un cadre élégant, à quelques minutes du centre-ville de Toulouse, notre établissement vous invite à profiter pleinement de chaque instant, sans contrainte de transport ni de long trajet.","Notre offre staycation Toulouse a été pensée pour répondre à toutes vos envies : relaxation absolue au spa, dégustation de mets raffinés, ou simplement une nuit de repos dans un cadre luxueux."]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'staycation-toulouse' and locale = 'fr'), 2, 'texte', '{"titre":"Séjournez dans nos chambres et suites élégantes","paragraphes":["Nos chambres et suites vous garantissent un confort absolu :","Chaque détail a été pensé pour faire de votre nuit à Toulouse un moment d’exception."],"liste":["Literie king-size pour un sommeil réparateur","Salle de bain moderne avec douche à l’italienne ou baignoire","Connexion Wi-Fi haut débit pour rester connecté","TV écran plat avec chaînes internationales","Service en chambre pour un confort optimal"]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'staycation-toulouse' and locale = 'fr'), 3, 'texte', '{"titre":"Détendez-vous dans notre spa et centre de bien-être","paragraphes":["Évadez-vous dans un espace dédié à la relaxation et laissez-vous envelopper par une atmosphère apaisante :","Notre spa est l’endroit idéal pour une pause bien-être à Toulouse."],"liste":["Hammam et sauna, pour purifier votre peau et votre esprit","Massages personnalisés, réalisés par des experts du bien-être","Soins du visage et du corps, avec des produits haut de gamme","Espace détente, où le temps suspend son vol"]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'staycation-toulouse' and locale = 'fr'), 4, 'texte', '{"titre":"Savourez une cuisine raffinée dans notre restaurant","paragraphes":["Notre restaurant gastronomique vous invite à un voyage culinaire, où saveurs locales et créativité se rencontrent.","Un dîner romantique à Toulouse, un déjeuner d’exception, ou une expérience culinaire mémorable vous attendent à l’Hôtel Palladia."],"liste":["Plats raffinés élaborés à partir de produits frais et de saison","Sélection de vins d’exception","Ambiance élégante et chaleureuse pour un dîner en tête-à-tête ou un repas d’affaires"]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'staycation-toulouse' and locale = 'fr'), 5, 'texte', '{"titre":"Profitez de notre piscine extérieure","paragraphes":["Envie d’un moment de détente absolu ?","Installez-vous, détendez-vous et laissez-vous porter par le charme de Toulouse."],"liste":["Piscine extérieure, idéale pour se rafraîchir en été","Bar-lounge, où siroter un cocktail signature en terrasse","Ambiance cosy et raffinée, parfaite pour prolonger la soirée"]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'staycation-toulouse' and locale = 'fr'), 6, 'texte', '{"titre":"Les avantages de notre offre staycation","paragraphes":[]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'staycation-toulouse' and locale = 'fr'), 7, 'texte', '{"titre":"✅ Tarifs exclusifs et prestations haut de gamme","paragraphes":[],"liste":["Séjournez dans un hôtel 4 étoiles à Toulouse","Accès au spa, hammam et sauna inclus","Expérience sur-mesure, selon vos envies"]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'staycation-toulouse' and locale = 'fr'), 8, 'texte', '{"titre":"✅ Petit-déjeuner gourmand inclus","paragraphes":["Commencez la journée avec un petit-déjeuner savoureux :","Dégustez votre petit-déjeuner en salle ou en room service, pour une expérience encore plus cosy."],"liste":["Viennoiseries fraîches et croustillantes","Jus de fruits pressés et boissons chaudes","Produits locaux et bio"]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'staycation-toulouse' and locale = 'fr'), 9, 'texte', '{"titre":"✅ Late check-out pour une détente prolongée","paragraphes":[],"liste":["Départ tardif pour profiter pleinement de votre séjour","Plus de temps pour savourer chaque instant"]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'staycation-toulouse' and locale = 'fr'), 10, 'texte', '{"titre":"Explorez Toulouse lors de votre staycation","paragraphes":["L''Hôtel Palladia est idéalement situé pour découvrir Toulouse et profiter de ses trésors cachés."]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'staycation-toulouse' and locale = 'fr'), 11, 'texte', '{"titre":"Activités culturelles et touristiques à proximité","paragraphes":[],"liste":["Visitez le Capitole, le cœur de la ville","Flânez au Musée des Augustins pour une immersion artistique","Admirez la Garonne au coucher du soleil"]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'staycation-toulouse' and locale = 'fr'), 12, 'texte', '{"titre":"Shopping et gastronomie locale","paragraphes":[],"liste":["Découvrez les boutiques du quartier Saint-Georges","Savourez les spécialités locales dans les meilleurs restaurants de Toulouse"]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'staycation-toulouse' and locale = 'fr'), 13, 'texte', '{"titre":"Nos offres spéciales pour un staycation sur-mesure","paragraphes":["Nous avons conçu des expériences uniques pour répondre à toutes vos envies."]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'staycation-toulouse' and locale = 'fr'), 14, 'texte', '{"titre":"1️⃣ Offre Bien-être & Relaxation","paragraphes":[],"liste":["Accès spa & massage, pour une pause détente","Nuitée et petit-déjeuner inclus, pour une expérience complète"]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'staycation-toulouse' and locale = 'fr'), 15, 'texte', '{"titre":"2️⃣ Expérience gastronomique","paragraphes":[],"liste":["Dîner gastronomique, signé par notre chef","Dégustation de vins, en accord avec les mets"]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'staycation-toulouse' and locale = 'fr'), 16, 'texte', '{"titre":"4️⃣ Séjour Romantique","paragraphes":[],"liste":["Chambre décorée, avec pétales de roses et bougies","Bouteille de champagne offerte, pour une soirée élégante"]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'staycation-toulouse' and locale = 'fr'), 17, 'texte', '{"titre":"Ce qu''en disent nos clients","paragraphes":["Nos clients apprécient particulièrement :","✔ Le confort de nos chambres✔ La qualité du service✔ Le spa et les prestations bien-être✔ La cuisine raffinée de notre restaurant","Note moyenne : 4/5 sur Google Avis"]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'staycation-toulouse' and locale = 'fr'), 18, 'texte', '{"titre":"Réservez votre staycation à l’Hôtel Palladia dès maintenant","paragraphes":["Ne manquez pas l’opportunité de vivre une expérience unique à Toulouse.","Offrez-vous un séjour d’exception, entre détente et raffinement, et laissez-vous porter par le luxe et la sérénité.","👉 Réservez dès aujourd’hui votre staycation Toulouse et profitez d’une expérience exceptionnelle au cœur de la Ville Rose."]}'::jsonb);

-- Un Voyage dans l'Excellence Hôtelière
insert into public.articles (slug, locale, titre, chapo, image_hero, image_vignette, statut, date_publication, seo_description)
values ('lhotel-palladia-un-voyage-dans-lexcellence-hoteliere-et-levenementiel-a-toulouse', 'fr', 'Un Voyage dans l''Excellence Hôtelière', 'Fondé en 1992 par Monsieur Georges Miatto, l’Hôtel Palladia est un établissement aux multiples facettes, tourné vers l’événementiel et offrant un savoir-faire d’exception.', '/images/blog/evenementiel-toulouse-palladia.jpg', '/images/blog/evenementiel-toulouse-palladia.jpg', 'publie', '2025-01-31 09:42:47', 'Fondé en 1992 par Monsieur Georges Miatto, l’Hôtel Palladia est un établissement aux multiples facettes, tourné vers l’événementiel et offrant un savoir-faire d’exception.')
on conflict (slug, locale) do update set
  titre = excluded.titre, chapo = excluded.chapo, image_hero = excluded.image_hero,
  image_vignette = excluded.image_vignette, date_publication = excluded.date_publication,
  seo_description = excluded.seo_description;

delete from public.article_blocs where article_id = (select id from public.articles where slug = 'lhotel-palladia-un-voyage-dans-lexcellence-hoteliere-et-levenementiel-a-toulouse' and locale = 'fr');

insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'lhotel-palladia-un-voyage-dans-lexcellence-hoteliere-et-levenementiel-a-toulouse' and locale = 'fr'), 0, 'texte_image', '{"titre":"Aquarelle de Rémy Peyranne","paragraphes":["Fondé en 1992 par Monsieur Georges Miatto, l’Hôtel Palladia est un établissement aux multiples facettes, tourné vers l’événementiel et offrant un savoir-faire d’exception.","Avec ses 90 chambres élégamment aménagées, ses 15 salles de réunion modulables et son amphithéâtre de 285 places, il se positionne comme un lieu incontournable pour les séminaires, conférences et événements professionnels à Toulouse.","L''Hôtel PALLADIA accueille également une clientèle loisir, offrant à ses visiteurs un cadre propice à la détente, à quelques pas des attractions principales de la ville.","Qu''il s''agisse d''un séjour personnel ou d''un voyage d''affaires, l''hôtel allie confort et services de qualité dans un environnement chaleureux et familial.","L’Hôtel Palladia se renouvelle régulièrement afin de rester à la pointe de l’innovation et d’offrir à ses clients une expérience toujours plus agréable.","Cette démarche permet de préserver l’excellence de ses services tout en répondant aux attentes évolutives de sa clientèle.","L’Hôtel Palladia combine tradition et modernité, tout en préservant son caractère familial.","Sa gestion sur-mesure permet d''offrir un accueil personnalisé et des services de qualité, assurant ainsi une expérience unique pour tous ses clients.","Cette aquarelle de Rémy Peyranne rend hommage à l’histoire et à l’engagement de la famille Miatto, qui a su faire de cet hôtel un symbole de l’hôtellerie toulousaine, où authenticité, hospitalité et excellence sont les maîtres mots.🎨✨"],"image":"/images/blog/evenementiel-toulouse-palladia.jpg","alt":"Tableau représentant l''hôtel Palladia","position":"droite"}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'lhotel-palladia-un-voyage-dans-lexcellence-hoteliere-et-levenementiel-a-toulouse' and locale = 'fr'), 1, 'texte', '{"titre":"Pour recevoir notre brochure séminaire ou toute demande d’information, nous vous invitons à contacter notre service commercial","paragraphes":["Hôtel Palladia271 Avenue de Grande Bretagne – Toulouse","Responsable des ventes","07 70 21 44 75","f.klasinski@hotelpalladia.com","Commerciale","05 62 120 136","l.averous@hotelpalladia.com","Commerciale","05 62 120 134","p.duffort@hotelpalladia.com"]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'lhotel-palladia-un-voyage-dans-lexcellence-hoteliere-et-levenementiel-a-toulouse' and locale = 'fr'), 2, 'carrousel', '{"images":[{"src":"/images/blog/Fred-Klasinski.jpg","alt":""},{"src":"/images/blog/laure-averous-commerciale-hotel-palladia.jpg","alt":"Photo de profil de Laure Avérous"},{"src":"/images/blog/pauline-duffort-commerciale-hotel-palladia.jpg","alt":"Photo de profil de Pauline Duffort"}]}'::jsonb);

-- Les temps Forts de l’Hôtel PALLADIA
insert into public.articles (slug, locale, titre, chapo, image_hero, image_vignette, statut, date_publication, seo_description)
values ('les-temps-forts-de-lhotel-palladia', 'fr', 'Les temps Forts de l’Hôtel PALLADIA', 'Reconnus pour notre passion et notre expertise, nous vous invitons à découvrir les moments festifs qui ont rythmés ces dernières années.', '/images/blog/temps-forts-palladia.webp', '/images/blog/temps-forts-palladia.webp', 'publie', '2024-11-14 12:23:30', 'Reconnus pour notre passion et notre expertise, nous vous invitons à découvrir les moments festifs qui ont rythmés ces dernières années.')
on conflict (slug, locale) do update set
  titre = excluded.titre, chapo = excluded.chapo, image_hero = excluded.image_hero,
  image_vignette = excluded.image_vignette, date_publication = excluded.date_publication,
  seo_description = excluded.seo_description;

delete from public.article_blocs where article_id = (select id from public.articles where slug = 'les-temps-forts-de-lhotel-palladia' and locale = 'fr');

insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'les-temps-forts-de-lhotel-palladia' and locale = 'fr'), 0, 'carrousel', '{"images":[{"src":"/images/blog/temps-forts-palladia.webp","alt":"Temps forts Hôtel Palladia"}]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'les-temps-forts-de-lhotel-palladia' and locale = 'fr'), 1, 'texte', '{"titre":"Depuis 35 ans, l’Hôtel PALLADIA est une adresse emblématique de Toulouse, un lieu où se conjuguent excellence et savoir-faire dans l’art de l’évènementiel","paragraphes":["Reconnus pour notre passion et notre expertise, nous vous invitons à découvrir les moments festifs qui ont rythmés ces dernières années.","Cocktails dînatoires, concerts, soirées de réveillon, assemblées et feux d’artifice… Chaque événement est une occasion pour nos équipes de sublimer votre expérience.","Notre chef et sa brigade mettent un point d''honneur à vous proposer une cuisine raffinée, alliant créativité et produits locaux,","pour faire de chaque rencontre un moment inoubliable.","L’Hôtel PALLADIA, avec ses espaces élégants et sa capacité d’accueil, est aujourd’hui un lieu incontournable pour les soirées et célébrations à Toulouse.","Que ce soit pour un événement privé ou professionnel, nous nous engageons à offrir un service irréprochable et à créer des souvenirs inoubliables."]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'les-temps-forts-de-lhotel-palladia' and locale = 'fr'), 2, 'carrousel', '{"images":[{"src":"/images/blog/13.jpg","alt":"Décoration d''un espace événementiel de l''hôtel Palladia avec une ambiance chaleureuse et festive inspirée du sud de la France. Espace décoré avec des tables en bois, des chaises hautes en métal, un bar à tapas et des guirlandes de drapeaux aux couleurs occitanes. Parfait pour les réceptions, séminaires et soirées privées."},{"src":"/images/blog/1.jpg","alt":""},{"src":"/images/blog/2.jpg","alt":""},{"src":"/images/blog/3.jpg","alt":""},{"src":"/images/blog/4.jpg","alt":""},{"src":"/images/blog/5.jpg","alt":""},{"src":"/images/blog/6.jpg","alt":""},{"src":"/images/blog/7.jpg","alt":""},{"src":"/images/blog/8.jpg","alt":""},{"src":"/images/blog/9.jpg","alt":""},{"src":"/images/blog/10.jpg","alt":""},{"src":"/images/blog/11.jpg","alt":""},{"src":"/images/blog/12.jpg","alt":""},{"src":"/images/blog/13-1.jpg","alt":""},{"src":"/images/blog/14.jpg","alt":""},{"src":"/images/blog/15.jpg","alt":""},{"src":"/images/blog/16.jpg","alt":""},{"src":"/images/blog/17.jpg","alt":""},{"src":"/images/blog/18.jpg","alt":""},{"src":"/images/blog/19.jpg","alt":""},{"src":"/images/blog/21.jpg","alt":"Buffet à l''hôtel Palladia"},{"src":"/images/blog/20.jpg","alt":"Tables décorées au restaurant de l''hôtel Palladia"}]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'les-temps-forts-de-lhotel-palladia' and locale = 'fr'), 3, 'texte', '{"titre":"Contactez-nous","paragraphes":[]}'::jsonb);

-- Dîner « Accord mets & Champagne »
insert into public.articles (slug, locale, titre, chapo, image_hero, image_vignette, statut, date_publication, seo_description)
values ('diner-accord-mets-champagne', 'fr', 'Dîner « Accord mets & Champagne »', 'Champagne Duval Leroy, Réserve brut et ses pièces apéritives', '/images/blog/accord-met-et-vin-banniere.webp', '/images/blog/accord-met-et-vin-banniere.webp', 'publie', '2024-09-20 12:36:54', 'Champagne Duval Leroy, Réserve brut et ses pièces apéritives')
on conflict (slug, locale) do update set
  titre = excluded.titre, chapo = excluded.chapo, image_hero = excluded.image_hero,
  image_vignette = excluded.image_vignette, date_publication = excluded.date_publication,
  seo_description = excluded.seo_description;

delete from public.article_blocs where article_id = (select id from public.articles where slug = 'diner-accord-mets-champagne' and locale = 'fr');

insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'diner-accord-mets-champagne' and locale = 'fr'), 0, 'carrousel', '{"images":[{"src":"/images/blog/accord-met-et-vin-banniere.webp","alt":"Bannière promotionnelle pour un événement intitulé ''Accord mets & Champagne'', prévu le jeudi 21 novembre 2024 à l''Hôtel Palladia à Toulouse. L''image montre une bouteille de champagne dorée à droite, avec des paillettes dorées et des confettis colorés en arrière-plan. Le texte mentionne la présentation du Champagne de la Maison DUVAL LEROY."}]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'diner-accord-mets-champagne' and locale = 'fr'), 1, 'texte', '{"titre":"Le menu du jeudi 21 Novembre","paragraphes":[]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'diner-accord-mets-champagne' and locale = 'fr'), 2, 'texte', '{"titre":"Menu à 75€ TTC","paragraphes":["Champagne Duval Leroy, Réserve brut et ses pièces apéritives","Homard Bleu Breton,","Céleri et carottes anisées,","Espuma de bisque de homard","Champagne Duval Leroy, Fleur de champagne","Filet de bœuf,","Purée de pommes de terre truffée,","Jus au Porto rouge","Champagne Duval Leroy, Blanc de blanc prestige grand cru","Moelleux chocolat 44%, sorbet maison au Champagne Duval Leroy","Champagne Duval Leroy, Rosé brut Prestige Premier cru","Eaux minérales & Café"]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'diner-accord-mets-champagne' and locale = 'fr'), 3, 'texte', '{"titre":"Pensez à réserver","paragraphes":[]}'::jsonb);

-- L’amphithéâtre de l'hôtel Palladia rénové
insert into public.articles (slug, locale, titre, chapo, image_hero, image_vignette, statut, date_publication, seo_description)
values ('amphitheatre-hotel-palladia-renove', 'fr', 'L’amphithéâtre de l''hôtel Palladia rénové', '285 places', '/images/blog/amphitheatre-hotel-palladia-renove.webp', '/images/blog/amphitheatre-hotel-palladia-renove.webp', 'publie', '2024-09-06 10:13:55', '285 places')
on conflict (slug, locale) do update set
  titre = excluded.titre, chapo = excluded.chapo, image_hero = excluded.image_hero,
  image_vignette = excluded.image_vignette, date_publication = excluded.date_publication,
  seo_description = excluded.seo_description;

delete from public.article_blocs where article_id = (select id from public.articles where slug = 'amphitheatre-hotel-palladia-renove' and locale = 'fr');

insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'amphitheatre-hotel-palladia-renove' and locale = 'fr'), 0, 'carrousel', '{"images":[{"src":"/images/blog/amphitheatre-hotel-palladia-renove.webp","alt":"Une salle de conférence élégante avec des sièges rouges disposés en arc de cercle, face à une scène équipée d''un grand écran projetant le logo de l''Hôtel Palladia à Toulouse. L''ambiance est chaleureuse grâce à un éclairage doux en tons violets, créant une atmosphère professionnelle et accueillante."}]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'amphitheatre-hotel-palladia-renove' and locale = 'fr'), 1, 'texte_image', '{"titre":"Un Amphithéâtre Élégant pour vos Événements","paragraphes":["285 places","Parking de 300 places","Salle de restauration dédiée","Pour vos événements les plus prestigieux, l’Hôtel Palladia vous ouvre les portes de son amphithéâtre récemment rénové.","Son agencement en gradins a été soigneusement pensé pour favoriser l''interaction entre les conférenciers et l''ensemble de l''auditoire, garantissant ainsi une expérience fluide et immersive.","Plongez dans une atmosphère moderne et captivante, où chaque détail a été conçu pour sublimer vos événements d’envergure. Avec une capacité de 285 participants, cet amphithéâtre est équipé d''une régie technique complète, d''une scène spacieuse et de systèmes audiovisuels de pointe, parfaits pour assurer le bon déroulement de vos présentations, conférences ou spectacles.","Une équipe dédiée se tient à votre disposition pour vous accompagner à chaque étape de l''organisation, qu''il s''agisse de la coordination logistique, des besoins techniques ou des services de restauration sur mesure, adaptés à vos exigences.","L''amphithéâtre bénéficie d''une entrée privative pour garantir la discrétion et la fluidité des arrivées, ainsi que d''une salle de restauration adjacente, idéale pour vos pauses gourmandes et vos repas d''affaires.","Afin d''assurer le confort de vos invités, l’Hôtel Palladia propose également un parking privé de 300 places, facilement accessible et sécurisé."],"image":"/images/blog/amphitheatre-palladia.jpg","alt":"Photo en mode portrait de l''amphithéâtre du Palladia","position":"gauche"}'::jsonb);

-- Le Jardin du Barry à Toulouse : le poumon vert de la Cartoucherie
insert into public.articles (slug, locale, titre, chapo, image_hero, image_vignette, statut, date_publication, seo_description)
values ('le-jardin-du-barry-a-toulouse-le-poumon-vert-de-la-cartoucherie', 'fr', 'Le Jardin du Barry à Toulouse : le poumon vert de la Cartoucherie', 'Vélo et trottinette : 5 mn', '/images/blog/cle-verte-jardin.jpg', '/images/blog/cle-verte-jardin.jpg', 'publie', '2024-05-29 14:11:58', 'Vélo et trottinette : 5 mn')
on conflict (slug, locale) do update set
  titre = excluded.titre, chapo = excluded.chapo, image_hero = excluded.image_hero,
  image_vignette = excluded.image_vignette, date_publication = excluded.date_publication,
  seo_description = excluded.seo_description;

delete from public.article_blocs where article_id = (select id from public.articles where slug = 'le-jardin-du-barry-a-toulouse-le-poumon-vert-de-la-cartoucherie' and locale = 'fr');

insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'le-jardin-du-barry-a-toulouse-le-poumon-vert-de-la-cartoucherie' and locale = 'fr'), 0, 'carrousel', '{"images":[{"src":"/images/blog/cle-verte-jardin.jpg","alt":"Le Jardin du Barry à Toulouse"}]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'le-jardin-du-barry-a-toulouse-le-poumon-vert-de-la-cartoucherie' and locale = 'fr'), 1, 'texte_image', '{"titre":"Une échappée VERTE à proximité de l''Hôtel Palladia","paragraphes":["Vélo et trottinette : 5 mn","A pied : 17 mn","GPS : 43.599623310492994","Pour les férus de sport, l’espace vert de la Cartoucherie a été aménagé avec des appareils de fitness.Les allées du sous-bois disposent d’une luxuriante flore. Idéal pour flâner mais également pour se délecter des essences locales et des parterres de fleurs.Chaque parterre de fleurs présente un panneau explicatif pour se familiariser avec les diverses variétés de plantes. De quoi allier l’utile à l’agréable. Une partie du jardin est consacrée aux plantes sauvages et à leur utilisation, telles que le mélilot, l''hysope, la catananche, la carline, la cardère ou le pastel. L’étang du jardin du Barry jouxte le sous-bois. La baignade y est interdite mais la pêche, réglementée, y est autorisée.Ce coin de fraîcheur regorge d’une faune variée. Les curieux pourront y croiser des hérons cendrés, des canards ou encore des poules d’eau.Les abords du point d''eau disposent de bancs ou de coins de verdure permettant de s’installer face au lac."],"image":"/images/blog/jardin-du-barry.jpg","alt":"Aire de jeux du jardin du barry","position":"gauche"}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'le-jardin-du-barry-a-toulouse-le-poumon-vert-de-la-cartoucherie' and locale = 'fr'), 2, 'texte_image', '{"titre":"Autre site à visiter : Capitainerie Port Saint Sauveur","paragraphes":["Situé sur le canal du Midi, classé au Patrimoine Mondial de l''Unesco, à mi-chemin de l''Océan et de la Méditerranée, le port Saint Sauveur accueille les plaisanciers et les cyclotouristes et leur propose de nombreuses commodités.","Le port Saint-Sauveur est labellisé Pavillon Bleu","Ce label, créé par l''office français de la fondation pour l''éducation à l''environnement en Europe, valorise les actions durables en faveur d''un environnement de qualité menées par le port.Le port Saint-Sauveur a obtenu le label Pavillon Bleu en 2014.","Location de vélo à Toulouse > VélÔToulouse"],"image":"/images/blog/port-saint-sauveur.jpg","alt":"","position":"droite"}'::jsonb);

-- Afterwork Toulouse - Hôtel Palladia
insert into public.articles (slug, locale, titre, chapo, image_hero, image_vignette, statut, date_publication, seo_description)
values ('afterwork-toulouse', 'fr', 'Afterwork Toulouse - Hôtel Palladia', NULL, '/images/blog/banniere-afterwork-1er-octobre-scaled.jpg', '/images/blog/banniere-afterwork-1er-octobre-scaled.jpg', 'publie', '2024-03-21 15:28:31', NULL)
on conflict (slug, locale) do update set
  titre = excluded.titre, chapo = excluded.chapo, image_hero = excluded.image_hero,
  image_vignette = excluded.image_vignette, date_publication = excluded.date_publication,
  seo_description = excluded.seo_description;

delete from public.article_blocs where article_id = (select id from public.articles where slug = 'afterwork-toulouse' and locale = 'fr');

insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'afterwork-toulouse' and locale = 'fr'), 0, 'carrousel', '{"images":[{"src":"/images/blog/banniere-afterwork-1er-octobre-scaled.jpg","alt":"Le live Afterwork au Pallladia"}]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'afterwork-toulouse' and locale = 'fr'), 1, 'texte', '{"titre":"On vous propose donc de venir chiller durant nos AFTERWORK… Histoire de prolonger le plaisir de ces belles journées toulousaines","paragraphes":[]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'afterwork-toulouse' and locale = 'fr'), 2, 'texte', '{"titre":"Prochain afterwork","paragraphes":[]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'afterwork-toulouse' and locale = 'fr'), 3, 'texte', '{"titre":"Mardi 1er octobre 2019 au salon Opéra","paragraphes":[],"liste":["De la musique live avec la djette Céline Modi In Cocktails, Tapas, Live cooking et bonne humeur …"]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'afterwork-toulouse' and locale = 'fr'), 4, 'texte', '{"titre":"RéservEZ VOS PLACES","paragraphes":[]}'::jsonb);

-- Spectacles humour : Cravate Club
insert into public.articles (slug, locale, titre, chapo, image_hero, image_vignette, statut, date_publication, seo_description)
values ('theatre-le-grenier-de-toulouse', 'fr', 'Spectacles humour : Cravate Club', NULL, '/images/blog/cravate-club-le-grenier-toulouse-scaled.jpg', '/images/blog/cravate-club-le-grenier-toulouse-scaled.jpg', 'publie', '2024-03-21 15:13:13', NULL)
on conflict (slug, locale) do update set
  titre = excluded.titre, chapo = excluded.chapo, image_hero = excluded.image_hero,
  image_vignette = excluded.image_vignette, date_publication = excluded.date_publication,
  seo_description = excluded.seo_description;

delete from public.article_blocs where article_id = (select id from public.articles where slug = 'theatre-le-grenier-de-toulouse' and locale = 'fr');

insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'theatre-le-grenier-de-toulouse' and locale = 'fr'), 0, 'carrousel', '{"images":[{"src":"/images/blog/cravate-club-le-grenier-toulouse-scaled.jpg","alt":"Affiche du spectacle \"cravate club le grenier de Toulouse\""}]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'theatre-le-grenier-de-toulouse' and locale = 'fr'), 1, 'texte', '{"titre":"L’amitié a ses raisons que la raison ignore...","paragraphes":[]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'theatre-le-grenier-de-toulouse' and locale = 'fr'), 2, 'texte', '{"titre":"Cravate club - le grenier de Toulouse","paragraphes":[]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'theatre-le-grenier-de-toulouse' and locale = 'fr'), 3, 'texte', '{"titre":"Vendredi 17/02/2023 - 21:00 à 22:15","paragraphes":[],"liste":["Madame, Monsieur, chères spectatrices, chers spectateurs, Vous êtes quelqu’un de bien, vous êtes quelqu’un qui a réussi, vous êtes quelqu’un de verni ! On vous admire, on vous envie. C’est votre anniversaire… Alors c’est la fête ! Mais votre meilleur ami et associé a décidé qu’il ne viendra pas parce qu’il est retenu mystérieusement ailleurs. Un ailleurs qu’il ne tient pas à partager avec vous. Pourquoi ? Un secret ? Votre vieille amitié se fissure inexorablement devant ce refus buté de l’autre, devant sa petite liberté mesquine dont il-elle vous a exclu. Doit-on tout partager même nos cravates, nos slips et nos chaussettes ? Qu’en pensez-vous ? Un duo, un débat drôlissime, vengeur et meurtrier auquel vous serez invité afin de savoir qui des deux a raison. Mais vous qu’en pensez-vous ? Laurent Collombert et Pierre Matras au sommet de leur art et … de leur amitié !","Mise en scène : Laurence Roy","Création Lumière : Alessandro Pagli","Conception du décor : Serge Wolff","Bernard : Laurent Collombert","Adrien : Pierre Matras"]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'theatre-le-grenier-de-toulouse' and locale = 'fr'), 4, 'texte', '{"titre":"Réservation","paragraphes":[]}'::jsonb);

-- Dîners & Spectacles
insert into public.articles (slug, locale, titre, chapo, image_hero, image_vignette, statut, date_publication, seo_description)
values ('diner-spectacles-toulouse', 'fr', 'Dîners & Spectacles', 'Le 18 octobre 2025 à 21:00', '/images/blog/Actu-programmation-culturelle-site-.jpg', '/images/blog/Actu-programmation-culturelle-site-.jpg', 'publie', '2024-03-21 14:58:40', 'Le 18 octobre 2025 à 21:00')
on conflict (slug, locale) do update set
  titre = excluded.titre, chapo = excluded.chapo, image_hero = excluded.image_hero,
  image_vignette = excluded.image_vignette, date_publication = excluded.date_publication,
  seo_description = excluded.seo_description;

delete from public.article_blocs where article_id = (select id from public.articles where slug = 'diner-spectacles-toulouse' and locale = 'fr');

insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'diner-spectacles-toulouse' and locale = 'fr'), 0, 'carrousel', '{"images":[{"src":"/images/blog/Actu-programmation-culturelle-site-.jpg","alt":""}]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'diner-spectacles-toulouse' and locale = 'fr'), 1, 'texte', '{"titre":"Ambiance assurée !","paragraphes":[]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'diner-spectacles-toulouse' and locale = 'fr'), 2, 'texte', '{"titre":"Tomy Vay - J''adore vous détester","paragraphes":["Le 18 octobre 2025 à 21:00"]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'diner-spectacles-toulouse' and locale = 'fr'), 3, 'texte', '{"titre":"Théâtre - \"Toulousain 2\"","paragraphes":["Le 15 novembre 2025 à 19:30"]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'diner-spectacles-toulouse' and locale = 'fr'), 4, 'texte', '{"titre":"Concert de Musique Classique -Le Tango et l'' Amor","paragraphes":["Le 28 novembre 2025 à 19:30"]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'diner-spectacles-toulouse' and locale = 'fr'), 5, 'texte', '{"titre":"Concert des Golden Gospel Singers","paragraphes":["Le 06 Décembre 2025 à 19:30"]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'diner-spectacles-toulouse' and locale = 'fr'), 6, 'texte', '{"titre":"Réservation","paragraphes":[]}'::jsonb);

-- L’Orchestre de chambre de Toulouse
insert into public.articles (slug, locale, titre, chapo, image_hero, image_vignette, statut, date_publication, seo_description)
values ('hotel-palladia-x-orchestre-de-chambre-de-toulouse', 'fr', 'L’Orchestre de chambre de Toulouse', 'Ces rendez-vous dominicaux peuvent être accompagnés d’un déjeuner gourmand', '/images/blog/orchestre-de-chambre-toulouse-scaled.jpg', '/images/blog/orchestre-de-chambre-toulouse-scaled.jpg', 'publie', '2024-03-21 14:42:44', 'Ces rendez-vous dominicaux peuvent être accompagnés d’un déjeuner gourmand')
on conflict (slug, locale) do update set
  titre = excluded.titre, chapo = excluded.chapo, image_hero = excluded.image_hero,
  image_vignette = excluded.image_vignette, date_publication = excluded.date_publication,
  seo_description = excluded.seo_description;

delete from public.article_blocs where article_id = (select id from public.articles where slug = 'hotel-palladia-x-orchestre-de-chambre-de-toulouse' and locale = 'fr');

insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'hotel-palladia-x-orchestre-de-chambre-de-toulouse' and locale = 'fr'), 0, 'carrousel', '{"images":[{"src":"/images/blog/orchestre-de-chambre-toulouse-scaled.jpg","alt":"Orchestre de chambre de Toulouse à l''hôtel Palladia"}]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'hotel-palladia-x-orchestre-de-chambre-de-toulouse' and locale = 'fr'), 1, 'texte', '{"titre":"Ainsi les polyphonies classiques des grands compositeurs tels que Vivaldi, Mozart, Bach, Schubert seront à l’ Honneur à travers quatre concerts incontournables de musique classique","paragraphes":["Ces rendez-vous dominicaux peuvent être accompagnés d’un déjeuner gourmand"]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'hotel-palladia-x-orchestre-de-chambre-de-toulouse' and locale = 'fr'), 2, 'texte', '{"titre":"Dimanche 11 juin 2023 à 11h00","paragraphes":["Concert gratuit OCT, Florilège d’œuvres de toutes les époques.Uniquement sur réservation"]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'hotel-palladia-x-orchestre-de-chambre-de-toulouse' and locale = 'fr'), 3, 'texte', '{"titre":"Dimanche 3 décembre 2023 à 11h00 : Bêtes de Pub","paragraphes":["Vous connaissez forcément tous ces airs !","Ils ont été repris pour tant de films ou publicités que vous les avez forcément entendus sans peut-être savoir qui avait composé quoi.Cet usage utilitaire de la musique n’a rien de choquant. Depuis la nuit des temps, la musique sert à faire danser les gens, accompagne les histoires que les hommes aiment à se raconter… ou plus effrayant leur donne du courage au combat. Dans un registre moins guerrier, combien de « joggeurs » et « joggeuses » ne courent qu’en écoutant de la musique avec une oreillette ? La musique détient un pouvoir hypnotique qu’il est tentant d’utiliser, et quand un « air » est particulièrement réussi il pénètre durablement notre psyché. Les compositeurs baroques, entre 1550 et 1750 environ, ont même théorisé cet usage, en affirmant que la musique exprimait nos « passions » quand bien même ils ne sont pas d’accord entre eux sur le nombre et la nature de ces passions.Il ne faut malgré tout pas exagérer la capacité manipulatoire de la musique : cela ne marche que si l’on accepte de se laisser faire et de s’y abandonner !"]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'hotel-palladia-x-orchestre-de-chambre-de-toulouse' and locale = 'fr'), 4, 'texte', '{"titre":"Dimanche 3 mars 2024 à 11h à l’Amphithéâtre : Beethoven, la sonate à Kreutzer","paragraphes":["Initialement dédicacée à un autre violoniste, c’est finalement à l’immense compositeur et violoniste français Rodolphe Kreutzer que Beethoven dédie sa sonate. Ironie du sort, Kreutzer ne jouera jamais cette sonate que, comme nombre de ses contemporains, il jugeait trop ardue pour le public. Elle fait pourtant aujourd’hui partie des œuvres les plus jouées de Beethoven, du moins dans sa version violon-piano. C’est Beethoven lui-même qui en fera la version pour cordes que nous vous présentons ici. Comme nous vous l’avons souvent démontré au cours des 20 dernières années la transcription fait intégralement partie du processus de création…au point que comme ici, les compositeurs se transcrivent eux-mêmes ! Une vision « précieuse » de la musique voudrait nous faire croire que ce qui a été prévu pour un instrument ne pourrait en aucun cas être joué par un autre et qu’une transcription n’est qu’un pis-aller. Mais toute l’histoire de la musique nous démontre le contraire, au point que parfois la version transcrite est bien meilleure que la version originale.Difficile de parler de Beethoven sans évoquer Mozart, bien que le second n’ait pas su voir le génie du premier. Dans la version d’origine de cette « concertante », il est arrivé souvent que Mozart lui-même tienne la partie principale d’alto. Sur ce sujet aussi, ces immenses compositeurs-interprètes des siècles passés sont plus aventureux que ce qu’on imagine. Mozart et Beethoven…le qualificatif de « classiques » leur va-t-il finalement si bien ? Nous les voyons plutôt comme des créateurs capables de bousculer tous les conformismes ! À vous de juger !"]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'hotel-palladia-x-orchestre-de-chambre-de-toulouse' and locale = 'fr'), 5, 'texte', '{"titre":"Dimanche 5 mai 2024 à 11h à l’Amphithéâtre : Viva Italia","paragraphes":["Initialement dédicacée à un autre violoniste, c’est finalement à l’immense compositeur et violoniste français Rodolphe Kreutzer que Beethoven dédie sa sonate. Ironie du sort, Kreutzer ne jouera jamais cette sonate que, comme nombre de ses contemporains, il jugeait trop ardue pour le public. Elle fait pourtant aujourd’hui partie des œuvres les plus jouées de Beethoven, du moins dans sa version violon-piano. C’est Beethoven lui-même qui en fera la version pour cordes que nous vous présentons ici. Comme nous vous l’avons souvent démontré au cours des 20 dernières années la transcription fait intégralement partie du processus de création…au point que comme ici, les compositeurs se transcrivent eux-mêmes ! Une vision « précieuse » de la musique voudrait nous faire croire que ce qui a été prévu pour un instrument ne pourrait en aucun cas être joué par un autre et qu’une transcription n’est qu’un pis-aller. Mais toute l’histoire de la musique nous démontre le contraire, au point que parfois la version transcrite est bien meilleure que la version originale.Difficile de parler de Beethoven sans évoquer Mozart, bien que le second n’ait pas su voir le génie du premier. Dans la version d’origine de cette « concertante », il est arrivé souvent que Mozart lui-même tienne la partie principale d’alto. Sur ce sujet aussi, ces immenses compositeurs-interprètes des siècles passés sont plus aventureux que ce qu’on imagine. Mozart et Beethoven…le qualificatif de « classiques » leur va-t-il finalement si bien ? Nous les voyons plutôt comme des créateurs capables de bousculer tous les conformismes ! À vous de juger !"]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'hotel-palladia-x-orchestre-de-chambre-de-toulouse' and locale = 'fr'), 6, 'texte', '{"titre":"Tarifs & Réservation","paragraphes":["Concert seul : 25 eurosConcert & déjeuner : 55 euros"]}'::jsonb);

-- Mariage Hôtel Palladia Toulouse
insert into public.articles (slug, locale, titre, chapo, image_hero, image_vignette, statut, date_publication, seo_description)
values ('mariage-hotel-palladia-toulouse', 'fr', 'Mariage Hôtel Palladia Toulouse', 'Pour l’organisation de votre mariage à Toulouse, l’hôtel Palladia vous propose des prestations haut de gamme dans un cadre luxueux et harmonieux. L’équipe commerciale est à votre écoute pour l’ensemble de l’organisation de votre mariage (vin d’honneur, dîner gastronomique, brunch', '/images/blog/mariage-hotel-palladia-toulouse-scaled.jpg', '/images/blog/mariage-hotel-palladia-toulouse-scaled.jpg', 'publie', '2024-03-21 14:09:31', 'Pour l’organisation de votre mariage à Toulouse, l’hôtel Palladia vous propose des prestations haut de gamme dans un cadre luxueux et harmonieux. L’équipe commerciale est à votre écoute pour l’ensemble de l’organisation de votre mariage (vin d’honneur, dîner gastronomique, brunch')
on conflict (slug, locale) do update set
  titre = excluded.titre, chapo = excluded.chapo, image_hero = excluded.image_hero,
  image_vignette = excluded.image_vignette, date_publication = excluded.date_publication,
  seo_description = excluded.seo_description;

delete from public.article_blocs where article_id = (select id from public.articles where slug = 'mariage-hotel-palladia-toulouse' and locale = 'fr');

insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'mariage-hotel-palladia-toulouse' and locale = 'fr'), 0, 'carrousel', '{"images":[{"src":"/images/blog/mariage-hotel-palladia-toulouse-scaled.jpg","alt":"Une photo avec des mariés et une table de mariage"}]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'mariage-hotel-palladia-toulouse' and locale = 'fr'), 1, 'texte', '{"titre":"Célébrez le plus beau jour de votre vie","paragraphes":["Pour l’organisation de votre mariage à Toulouse, l’hôtel Palladia vous propose des prestations haut de gamme dans un cadre luxueux et harmonieux. L’équipe commerciale est à votre écoute pour l’ensemble de l’organisation de votre mariage (vin d’honneur, dîner gastronomique, brunch…).","L’hôtel Palladia est le lieu idéal sur Toulouse pour célébrer votre amour."]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'mariage-hotel-palladia-toulouse' and locale = 'fr'), 2, 'texte_image', '{"titre":"Notre salle de réception","paragraphes":["Situé en bord de piscine, ce salon s’inscrit dans un cadre très agréable (baies vitrées donnant sur la terrasse, entrée indépendante, salle climatisée)","Superficie : 500 m²"],"image":"/images/blog/salon-opera-hotel-palladia-toulouse.jpg","alt":"Salon Opéra de l''hôtel Palladia","position":"droite"}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'mariage-hotel-palladia-toulouse' and locale = 'fr'), 3, 'texte', '{"titre":"Pour toute demande de devis pour un mariage","paragraphes":["Hôtel Palladia271 Avenue de Grande Bretagne – Toulouse","Responsable des ventes","05 62 120 136","l.averous@hotelpalladia.com","Responsable des ventes","05 62 120 134","p.duffort@hotelpalladia.com"]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'mariage-hotel-palladia-toulouse' and locale = 'fr'), 4, 'carrousel', '{"images":[{"src":"/images/blog/laure-averous-commerciale-hotel-palladia.jpg","alt":"Photo de profil de Laure Avérous"},{"src":"/images/blog/pauline-duffort-commerciale-hotel-palladia.jpg","alt":"Photo de profil de Pauline Duffort"}]}'::jsonb);

-- Séminaire Hôtel Palladia Toulouse
insert into public.articles (slug, locale, titre, chapo, image_hero, image_vignette, statut, date_publication, seo_description)
values ('seminaire-hotel-palladia-toulouse', 'fr', 'Séminaire Hôtel Palladia Toulouse', 'L’Hôtel Palladia propose une gamme très variée de salles de réunion et de services haut de gamme, l’un des plus beaux espaces de Toulouse à même d’accueillir les évènements les plus prestigieux aussi bien que les réunions et cocktails.', '/images/blog/hotel-seminaire-toulouse-scaled.jpg', '/images/blog/hotel-seminaire-toulouse-scaled.jpg', 'publie', '2024-03-21 12:19:51', 'L’Hôtel Palladia propose une gamme très variée de salles de réunion et de services haut de gamme, l’un des plus beaux espaces de Toulouse à même d’accueillir les évènements les plus prestigieux aussi bien que les réunions et cocktails.')
on conflict (slug, locale) do update set
  titre = excluded.titre, chapo = excluded.chapo, image_hero = excluded.image_hero,
  image_vignette = excluded.image_vignette, date_publication = excluded.date_publication,
  seo_description = excluded.seo_description;

delete from public.article_blocs where article_id = (select id from public.articles where slug = 'seminaire-hotel-palladia-toulouse' and locale = 'fr');

insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'seminaire-hotel-palladia-toulouse' and locale = 'fr'), 0, 'texte_image', '{"titre":"Pour vos séminaires et conférences à Toulouse","paragraphes":["L’Hôtel Palladia propose une gamme très variée de salles de réunion et de services haut de gamme, l’un des plus beaux espaces de Toulouse à même d’accueillir les évènements les plus prestigieux aussi bien que les réunions et cocktails.","L’Hôtel Palladia est le seul à posséder un amphithéâtre de 285 places sur Toulouse et 16 salles de réunion à la lumière du jour, elles sont équipées des dernières technologies en matière d’audiovisuel et de communication.","Un grand parking de 300 places est à la disposition des clients de l’hôtel. Elégance du décor et fonctionnalité des installations font de l’hôtel Palladia un endroit idéal pour vos séminaires et vos réceptions à Toulouse.Réactivité et souplesse de notre équipe commerciale permettent une adaptation à tous vos besoins pour la réussite de vos manifestations professionnelles ou privées, évènementielles, caritatives…"],"image":"/images/blog/hotel-seminaire-toulouse-scaled.jpg","alt":"3 salles de réunion en image","position":"droite"}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'seminaire-hotel-palladia-toulouse' and locale = 'fr'), 1, 'texte', '{"titre":"Pour recevoir notre brochure séminaire ou toute demande d’information, nous vous invitons à contacter notre service commercial","paragraphes":["Hôtel Palladia271 Avenue de Grande Bretagne – Toulouse","Responsable des ventes","07 70 21 44 75","f.klasinski@hotelpalladia.com","Responsable des ventes","05 62 120 136","l.averous@hotelpalladia.com","Responsable des ventes","05 62 120 134","p.duffort@hotelpalladia.com"]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'seminaire-hotel-palladia-toulouse' and locale = 'fr'), 2, 'carrousel', '{"images":[{"src":"/images/blog/Fred-Klasinski.jpg","alt":""},{"src":"/images/blog/laure-averous-commerciale-hotel-palladia.jpg","alt":"Photo de profil de Laure Avérous"},{"src":"/images/blog/pauline-duffort-commerciale-hotel-palladia.jpg","alt":"Photo de profil de Pauline Duffort"}]}'::jsonb);

-- Zenith de Toulouse & Hôtel Palladia
insert into public.articles (slug, locale, titre, chapo, image_hero, image_vignette, statut, date_publication, seo_description)
values ('zenith-de-toulouse-hotel-palladia', 'fr', 'Zenith de Toulouse & Hôtel Palladia', 'en renseignant le code : ZENITH24', '/images/blog/ZENTIH-TOULOUSE-2024.jpg', '/images/blog/ZENTIH-TOULOUSE-2024.jpg', 'publie', '2024-03-07 12:37:44', 'en renseignant le code : ZENITH24')
on conflict (slug, locale) do update set
  titre = excluded.titre, chapo = excluded.chapo, image_hero = excluded.image_hero,
  image_vignette = excluded.image_vignette, date_publication = excluded.date_publication,
  seo_description = excluded.seo_description;

delete from public.article_blocs where article_id = (select id from public.articles where slug = 'zenith-de-toulouse-hotel-palladia' and locale = 'fr');

insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'zenith-de-toulouse-hotel-palladia' and locale = 'fr'), 0, 'carrousel', '{"images":[{"src":"/images/blog/ZENTIH-TOULOUSE-2024.jpg","alt":""}]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'zenith-de-toulouse-hotel-palladia' and locale = 'fr'), 1, 'texte', '{"titre":"Nous vous proposons un avantage tarifaire de 10% sur votre nuitée le soir de votre événement","paragraphes":["en renseignant le code : ZENITH24","Lors de votre arrivée, le justificatif de votre billet vous sera demandé."]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'zenith-de-toulouse-hotel-palladia' and locale = 'fr'), 2, 'texte', '{"titre":"Infos Pratiques","paragraphes":["Nous disposons d’un Parking de 300 places gratuit.","Pour se rendre au zénith :","A pieds : 15 minutesEn voiture : 4 minutesTransport en commun : Avec les bus 45 ou L2 (arrêt devant le PALLADIA) ou le tram T1 (Arrêt Purpan)"]}'::jsonb);

-- Soirée Saint Valentin 2025
insert into public.articles (slug, locale, titre, chapo, image_hero, image_vignette, statut, date_publication, seo_description)
values ('saint-valentin-toulouse', 'fr', 'Soirée Saint Valentin 2025', '05 62 120 179 Par Mail', '/images/blog/repas-saint-valentin-toulouse-palladia-scaled.jpg', '/images/blog/repas-saint-valentin-toulouse-palladia-scaled.jpg', 'publie', '2024-01-07 12:04:00', '05 62 120 179 Par Mail')
on conflict (slug, locale) do update set
  titre = excluded.titre, chapo = excluded.chapo, image_hero = excluded.image_hero,
  image_vignette = excluded.image_vignette, date_publication = excluded.date_publication,
  seo_description = excluded.seo_description;

delete from public.article_blocs where article_id = (select id from public.articles where slug = 'saint-valentin-toulouse' and locale = 'fr');

insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'saint-valentin-toulouse' and locale = 'fr'), 0, 'texte', '{"titre":"Fêtez la St-Valentin à Toulouse !","paragraphes":[]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'saint-valentin-toulouse' and locale = 'fr'), 1, 'texte', '{"titre":"Informations à venir","paragraphes":[]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'saint-valentin-toulouse' and locale = 'fr'), 2, 'texte', '{"titre":"Réservation","paragraphes":["05 62 120 179 Par Mail"]}'::jsonb);

-- Séjour en famille "Le Gardien du Temple"
insert into public.articles (slug, locale, titre, chapo, image_hero, image_vignette, statut, date_publication, seo_description)
values ('sejour-en-famille-le-gardien-du-temple', 'fr', 'Séjour en famille "Le Gardien du Temple"', 'Chambre Famille avec petits déjeuners : 119€ /nuit', '/images/blog/gardien-du-temple-toulouse.webp', '/images/blog/gardien-du-temple-toulouse.webp', 'publie', '2023-10-16 09:49:00', 'Chambre Famille avec petits déjeuners : 119€ /nuit')
on conflict (slug, locale) do update set
  titre = excluded.titre, chapo = excluded.chapo, image_hero = excluded.image_hero,
  image_vignette = excluded.image_vignette, date_publication = excluded.date_publication,
  seo_description = excluded.seo_description;

delete from public.article_blocs where article_id = (select id from public.articles where slug = 'sejour-en-famille-le-gardien-du-temple' and locale = 'fr');

insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'sejour-en-famille-le-gardien-du-temple' and locale = 'fr'), 0, 'carrousel', '{"images":[{"src":"/images/blog/gardien-du-temple-toulouse.webp","alt":"Affiche le gardien du temple à Toulouse"},{"src":"/images/blog/banniere-.png","alt":""}]}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'sejour-en-famille-le-gardien-du-temple' and locale = 'fr'), 1, 'texte_image', '{"titre":"Séjour en famille à l’ Hôtel Palladia du 25 octobre au 28 octobre 2024","paragraphes":["Chambre Famille avec petits déjeuners : 119€ /nuit","(2 Petits déjeuners adultes inclus, offert pour les enfants de -12 ans)","Chambre Famille hors petit déjeuner : 99€ /nuit","Toulouse, connue pour ses façades en briques roses qui lui valent son surnom de « Ville Rose », est une ville où l’art et la culture ne cessent de se réinventer. Cette année, un événement unique s''apprête à marquer la ville d''une manière inédite : « Le Gardien du Temple ». Les 25, 26 et 27 octobre, Toulouse se transformera en un immense décor à ciel ouvert pour accueillir cet événement hors du commun. Plongeons ensemble dans cette aventure artistique et découvrez pourquoi vous ne voudrez pas manquer ce rendez-vous."],"image":"/images/blog/P1680987ok.jpg","alt":"","position":"gauche"}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'sejour-en-famille-le-gardien-du-temple' and locale = 'fr'), 2, 'texte_image', '{"titre":"Un spectacle d’envergure à ciel ouvert","paragraphes":["Imaginé par la compagnie de théâtre de rue La Machine, « Le Gardien du Temple » est un événement monumental à la croisée de l’art, de l’histoire et de la technologie. À travers un parcours artistique immersif, des créatures mécaniques géantes, véritables œuvres d''art mouvantes, déambuleront dans les rues de Toulouse. Ces constructions impressionnantes, qui combinent ingénierie et art de rue, invitent les spectateurs à redécouvrir la ville sous un nouvel angle.","Le concept de ce spectacle est simple, mais puissant : faire vivre la ville comme un temple ouvert, où chaque rue, chaque monument devient un élément sacré dans cette mise en scène gigantesque. La Machine est célèbre pour ses créations monumentales, notamment avec « Le Grand Éléphant » de Nantes, et promet une expérience inoubliable."],"image":"/images/blog/P1680591okok.jpg","alt":"","position":"droite"}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'sejour-en-famille-le-gardien-du-temple' and locale = 'fr'), 3, 'texte_image', '{"titre":"Un parcours artistique immersif dans les rues de Toulouse","paragraphes":["Pendant trois jours, Toulouse se transformera en une immense scène de théâtre à ciel ouvert. Le parcours du Gardien du Temple emmènera les spectateurs à travers certains des lieux les plus emblématiques de la ville. De la Place du Capitole à la Basilique Saint-Sernin, en passant par le Quai de la Daurade et le Jardin des Plantes, chaque lieu sera intégré à l’histoire et à la chorégraphie de la créature géante.","Les spectateurs pourront suivre la créature dans ses déplacements, s’arrêter pour admirer les performances de danseurs, de musiciens et d’acrobates qui ponctueront le parcours. Chaque rue deviendra une scène, chaque monument une toile de fond, et chaque spectateur sera invité à participer activement à ce voyage entre rêve et réalité."],"image":"/images/blog/P1680477okok.jpg","alt":"","position":"gauche"}'::jsonb);
insert into public.article_blocs (article_id, ordre, type, contenu)
values ((select id from public.articles where slug = 'sejour-en-famille-le-gardien-du-temple' and locale = 'fr'), 4, 'texte', '{"titre":"Pensez à réserver","paragraphes":[]}'::jsonb);

commit;