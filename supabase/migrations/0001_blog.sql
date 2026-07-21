-- ---------------------------------------------------------------------------
-- Blog de l'Hôtel Palladia
--
-- Un article = une ligne dans `articles` + N blocs ordonnés dans `article_blocs`.
-- Le découpage en blocs reproduit la souplesse d'Elementor (colonnes, cartes,
-- bandeaux, carrousels) sans dépendre de WordPress.
--
-- Les URLs des articles sont à la racine (/zenith-de-toulouse-hotel-palladia/),
-- comme sur le site WordPress : le slug est donc unique par langue.
-- ---------------------------------------------------------------------------

create type public.article_statut as enum ('brouillon', 'publie', 'archive');

create type public.bloc_type as enum (
  'texte',          -- paragraphes et listes, pleine largeur
  'texte_image',    -- deux colonnes : texte + visuel (position au choix)
  'cartes',         -- 2 à 4 cartes titrées côte à côte
  'bandeau',        -- bandeau doré pleine largeur (code promo, accroche)
  'bandeau_image',  -- bandeau avec image de fond et boutons
  'carrousel',      -- galerie défilante
  'liste_cochee',   -- liste à coches centrée
  'citation'
);

create table public.articles (
  id              uuid primary key default gen_random_uuid(),
  slug            text        not null,
  locale          text        not null default 'fr' check (locale in ('fr', 'en', 'es')),
  titre           text        not null,
  sous_titre      text,
  chapo           text,
  image_hero      text,
  image_vignette  text,
  statut          public.article_statut not null default 'brouillon',
  date_publication timestamptz not null default now(),
  seo_title       text,
  seo_description text,
  -- Rattache les traductions d'un même article entre elles
  groupe_id       uuid        not null default gen_random_uuid(),
  cree_le         timestamptz not null default now(),
  modifie_le      timestamptz not null default now(),

  constraint articles_slug_locale_unique unique (slug, locale)
);

create table public.article_blocs (
  id         uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.articles (id) on delete cascade,
  ordre      integer not null,
  type       public.bloc_type not null,
  contenu    jsonb not null default '{}'::jsonb,

  constraint article_blocs_ordre_unique unique (article_id, ordre)
);

create index articles_publies_idx
  on public.articles (locale, date_publication desc)
  where statut = 'publie';

create index article_blocs_article_idx on public.article_blocs (article_id, ordre);

-- Tient `modifie_le` à jour automatiquement
create or replace function public.touch_modifie_le()
returns trigger
language plpgsql
as $$
begin
  new.modifie_le = now();
  return new;
end;
$$;

create trigger articles_touch
  before update on public.articles
  for each row execute function public.touch_modifie_le();

-- ---------------------------------------------------------------------------
-- Sécurité : lecture publique des seuls articles publiés, écriture réservée
-- aux utilisateurs authentifiés (équipe de l'hôtel).
-- ---------------------------------------------------------------------------
alter table public.articles      enable row level security;
alter table public.article_blocs enable row level security;

create policy "Articles publiés visibles par tous"
  on public.articles for select
  using (statut = 'publie');

create policy "Rédaction réservée aux membres"
  on public.articles for all
  to authenticated
  using (true) with check (true);

create policy "Blocs des articles publiés visibles par tous"
  on public.article_blocs for select
  using (
    exists (
      select 1 from public.articles a
      where a.id = article_blocs.article_id and a.statut = 'publie'
    )
  );

create policy "Blocs modifiables par les membres"
  on public.article_blocs for all
  to authenticated
  using (true) with check (true);
