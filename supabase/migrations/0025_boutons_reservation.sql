-- ---------------------------------------------------------------------------
-- Boutons de reservation en fin d'article.
--
-- Sur le site, le bloc « Réservation » n'est pas un titre isole : il porte
-- deux ou trois boutons (telephone, courriel, billetterie). L'import ne les
-- avait pas repris, ces blocs restaient vides.
--
-- Libelles et destinations releves un a un sur le site en ligne.
--
-- Relançable sans risque.
-- ---------------------------------------------------------------------------

-- Saint-Valentin et Réveillon : reservation par telephone ou courriel
update public.article_blocs b
set contenu = b.contenu || '{
  "boutons": [
    { "label": "05 62 120 179", "href": "tel:+33562120179", "externe": true },
    { "label": "Par Mail", "href": "mailto:reservation@hotelpalladia.com", "externe": true }
  ]
}'::jsonb
from public.articles a
where b.article_id = a.id
  and a.slug in ('saint-valentin-toulouse', 'reveillon-toulouse')
  and b.contenu->>'titre' = 'Réservation';

-- Séjour en famille : le site affiche « 05 62 120 120 » mais appelle le 120 179.
-- On garde le numero reellement compose.
update public.article_blocs b
set contenu = b.contenu || '{
  "boutons": [
    { "label": "05 62 120 179", "href": "tel:+33562120179", "externe": true },
    { "label": "Par Mail", "href": "mailto:reservation@hotelpalladia.com", "externe": true }
  ]
}'::jsonb
from public.articles a
where b.article_id = a.id
  and a.slug = 'sejour-en-famille-a-toulouse-hotel-palladia'
  and b.contenu->>'titre' = 'Réservation';

-- Dîner accord mets & champagne, Le Gardien du Temple
update public.article_blocs b
set contenu = b.contenu || '{
  "boutons": [
    { "label": "Par Téléphone", "href": "tel:+33562120179", "externe": true },
    { "label": "Par Mail", "href": "mailto:reservation@hotelpalladia.com", "externe": true }
  ]
}'::jsonb
from public.articles a
where b.article_id = a.id
  and a.slug in ('diner-accord-mets-champagne', 'sejour-en-famille-le-gardien-du-temple')
  and b.contenu->>'titre' = 'Pensez à réserver';

-- Afterwork : reservation au bar, et la carte en PDF
update public.article_blocs b
set contenu = b.contenu || '{
  "boutons": [
    { "label": "05 62 120 130", "href": "tel:+33562120130", "externe": true },
    { "label": "Découvrez la carte", "href": "https://www.hotelpalladia.com/wp-content/uploads/2024/03/CARTE-AFTERWORK-OCTOBRE.pdf", "externe": true }
  ]
}'::jsonb
from public.articles a
where b.article_id = a.id
  and a.slug = 'afterwork-toulouse'
  and b.contenu->>'titre' = 'RéservEZ VOS PLACES';

-- Théâtre Le Grenier : billetterie en ligne et contact dedie
update public.article_blocs b
set contenu = b.contenu || '{
  "boutons": [
    { "label": "05 62 120 160", "href": "tel:+33562120160", "externe": true },
    { "label": "Réservation en ligne", "href": "https://my.weezevent.com/cravate-club", "externe": true },
    { "label": "Par Mail", "href": "mailto:b.bouyssel@hotelpalladia.com", "externe": true }
  ]
}'::jsonb
from public.articles a
where b.article_id = a.id
  and a.slug = 'theatre-le-grenier-de-toulouse'
  and b.contenu->>'titre' = 'Réservation';

-- Dîners & Spectacles : renvoi vers la programmation et contact groupes.
-- Le site pointe « Infos groupes » sur http://communication@… : lien casse,
-- corrige en mailto.
update public.article_blocs b
set contenu = b.contenu || '{
  "boutons": [
    { "label": "Réservation", "href": "/spectacle-toulouse" },
    { "label": "Infos groupes", "href": "mailto:communication@hotelpalladia.com", "externe": true }
  ]
}'::jsonb
from public.articles a
where b.article_id = a.id
  and a.slug = 'diner-spectacles-toulouse'
  and b.contenu->>'titre' = 'Réservation';
