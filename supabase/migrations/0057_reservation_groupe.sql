-- ---------------------------------------------------------------------------
-- Reservations de groupe : ce qu'une demande de sejour a de particulier.
--
-- Le formulaire de devis evenementiel demandait un budget et une date unique,
-- « flexible » ou non. Une reservation de groupe, elle, se decrit autrement :
-- combien de personnes, et entre quelles dates. L'hotel ne pouvait pas repondre
-- sans rappeler le client pour obtenir ces trois informations.
--
-- Colonnes facultatives : les autres types de demande ne les remplissent pas.
-- ---------------------------------------------------------------------------

alter table public.demandes_devis
  add column if not exists nb_personnes  integer,
  add column if not exists date_arrivee  date,
  add column if not exists date_depart   date;

comment on column public.demandes_devis.nb_personnes is
  'Reservations de groupe : nombre de personnes annonce.';
comment on column public.demandes_devis.date_arrivee is
  'Reservations de groupe : premiere nuit.';
comment on column public.demandes_devis.date_depart is
  'Reservations de groupe : depart. Toujours posterieur a date_arrivee.';

-- Un sejour qui se termine avant d'avoir commence n'existe pas. La contrainte
-- ne regarde que les demandes qui portent les deux dates.
alter table public.demandes_devis
  add constraint demandes_devis_sejour_coherent
  check (date_depart is null or date_arrivee is null or date_depart > date_arrivee);
