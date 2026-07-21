-- ---------------------------------------------------------------------------
-- Programmation culturelle saison 2026, relevée sur /spectacle-toulouse/.
--
-- Les affiches restent à renseigner (colonne `affiche`) : elles ont été
-- publiées après l'archive de décembre 2025 et n'ont pas pu être récupérées.
-- Une fois les fichiers déposés dans public/images/spectacles/, il suffit de :
--   update public.evenements set affiche = '/images/spectacles/xxx.jpg'
--   where titre = '...';
--
-- Prérequis : 0003_evenements.sql. Relançable sans risque.
-- ---------------------------------------------------------------------------

begin;

insert into public.evenements (titre, sous_titre, categorie, debut, lieu, description)
values
  (
    'Olivier & Max improvisent',
    'Spectacle : 21h00 à l’Amphithéâtre',
    'humour',
    '2026-10-03 21:00+02',
    'Hôtel Palladia – 271 avenue de Grande Bretagne – 31300 Toulouse',
    null
  ),
  (
    'Kevin Micoud — Magicien Mentaliste',
    'Dîner : 19h30 · Spectacle : 21h00 à l’Amphithéâtre',
    'diner_spectacle',
    '2026-11-07 19:30+01',
    'Hôtel Palladia – 271 avenue de Grande Bretagne – 31300 Toulouse',
    'Spectacle « Best Of ». La France a un incroyable talent 2021, America’s Got Talent 2021, Best European Mentalist 2022, Mandrake d’Or.'
  ),
  (
    'Dîner & Spectacle : Gospel Experience',
    'Dîner : 19h30 · Spectacle : 21h00 à l’Amphithéâtre',
    'gospel',
    '2026-11-28 19:30+01',
    'Hôtel Palladia – 271 avenue de Grande Bretagne – 31300 Toulouse',
    'Kathy Boyé — de Chicago à la Nouvelle-Orléans.'
  ),
  (
    'Dîner & Spectacle : Tribute Céline Dion & Jean-Jacques Goldman',
    'Dîner : 19h30 suivi du spectacle au Salon Opéra',
    'diner_spectacle',
    '2026-12-12 19:30+01',
    'Hôtel Palladia – 271 avenue de Grande Bretagne – 31300 Toulouse',
    null
  )
on conflict do nothing;

commit;
