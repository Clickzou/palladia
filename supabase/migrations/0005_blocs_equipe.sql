-- ---------------------------------------------------------------------------
-- Correction d'import : trombinoscopes du service commercial.
--
-- Trois articles présentent l'équipe commerciale. À l'import, le bloc s'est
-- décomposé en un bloc `texte` (noms, téléphones et e-mails en vrac) suivi
-- d'un `carrousel` de portraits détachés de leurs légendes.
-- On les remplace par un bloc `equipe` qui réassocie photo, fonction et contacts.
--
-- Prérequis : 0004_blocs_equipe_bouton.sql doit avoir été exécuté.
-- Relançable sans risque.
-- ---------------------------------------------------------------------------

begin;

-- --- 1. Un Voyage dans l'Excellence Hôtelière (blocs 1 et 2) ---
delete from public.article_blocs
where article_id = (
  select id from public.articles
  where slug = 'lhotel-palladia-un-voyage-dans-lexcellence-hoteliere-et-levenementiel-a-toulouse'
    and locale = 'fr'
) and ordre in (1, 2);

insert into public.article_blocs (article_id, ordre, type, contenu)
values (
  (select id from public.articles
   where slug = 'lhotel-palladia-un-voyage-dans-lexcellence-hoteliere-et-levenementiel-a-toulouse'
     and locale = 'fr'),
  1, 'equipe',
  '{
    "intro": "Pour recevoir notre brochure séminaire ou toute demande d''information, nous vous invitons à contacter notre service commercial",
    "adresse": ["Hôtel Palladia", "271 Avenue de Grande Bretagne – Toulouse"],
    "membres": [
      {"nom": "Fred Klasinski", "fonction": "Responsable des ventes", "photo": "/images/blog/Fred-Klasinski.jpg", "telephone": "07 70 21 44 75", "email": "f.klasinski@hotelpalladia.com"},
      {"nom": "Laure Avérous", "fonction": "Commerciale", "photo": "/images/blog/laure-averous-commerciale-hotel-palladia.jpg", "telephone": "05 62 120 136", "email": "l.averous@hotelpalladia.com"},
      {"nom": "Pauline Duffort", "fonction": "Commerciale", "photo": "/images/blog/pauline-duffort-commerciale-hotel-palladia.jpg", "telephone": "05 62 120 134", "email": "p.duffort@hotelpalladia.com"}
    ]
  }'::jsonb
);

-- --- 2. Séminaire Hôtel Palladia Toulouse (blocs 1 et 2) ---
delete from public.article_blocs
where article_id = (
  select id from public.articles where slug = 'seminaire-hotel-palladia-toulouse' and locale = 'fr'
) and ordre in (1, 2);

insert into public.article_blocs (article_id, ordre, type, contenu)
values (
  (select id from public.articles where slug = 'seminaire-hotel-palladia-toulouse' and locale = 'fr'),
  1, 'equipe',
  '{
    "intro": "Pour recevoir notre brochure séminaire ou toute demande d''information, nous vous invitons à contacter notre service commercial",
    "adresse": ["Hôtel Palladia", "271 Avenue de Grande Bretagne – Toulouse"],
    "membres": [
      {"nom": "Fred Klasinski", "fonction": "Responsable des ventes", "photo": "/images/blog/Fred-Klasinski.jpg", "telephone": "07 70 21 44 75", "email": "f.klasinski@hotelpalladia.com"},
      {"nom": "Laure Avérous", "fonction": "Responsable des ventes", "photo": "/images/blog/laure-averous-commerciale-hotel-palladia.jpg", "telephone": "05 62 120 136", "email": "l.averous@hotelpalladia.com"},
      {"nom": "Pauline Duffort", "fonction": "Responsable des ventes", "photo": "/images/blog/pauline-duffort-commerciale-hotel-palladia.jpg", "telephone": "05 62 120 134", "email": "p.duffort@hotelpalladia.com"}
    ]
  }'::jsonb
);

-- --- 3. Mariage Hôtel Palladia Toulouse (blocs 3 et 4) ---
delete from public.article_blocs
where article_id = (
  select id from public.articles where slug = 'mariage-hotel-palladia-toulouse' and locale = 'fr'
) and ordre in (3, 4);

insert into public.article_blocs (article_id, ordre, type, contenu)
values (
  (select id from public.articles where slug = 'mariage-hotel-palladia-toulouse' and locale = 'fr'),
  3, 'equipe',
  '{
    "intro": "Pour toute demande de devis pour un mariage",
    "adresse": ["Hôtel Palladia", "271 Avenue de Grande Bretagne – Toulouse"],
    "membres": [
      {"nom": "Laure Avérous", "fonction": "Responsable des ventes", "photo": "/images/blog/laure-averous-commerciale-hotel-palladia.jpg", "telephone": "05 62 120 136", "email": "l.averous@hotelpalladia.com"},
      {"nom": "Pauline Duffort", "fonction": "Responsable des ventes", "photo": "/images/blog/pauline-duffort-commerciale-hotel-palladia.jpg", "telephone": "05 62 120 134", "email": "p.duffort@hotelpalladia.com"}
    ]
  }'::jsonb
);

-- Bouton de demande de devis, absent de l'import (les boutons Elementor ne sont
-- pas stockés dans le contenu de l'article).
insert into public.article_blocs (article_id, ordre, type, contenu)
values (
  (select id from public.articles where slug = 'mariage-hotel-palladia-toulouse' and locale = 'fr'),
  4, 'bouton',
  '{"boutons": [{"label": "Demandez un devis", "href": "/devis"}]}'::jsonb
)
on conflict (article_id, ordre) do update set type = excluded.type, contenu = excluded.contenu;

commit;
