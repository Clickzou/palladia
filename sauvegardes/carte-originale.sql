-- Carte d'origine du restaurant, reprise du site WordPress.
--
-- A lancer dans l'editeur SQL de Supabase pour remettre cette carte en
-- ligne apres des essais. Elle est republiee comme nouvelle version :
-- l'historique reste intact.

insert into public.menus_versions (cle, fr, en, es, publie_le) values (
  'semaine',
  $json${
  "note": "Nos préparations dépendent du marché. Il se peut que certains plats puissent varier, nous vous remercions de votre compréhension.",
  "titre": "Menu de la semaine",
  "sections": [
    {
      "choix": [
        "Hareng à l’huile,\nsalade de pommes de terre et pickles",
        "Tartare de boeuf, sauce aux huîtres,\npak-choï et shimeji"
      ],
      "titre": "Entrée"
    },
    {
      "choix": [
        "Poisson du jour, conchiglioni farcis à la\npiperade et sabayon au kalamansi",
        "Cochon grillé, purée de petits pois parfumée\nà la menthe et radis rôtis"
      ],
      "titre": "Plat"
    },
    {
      "choix": [
        "Comme un chocolat frappé et mousse de lait",
        "Fraîcheur de pamplemousse, fraises et meringue",
        "Assiette de fromages du chef"
      ],
      "titre": "Dessert"
    }
  ]
}$json$::jsonb,
  null,
  null,
  now()
);

insert into public.menus_versions (cle, fr, en, es, publie_le) values (
  'jour',
  $json${
  "intro": "2 formules au choix :",
  "titre": "Menu du jour",
  "enfant": {
    "prix": "12 €",
    "titre": "Menu Moussaillon",
    "detail": "Plat + dessert + boisson"
  },
  "tarifs": [
    "Entrées : 12 €",
    "plats : 22 €",
    "Desserts : 10 €"
  ],
  "formules": [
    {
      "prix": "25 €",
      "detail": "(entrée + plat **ou** plat + dessert)"
    },
    {
      "prix": "30 €",
      "detail": "(entrée + plat + dessert)"
    }
  ],
  "sousTitre": "Midi & soir",
  "tarifsTitre": "Tarifs des plats hors suppléments :"
}$json$::jsonb,
  null,
  null,
  now()
);
