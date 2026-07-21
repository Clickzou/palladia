-- ---------------------------------------------------------------------------
-- Article « Comment choisir le meilleur lieu pour organiser un séminaire à
-- Toulouse ? » (/choisir-lieu-seminaire-toulouse/, publié le 10 juin 2026).
--
-- Publié après l'archive de décembre 2025, il ne pouvait pas être importé.
-- Cette migration crée la fiche avec les seules données vérifiables : titre,
-- extrait, slug et position. LE CORPS DE L'ARTICLE RESTE À RÉCUPÉRER, d'où
-- le statut « brouillon » : il n'apparaîtra pas en ligne tant qu'il est vide.
--
-- Pour le publier une fois les blocs ajoutés :
--   update public.articles set statut = 'publie'
--   where slug = 'choisir-lieu-seminaire-toulouse';
--
-- Relançable sans risque.
-- ---------------------------------------------------------------------------

insert into public.articles (
  slug, locale, titre, chapo, image_hero, image_vignette,
  statut, date_publication, position, seo_description
)
values (
  'choisir-lieu-seminaire-toulouse',
  'fr',
  'Comment choisir le meilleur lieu pour organiser un séminaire à Toulouse ?',
  'Découvrez le cadre idéal pour vos séminaires à Toulouse. L Hôtel Palladia offre luxe, confort et services personnalisés pour réussir votre événement.',
  '/images/salons/amphitheatre.jpg',
  '/images/salons/amphitheatre.jpg',
  'brouillon',
  '2026-06-10 13:51:47',
  1,
  'Découvrez le cadre idéal pour vos séminaires à Toulouse. L Hôtel Palladia offre luxe, confort et services personnalisés pour réussir votre événement.'
)
on conflict (slug, locale) do update set
  titre = excluded.titre,
  chapo = excluded.chapo,
  image_hero = excluded.image_hero,
  image_vignette = excluded.image_vignette,
  date_publication = excluded.date_publication,
  position = excluded.position,
  seo_description = excluded.seo_description;
