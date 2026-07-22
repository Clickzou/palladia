-- ---------------------------------------------------------------------------
-- Menus du restaurant, modifiables sans deploiement.
--
-- Le menu de la semaine et le menu du jour changent chaque semaine : les
-- laisser dans src/data/restaurant.ts imposait une mise en ligne a chaque
-- changement. Ils vivent desormais ici, et l'hotel les modifie depuis /admin.
--
-- Les traductions sont stockees a cote du français : produites
-- automatiquement a la publication, puis corrigeables a la main. Le
-- dictionnaire du site ne peut pas les prendre en charge — il est ecrit une
-- fois pour toutes, la ou ce contenu change toutes les semaines.
-- ---------------------------------------------------------------------------

create table public.menus (
  cle          text primary key check (cle in ('semaine', 'jour')),
  fr           jsonb not null,
  en           jsonb,
  es           jsonb,
  modifie_le   timestamptz not null default now(),
  modifie_par  uuid references auth.users (id) on delete set null
);

comment on table public.menus is
  'Menus du restaurant. `fr` fait foi ; `en` et `es` peuvent etre nuls, la page retombe alors sur le français.';

alter table public.menus enable row level security;

-- Lecture ouverte : ces menus s'affichent sur le site public.
create policy "menus lisibles par tous"
  on public.menus for select
  using (true);

-- Ecriture reservee aux comptes authentifies. Les inscriptions publiques
-- doivent rester fermees dans Supabase (Authentication > Sign In / Providers),
-- sans quoi n'importe qui pourrait se creer un compte et modifier la carte.
create policy "menus modifiables par les comptes autorises"
  on public.menus for update
  to authenticated
  using (true)
  with check (true);

-- `modifie_le` suit chaque enregistrement sans que le formulaire ait a y penser.
create or replace function public.menus_touche()
returns trigger
language plpgsql
as $$
begin
  new.modifie_le := now();
  return new;
end;
$$;

create trigger menus_touche_avant_update
  before update on public.menus
  for each row execute function public.menus_touche();

-- Etat actuel du site, repris tel quel : la page ne changera pas d'aspect.
insert into public.menus (cle, fr) values
('semaine', $json$
{
  "titre": "Menu de la semaine",
  "sections": [
    {
      "titre": "Entrée",
      "choix": [
        "Hareng à l’huile,\nsalade de pommes de terre et pickles",
        "Tartare de boeuf, sauce aux huîtres,\npak-choï et shimeji"
      ]
    },
    {
      "titre": "Plat",
      "choix": [
        "Poisson du jour, conchiglioni farcis à la\npiperade et sabayon au kalamansi",
        "Cochon grillé, purée de petits pois parfumée\nà la menthe et radis rôtis"
      ]
    },
    {
      "titre": "Dessert",
      "choix": [
        "Comme un chocolat frappé et mousse de lait",
        "Fraîcheur de pamplemousse, fraises et meringue",
        "Assiette de fromages du chef"
      ]
    }
  ],
  "note": "Nos préparations dépendent du marché. Il se peut que certains plats puissent varier, nous vous remercions de votre compréhension."
}
$json$::jsonb),
('jour', $json$
{
  "titre": "Menu du jour",
  "sousTitre": "Midi & soir",
  "intro": "2 formules au choix :",
  "formules": [
    { "prix": "25 €", "detail": "(entrée + plat **ou** plat + dessert)" },
    { "prix": "30 €", "detail": "(entrée + plat + dessert)" }
  ],
  "tarifsTitre": "Tarifs des plats hors suppléments :",
  "tarifs": ["Entrées : 12 €", "plats : 22 €", "Desserts : 10 €"],
  "enfant": {
    "titre": "Menu Moussaillon",
    "prix": "12 €",
    "detail": "Plat + dessert + boisson"
  }
}
$json$::jsonb);
