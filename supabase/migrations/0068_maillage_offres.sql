-- ---------------------------------------------------------------------------
-- Liens entrants vers /offres-hebergement-toulouse.
--
-- La page n'avait aucun lien entrant hors menu principal : Google jauge
-- l'importance d'une page a ses liens internes, le signal etait nul. Personne
-- ne l'avait liee parce qu'elle porte du contenu saisonnier — mais l'URL, elle,
-- est permanente. Les ancres sont donc neutres en saison (« offres dediees »,
-- « nos offres ») et non « nos offres d'automne », qui serait faux en janvier.
--
-- Le renvoi depuis /chambres est pose dans src/data/rooms.ts, et l'article
-- « Sejour en famille » y renvoie par ses boutons (voir 0067).
--
-- Relançable sans risque : une fois le lien pose, l'expression nue n'existe
-- plus et le remplacement ne trouve rien.
-- ---------------------------------------------------------------------------

-- zenith-de-toulouse-hotel-palladia — bloc 4
update public.article_blocs b
set contenu = replace(b.contenu::text, 'L’établissement propose régulièrement des offres dédiées avec des avantages tarifaires pour les spectateurs du Zénith.', 'L’établissement propose régulièrement des [offres dédiées avec des avantages tarifaires](/offres-hebergement-toulouse) pour les spectateurs du Zénith.')::jsonb
from public.articles a
where a.id = b.article_id and a.slug = 'zenith-de-toulouse-hotel-palladia' and b.ordre = 4;

-- staycation-toulouse — bloc 0
update public.article_blocs b
set contenu = replace(b.contenu::text, 'Avec nos **offres**, découvrez', 'Avec [nos **offres**](/offres-hebergement-toulouse), découvrez')::jsonb
from public.articles a
where a.id = b.article_id and a.slug = 'staycation-toulouse' and b.ordre = 0;
