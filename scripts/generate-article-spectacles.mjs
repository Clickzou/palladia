#!/usr/bin/env node
/**
 * Article « Sortir à Toulouse : les spectacles de fin d’année à l’Hôtel
 * Palladia », a partir du texte et des affiches fournis par l’hotel.
 *
 * Source unique : chaque phrase est saisie ici avec ses traductions, d’ou
 * sortent la migration SQL, l’ecriture en base et les lots du dictionnaire.
 *
 *   node scripts/generate-article-spectacles.mjs                 SQL seul
 *   node scripts/generate-article-spectacles.mjs --lots=<dossier> + lots en/es
 *   node scripts/generate-article-spectacles.mjs --appliquer     + ecriture REST
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const racine = fileURLToPath(new URL("..", import.meta.url));
const SLUG = "sortir-a-toulouse-spectacles";
const SORTIE = join(racine, "supabase/migrations/0072_article_sortir_a_toulouse_spectacles.sql");

/** Phrase francaise et ses traductions ; renvoie le francais. */
const lots = { en: {}, es: {} };
const T = (fr, en, es) => {
  lots.en[fr] = en;
  lots.es[fr] = es;
  return fr;
};

const BILLETTERIE = {
  impro: "https://my.weezevent.com/improvisent",
  micoud: "https://my.weezevent.com/kevin-micoud-magicien-mentaliste",
  gospel: "https://my.weezevent.com/concert-de-gospel-6",
  tribute: "https://my.weezevent.com/tribute-celine-dion-jean-jacques-goldman",
};

const RESERVER = T("Réserver ma place", "Book my seat", "Reservar mi plaza");
const LIEU = T("Hôtel Palladia, Toulouse.", "Hôtel Palladia, Toulouse.", "Hôtel Palladia, Toulouse.");
const DINER = T("Dîner à 19h30 ;", "Dinner at 7.30pm;", "Cena a las 19:30;");
const SPECTACLE_21H = T("Spectacle à 21h ;", "Show at 9pm;", "Espectáculo a las 21:00;");

const article = {
  titre: T(
    "Sortir à Toulouse : les spectacles de fin d’année à l’Hôtel Palladia",
    "Going out in Toulouse: end-of-year shows at the Hôtel Palladia",
    "Salir en Toulouse: los espectáculos de fin de año en el Hôtel Palladia",
  ),
  sous_titre: T(
    "Envie de sortir à Toulouse, de rire, de profiter et de passer une belle soirée ?",
    "Fancy a night out in Toulouse, a good laugh and a lovely evening?",
    "¿Ganas de salir en Toulouse, de reír, de disfrutar y de pasar una buena velada?",
  ),
  chapo: T(
    "Improvisation, magie et mentalisme, gospel, tribute Céline Dion & Jean-Jacques Goldman : quatre soirées spectacle d’octobre à décembre 2026 à l’Hôtel Palladia, à Toulouse, dont trois en formule dîner & spectacle.",
    "Improv, magic and mentalism, gospel, a Céline Dion & Jean-Jacques Goldman tribute: four show nights from October to December 2026 at the Hôtel Palladia in Toulouse, three of them as dinner & show.",
    "Improvisación, magia y mentalismo, góspel, tributo a Céline Dion y Jean-Jacques Goldman: cuatro noches de espectáculo de octubre a diciembre de 2026 en el Hôtel Palladia de Toulouse, tres de ellas con cena y espectáculo.",
  ),
  image_hero: "/images/blog/spectacles-fin-annee-toulouse-hotel-palladia-banniere.jpg",
  image_vignette: "/images/blog/spectacles-fin-annee-toulouse-hotel-palladia.jpg",
  seo_title: T(
    "Sortir à Toulouse : spectacles de fin d’année — Hôtel Palladia",
    "Going out in Toulouse: end-of-year shows — Hôtel Palladia",
    "Salir en Toulouse: espectáculos de fin de año — Hôtel Palladia",
  ),
  seo_description: T(
    "Humour, magie, gospel, tribute Dion & Goldman : 4 soirées spectacle à Toulouse d’octobre à décembre 2026, avec dîner & spectacle à l’Hôtel Palladia.",
    "Comedy, magic, gospel, a Dion & Goldman tribute: 4 show nights in Toulouse from October to December 2026, with dinner & show at the Hôtel Palladia.",
    "Humor, magia, góspel, tributo Dion y Goldman: 4 noches de espectáculo en Toulouse de octubre a diciembre de 2026, con cena y espectáculo en el Hôtel Palladia.",
  ),
};

const blocs = [
  // Introduction
  {
    type: "texte",
    contenu: {
      centre: true,
      paragraphes: [
        T(
          "Vous cherchez une idée pour sortir à Toulouse, passer une soirée conviviale entre amis, profiter d’un dîner et spectacle ou simplement vous offrir une parenthèse pour rire et vous amuser ?",
          "Looking for an idea for a night out in Toulouse, a friendly evening with friends, a dinner and show, or simply a break to laugh and have fun?",
          "¿Busca una idea para salir en Toulouse, pasar una velada agradable con amigos, disfrutar de una cena con espectáculo o simplemente regalarse un paréntesis para reír y divertirse?",
        ),
        T(
          "L’Hôtel Palladia à Toulouse vous propose une [programmation culturelle](/spectacle-toulouse) variée pour vivre de belles soirées festives et conviviales dans un cadre élégant et chaleureux.",
          "The Hôtel Palladia in Toulouse offers a varied [cultural programme](/spectacle-toulouse) for festive, friendly evenings in an elegant and welcoming setting.",
          "El Hôtel Palladia de Toulouse le propone una [programación cultural](/spectacle-toulouse) variada para vivir veladas festivas y agradables en un entorno elegante y acogedor.",
        ),
        T(
          "Spectacle d’humour, improvisation, magie, mentalisme, gospel, concert et tribute musical : il y en a pour toutes les envies. Une programmation pensée pour celles et ceux qui souhaitent sortir à Toulouse autrement, partager un bon moment et profiter pleinement de leur soirée.",
          "Comedy, improv, magic, mentalism, gospel, concerts and a musical tribute: there is something for every taste. A programme designed for anyone who wants to go out in Toulouse differently, share a good time and make the most of their evening.",
          "Humor, improvisación, magia, mentalismo, góspel, concierto y tributo musical: hay para todos los gustos. Una programación pensada para quienes quieren salir en Toulouse de otra manera, compartir un buen momento y disfrutar plenamente de su velada.",
        ),
      ],
    },
  },

  // En bref : les faits, en tete, pour les lecteurs presses et les moteurs
  {
    type: "liste_cochee",
    contenu: {
      fond_gris: true,
      titre: T(
        "En bref : quatre soirées d’octobre à décembre 2026",
        "At a glance: four evenings from October to December 2026",
        "En resumen: cuatro veladas de octubre a diciembre de 2026",
      ),
      items: [
        // Lignes courtes : la liste est centree, une ligne qui passe a la
        // suivante s’y lit mal. Les horaires sont detailles plus bas.
        T(
          "**Samedi 3 octobre** — Olivier & Max improvisent, à 21h",
          "**Saturday 3 October** — Olivier & Max improvisent, at 9pm",
          "**Sábado 3 de octubre** — Olivier & Max improvisent, a las 21:00",
        ),
        T(
          "**Samedi 7 novembre** — Kevin Micoud, dîner & spectacle",
          "**Saturday 7 November** — Kevin Micoud, dinner & show",
          "**Sábado 7 de noviembre** — Kevin Micoud, cena y espectáculo",
        ),
        T(
          "**Samedi 28 novembre** — Gospel Experience, dîner & spectacle",
          "**Saturday 28 November** — Gospel Experience, dinner & show",
          "**Sábado 28 de noviembre** — Gospel Experience, cena y espectáculo",
        ),
        T(
          "**Samedi 12 décembre** — Tribute Dion & Goldman, dîner & spectacle",
          "**Saturday 12 December** — Dion & Goldman tribute, dinner & show",
          "**Sábado 12 de diciembre** — Tributo Dion y Goldman, cena y espectáculo",
        ),
      ],
      conclusion: T(
        "Dîner à 19h30 pour les formules dîner & spectacle. Toutes les soirées ont lieu à l’Hôtel Palladia, 271 avenue de Grande-Bretagne à Toulouse, avec parking gratuit sur place.",
        "Dinner at 7.30pm for the dinner & show evenings. Every evening takes place at the Hôtel Palladia, 271 avenue de Grande-Bretagne in Toulouse, with free parking on site.",
        "Cena a las 19:30 en las veladas con cena y espectáculo. Todas las veladas tienen lugar en el Hôtel Palladia, 271 avenue de Grande-Bretagne, en Toulouse, con aparcamiento gratuito.",
      ),
    },
  },

  {
    type: "texte_image",
    contenu: {
      pleine_largeur: true,
      position: "gauche",
      image: "/images/blog/amphitheatre-285-places-seminaire-toulouse-palladia.jpg",
      alt: T(
        "Public réuni dans l’amphithéâtre de 285 places de l’Hôtel Palladia à Toulouse pendant un concert",
        "Audience in the 285-seat amphitheatre of the Hôtel Palladia in Toulouse during a concert",
        "Público reunido en el anfiteatro de 285 plazas del Hôtel Palladia de Toulouse durante un concierto",
      ),
      titre: T(
        "Une soirée spectacle à Toulouse pour rire, s’émerveiller et partager",
        "A show night in Toulouse to laugh, marvel and share",
        "Una noche de espectáculo en Toulouse para reír, maravillarse y compartir",
      ),
      paragraphes: [
        T(
          "Et si votre prochaine sortie à Toulouse devenait une véritable expérience ?",
          "What if your next night out in Toulouse became a real experience?",
          "¿Y si su próxima salida en Toulouse se convirtiera en una verdadera experiencia?",
        ),
        T(
          "Au Palladia, la soirée ne se résume pas à assister à un spectacle. Selon la programmation, vous pouvez commencer par un [dîner au restaurant de l’hôtel](/restaurant), profiter d’un moment convivial autour de la table, puis rejoindre la salle de spectacle pour découvrir des artistes aux univers très différents.",
          "At the Palladia, the evening is about more than watching a show. Depending on the programme, you can start with [dinner at the hotel restaurant](/restaurant), enjoy a friendly moment around the table, then head to the auditorium to discover artists from very different worlds.",
          "En el Palladia, la velada no se limita a asistir a un espectáculo. Según la programación, puede empezar con una [cena en el restaurante del hotel](/restaurant), disfrutar de un momento agradable en la mesa y después pasar a la sala para descubrir artistas de universos muy distintos.",
        ),
        T(
          "Une formule idéale pour une soirée entre amis, une sortie en couple, un anniversaire, une soirée en famille ou tout simplement pour le plaisir de rire, de s’amuser et de profiter.",
          "An ideal option for an evening with friends, a night out as a couple, a birthday, a family evening or simply the pleasure of laughing, having fun and enjoying yourself.",
          "Una fórmula ideal para una velada con amigos, una salida en pareja, un cumpleaños, una noche en familia o simplemente por el placer de reír, divertirse y disfrutar.",
        ),
      ],
      conclusion: T(
        "L’Hôtel Palladia dispose notamment d’un [amphithéâtre de 285 places](/amphitheatre-hotel-palladia-renove) et d’espaces dédiés aux événements et aux spectacles, dont le salon Opéra.",
        "The Hôtel Palladia has a [285-seat amphitheatre](/amphitheatre-hotel-palladia-renove) and spaces dedicated to events and shows, including the Opéra room.",
        "El Hôtel Palladia dispone de un [anfiteatro de 285 plazas](/amphitheatre-hotel-palladia-renove) y de espacios dedicados a eventos y espectáculos, entre ellos el salón Opéra.",
      ),
    },
  },

  {
    type: "texte",
    contenu: {
      centre: true,
      titre: T(
        "Les spectacles à ne pas manquer au Palladia à Toulouse",
        "Shows not to miss at the Palladia in Toulouse",
        "Los espectáculos que no hay que perderse en el Palladia de Toulouse",
      ),
      taille_titre: "grand",
      paragraphes: [
        T(
          "Quatre soirées, quatre univers, une seule adresse : voici la programmation d’octobre à décembre 2026.",
          "Four evenings, four worlds, one address: here is the programme from October to December 2026.",
          "Cuatro veladas, cuatro universos, una sola dirección: esta es la programación de octubre a diciembre de 2026.",
        ),
      ],
    },
  },

  // Olivier & Max
  {
    type: "texte_image",
    contenu: {
      texte_dominant: true,
      position: "droite",
      image: "/images/blog/olivier-max-improvisent-spectacle-humour-toulouse.jpg",
      alt: T(
        "Affiche du spectacle d’improvisation Olivier & Max improvisent, samedi 3 octobre 2026 à l’Hôtel Palladia à Toulouse",
        "Poster for the improv show Olivier & Max improvisent, Saturday 3 October 2026 at the Hôtel Palladia in Toulouse",
        "Cartel del espectáculo de improvisación Olivier & Max improvisent, sábado 3 de octubre de 2026 en el Hôtel Palladia de Toulouse",
      ),
      titre: T(
        "Olivier & Max improvisent : une soirée placée sous le signe du rire",
        "Olivier & Max improvisent: an evening of laughter",
        "Olivier & Max improvisent: una velada bajo el signo de la risa",
      ),
      sous_titre: T("Samedi 3 octobre 2026", "Saturday 3 October 2026", "Sábado 3 de octubre de 2026"),
      paragraphes: [
        T(
          "Pour celles et ceux qui recherchent une soirée humour à Toulouse, Olivier & Max vous donnent rendez-vous pour un spectacle d’improvisation.",
          "For anyone looking for a comedy night in Toulouse, Olivier & Max invite you to an improv show.",
          "Para quienes buscan una noche de humor en Toulouse, Olivier & Max les esperan en un espectáculo de improvisación.",
        ),
        T(
          "L’improvisation, c’est l’assurance d’un spectacle vivant, spontané et plein de surprises. Une excellente idée pour sortir à Toulouse, rire entre amis et partager une soirée légère et décontractée.",
          "Improv guarantees a lively, spontaneous show full of surprises. A great idea for a night out in Toulouse, laughing with friends over a light, relaxed evening.",
          "La improvisación garantiza un espectáculo vivo, espontáneo y lleno de sorpresas. Una excelente idea para salir en Toulouse, reír con amigos y compartir una velada ligera y relajada.",
        ),
      ],
      liste: [
        T("Spectacle à 21h ;", "Show at 9pm;", "Espectáculo a las 21:00;"),
        LIEU,
      ],
      conclusion: T(
        "Une soirée parfaite pour ceux qui ont envie de rire, de se détendre et de profiter d’un spectacle convivial.",
        "A perfect evening for anyone who wants to laugh, unwind and enjoy a friendly show.",
        "Una velada perfecta para quienes quieren reír, relajarse y disfrutar de un espectáculo agradable.",
      ),
      boutons: [{ label: RESERVER, href: BILLETTERIE.impro, externe: true }],
    },
  },

  // Kevin Micoud
  {
    type: "texte_image",
    contenu: {
      texte_dominant: true,
      position: "gauche",
      image: "/images/blog/kevin-micoud-magicien-mentaliste-toulouse.jpg",
      alt: T(
        "Affiche du spectacle Best Of de Kevin Micoud, magicien mentaliste, samedi 7 novembre 2026 à l’Hôtel Palladia à Toulouse",
        "Poster for Kevin Micoud’s Best Of show, magician and mentalist, Saturday 7 November 2026 at the Hôtel Palladia in Toulouse",
        "Cartel del espectáculo Best Of de Kevin Micoud, mago mentalista, sábado 7 de noviembre de 2026 en el Hôtel Palladia de Toulouse",
      ),
      titre: T(
        "Kevin Micoud : magie et mentalisme à Toulouse",
        "Kevin Micoud: magic and mentalism in Toulouse",
        "Kevin Micoud: magia y mentalismo en Toulouse",
      ),
      sous_titre: T("Samedi 7 novembre 2026", "Saturday 7 November 2026", "Sábado 7 de noviembre de 2026"),
      paragraphes: [
        T(
          "Vous aimez la magie ? Vous êtes intrigué par le mentalisme ? Le spectacle de Kevin Micoud, magicien mentaliste, promet une soirée pleine de mystère et de surprises.",
          "Do you love magic? Are you intrigued by mentalism? The show by Kevin Micoud, magician and mentalist, promises an evening full of mystery and surprises.",
          "¿Le gusta la magia? ¿Le intriga el mentalismo? El espectáculo de Kevin Micoud, mago mentalista, promete una velada llena de misterio y sorpresas.",
        ),
        T(
          "Révélé notamment par La France a un incroyable talent, Kevin Micoud propose un spectacle mêlant magie, mentalisme, illusion et interaction avec le public.",
          "Best known from La France a un incroyable talent, the French edition of Got Talent, Kevin Micoud presents a show blending magic, mentalism, illusion and audience interaction.",
          "Conocido sobre todo por La France a un incroyable talent, la versión francesa de Got Talent, Kevin Micoud ofrece un espectáculo que mezcla magia, mentalismo, ilusión e interacción con el público.",
        ),
        T(
          "Pour une sortie originale à Toulouse, c’est l’occasion de vivre une expérience différente et de se laisser surprendre.",
          "For an original night out in Toulouse, it is a chance to try something different and let yourself be surprised.",
          "Para una salida original en Toulouse, es la ocasión de vivir una experiencia diferente y dejarse sorprender.",
        ),
        T(
          "Et pour prolonger la soirée, le Palladia propose une [formule dîner & spectacle](/diner-spectacles-toulouse) : commencez la soirée autour d’un dîner à 19h30 avant de découvrir le spectacle à 21h.",
          "To make a full evening of it, the Palladia offers a [dinner & show package](/diner-spectacles-toulouse): start with dinner at 7.30pm before the show at 9pm.",
          "Y para alargar la velada, el Palladia propone una [fórmula cena y espectáculo](/diner-spectacles-toulouse): empiece con una cena a las 19:30 antes de descubrir el espectáculo a las 21:00.",
        ),
      ],
      liste: [DINER, SPECTACLE_21H, LIEU],
      conclusion: T(
        "Une idée parfaite pour une soirée en couple, une sortie entre amis ou une occasion particulière.",
        "A perfect idea for an evening as a couple, a night out with friends or a special occasion.",
        "Una idea perfecta para una velada en pareja, una salida con amigos o una ocasión especial.",
      ),
      boutons: [{ label: RESERVER, href: BILLETTERIE.micoud, externe: true }],
    },
  },

  // Gospel Experience
  {
    type: "texte_image",
    contenu: {
      texte_dominant: true,
      position: "droite",
      image: "/images/blog/gospel-experience-kathy-boye-diner-spectacle-toulouse.jpg",
      alt: T(
        "Affiche du dîner & spectacle Gospel Experience avec Kathy Boyé, de Chicago à la Nouvelle-Orléans, samedi 28 novembre 2026 à l’Hôtel Palladia",
        "Poster for the Gospel Experience dinner & show with Kathy Boyé, from Chicago to New Orleans, Saturday 28 November 2026 at the Hôtel Palladia",
        "Cartel de la cena y espectáculo Gospel Experience con Kathy Boyé, de Chicago a Nueva Orleans, sábado 28 de noviembre de 2026 en el Hôtel Palladia",
      ),
      titre: T(
        "Gospel Experience avec Kathy Boyé : une soirée musicale et festive",
        "Gospel Experience with Kathy Boyé: a festive musical evening",
        "Gospel Experience con Kathy Boyé: una velada musical y festiva",
      ),
      sous_titre: T("Samedi 28 novembre 2026", "Saturday 28 November 2026", "Sábado 28 de noviembre de 2026"),
      paragraphes: [
        T(
          "Envie d’une soirée musicale à Toulouse ? Le Gospel Experience avec Kathy Boyé vous invite à voyager musicalement de Chicago à la Nouvelle-Orléans.",
          "In the mood for a musical evening in Toulouse? Gospel Experience with Kathy Boyé takes you on a musical journey from Chicago to New Orleans.",
          "¿Le apetece una velada musical en Toulouse? Gospel Experience con Kathy Boyé le invita a viajar musicalmente de Chicago a Nueva Orleans.",
        ),
        T(
          "Une soirée placée sous le signe de la voix, du partage et de l’énergie, idéale pour les amateurs de concert à Toulouse, de musique live et de spectacles chaleureux.",
          "An evening of voices, sharing and energy, ideal for lovers of concerts in Toulouse, live music and warm-hearted shows.",
          "Una velada bajo el signo de la voz, el intercambio y la energía, ideal para los amantes de los conciertos en Toulouse, la música en directo y los espectáculos cálidos.",
        ),
        T(
          "La formule dîner & spectacle permet de commencer la soirée autour d’un repas avant de profiter du concert.",
          "The dinner & show package lets you begin the evening over a meal before enjoying the concert.",
          "La fórmula cena y espectáculo permite empezar la velada con una comida antes de disfrutar del concierto.",
        ),
      ],
      liste: [DINER, SPECTACLE_21H, LIEU],
      conclusion: T(
        "Une belle occasion de sortir à Toulouse, de dîner, d’écouter de la musique et de partager un moment festif.",
        "A lovely opportunity to go out in Toulouse, have dinner, listen to music and share a festive moment.",
        "Una buena ocasión para salir en Toulouse, cenar, escuchar música y compartir un momento festivo.",
      ),
      boutons: [{ label: RESERVER, href: BILLETTERIE.gospel, externe: true }],
    },
  },

  // Tribute Celine Dion & Jean-Jacques Goldman
  {
    type: "texte_image",
    contenu: {
      texte_dominant: true,
      position: "gauche",
      image: "/images/blog/tribute-celine-dion-goldman-diner-spectacle-toulouse.jpg",
      alt: T(
        "Affiche du tribute D’eux, Céline Dion et Jean-Jacques Goldman, en dîner & spectacle à l’Hôtel Palladia à Toulouse",
        "Poster for the D’eux tribute to Céline Dion and Jean-Jacques Goldman, a dinner & show at the Hôtel Palladia in Toulouse",
        "Cartel del tributo D’eux a Céline Dion y Jean-Jacques Goldman, cena y espectáculo en el Hôtel Palladia de Toulouse",
      ),
      titre: T(
        "Tribute Céline Dion & Jean-Jacques Goldman : une soirée musicale incontournable",
        "Céline Dion & Jean-Jacques Goldman tribute: a musical evening not to be missed",
        "Tributo a Céline Dion y Jean-Jacques Goldman: una velada musical imprescindible",
      ),
      sous_titre: T("Samedi 12 décembre 2026", "Saturday 12 December 2026", "Sábado 12 de diciembre de 2026"),
      paragraphes: [
        T(
          "Pour terminer l’année en musique, le Palladia propose une soirée dédiée à deux grandes figures de la chanson française : Céline Dion et Jean-Jacques Goldman.",
          "To end the year on a musical note, the Palladia hosts an evening devoted to two great names of French song: Céline Dion and Jean-Jacques Goldman.",
          "Para terminar el año con música, el Palladia propone una velada dedicada a dos grandes figuras de la canción francesa: Céline Dion y Jean-Jacques Goldman.",
        ),
        T(
          "Ce tribute Céline Dion & Jean-Jacques Goldman à Toulouse s’adresse à tous ceux qui aiment chanter, retrouver des chansons emblématiques et partager une soirée musicale dans une ambiance conviviale.",
          "This Céline Dion & Jean-Jacques Goldman tribute in Toulouse is for everyone who loves to sing along, rediscover iconic songs and share a musical evening in a friendly atmosphere.",
          "Este tributo a Céline Dion y Jean-Jacques Goldman en Toulouse está pensado para todos los que disfrutan cantando, reencontrando canciones emblemáticas y compartiendo una velada musical en un ambiente agradable.",
        ),
        T(
          "Au programme : un dîner à 19h30, suivi du spectacle au salon Opéra.",
          "On the programme: dinner at 7.30pm, followed by the show in the Opéra room.",
          "En el programa: una cena a las 19:30, seguida del espectáculo en el salón Opéra.",
        ),
      ],
      liste: [
        DINER,
        T("Spectacle au salon Opéra ;", "Show in the Opéra room;", "Espectáculo en el salón Opéra;"),
        LIEU,
      ],
      conclusion: T(
        "Une excellente idée pour une soirée festive de fin d’année, une sortie entre amis ou une soirée en couple.",
        "A great idea for a festive end-of-year evening, a night out with friends or an evening as a couple.",
        "Una excelente idea para una velada festiva de fin de año, una salida con amigos o una noche en pareja.",
      ),
      boutons: [{ label: RESERVER, href: BILLETTERIE.tribute, externe: true }],
    },
  },

  // Diner & spectacle
  {
    type: "texte_image",
    contenu: {
      pleine_largeur: true,
      fond_gris: true,
      position: "droite",
      image: "/images/restaurant/salle-1.jpg",
      alt: T(
        "Assiette dressée par le chef du restaurant de l’Hôtel Palladia à Toulouse",
        "Dish plated by the chef of the Hôtel Palladia restaurant in Toulouse",
        "Plato presentado por el chef del restaurante del Hôtel Palladia de Toulouse",
      ),
      titre: T(
        "Dîner & spectacle à Toulouse : profitez d’une soirée complète",
        "Dinner & show in Toulouse: enjoy a complete evening",
        "Cena y espectáculo en Toulouse: disfrute de una velada completa",
      ),
      paragraphes: [
        T(
          "Pourquoi choisir entre restaurant et spectacle quand vous pouvez profiter des deux ?",
          "Why choose between a restaurant and a show when you can enjoy both?",
          "¿Por qué elegir entre restaurante y espectáculo cuando puede disfrutar de ambos?",
        ),
        T(
          "Le concept [dîner & spectacle à Toulouse](/diner-spectacles-toulouse) permet de prendre le temps de se retrouver autour d’un bon repas avant de profiter d’un spectacle.",
          "The [dinner & show concept in Toulouse](/diner-spectacles-toulouse) gives you time to get together over a good meal before enjoying a show.",
          "El concepto de [cena y espectáculo en Toulouse](/diner-spectacles-toulouse) permite tomarse el tiempo de reunirse en torno a una buena comida antes de disfrutar de un espectáculo.",
        ),
        T(
          "Au [restaurant du Palladia](/restaurant), la cuisine évolue au fil des saisons et privilégie des produits frais.",
          "At the [Palladia restaurant](/restaurant), the cooking changes with the seasons and favours fresh produce.",
          "En el [restaurante del Palladia](/restaurant), la cocina evoluciona con las estaciones y da prioridad a los productos frescos.",
        ),
        T(
          "C’est donc une formule idéale pour celles et ceux qui recherchent une soirée conviviale à Toulouse, un moment de détente après une journée de travail ou une occasion spéciale à partager.",
          "It is an ideal option for anyone looking for a friendly evening in Toulouse, a relaxing moment after a day at work or a special occasion to share.",
          "Es, por tanto, una fórmula ideal para quienes buscan una velada agradable en Toulouse, un momento de relax después de una jornada de trabajo o una ocasión especial para compartir.",
        ),
      ],
      conclusion: T(
        "On dîne, on discute, on rit, on profite du spectacle… et surtout, on prend le temps de s’amuser !",
        "Dinner, conversation, laughter, the show… and above all, time to have fun!",
        "Se cena, se charla, se ríe, se disfruta del espectáculo… y, sobre todo, ¡uno se toma el tiempo de divertirse!",
      ),
    },
  },

  // Que faire a Toulouse le soir
  {
    type: "liste_cochee",
    contenu: {
      titre: T(
        "Que faire à Toulouse le soir ? Pensez spectacle !",
        "What to do in Toulouse in the evening? Think show!",
        "¿Qué hacer en Toulouse por la noche? ¡Piense en un espectáculo!",
      ),
      intro: T(
        "Vous vous demandez que faire à Toulouse le soir ? La Ville Rose offre de nombreuses possibilités : restaurant, concert, théâtre, humour, événements culturels et sorties entre amis. Parmi toutes ces idées, une soirée spectacle au Palladia permet de réunir plusieurs plaisirs en une seule soirée. Vous pouvez venir pour :",
        "Wondering what to do in Toulouse in the evening? The Pink City offers plenty of options: restaurants, concerts, theatre, comedy, cultural events and nights out with friends. Among all these ideas, a show night at the Palladia brings several pleasures together in a single evening. You can come for:",
        "¿Se pregunta qué hacer en Toulouse por la noche? La Ciudad Rosa ofrece muchas posibilidades: restaurantes, conciertos, teatro, humor, eventos culturales y salidas con amigos. Entre todas estas ideas, una noche de espectáculo en el Palladia reúne varios placeres en una sola velada. Puede venir para:",
      ),
      items: [
        T("une soirée humour à Toulouse ;", "a comedy night in Toulouse;", "una noche de humor en Toulouse;"),
        T("un spectacle de magie à Toulouse ;", "a magic show in Toulouse;", "un espectáculo de magia en Toulouse;"),
        T("une soirée mentalisme et illusion ;", "an evening of mentalism and illusion;", "una velada de mentalismo e ilusión;"),
        T("un concert à Toulouse ;", "a concert in Toulouse;", "un concierto en Toulouse;"),
        T("une soirée gospel ;", "a gospel evening;", "una velada de góspel;"),
        T("un dîner spectacle à Toulouse ;", "a dinner show in Toulouse;", "una cena espectáculo en Toulouse;"),
        T("un tribute musical ;", "a musical tribute;", "un tributo musical;"),
        T("une sortie en couple ;", "a night out as a couple;", "una salida en pareja;"),
        T("une soirée entre amis ;", "an evening with friends;", "una velada con amigos;"),
        T("une soirée festive de fin d’année ;", "a festive end-of-year evening;", "una velada festiva de fin de año;"),
        T("ou simplement pour rire et vous amuser.", "or simply to laugh and have fun.", "o simplemente para reír y divertirse."),
      ],
      conclusion: T(
        "Vous venez de plus loin ? Notre sélection de [visites à Toulouse](/visites-toulouse) vous aidera à compléter le week-end.",
        "Coming from further afield? Our selection of [things to see in Toulouse](/visites-toulouse) will help you round off the weekend.",
        "¿Viene de más lejos? Nuestra selección de [visitas en Toulouse](/visites-toulouse) le ayudará a completar el fin de semana.",
      ),
    },
  },

  // Bar lounge — sans visuel : la seule photo du bar est la vignette d’une
  // video, bouton de lecture incruste.
  {
    type: "texte",
    contenu: {
      fond_gris: true,
      titre: T(
        "Une soirée chill, conviviale et festive au Palladia",
        "A relaxed, friendly and festive evening at the Palladia",
        "Una velada tranquila, agradable y festiva en el Palladia",
      ),
      paragraphes: [
        T(
          "Vous avez plutôt envie d’une soirée chill à Toulouse ?",
          "More in the mood for a laid-back evening in Toulouse?",
          "¿Le apetece más bien una velada tranquila en Toulouse?",
        ),
        T(
          "Le Palladia est aussi un lieu où l’on vient prendre son temps. Avant ou après le spectacle, profitez de l’ambiance du [bar lounge](/restaurant) pour prolonger la soirée autour d’un verre.",
          "The Palladia is also a place to take your time. Before or after the show, enjoy the atmosphere of the [lounge bar](/restaurant) and make the evening last over a drink.",
          "El Palladia es también un lugar donde tomarse su tiempo. Antes o después del espectáculo, disfrute del ambiente del [bar lounge](/restaurant) para alargar la velada con una copa.",
        ),
        T(
          "L’atmosphère du bar est pensée comme un espace calme, accueillant et cosy, idéal pour prendre un cocktail et prolonger les échanges après une soirée spectacle.",
          "The bar is designed as a calm, welcoming and cosy space, ideal for a cocktail and more conversation after a show.",
          "El bar está pensado como un espacio tranquilo, acogedor y cálido, ideal para tomar un cóctel y prolongar la conversación después del espectáculo.",
        ),
        T(
          "Et pour ne pas reprendre la route, [nos chambres](/chambres) vous attendent à quelques pas de la salle.",
          "And to avoid driving home, [our rooms](/chambres) are just a few steps from the auditorium.",
          "Y para no tener que volver en coche, [nuestras habitaciones](/chambres) le esperan a pocos pasos de la sala.",
        ),
        T(
          "Que vous soyez plutôt soirée détente, soirée festive, dîner entre amis ou grande sortie culturelle, l’objectif reste le même : profiter, rire, s’amuser et partager un bon moment.",
          "Whether you prefer a relaxed evening, a festive night, dinner with friends or a big cultural outing, the aim is the same: enjoy yourself, laugh, have fun and share a good time.",
          "Tanto si prefiere una velada de relax, una noche festiva, una cena con amigos o una gran salida cultural, el objetivo es el mismo: disfrutar, reír, divertirse y compartir un buen momento.",
        ),
      ],
    },
  },

  // Fetes de fin d'annee
  {
    type: "texte",
    contenu: {
      titre: T(
        "Une idée de sortie pour les fêtes de fin d’année à Toulouse",
        "A night-out idea for the festive season in Toulouse",
        "Una idea de salida para las fiestas de fin de año en Toulouse",
      ),
      paragraphes: [
        T(
          "La fin d’année est le moment idéal pour se retrouver.",
          "The end of the year is the perfect time to get together.",
          "El final del año es el momento ideal para reencontrarse.",
        ),
        T(
          "Après une journée de travail, pour célébrer une occasion particulière, organiser une sortie entre collègues ou simplement passer une bonne soirée avec ses proches, un dîner spectacle à Toulouse est une idée originale pour créer de beaux souvenirs.",
          "After a day at work, to celebrate a special occasion, organise an outing with colleagues or simply spend a good evening with loved ones, a dinner show in Toulouse is an original way to create lasting memories.",
          "Después de una jornada de trabajo, para celebrar una ocasión especial, organizar una salida entre compañeros o simplemente pasar una buena velada con los suyos, una cena espectáculo en Toulouse es una idea original para crear bonitos recuerdos.",
        ),
        T(
          "Le Palladia propose une programmation éclectique qui permet de varier les plaisirs : humour, improvisation, magie, mentalisme, gospel et musique.",
          "The Palladia offers an eclectic programme with something for every mood: comedy, improv, magic, mentalism, gospel and music.",
          "El Palladia propone una programación ecléctica para variar los placeres: humor, improvisación, magia, mentalismo, góspel y música.",
        ),
        T(
          "Alors, plutôt que de chercher pendant des heures où sortir à Toulouse, choisissez votre spectacle, invitez vos proches et profitez de la soirée !",
          "So rather than spending hours looking for where to go out in Toulouse, choose your show, invite your loved ones and enjoy the evening!",
          "Así que, en lugar de pasar horas buscando adónde salir en Toulouse, elija su espectáculo, invite a los suyos y ¡disfrute de la velada!",
        ),
        T(
          "Et pour le 31 décembre, pensez à notre [soirée du réveillon](/reveillon-toulouse).",
          "And for 31 December, have a look at our [New Year’s Eve party](/reveillon-toulouse).",
          "Y para el 31 de diciembre, piense en nuestra [cena de Nochevieja](/reveillon-toulouse).",
        ),
      ],
    },
  },

  // FAQ, balisee FAQPage : aucun lien dans les reponses
  {
    type: "sections",
    contenu: {
      faq: true,
      fond_gris: true,
      titre: T(
        "Questions fréquentes sur les spectacles du Palladia",
        "Frequently asked questions about shows at the Palladia",
        "Preguntas frecuentes sobre los espectáculos del Palladia",
      ),
      taille_titre: "moyen",
      sections: [
        {
          titre: T(
            "Quels spectacles sont programmés à l’Hôtel Palladia en fin d’année 2026 ?",
            "Which shows are on at the Hôtel Palladia at the end of 2026?",
            "¿Qué espectáculos hay programados en el Hôtel Palladia a finales de 2026?",
          ),
          intro: T(
            "Quatre soirées : Olivier & Max improvisent le samedi 3 octobre 2026, Kevin Micoud, magicien mentaliste, le samedi 7 novembre, Gospel Experience avec Kathy Boyé le samedi 28 novembre et un tribute Céline Dion & Jean-Jacques Goldman le samedi 12 décembre.",
            "Four evenings: Olivier & Max improvisent on Saturday 3 October 2026, Kevin Micoud, magician and mentalist, on Saturday 7 November, Gospel Experience with Kathy Boyé on Saturday 28 November and a Céline Dion & Jean-Jacques Goldman tribute on Saturday 12 December.",
            "Cuatro veladas: Olivier & Max improvisent el sábado 3 de octubre de 2026, Kevin Micoud, mago mentalista, el sábado 7 de noviembre, Gospel Experience con Kathy Boyé el sábado 28 de noviembre y un tributo a Céline Dion y Jean-Jacques Goldman el sábado 12 de diciembre.",
          ),
        },
        {
          titre: T(
            "Comment se déroule une soirée dîner & spectacle au Palladia ?",
            "How does a dinner & show evening at the Palladia work?",
            "¿Cómo se desarrolla una velada de cena y espectáculo en el Palladia?",
          ),
          intro: T(
            "Le dîner est servi à 19h30, puis place au spectacle. La formule est proposée pour les soirées Kevin Micoud et Gospel Experience, dont le spectacle commence à 21h, et pour le tribute Céline Dion & Jean-Jacques Goldman, joué au salon Opéra. Le spectacle d’Olivier & Max, à 21h, est proposé sans formule dîner.",
            "Dinner is served at 7.30pm, then it is time for the show. The package is available for the Kevin Micoud and Gospel Experience evenings, whose shows start at 9pm, and for the Céline Dion & Jean-Jacques Goldman tribute, performed in the Opéra room. The Olivier & Max show, at 9pm, has no dinner package.",
            "La cena se sirve a las 19:30 y después llega el espectáculo. La fórmula se ofrece en las veladas de Kevin Micoud y Gospel Experience, cuyo espectáculo empieza a las 21:00, y en el tributo a Céline Dion y Jean-Jacques Goldman, que se representa en el salón Opéra. El espectáculo de Olivier & Max, a las 21:00, se ofrece sin fórmula de cena.",
          ),
        },
        {
          titre: T(
            "Comment réserver ses places ?",
            "How do I book tickets?",
            "¿Cómo reservar las entradas?",
          ),
          intro: T(
            "Les places se réservent en ligne, sur la billetterie de chaque spectacle, accessible depuis la page Nos spectacles du site de l’hôtel. Il est conseillé de réserver à l’avance.",
            "Tickets are booked online through each show’s ticketing page, available from the Our shows page on the hotel website. Booking ahead is recommended.",
            "Las entradas se reservan en línea, en la taquilla de cada espectáculo, accesible desde la página Nuestros espectáculos del sitio del hotel. Se recomienda reservar con antelación.",
          ),
        },
        {
          titre: T(
            "Où se déroulent les spectacles ?",
            "Where do the shows take place?",
            "¿Dónde tienen lugar los espectáculos?",
          ),
          intro: T(
            "À l’Hôtel Palladia, 271 avenue de Grande-Bretagne, 31300 Toulouse, dans le quartier de Purpan. Selon la soirée, le spectacle a lieu dans l’amphithéâtre de 285 places ou au salon Opéra.",
            "At the Hôtel Palladia, 271 avenue de Grande-Bretagne, 31300 Toulouse, in the Purpan district. Depending on the evening, the show takes place in the 285-seat amphitheatre or in the Opéra room.",
            "En el Hôtel Palladia, 271 avenue de Grande-Bretagne, 31300 Toulouse, en el barrio de Purpan. Según la velada, el espectáculo tiene lugar en el anfiteatro de 285 plazas o en el salón Opéra.",
          ),
        },
        {
          titre: T(
            "Peut-on se garer facilement ?",
            "Is parking easy?",
            "¿Es fácil aparcar?",
          ),
          intro: T(
            "Oui. L’hôtel dispose d’un parking gratuit de 250 places, avec des emplacements équipés de bornes de recharge électrique.",
            "Yes. The hotel has a free 250-space car park, with bays equipped with electric charging points.",
            "Sí. El hotel dispone de un aparcamiento gratuito de 250 plazas, con puntos de recarga para vehículos eléctricos.",
          ),
        },
        {
          titre: T(
            "Peut-on dormir sur place après le spectacle ?",
            "Can I stay the night after the show?",
            "¿Se puede dormir en el hotel después del espectáculo?",
          ),
          intro: T(
            "Oui. L’Hôtel Palladia est un hôtel 4 étoiles de 90 chambres : il suffit de réserver une chambre pour prolonger la soirée sans reprendre la route.",
            "Yes. The Hôtel Palladia is a 4-star hotel with 90 rooms: simply book a room to make the most of the evening without driving home.",
            "Sí. El Hôtel Palladia es un hotel de 4 estrellas con 90 habitaciones: basta con reservar una para alargar la velada sin tener que volver en coche.",
          ),
        },
      ],
    },
  },

  // Conclusion
  {
    type: "texte",
    contenu: {
      centre: true,
      titre: T(
        "Sortez, profitez et amusez-vous au Palladia",
        "Go out, enjoy yourself and have fun at the Palladia",
        "Salga, disfrute y diviértase en el Palladia",
      ),
      paragraphes: [
        T(
          "Le Palladia à Toulouse vous donne rendez-vous pour des soirées placées sous le signe de la culture, de la musique, de l’humour et du partage.",
          "The Palladia in Toulouse invites you to evenings devoted to culture, music, comedy and sharing.",
          "El Palladia de Toulouse le espera en veladas dedicadas a la cultura, la música, el humor y el compartir.",
        ),
        T(
          "Que vous soyez amateur de spectacle vivant, passionné de musique, fan de Céline Dion ou Jean-Jacques Goldman, curieux de découvrir le mentalisme ou simplement à la recherche d’une bonne idée de sortie à Toulouse, la programmation du Palladia vous offre plusieurs occasions de vivre une soirée différente.",
          "Whether you love live performance, are passionate about music, a fan of Céline Dion or Jean-Jacques Goldman, curious about mentalism or simply looking for a good night-out idea in Toulouse, the Palladia’s programme offers several chances to enjoy a different kind of evening.",
          "Tanto si es aficionado a las artes escénicas, apasionado de la música, fan de Céline Dion o de Jean-Jacques Goldman, curioso por descubrir el mentalismo o simplemente busca una buena idea para salir en Toulouse, la programación del Palladia le ofrece varias ocasiones de vivir una velada diferente.",
        ),
        T(
          "Un dîner, un spectacle, des rires, de la musique et surtout le plaisir d’être ensemble.",
          "A dinner, a show, laughter, music and above all the pleasure of being together.",
          "Una cena, un espectáculo, risas, música y, sobre todo, el placer de estar juntos.",
        ),
        T(
          "Découvrez la programmation, choisissez votre soirée et réservez vos places pour profiter des spectacles de fin d’année à Toulouse au Palladia.",
          "Discover the programme, choose your evening and book your seats for the end-of-year shows at the Palladia in Toulouse.",
          "Descubra la programación, elija su velada y reserve sus entradas para disfrutar de los espectáculos de fin de año en el Palladia de Toulouse.",
        ),
      ],
      boutons: [
        {
          label: T("Voir toute la programmation", "See the full programme", "Ver toda la programación"),
          href: "/spectacle-toulouse",
        },
        {
          label: T("La formule dîner & spectacle", "The dinner & show package", "La fórmula cena y espectáculo"),
          href: "/diner-spectacles-toulouse",
        },
      ],
      note: T(
        "Hôtel Palladia – 271 avenue de Grande-Bretagne – 31300 Toulouse",
        "Hôtel Palladia – 271 avenue de Grande-Bretagne – 31300 Toulouse",
        "Hôtel Palladia – 271 avenue de Grande-Bretagne – 31300 Toulouse",
      ),
    },
  },
];

/* --- SQL --- */
const q = (s) => `'${String(s).replace(/'/g, "''")}'`;
const lignes = [
  "-- ---------------------------------------------------------------------------",
  "-- Article « Sortir à Toulouse : les spectacles de fin d’année » (/sortir-a-toulouse-spectacles).",
  "--",
  "-- Genere par scripts/generate-article-spectacles.mjs : ne pas editer a la main.",
  "--",
  "-- Texte et affiches fournis par l’hotel en septembre 2026, pour remplir les",
  "-- deux prochaines dates. Mots-cles vises : « sortir a Toulouse », « diner",
  "-- spectacle Toulouse », « que faire a Toulouse le soir ».",
  "--",
  "-- L’adresse ne porte pas l’annee : elle doit survivre a la saison. Apres le",
  "-- 12 decembre 2026, on reecrit l’article avec la programmation suivante",
  "-- plutot que de l’archiver — les liens entrants poses par 0073 restent bons.",
  "--",
  "-- Relançable sans risque : les blocs sont effaces puis reinseres.",
  "-- ---------------------------------------------------------------------------",
  "",
  "-- L’article ouvre la liste des actualites : les autres reculent d’un rang,",
  "-- a la premiere execution seulement.",
  "update public.articles",
  "set position = position + 1",
  "where locale = 'fr'",
  "  and position >= 1",
  "  and not exists (",
  `    select 1 from public.articles where slug = ${q(SLUG)} and locale = 'fr'`,
  "  );",
  "",
  "insert into public.articles (",
  "  slug, locale, titre, titre_page, sous_titre, chapo, image_hero, image_vignette, statut, date_publication, position, seo_title, seo_description",
  ")",
  "values (",
  `  ${q(SLUG)}, 'fr', ${q(article.titre)}, null, ${q(article.sous_titre)}, ${q(article.chapo)},`,
  `  ${q(article.image_hero)}, ${q(article.image_vignette)}, 'publie', '2026-09-24 10:00:00', 1,`,
  `  ${q(article.seo_title)}, ${q(article.seo_description)}`,
  ")",
  "on conflict (slug, locale) do update set",
  "  titre = excluded.titre, titre_page = excluded.titre_page, sous_titre = excluded.sous_titre,",
  "  chapo = excluded.chapo, image_hero = excluded.image_hero, image_vignette = excluded.image_vignette,",
  "  statut = excluded.statut, date_publication = excluded.date_publication, position = excluded.position,",
  "  seo_title = excluded.seo_title, seo_description = excluded.seo_description;",
  "",
  "delete from public.article_blocs",
  `where article_id in (select id from public.articles where slug = ${q(SLUG)} and locale = 'fr');`,
  "",
  "insert into public.article_blocs (article_id, ordre, type, contenu)",
  "select a.id, v.ordre, v.type::bloc_type, v.contenu",
  "from public.articles a,",
  "(values",
  blocs
    .map((b, i) => `  (${i}, ${q(b.type)}, ${q(JSON.stringify(b.contenu, null, 2))}::jsonb)`)
    .join(",\n\n"),
  ") as v(ordre, type, contenu)",
  `where a.slug = ${q(SLUG)} and a.locale = 'fr';`,
  "",
];
writeFileSync(SORTIE, lignes.join("\n"), "utf8");
console.log(`${SORTIE} — ${blocs.length} blocs`);

/* --- Lots du dictionnaire --- */
const argLots = process.argv.find((a) => a.startsWith("--lots="))?.slice(7);
if (argLots) {
  for (const langue of ["en", "es"]) {
    const chemin = join(argLots, `spectacles.${langue}.json`);
    writeFileSync(chemin, JSON.stringify(lots[langue], null, 2), "utf8");
    console.log(`${chemin} — ${Object.keys(lots[langue]).length} phrases`);
  }
}

/* --- Ecriture en base, via PostgREST (pas de DDL ici) --- */
if (process.argv.includes("--appliquer")) {
  const env = Object.fromEntries(
    readFileSync(join(racine, ".env.local"), "utf8")
      .split(/\r?\n/)
      .filter((l) => l.includes("=") && !l.startsWith("#"))
      .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()]),
  );
  const url = `${env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1`;
  const cle = env.SUPABASE_SERVICE_ROLE_KEY;
  const entetes = {
    apikey: cle,
    Authorization: `Bearer ${cle}`,
    "Content-Type": "application/json",
  };
  const appel = async (chemin, options = {}) => {
    const r = await fetch(`${url}/${chemin}`, { headers: entetes, ...options });
    if (!r.ok) throw new Error(`${chemin} : ${r.status} ${await r.text()}`);
    const corps = await r.text();
    return corps ? JSON.parse(corps) : null;
  };

  const existant = await appel(`articles?select=id&slug=eq.${SLUG}&locale=eq.fr`);
  if (existant.length === 0) {
    const autres = await appel("articles?select=id,position&locale=eq.fr&position=gte.1");
    for (const a of autres) {
      await appel(`articles?id=eq.${a.id}`, {
        method: "PATCH",
        body: JSON.stringify({ position: a.position + 1 }),
      });
    }
  }

  const [ligne] = await appel("articles?on_conflict=slug,locale", {
    method: "POST",
    headers: { ...entetes, Prefer: "resolution=merge-duplicates,return=representation" },
    body: JSON.stringify({
      slug: SLUG,
      locale: "fr",
      ...article,
      titre_page: null,
      statut: "publie",
      date_publication: "2026-09-24 10:00:00",
      position: 1,
    }),
  });

  await appel(`article_blocs?article_id=eq.${ligne.id}`, { method: "DELETE" });
  await appel("article_blocs", {
    method: "POST",
    body: JSON.stringify(
      blocs.map((b, ordre) => ({ article_id: ligne.id, ordre, type: b.type, contenu: b.contenu })),
    ),
  });
  console.log(`Article ${SLUG} écrit en base (${ligne.id}).`);
}
