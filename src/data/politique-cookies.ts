/**
 * Politique de cookies de la v2.
 *
 * Réécrite pour refléter les services réellement utilisés : la version
 * WordPress décrivait Elementor, Complianz et Wistia, qui ont tous disparu.
 *
 * À compléter lors de l'ajout de Google Analytics et de Search Console.
 */
export const politiqueCookies = {
  metaTitle: "Politique de Cookies de Le Palladia : Sécurité & Confort",
  metaDescription:
    "Découvrez comment Le Palladia 4 étoiles respecte votre vie privée avec notre politique de cookies. Sécurité et confort assurés.",
  titre: "Politique de cookies",
  chapo:
    "Cette politique explique quels traceurs sont déposés lors de votre visite sur www.hotelpalladia.com, à quoi ils servent et comment maîtriser vos choix. Dernière mise à jour : juillet 2026.",

  sections: [
    {
      titre: "1. Notre principe",
      paragraphes: [
        "**Aucun traceur de mesure d’audience ou de contenu externe n’est déposé avant votre accord.** À votre première visite, un bandeau vous propose de tout accepter, de tout refuser ou de choisir catégorie par catégorie. Refuser est aussi simple qu’accepter : les deux boutons sont présentés au même niveau.",
        "Tant que vous n’avez pas fait de choix, seuls les éléments strictement nécessaires au fonctionnement du site sont actifs.",
        "Votre décision est conservée six mois, puis vous est redemandée. Vous pouvez en changer à tout moment via le lien « Gérer mes cookies » en bas de chaque page.",
      ],
    },
    {
      titre: "2. Ce qu’est un cookie",
      paragraphes: [
        "Un cookie est un petit fichier déposé par un site sur votre appareil, qui lui permet de vous reconnaître lors d’une visite ultérieure. Le terme est employé ici au sens large : il couvre aussi les technologies équivalentes, comme le stockage local du navigateur.",
      ],
    },
    {
      titre: "3. Cookies strictement nécessaires",
      paragraphes: [
        "**Toujours actifs.** Sans eux, le site ne peut pas fonctionner correctement. Ils ne servent ni à vous suivre, ni à vous profiler, et ne sont partagés avec personne.",
        "**Préférence de langue** — mémorise si vous consultez le site en français, anglais ou espagnol. Durée : la session de navigation.",
        "**Choix de cookies** — conserve votre décision pour ne pas vous la redemander à chaque page. Stocké dans votre navigateur, jamais transmis à nos serveurs. Durée : 6 mois.",
        "**Sécurité des formulaires** — protège l’envoi des demandes de devis contre les soumissions automatisées. Durée : la session.",
      ],
    },
    {
      titre: "4. Cookies de mesure d’audience",
      paragraphes: [
        "**Soumis à votre accord.** Ils nous indiquent quelles pages sont consultées et d’où viennent les visiteurs, afin d’améliorer le site. Les données sont agrégées : elles ne permettent pas de vous identifier.",
        "Si vous refusez cette catégorie, aucune mesure d’audience n’est effectuée et votre visite n’est pas comptabilisée.",
      ],
    },
    {
      titre: "5. Contenus externes",
      paragraphes: [
        "**Soumis à votre accord.** Certaines pages intègrent des contenus hébergés par des tiers, susceptibles de déposer leurs propres traceurs.",
        "**YouTube** (Google Ireland Limited) — vidéo de présentation du bar-lounge. Tant que vous n’avez pas cliqué, seule une image est affichée : le lecteur n’est chargé qu’à votre demande, et aucun cookie Google n’est déposé avant.",
        "**OpenStreetMap / uMap** — carte des lieux à visiter à Toulouse, sur la page Tourisme.",
        "Ces services disposent de leurs propres politiques de confidentialité, que nous vous invitons à consulter.",
      ],
    },
    {
      titre: "6. Ce que nous n’utilisons pas",
      paragraphes: [
        "Nous ne déposons **aucun cookie publicitaire**, ne pratiquons **aucun reciblage** et ne revendons **aucune donnée** de navigation. Le site ne comporte pas de régie publicitaire.",
      ],
    },
    {
      titre: "7. Gérer vos choix",
      paragraphes: [
        "**Depuis le site** — le lien « Gérer mes cookies », en bas de chaque page, réaffiche le bandeau et vous permet de modifier votre décision.",
        "**Depuis votre navigateur** — tous les navigateurs permettent de supprimer les cookies existants, d’en bloquer le dépôt ou d’être averti avant chacun. Ces réglages se trouvent dans les préférences de confidentialité. Notez que bloquer l’ensemble des cookies peut altérer le fonctionnement du site.",
      ],
    },
    {
      titre: "8. Vos droits",
      paragraphes: [
        "Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité sur vos données personnelles. Pour l’exercer, écrivez-nous à info@hotelpalladia.com ou par courrier à : Hôtel Palladia, 271 avenue de Grande Bretagne, 31300 Toulouse.",
        "Vous pouvez également introduire une réclamation auprès de la CNIL, autorité de contrôle française : www.cnil.fr",
      ],
    },
    {
      titre: "9. Coordonnées",
      paragraphes: [
        "Hôtel Palladia — 271 avenue de Grande Bretagne, 31300 Toulouse, France",
        "Téléphone : +33 5 62 12 01 20 — E-mail : info@hotelpalladia.com — Site : www.hotelpalladia.com",
      ],
    },
  ],

  /** Récapitulatif des traceurs, par catégorie. */
  services: [
    ["Préférence de langue", "Nécessaire — session"],
    ["Choix de cookies", "Nécessaire — 6 mois"],
    ["Sécurité des formulaires", "Nécessaire — session"],
    ["Mesure d’audience", "Statistiques — soumis à consentement"],
    ["YouTube", "Contenus externes — chargé au clic uniquement"],
    ["OpenStreetMap / uMap", "Contenus externes — page Tourisme"],
  ] as const,
} as const;
