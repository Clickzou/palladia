-- ---------------------------------------------------------------------------
-- Offres d'hebergement, avec periode d'affichage.
--
-- ATTENTION — CETTE MIGRATION EST A COLLER DANS L'EDITEUR SQL SUPABASE :
-- https://supabase.com/dashboard/project/ezylouomkirodnhmnqyo/sql/new
-- Elle contient du DDL (create table, create view), que PostgREST ne sait pas
-- executer. Tant qu'elle n'est pas jouee, le site continue de fonctionner : il
-- retombe sur src/data/offres-saison.ts, qui sert de pont (voir plus bas).
--
-- Pourquoi cette table
-- -------------------
-- Les offres vivaient en dur dans src/data/offres-saison.ts, sans date. Le
-- commentaire en tete de ce fichier signalait deja le risque, herite de
-- WordPress : « offre famille 2025 encore en ligne en 2026 ». Le defaut s'est
-- effectivement reproduit dans la v2 — l'article « Sejour en famille » a
-- affiche l'affiche ete 2025 et son prix jusqu'en septembre 2026.
--
-- Ici la date fait foi, comme pour `evenements` (0003) : la vue
-- `offres_en_cours` ne remonte que ce qui est dans sa fenetre d'affichage.
-- Une offre perimee disparait toute seule, sans que personne ait a y penser.
--
-- `visible_du` / `visible_au` sont la PERIODE D'AFFICHAGE sur le site, et non
-- les dates de sejour : une offre d'automne s'annonce des septembre. Les dates
-- de sejour restent dans `conditions`, en texte libre, comme aujourd'hui.
-- ---------------------------------------------------------------------------

create table public.offres (
  id           uuid primary key default gen_random_uuid(),
  slug         text        not null unique,
  titre        text        not null,
  -- Libre : « À partir de 218 € », « −20 % sur votre chambre »…
  prix         text,
  paragraphes  text[]      not null default '{}',
  conditions   text,
  inclus       text[]      not null default '{}',
  affiche      text,
  affiche_alt  text,
  -- Fenetre d'affichage sur le site, bornes comprises.
  visible_du   date        not null,
  visible_au   date        not null,
  -- Ordre d'affichage ; null = classement par date de debut.
  position     int,
  publie       boolean     not null default true,
  cree_le      timestamptz not null default now(),
  constraint offres_periode_coherente check (visible_au >= visible_du)
);

create index offres_periode_idx on public.offres (visible_du, visible_au) where publie;

-- Offres affichables aujourd'hui. `current_date` est evalue a chaque requete :
-- aucune tache planifiee n'est necessaire pour retirer une offre echue.
create view public.offres_en_cours as
  select * from public.offres
  where publie and current_date between visible_du and visible_au
  order by position nulls last, visible_du;

alter table public.offres enable row level security;

create policy "Offres publiees visibles par tous"
  on public.offres for select
  using (publie);

create policy "Offres modifiables par les membres"
  on public.offres for all
  to authenticated
  using (true) with check (true);

-- ---------------------------------------------------------------------------
-- Les trois offres d'automne 2026, reprises telles quelles de
-- src/data/offres-saison.ts.
--
-- Les sejours courent du 16 octobre au 2 novembre 2026, mais les offres
-- s'annoncent des le 1er septembre : d'ou une fenetre d'affichage plus large
-- que la periode de sejour. Elles s'effaceront du site le 3 novembre 2026.
--
-- L'offre Zenith, elle, ne depend pas d'une saison mais du calendrier du
-- Zenith : sa fenetre court jusqu'a la fin 2026, a prolonger quand l'hotel
-- reconduira le code promotionnel.
-- ---------------------------------------------------------------------------
insert into public.offres (
  slug, titre, prix, paragraphes, conditions, inclus, affiche, affiche_alt,
  visible_du, visible_au, position
) values
  (
    'sejour-famille',
    'Séjour en famille',
    'À partir de 218 €',
    array[
      'Profitez d’un séjour en famille dans le confort d’un hôtel 4 étoiles à Toulouse. Grâce à deux chambres communicantes en catégorie supérieure, parents et enfants bénéficient d’un espace adapté pour partager des moments privilégiés tout en conservant leur intimité. Les petits-déjeuners buffet inclus permettent de démarrer la journée en toute sérénité avant de partir à la découverte de Toulouse et de ses nombreux sites touristiques.'
    ],
    'Pour vos séjours du vendredi 16 octobre 2026 au lundi 2 novembre 2026. Sous réserve de disponibilités.',
    array[
      '2 chambres communicantes en catégorie supérieure',
      '2 adultes & 2 enfants (jusqu’à 16 ans)',
      '4 petits-déjeuners buffet inclus'
    ],
    '/images/sejour-en-famille-palladia.jpg',
    'Affiche de l’offre séjour en famille automne 2026',
    '2026-09-01', '2026-11-02', 1
  ),
  (
    'sejour-automne',
    'Séjour automne',
    'À partir de 120 €',
    array[
      'Pour un week-end ou une étape automnale à Toulouse, profitez d’une nuit en chambre Confort avec petit-déjeuner buffet offert. Cette offre inclut également un départ tardif jusqu’à 14h00 afin de prolonger votre séjour en toute tranquillité.',
      'Une formule idéale pour découvrir Toulouse, ses monuments, ses restaurants et son patrimoine culturel.'
    ],
    'Offre valable sur réservation, pour vos séjours du vendredi 16 octobre 2026 au lundi 2 novembre 2026. Sous réserve de disponibilités.',
    array[
      '1 nuit en chambre Confort (jusqu’à 2 personnes)',
      'Petit-déjeuner buffet offert',
      'Départ tardif jusqu’à 14h00'
    ],
    '/images/sejour-automne-palladia.jpg',
    'Affiche de l’offre séjour automne à 120 €',
    '2026-09-01', '2026-11-02', 2
  ),
  (
    'special-zenith',
    'Spécial Zénith',
    '−20 % sur votre chambre la nuit du spectacle',
    array[
      'Situé à proximité immédiate du Zénith de Toulouse, l’Hôtel Palladia est l’adresse idéale pour profiter pleinement de vos concerts, spectacles et événements. Après votre soirée, retrouvez le confort d’une chambre spacieuse, un environnement calme et un parking gratuit. Grâce au code promotionnel ZENITH2026, bénéficiez de 20 % de réduction sur votre chambre les soirs de spectacle au Zénith de Toulouse.'
    ],
    'Offre valable uniquement les soirs de spectacle au Zénith de Toulouse, sur présentation d’un justificatif. Sous réserve de disponibilités.',
    array[
      'Idéalement situé à proximité du Zénith (15 minutes à pied et 4 minutes en voiture)',
      'Chambres tout confort',
      'Calme & détente',
      'Parking gratuit'
    ],
    '/images/offres/zenith.jpg',
    'Affiche de l’offre spéciale Zénith, code ZENITH2026',
    '2026-09-01', '2026-12-31', 3
  );

-- ---------------------------------------------------------------------------
-- Une fois cette migration jouee, src/data/offres-saison.ts ne sert plus qu'a
-- deux choses : les textes permanents de la page (« Pourquoi reserver en
-- direct ? », coordonnees, bandeau photo) et le repli tant que la table
-- n'existe pas. Le tableau `offres` qu'il contient peut alors etre supprime.
-- ---------------------------------------------------------------------------
