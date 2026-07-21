-- ---------------------------------------------------------------------------
-- L'article « Séminaire Hôtel Palladia Toulouse » n'existe plus en ligne :
-- le site renvoie une redirection 301 vers /seminaire-evenement-professionnel/.
--
-- Son contenu a ete repris dans la page Seminaire. Le laisser publie ferait
-- du contenu duplique et divergerait du site. On le depublie ; la v2 sert la
-- meme redirection 301 (voir next.config.ts).
--
-- Relançable sans risque.
-- ---------------------------------------------------------------------------

update public.articles
set statut = 'brouillon'
where slug = 'seminaire-hotel-palladia-toulouse';
