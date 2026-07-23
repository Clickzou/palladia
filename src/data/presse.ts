/** Une parution : le média, son titre, le lien, et la capture de l’article. */
type Parution = {
  media: string;
  titre: string;
  url: string;
  /** `null` tant que le visuel reste à récupérer : la carte affiche le titre. */
  image: string | null;
};

/**
 * Revues de presse. Les visuels sont des captures des articles publiés ;
 * `image: null` signifie qu’elle reste à récupérer.
 */
export const presse: {
  metaTitle: string;
  metaDescription: string;
  title: string;
  subtitle: string;
  articles: Parution[];
} = {
  metaTitle: "Presse - Le Palladia hôtel 4 étoiles Toulouse",
  metaDescription:
    "Découvrez les actualités de l’Hôtel Palladia à Toulouse dans les différentes revues de presse.",
  title: "Presse",
  subtitle: "Découvrez les actualités de l’Hôtel Palladia dans les différentes revues de presse",

  articles: [
    {
      media: "Tendance Hotellerie",
      titre:
        "Hôtel Palladia Toulouse : une nouvelle expérience hôtelière signée Design D’S-Pace",
      url: "https://www.tendancehotellerie.fr/articles-breves/communique-de-presse/25741-article/hotel-palladia-toulouse-une-nouvelle-experience-hoteliere-signee-design-d-s-pace",
      // Le visuel de l'article : une chambre redecoree par Design D'S-Pace,
      // fournie par l'hotel. Cette carte etait la seule sans image.
      image: "/images/presse/tendance-hotellerie.jpg",
    },
    {
      media: "La Dépêche",
      titre:
        "À Purpan, l’hôtel Palladia relance la bistronomie avec un nouveau chef et un menu complet à 30 €",
      url: "https://www.ladepeche.fr/2025/06/10/a-purpan-lhotel-palladia-relance-la-bistronomie-avec-un-nouveau-chef-et-un-menu-complet-a-30-eur-12752637.php",
      image: "/images/presse/la-depeche.png",
    },
    {
      media: "Actu Toulouse",
      titre:
        "Toulouse. Le Palladia s’offre un chef formé auprès d’étoilés, dans le but de « gastronomiser » sa cuisine",
      url: "https://actu.fr/occitanie/toulouse_31555/toulouse-le-palladia-s-offre-un-chef-forme-aupres-d-etoiles-dans-le-but-de-gastronomiser-sa-cuisine_62753044.html",
      image: "/images/presse/actu-toulouse.png",
    },
    {
      media: "Le Diagonal",
      titre: "[Restaurant] Nouveau chef pour l’Hôtel Palladia",
      url: "https://journal-diagonale.fr/restaurant-nouveau-chef-pour-lhotel-palladia",
      image: "/images/presse/journal-diagonal.png",
    },
    {
      media: "Bernieshoot",
      titre:
        "Jeremy Gabarrot nouveau chef aux commandes du restaurant Le Palladia à Toulouse",
      url: "https://www.bernieshoot.fr/2025/06/jeremy-gabarrot-chef-restaurant-le-palladia-toulouse.html",
      image: "/images/presse/bernieshoot.png",
    },
  ],
};
