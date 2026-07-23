-- ---------------------------------------------------------------------------
-- `reservation_groupe` manque a l'enumeration des types de demande.
--
-- La migration 0009 l'ajoutait deja, mais la base ne la connait pas : elle n'a
-- jamais ete appliquee. Constate le 23 juillet 2026 en essayant le nouveau
-- formulaire de groupe, qui repondait « Votre demande n'a pas pu être
-- enregistrée ». Le devis evenementiel ouvert sur ?type=reservation_groupe
-- echouait de la meme façon, et ce depuis le debut.
--
-- Les cinq autres valeurs — salle_reunion, mariage, evenement_hybride, autre,
-- contact — sont bien en place ; seule celle-ci manquait.
--
-- NE RIEN AJOUTER A CE FICHIER. PostgreSQL refuse d'employer une valeur
-- d'enumeration dans la transaction qui la cree : un INSERT ajoute ici
-- echouerait. Toute suite eventuelle doit passer par une migration distincte.
-- ---------------------------------------------------------------------------

alter type public.devis_type add value if not exists 'reservation_groupe';
