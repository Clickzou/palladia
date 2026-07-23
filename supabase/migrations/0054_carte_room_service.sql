-- ---------------------------------------------------------------------------
-- Carte du room service, troisieme carte modifiable depuis /adminpclickzou.
--
-- Sur WordPress, cette carte etait une image : le picto de la page Restaurant
-- pointait vers ROOM-SERVICE-aVRIL-2026.jpg, et c'est cette meme adresse
-- qu'imprime le QR code des chambres. La bascule du domaine vers le nouveau
-- site a rendu l'image introuvable — QR code compris.
--
-- Elle devient donc une page du site, servie par les memes versions datees que
-- les menus du restaurant : l'hotel la met a jour sans nous, sans redeployer,
-- et surtout sans jamais changer l'adresse — le QR code des chambres n'aura
-- plus jamais a etre reimprime.
--
-- Le contenu repris ci-dessous est celui de la derniere carte retrouvee
-- (juillet 2025, extraite de la sauvegarde WordPress). La version d'avril 2026
-- n'existe nulle part hors du serveur disparu : les prix sont donc a
-- reverifier dans le tableau de bord.
-- ---------------------------------------------------------------------------

-- La contrainte ne connaissait que les deux menus du restaurant.
alter table public.menus_versions
  drop constraint menus_versions_cle_check;

alter table public.menus_versions
  add constraint menus_versions_cle_check
  check (cle in ('semaine', 'jour', 'snack'));

-- Les traductions viennent de la carte elle-meme : elle etait deja imprimee en
-- trois langues. Aucune traduction automatique n'a donc a etre relue ici.
insert into public.menus_versions (cle, fr, en, es, publie_le) values
('snack', $fr$
{
  "titre": "Carte snack 24h/24",
  "poste": "9",
  "disponibilite": "Dimanche et jours fériés inclus",
  "sections": [
    {
      "titre": "Le salé",
      "plats": [
        { "nom": "Croque Monsieur Gourmand", "prix": "14 €" },
        { "nom": "Pizza végétarienne", "prix": "16 €" },
        { "nom": "Gaspacho et ses croutons", "prix": "7 €" },
        { "nom": "Paté Régional", "prix": "10 €" },
        { "nom": "Hachis parmentier de canard 340 gr", "prix": "19 €" }
      ],
      "note": "Tous nos plats sont servis avec une salade verte"
    },
    {
      "titre": "Le sucré",
      "plats": [
        { "nom": "Assiette de fromages", "prix": "8 €" },
        { "nom": "Yaourt ou Fromage blanc avec coulis", "prix": "5 €" },
        { "nom": "Tiramisu", "prix": "8 €" }
      ],
      "note": ""
    }
  ],
  "attente": "30 mn d’attente",
  "mentions": [
    "Prix TTC, service compris",
    "Produits sous réserve de disponibilité",
    "Photos non contractuelles"
  ]
}
$fr$::jsonb, $en$
{
  "titre": "24/7 snack menu",
  "poste": "9",
  "disponibilite": "Sunday and holidays included",
  "sections": [
    {
      "titre": "Salty dishes",
      "plats": [
        { "nom": "Tasty Croque Monsieur", "prix": "14 €" },
        { "nom": "Vegetarian pizza", "prix": "16 €" },
        { "nom": "Gaspacho with croutons", "prix": "7 €" },
        { "nom": "Regional paté", "prix": "10 €" },
        { "nom": "Duck parmentier hash 340 g", "prix": "19 €" }
      ],
      "note": "All our dishes are served with a green salad"
    },
    {
      "titre": "Sweet dishes",
      "plats": [
        { "nom": "Cheese platter", "prix": "8 €" },
        { "nom": "Yoghurt or fromage blanc with coulis", "prix": "5 €" },
        { "nom": "Tiramisu", "prix": "8 €" }
      ],
      "note": ""
    }
  ],
  "attente": "30-minute wait",
  "mentions": [
    "Net prices, service included",
    "Products subject to availability",
    "Photographs are for illustration only"
  ]
}
$en$::jsonb, $es$
{
  "titre": "Carta snack 24h/24",
  "poste": "9",
  "disponibilite": "Domingos y festivos incluidos",
  "sections": [
    {
      "titre": "Platos salados",
      "plats": [
        { "nom": "Sabroso Croque Monsieur", "prix": "14 €" },
        { "nom": "Pizza vegetariana", "prix": "16 €" },
        { "nom": "Gaspacho con picatostes", "prix": "7 €" },
        { "nom": "Paté regional", "prix": "10 €" },
        { "nom": "Pastel de carne de pato 340 g", "prix": "19 €" }
      ],
      "note": "Todos nuestros platos se sirven con una ensalada verde"
    },
    {
      "titre": "Postre",
      "plats": [
        { "nom": "Tabla de quesos", "prix": "8 €" },
        { "nom": "Yogur o queso fresco con coulis", "prix": "5 €" },
        { "nom": "Tiramisú", "prix": "8 €" }
      ],
      "note": ""
    }
  ],
  "attente": "30 minutos de espera",
  "mentions": [
    "Precios netos, servicio incluido",
    "Productos sujetos a disponibilidad",
    "Fotografías no contractuales"
  ]
}
$es$::jsonb, now());
