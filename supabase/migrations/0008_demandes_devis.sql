-- ---------------------------------------------------------------------------
-- Demandes de devis (séminaires, conférences, soirées d'entreprise, mariages).
--
-- Sur WordPress, ces demandes partaient par e-mail via WPForms sans être
-- conservées : aucun historique, aucun suivi. Ici chaque demande est tracée.
--
-- L'insertion est ouverte au public (formulaire anonyme) mais la LECTURE est
-- réservée aux membres authentifiés : personne ne peut consulter les demandes
-- des autres.
-- ---------------------------------------------------------------------------

create type public.devis_type as enum ('salle_reunion', 'mariage', 'evenement_hybride', 'autre');
create type public.devis_statut as enum ('nouveau', 'en_cours', 'traite', 'perdu');

create table public.demandes_devis (
  id            uuid primary key default gen_random_uuid(),
  type          public.devis_type   not null default 'autre',
  statut        public.devis_statut not null default 'nouveau',

  nom           text not null,
  prenom        text not null,
  telephone     text,
  email         text not null,
  entreprise    text,
  budget        text,
  date_evenement text,
  date_flexible boolean not null default true,
  message       text,

  -- Traçabilité minimale, sans donnée superflue
  locale        text not null default 'fr',
  cree_le       timestamptz not null default now()
);

create index demandes_devis_recentes_idx on public.demandes_devis (cree_le desc);
create index demandes_devis_statut_idx on public.demandes_devis (statut, cree_le desc);

alter table public.demandes_devis enable row level security;

-- Le formulaire public peut déposer une demande…
create policy "Depot public d une demande"
  on public.demandes_devis for insert
  to anon, authenticated
  with check (true);

-- …mais seule l'équipe peut les lire et les traiter.
create policy "Lecture reservee aux membres"
  on public.demandes_devis for select
  to authenticated
  using (true);

create policy "Suivi reserve aux membres"
  on public.demandes_devis for update
  to authenticated
  using (true) with check (true);
