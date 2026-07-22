-- La page Contact depose ses messages dans la meme table que les demandes de
-- devis : meme traitement, meme suivi, un seul endroit ou regarder. Elle a
-- toutefois son propre type, pour que l'equipe distingue une question generale
-- d'une demande commerciale — et ses messages partent a info@, pas au service
-- commercial.

alter type public.devis_type add value if not exists 'contact';
