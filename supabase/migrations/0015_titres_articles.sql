-- ---------------------------------------------------------------------------
-- Titres et sous-titres d'article releves sur le site en ligne.
--
-- `titre_page` ne porte que les titres qui different du titre WordPress ;
-- ailleurs il reste nul et l'affichage retombe sur `titre`.
--
-- Genere par scripts/titres-articles.mjs. Relançable sans risque.
-- ---------------------------------------------------------------------------

alter table public.articles add column if not exists titre_page text;

update public.articles set titre_page = 'Soirée Saint-Valentin 2026', sous_titre = 'Fêtez la St-Valentin à Toulouse !'
  where slug = 'saint-valentin-toulouse' and locale = 'fr';

update public.articles set titre_page = 'Dîner Réveillon à Toulouse', sous_titre = 'Fêtez le nouvel an à Toulouse à l''hôtel Palladia !'
  where slug = 'reveillon-toulouse' and locale = 'fr';

update public.articles set titre_page = 'Où dormir près de l’aéroport de Toulouse ?', sous_titre = 'Pourquoi choisir l’Hôtel Palladia ?'
  where slug = 'ou-dormir-proche-aeroport-toulouse' and locale = 'fr';

update public.articles set titre_page = 'Dîners & Spectacle', sous_titre = 'Partagez un moment convivial a l'' Hôtel Palladia'
  where slug = 'diner-spectacles-toulouse' and locale = 'fr';

update public.articles set titre_page = 'Séjour en famille à Toulouse Hôtel Palladia', sous_titre = 'Cet été venez en famille à l’Hôtel Palladia !'
  where slug = 'sejour-en-famille-a-toulouse-hotel-palladia' and locale = 'fr';

update public.articles set titre_page = 'Carte de fidélité : bénéficiez de réductions exclusives à l’Hôtel Palladia', sous_titre = 'Qu’est-ce que la carte de fidélité Adelya ?'
  where slug = 'adelya' and locale = 'fr';

update public.articles set titre_page = 'L’Hôtel Palladia : Un Voyage dans l''Excellence Hôtelière et l''Événementiel à Toulouse', sous_titre = 'Aquarelle de Rémy Peyranne'
  where slug = 'lhotel-palladia-un-voyage-dans-lexcellence-hoteliere-et-levenementiel-a-toulouse' and locale = 'fr';

update public.articles set titre_page = null, sous_titre = 'Capacité d''accueil de 285 participants'
  where slug = 'amphitheatre-hotel-palladia-renove' and locale = 'fr';

update public.articles set titre_page = 'Offre Staycation à l''Hôtel Palladia Toulouse ****', sous_titre = 'Découvrez notre offre exclusive de staycation à Toulouse'
  where slug = 'staycation-toulouse' and locale = 'fr';

update public.articles set titre_page = 'Séjour en famille lors de l''événement "le gardien du temple"', sous_titre = '« Le Gardien du Temple » s’ invite dans la ville rose le 25-26-27 octobre 2024'
  where slug = 'sejour-en-famille-le-gardien-du-temple' and locale = 'fr';

update public.articles set titre_page = 'Votre hôtel Séminaire à toulouse', sous_titre = 'Pour vos séminaires et conférences à Toulouse'
  where slug = 'seminaire-hotel-palladia-toulouse' and locale = 'fr';

update public.articles set titre_page = null, sous_titre = 'événements privés et professionnels'
  where slug = 'les-temps-forts-de-lhotel-palladia' and locale = 'fr';

update public.articles set titre_page = null, sous_titre = 'Jeudi 21 Novembre 2024 au Restaurant PALLADIA'
  where slug = 'diner-accord-mets-champagne' and locale = 'fr';

update public.articles set titre_page = null, sous_titre = 'Un espace vert à proximité de l''Hôtel Palladia'
  where slug = 'le-jardin-du-barry-a-toulouse-le-poumon-vert-de-la-cartoucherie' and locale = 'fr';

update public.articles set titre_page = 'Cravate club - Le grenier de Toulouse', sous_titre = 'De Fabrice-Roger LACAN • Mise scène Laurence ROY'
  where slug = 'theatre-le-grenier-de-toulouse' and locale = 'fr';

update public.articles set titre_page = null, sous_titre = 'Le meilleur de l’afterwork au Palladia Toulouse'
  where slug = 'afterwork-toulouse' and locale = 'fr';

update public.articles set titre_page = 'Hôtel Palladia et l’Orchestre de chambre de Toulouse', sous_titre = 'L’Hôtel PALLADIA a le plaisir de recevoir l’Orchestre de Chambre de Toulouse'
  where slug = 'hotel-palladia-x-orchestre-de-chambre-de-toulouse' and locale = 'fr';

update public.articles set titre_page = null, sous_titre = 'Mariages à Toulouse'
  where slug = 'mariage-hotel-palladia-toulouse' and locale = 'fr';
