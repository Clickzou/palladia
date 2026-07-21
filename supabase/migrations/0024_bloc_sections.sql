-- ---------------------------------------------------------------------------
-- Nouveau type de bloc : `sections`.
--
-- Regroupe plusieurs sous-sections titrees sous un meme intitule (avantages
-- d'une offre, formules, points d'interet). A jouer SEUL : PostgreSQL refuse
-- d'employer une valeur d'enum ajoutee dans la meme transaction.
--
-- Relançable sans risque.
-- ---------------------------------------------------------------------------

alter type public.bloc_type add value if not exists 'sections';
