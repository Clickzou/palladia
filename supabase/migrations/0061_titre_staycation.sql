-- ---------------------------------------------------------------------------
-- Le titre affiché en tête de l'article staycation se terminait par « **** ».
--
-- Les quatre astérisques figuraient le classement de l'hôtel sur le site
-- WordPress. Le titre de page n'est pas passé par le balisage léger des
-- textes — il ne l'a jamais été, et le mettre en gras n'aurait aucun sens
-- ici — les astérisques s'affichaient donc telles quelles dans le h1.
--
-- `titre` n'est pas touché : il porte « L'Escapade Parfaite pour un
-- Staycation », qui s'affiche dans le fil d'Ariane et les vignettes.
--
-- Les versions anglaise et espagnole du titre sont dans
-- messages/contenu.en.json et messages/contenu.es.json.
--
-- Relançable sans risque.
-- ---------------------------------------------------------------------------

update articles
set titre_page = 'Offre Staycation à l''Hôtel Palladia Toulouse 4 étoiles'
where slug = 'staycation-toulouse'
  and titre_page = 'Offre Staycation à l''Hôtel Palladia Toulouse ****';
