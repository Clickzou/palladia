-- ---------------------------------------------------------------------------
-- Menus par versions datees : brouillon, publication immediate, programmation.
--
-- La table `menus` ne gardait qu'un etat, celui affiche sur le site : tout
-- enregistrement etait donc une publication, et l'hotel ne pouvait ni preparer
-- une carte a l'avance, ni relire une traduction avant de la montrer.
--
-- Une version porte sa date d'effet. La page publique affiche la plus recente
-- dont la date est passee — c'est la lecture qui choisit, donc aucune tache
-- planifiee ne peut « oublier » de publier. L'historique vient avec, et le
-- retour en arriere consiste a republier une ancienne version.
-- ---------------------------------------------------------------------------

create table public.menus_versions (
  id           uuid primary key default gen_random_uuid(),
  cle          text not null check (cle in ('semaine', 'jour')),
  fr           jsonb not null,
  en           jsonb,
  es           jsonb,
  -- null = brouillon ; une date passee = en ligne ; une date future = programme
  publie_le    timestamptz,
  cree_le      timestamptz not null default now(),
  modifie_le   timestamptz not null default now(),
  modifie_par  uuid references auth.users (id) on delete set null
);

comment on column public.menus_versions.publie_le is
  'null = brouillon. Sinon date d''effet : la page sert la version la plus recente deja effective.';

-- Un seul brouillon par menu : deux brouillons concurrents laisseraient
-- l'interface choisir au hasard lequel reprendre.
create unique index menus_versions_brouillon_unique
  on public.menus_versions (cle)
  where publie_le is null;

-- La lecture publique cherche toujours la derniere version effective.
create index menus_versions_effectives_idx
  on public.menus_versions (cle, publie_le desc)
  where publie_le is not null;

alter table public.menus_versions enable row level security;

-- Le public ne voit que ce qui est effectivement en ligne : ni les brouillons,
-- ni la carte programmee pour la semaine prochaine.
create policy "versions publiees lisibles par tous"
  on public.menus_versions for select
  to anon
  using (publie_le is not null and publie_le <= now());

-- L'hotel voit tout, et lui seul ecrit.
create policy "versions gerees par les comptes autorises"
  on public.menus_versions for all
  to authenticated
  using (true)
  with check (true);

create or replace function public.menus_versions_touche()
returns trigger
language plpgsql
as $$
begin
  new.modifie_le := now();
  return new;
end;
$$;

create trigger menus_versions_touche_avant_update
  before update on public.menus_versions
  for each row execute function public.menus_versions_touche();

-- Reprise de l'etat en ligne comme premiere version effective.
insert into public.menus_versions (cle, fr, en, es, publie_le)
select cle, fr, en, es, now() from public.menus;

-- Plus de seconde source de verite : la table d'origine disparait. Son contenu
-- vient d'etre repris ci-dessus, et sauvegardes/menus-2026-07-22.sql en garde
-- une copie hors base.
drop table public.menus;
