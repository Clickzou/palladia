-- Sauvegarde des menus du restaurant — 2026-07-22 15:27
--
-- Restauration : coller ce fichier dans l'editeur SQL de Supabase et lancer.
-- Les lignes existantes sont remplacees ; rien d'autre n'est touche.

update public.menus set
  fr = $json${
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
  en = null,
  es = null
where cle = 'semaine';

update public.menus set
  fr = $json${
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
  en = null,
  es = null
where cle = 'jour';
