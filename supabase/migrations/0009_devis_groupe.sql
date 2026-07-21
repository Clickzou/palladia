-- ---------------------------------------------------------------------------
-- Nouveau type de demande : reservation de groupe (bouton de la page Chambres).
--
-- Note : PostgreSQL interdit d'utiliser une valeur d'enum dans la transaction
-- qui la cree. Executer ce fichier seul.
-- ---------------------------------------------------------------------------

alter type public.devis_type add value if not exists 'reservation_groupe';
