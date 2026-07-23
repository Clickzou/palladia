-- ---------------------------------------------------------------------------
-- Billetterie des spectacles : les liens Weezevent.
--
-- Aucun evenement n'avait de `lien_billetterie` : la page retombait sur la
-- reservation du restaurant, et le bouton « Plus d'infos / Réservez » envoyait
-- vers TheFork qui voulait une place de spectacle. Les quatre adresses
-- ci-dessous sont celles du site WordPress, debarrassees des parametres de
-- suivi Google (_gl, _ga) qui n'ont aucun sens hors du site d'origine.
--
-- Les seances passees n'en recoivent pas : leur billetterie est fermee, et
-- le bouton ne s'affiche plus sans lien.
-- ---------------------------------------------------------------------------

update public.evenements
   set lien_billetterie = 'https://my.weezevent.com/improvisent'
 where titre like 'Olivier%Max improvisent%';

update public.evenements
   set lien_billetterie = 'https://my.weezevent.com/kevin-micoud-magicien-mentaliste'
 where titre like 'Kevin Micoud%';

update public.evenements
   set lien_billetterie = 'https://my.weezevent.com/concert-de-gospel-6'
 where titre like '%Gospel Experience%';

update public.evenements
   set lien_billetterie = 'https://my.weezevent.com/tribute-celine-dion-jean-jacques-goldman'
 where titre like '%Tribute Céline Dion%';
