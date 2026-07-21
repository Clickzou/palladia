-- Correction de l'import : extraits WordPress et ordre d'affichage.
-- Relancable sans risque.

-- Colonne d'ordre manuel : permet de mettre un article en avant sans
-- toucher a sa date de publication.
alter table public.articles add column if not exists position integer;
create index if not exists articles_position_idx on public.articles (locale, position);

begin;

-- 1. Chapo et description SEO repris de l'extrait WordPress
update public.articles set chapo = 'Séjournez à l’Hôtel Palladia, à 10 minutes de l’aéroport de Toulouse. Élégance, confort et services haut de gamme.', seo_description = 'Séjournez à l’Hôtel Palladia, à 10 minutes de l’aéroport de Toulouse. Élégance, confort et services haut de gamme.'
  where slug = 'ou-dormir-proche-aeroport-toulouse' and locale = 'fr';
update public.articles set chapo = 'Rejoignez-nous au Palladia pour un réveillon magique à Toulouse. Savourez notre cuisine exceptionnelle dans une atmosphère élégante et festive.', seo_description = 'Rejoignez-nous au Palladia pour un réveillon magique à Toulouse. Savourez notre cuisine exceptionnelle dans une atmosphère élégante et festive.'
  where slug = 'reveillon-toulouse' and locale = 'fr';
update public.articles set chapo = 'Au Palladia, votre famille profitera d un séjour luxueux à Toulouse. Chambres spacieuses, gastronomie locale et activités pour tous. Détente et découverte.', seo_description = 'Au Palladia, votre famille profitera d un séjour luxueux à Toulouse. Chambres spacieuses, gastronomie locale et activités pour tous. Détente et découverte.'
  where slug = 'sejour-en-famille-a-toulouse-hotel-palladia' and locale = 'fr';
update public.articles set chapo = 'Rejoignez le programme de fidélité de l’Hôtel Palladia et profitez de réductions, cadeaux et avantages exclusifs.', seo_description = 'Rejoignez le programme de fidélité de l’Hôtel Palladia et profitez de réductions, cadeaux et avantages exclusifs.'
  where slug = 'adelya' and locale = 'fr';
update public.articles set chapo = 'À la recherche d’un court séjour ou d’un staycation sans quitter Toulouse ? L''Hôtel Palladia, situé à proximité du centre-ville de Toulouse, est l’endroit idéal.', seo_description = 'À la recherche d’un court séjour ou d’un staycation sans quitter Toulouse ? L''Hôtel Palladia, situé à proximité du centre-ville de Toulouse, est l’endroit idéal.'
  where slug = 'staycation-toulouse' and locale = 'fr';
update public.articles set chapo = 'Découvrez le cadre idéal pour vos séminaires à Toulouse. L Hôtel Palladia offre luxe, confort et services personnalisés pour réussir votre événement.', seo_description = 'Découvrez le cadre idéal pour vos séminaires à Toulouse. L Hôtel Palladia offre luxe, confort et services personnalisés pour réussir votre événement.'
  where slug = 'lhotel-palladia-un-voyage-dans-lexcellence-hoteliere-et-levenementiel-a-toulouse' and locale = 'fr';
update public.articles set chapo = 'Depuis 35 ans, l’Hôtel PALLADIA est une adresse emblématique de Toulouse, un lieu où se conjuguent excellence et savoir-faire dans l’art de l’événementiel.', seo_description = 'Depuis 35 ans, l’Hôtel PALLADIA est une adresse emblématique de Toulouse, un lieu où se conjuguent excellence et savoir-faire dans l’art de l’événementiel.'
  where slug = 'les-temps-forts-de-lhotel-palladia' and locale = 'fr';
update public.articles set chapo = 'Participez à notre dîner "Accord mets & Champagne" le 21 novembre 2024 à Toulouse, avec la Maison DUVAL LEROY.', seo_description = 'Participez à notre dîner "Accord mets & Champagne" le 21 novembre 2024 à Toulouse, avec la Maison DUVAL LEROY.'
  where slug = 'diner-accord-mets-champagne' and locale = 'fr';
update public.articles set chapo = 'Pour vos événements prestigieux, l''Hôtel Palladia vous propose un amphithéâtre rénové de 285 places, équipé d''une régie technique et d''une scène spacieuse.', seo_description = 'Pour vos événements prestigieux, l''Hôtel Palladia vous propose un amphithéâtre rénové de 285 places, équipé d''une régie technique et d''une scène spacieuse.'
  where slug = 'amphitheatre-hotel-palladia-renove' and locale = 'fr';
update public.articles set chapo = 'Le Jardin du Barry à Toulouse est un havre de paix situé près de l''hôtel Palladia.', seo_description = 'Le Jardin du Barry à Toulouse est un havre de paix situé près de l''hôtel Palladia.'
  where slug = 'le-jardin-du-barry-a-toulouse-le-poumon-vert-de-la-cartoucherie' and locale = 'fr';
update public.articles set chapo = 'Rejoignez-nous au Palladia pour des afterworks uniques à Toulouse. Profitez d un cadre 4 étoiles, de boissons créatives et d''une ambiance incomparable.', seo_description = 'Rejoignez-nous au Palladia pour des afterworks uniques à Toulouse. Profitez d un cadre 4 étoiles, de boissons créatives et d''une ambiance incomparable.'
  where slug = 'afterwork-toulouse' and locale = 'fr';
update public.articles set chapo = 'Vivez l humour chic au Cravate Club du Palladia ! Nos soirées combinent spectacle vivant et élégance, offrant une soirée inoubliable.', seo_description = 'Vivez l humour chic au Cravate Club du Palladia ! Nos soirées combinent spectacle vivant et élégance, offrant une soirée inoubliable.'
  where slug = 'theatre-le-grenier-de-toulouse' and locale = 'fr';
update public.articles set chapo = 'Vivez une expérience culinaire et artistique exceptionnelle au Palladia. Dîners gastronomiques accompagnés de spectacles éblouissants.', seo_description = 'Vivez une expérience culinaire et artistique exceptionnelle au Palladia. Dîners gastronomiques accompagnés de spectacles éblouissants.'
  where slug = 'diner-spectacles-toulouse' and locale = 'fr';
update public.articles set chapo = 'Au cœur de Toulouse, l hôtel Palladia 4★ et l Orchestre de chambre fusionnent pour une expérience unique où luxe et harmonie musicale s''entrelacent.', seo_description = 'Au cœur de Toulouse, l hôtel Palladia 4★ et l Orchestre de chambre fusionnent pour une expérience unique où luxe et harmonie musicale s''entrelacent.'
  where slug = 'hotel-palladia-x-orchestre-de-chambre-de-toulouse' and locale = 'fr';
update public.articles set chapo = 'Choisissez l''hôtel Palladia pour un mariage féérique à Toulouse. Service impeccable et cadre luxueux vous attendent pour célébrer votre union en grand.', seo_description = 'Choisissez l''hôtel Palladia pour un mariage féérique à Toulouse. Service impeccable et cadre luxueux vous attendent pour célébrer votre union en grand.'
  where slug = 'mariage-hotel-palladia-toulouse' and locale = 'fr';
update public.articles set chapo = 'Découvrez le cadre idéal pour vos séminaires à Toulouse. L Hôtel Palladia offre luxe, confort et services personnalisés pour réussir votre événement.', seo_description = 'Découvrez le cadre idéal pour vos séminaires à Toulouse. L Hôtel Palladia offre luxe, confort et services personnalisés pour réussir votre événement.'
  where slug = 'seminaire-hotel-palladia-toulouse' and locale = 'fr';
update public.articles set chapo = 'À deux pas du Zénith de Toulouse, l Hôtel Palladia 4 étoiles offre une expérience de luxe inoubliable, parfaite pour les amateurs de concerts et événements.', seo_description = 'À deux pas du Zénith de Toulouse, l Hôtel Palladia 4 étoiles offre une expérience de luxe inoubliable, parfaite pour les amateurs de concerts et événements.'
  where slug = 'zenith-de-toulouse-hotel-palladia' and locale = 'fr';
update public.articles set chapo = 'Offrez une soirée de rêve à votre moitié au Palladia. Dîner gastronomique, décoration féérique et moments inoubliables au cœur de la romance.', seo_description = 'Offrez une soirée de rêve à votre moitié au Palladia. Dîner gastronomique, décoration féérique et moments inoubliables au cœur de la romance.'
  where slug = 'saint-valentin-toulouse' and locale = 'fr';
update public.articles set chapo = 'Inspiré des mythes anciens, le Gardien du Temple, une imposante créature mi-homme mi-robot, déambulera dans Toulouse.', seo_description = 'Inspiré des mythes anciens, le Gardien du Temple, une imposante créature mi-homme mi-robot, déambulera dans Toulouse.'
  where slug = 'sejour-en-famille-le-gardien-du-temple' and locale = 'fr';

-- 2. Ordre d'affichage releve sur le site
update public.articles set position = 2 where slug = 'zenith-de-toulouse-hotel-palladia' and locale = 'fr';
update public.articles set position = 3 where slug = 'saint-valentin-toulouse' and locale = 'fr';
update public.articles set position = 4 where slug = 'reveillon-toulouse' and locale = 'fr';
update public.articles set position = 5 where slug = 'ou-dormir-proche-aeroport-toulouse' and locale = 'fr';
update public.articles set position = 6 where slug = 'diner-spectacles-toulouse' and locale = 'fr';
update public.articles set position = 7 where slug = 'sejour-en-famille-a-toulouse-hotel-palladia' and locale = 'fr';
update public.articles set position = 8 where slug = 'adelya' and locale = 'fr';
update public.articles set position = 9 where slug = 'lhotel-palladia-un-voyage-dans-lexcellence-hoteliere-et-levenementiel-a-toulouse' and locale = 'fr';
update public.articles set position = 10 where slug = 'amphitheatre-hotel-palladia-renove' and locale = 'fr';
update public.articles set position = 11 where slug = 'staycation-toulouse' and locale = 'fr';
update public.articles set position = 12 where slug = 'sejour-en-famille-le-gardien-du-temple' and locale = 'fr';
update public.articles set position = 13 where slug = 'seminaire-hotel-palladia-toulouse' and locale = 'fr';
update public.articles set position = 14 where slug = 'les-temps-forts-de-lhotel-palladia' and locale = 'fr';
update public.articles set position = 15 where slug = 'diner-accord-mets-champagne' and locale = 'fr';
update public.articles set position = 16 where slug = 'le-jardin-du-barry-a-toulouse-le-poumon-vert-de-la-cartoucherie' and locale = 'fr';
update public.articles set position = 17 where slug = 'theatre-le-grenier-de-toulouse' and locale = 'fr';
update public.articles set position = 18 where slug = 'afterwork-toulouse' and locale = 'fr';
update public.articles set position = 19 where slug = 'hotel-palladia-x-orchestre-de-chambre-de-toulouse' and locale = 'fr';
update public.articles set position = 20 where slug = 'mariage-hotel-palladia-toulouse' and locale = 'fr';

commit;