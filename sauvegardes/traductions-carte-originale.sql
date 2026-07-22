-- Traductions des menus en ligne, produites par l'API Claude.
-- A coller dans l'editeur SQL de Supabase.

update public.menus_versions set
  en = $json${
  "note": "Our dishes depend on the market. Some dishes may vary, and we thank you for your understanding.",
  "titre": "Menu of the Week",
  "sections": [
    {
      "choix": [
        "Herring in oil,\npotato salad and pickles",
        "Beef tartare, oyster sauce,\npak-choï and shimeji"
      ],
      "titre": "Starter"
    },
    {
      "choix": [
        "Catch of the day, conchiglioni stuffed with\npiperade and kalamansi sabayon",
        "Grilled pork, mint-infused pea purée\nand roasted radishes"
      ],
      "titre": "Main"
    },
    {
      "choix": [
        "A twist on iced chocolate with milk foam",
        "Grapefruit refresher with strawberries and meringue",
        "Chef's cheese platter"
      ],
      "titre": "Dessert"
    }
  ]
}$json$::jsonb,
  es = $json${
  "note": "Nuestras preparaciones dependen del mercado. Es posible que algunos platos puedan variar, les agradecemos su comprensión.",
  "titre": "Menú de la semana",
  "sections": [
    {
      "choix": [
        "Arenque en aceite,\nensalada de patatas y pickles",
        "Tartare de ternera, salsa de ostras,\npak-choï y shimeji"
      ],
      "titre": "Entrante"
    },
    {
      "choix": [
        "Pescado del día, conchiglioni rellenos de\npiperade y sabayon de kalamansi",
        "Cerdo a la parrilla, puré de guisantes perfumado\ncon menta y rábanos asados"
      ],
      "titre": "Plato principal"
    },
    {
      "choix": [
        "Como un chocolate frappé y espuma de leche",
        "Frescor de pomelo, fresas y merengue",
        "Tabla de quesos del chef"
      ],
      "titre": "Postre"
    }
  ]
}$json$::jsonb
where id = '982a64b0-c2dd-4ec4-9db9-63de31e72d2a';

update public.menus_versions set
  en = $json${
  "intro": "2 set menus to choose from:",
  "titre": "Menu of the day",
  "enfant": {
    "prix": "12 €",
    "titre": "Little Sailor Menu",
    "detail": "Main course + dessert + drink"
  },
  "tarifs": [
    "Starters: 12 €",
    "Mains: 22 €",
    "Desserts: 10 €"
  ],
  "formules": [
    {
      "prix": "25 €",
      "detail": "(starter + main **or** main + dessert)"
    },
    {
      "prix": "30 €",
      "detail": "(starter + main + dessert)"
    }
  ],
  "sousTitre": "Lunch & dinner",
  "tarifsTitre": "Dish prices excluding extras:"
}$json$::jsonb,
  es = $json${
  "intro": "2 fórmulas a elegir:",
  "titre": "Menú del día",
  "enfant": {
    "prix": "12 €",
    "titre": "Menú Grumete",
    "detail": "Plato + postre + bebida"
  },
  "tarifs": [
    "Entrantes: 12 €",
    "platos: 22 €",
    "Postres: 10 €"
  ],
  "formules": [
    {
      "prix": "25 €",
      "detail": "(entrante + plato **o** plato + postre)"
    },
    {
      "prix": "30 €",
      "detail": "(entrante + plato + postre)"
    }
  ],
  "sousTitre": "Mediodía y noche",
  "tarifsTitre": "Precios de los platos sin suplementos:"
}$json$::jsonb
where id = '5688a5b0-ced3-4dac-8e17-72efcc1d6eb8';
