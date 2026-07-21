-- ---------------------------------------------------------------------------
-- Affiches de la saison 2026, fournies par l'hôtel.
-- Prérequis : 0006_programmation_2026.sql. Relançable sans risque.
-- ---------------------------------------------------------------------------

update public.evenements
set affiche = '/images/spectacles/olivier-max.jpg',
    affiche_alt = 'Affiche du spectacle Olivier & Max improvisent'
where titre = 'Olivier & Max improvisent';

update public.evenements
set affiche = '/images/spectacles/kevin-micoud.jpg',
    affiche_alt = 'Affiche du spectacle Kevin Micoud, magicien mentaliste'
where titre = 'Kevin Micoud — Magicien Mentaliste';

update public.evenements
set affiche = '/images/spectacles/gospel-experience.jpg',
    affiche_alt = 'Affiche du dîner-spectacle Gospel Experience avec Kathy Boyé'
where titre = 'Dîner & Spectacle : Gospel Experience';

update public.evenements
set affiche = '/images/spectacles/dion-goldman.jpg',
    affiche_alt = 'Affiche du tribute Céline Dion et Jean-Jacques Goldman'
where titre = 'Dîner & Spectacle : Tribute Céline Dion & Jean-Jacques Goldman';
