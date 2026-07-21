-- ---------------------------------------------------------------------------
-- Deux types de blocs supplementaires releves sur le site :
--   `equipe` : trombinoscope du service commercial (photo, fonction, contacts)
--   `bouton` : rangee de boutons d'action centres en fin de section
--
-- Note : PostgreSQL interdit d'utiliser une valeur d'enum dans la transaction
-- qui la cree. Executer ce fichier seul, avant tout insert qui s'en sert.
-- ---------------------------------------------------------------------------

alter type public.bloc_type add value if not exists 'equipe';
alter type public.bloc_type add value if not exists 'bouton';
-- Rangee de pictos chiffres (285 places, parking 300 places, salle dediee...)
alter type public.bloc_type add value if not exists 'caracteristiques';
