-- ---------------------------------------------------------------------------
-- Programmation des spectacles et dîners-spectacles.
--
-- Sur le site WordPress, l'affiche était figée dans la page : en juillet 2026
-- elle annonçait encore des dates de 2025. Ici la date fait foi — les vues
-- `evenements_a_venir` / `evenements_passes` trient automatiquement.
-- ---------------------------------------------------------------------------

create type public.evenement_categorie as enum (
  'humour', 'theatre', 'concert', 'musique_classique', 'gospel', 'diner_spectacle', 'autre'
);

create table public.evenements (
  id            uuid primary key default gen_random_uuid(),
  titre         text        not null,
  sous_titre    text,
  categorie     public.evenement_categorie not null default 'autre',
  affiche       text,                    -- visuel de l'affiche
  affiche_alt   text,
  debut         timestamptz not null,    -- date et heure de représentation
  lieu          text default 'Hôtel Palladia',
  tarif         text,                    -- libre : « 65 € par personne », « sur devis »
  description   text,
  lien_billetterie text,
  publie        boolean     not null default true,
  cree_le       timestamptz not null default now()
);

create index evenements_debut_idx on public.evenements (debut desc) where publie;

-- Prochaines dates, de la plus proche à la plus lointaine
create view public.evenements_a_venir as
  select * from public.evenements
  where publie and debut >= now()
  order by debut asc;

-- Archives, de la plus récente à la plus ancienne
create view public.evenements_passes as
  select * from public.evenements
  where publie and debut < now()
  order by debut desc;

alter table public.evenements enable row level security;

create policy "Evenements publies visibles par tous"
  on public.evenements for select
  using (publie);

create policy "Programmation modifiable par les membres"
  on public.evenements for all
  to authenticated
  using (true) with check (true);

-- ---------------------------------------------------------------------------
-- Programmation reprise du site (saison 2025). Ces dates etant passees, elles
-- basculent automatiquement dans les archives : la page n'affichera plus
-- d'affiche perimee.
-- ---------------------------------------------------------------------------
insert into public.evenements (titre, categorie, debut, tarif) values
  ('Tomy Vay — J''adore vous détester',            'humour',            '2025-10-18 21:00+02', null),
  ('Théâtre — « Toulousain 2 »',                   'theatre',           '2025-11-15 19:30+01', null),
  ('Concert de musique classique — Le Tango et l''Amor', 'musique_classique', '2025-11-28 19:30+01', null),
  ('Concert des Golden Gospel Singers',            'gospel',            '2025-12-06 19:30+01', null);
