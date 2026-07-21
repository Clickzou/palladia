/** Types du blog, alignés sur supabase/migrations/0001_blog.sql. */

export type ArticleStatut = "brouillon" | "publie" | "archive";

export type BlocType =
  | "texte"
  | "texte_image"
  | "cartes"
  | "bandeau"
  | "bandeau_image"
  | "carrousel"
  | "liste_cochee"
  | "citation"
  | "equipe"
  | "bouton"
  | "caracteristiques"
  | "menu"
  | "sections";

export type Article = {
  id: string;
  slug: string;
  locale: "fr" | "en" | "es";
  titre: string;
  /** Titre affiche en tete d’article quand il differe du titre WordPress. */
  titre_page: string | null;
  sous_titre: string | null;
  chapo: string | null;
  image_hero: string | null;
  image_vignette: string | null;
  statut: ArticleStatut;
  date_publication: string;
  seo_title: string | null;
  seo_description: string | null;
  groupe_id: string;
  /** Ordre d’affichage manuel ; null = classement par date */
  position: number | null;
};

/** Contenu de chaque type de bloc (colonne jsonb `contenu`). */
export type BlocContenu = {
  texte: {
    titre?: string;
    paragraphes: string[];
    liste?: string[];
    centre?: boolean;
    /**
     * Taille du titre : 19 px par defaut, 25 px (« moyen »), 40 px (« grand »)
     * ou 22 px en Roboto sans capitales dorées (« sous-titre »).
     */
    taille_titre?: "normal" | "moyen" | "grand" | "sous-titre";
    /** Visuel centre sous le texte */
    image?: string;
    alt?: string;
    /** Ligne en italique fermant la section */
    note?: string;
    /** Bande grise pleine largeur */
    fond_gris?: boolean;
    /** Gabarit etendu (1880 px) plutot que la largeur de contenu (1140 px) */
    large?: boolean;
    boutons?: { label: string; href: string; externe?: boolean }[];
  };
  texte_image: {
    titre?: string;
    /** Taille du titre : 19 px par defaut, 25 px (« moyen ») ou 40 px (« grand ») */
    taille_titre?: "normal" | "moyen" | "grand";
    /** Intitule dore place au-dessus du texte de la colonne */
    sous_titre?: string;
    /** Visuel bord a bord sur la moitie de l'ecran, texte sur l'autre */
    pleine_largeur?: boolean;
    /** Gabarit etendu (1680 px) plutot que la largeur de contenu (1140 px) */
    large?: boolean;
    /** Colonnes inegales : le texte occupe environ 60 % de la rangee */
    texte_dominant?: boolean;
    paragraphes: string[];
    liste?: string[];
    /** Paragraphe fermant la colonne de texte, sous la liste */
    conclusion?: string;
    /** Sous-sections titrees, dans la colonne de texte */
    sections?: { titre: string; intro?: string; items?: string[]; conclusion?: string }[];
    /** Boutons fermant la colonne de texte */
    boutons?: { label: string; href: string; externe?: boolean }[];
    image: string;
    alt: string;
    position: "gauche" | "droite";
    /** Proportions du visuel, au format CSS `aspect-ratio` (defaut 5 / 3) */
    ratio?: string;
    /** Bande grise pleine largeur */
    fond_gris?: boolean;
    /** Paragraphes pleine largeur sous les deux colonnes */
    apres?: string[];
    apres_liste?: string[];
  };
  cartes: {
    titre?: string;
    /** Taille du titre : 19 px par defaut, 25 px (« moyen ») ou 40 px (« grand ») */
    taille_titre?: "normal" | "moyen" | "grand";
    /** Bande grise pleine largeur derriere les cartes */
    fond_gris?: boolean;
    /** Place le titre de chaque carte sous son visuel plutot qu’au-dessus */
    titre_sous_image?: boolean;
    cartes: {
      titre: string;
      image?: string;
      alt?: string;
      paragraphes: string[];
      liste?: string[];
      /** Paragraphe fermant la carte, sous la liste */
      conclusion?: string;
    }[];
  };
  /** `accent` s’insere en gras entre `texte` et `suite`. */
  bandeau: { texte: string; accent?: string; suite?: string; sous_texte?: string };
  bandeau_image: {
    image: string;
    titre: string;
    paragraphes?: string[];
    liste?: string[];
    boutons?: { label: string; href: string }[];
  };
  carrousel: {
    images: { src: string; alt: string }[];
    /** Visuel unique affiche bord a bord plutot que centre a 1200 px */
    pleine_largeur?: boolean;
  };
  liste_cochee: {
    titre?: string;
    intro?: string;
    items: string[];
    conclusion?: string;
    /** Bande grise pleine largeur */
    fond_gris?: boolean;
  };
  /** Carte de menu : sections de plats, puis le tarif en bandeau sombre. */
  menu: {
    /** Titre de l'encadre (« Menu à 75€ TTC ») */
    titre?: string;
    /** Intitule de section, au-dessus de l'encadre */
    titre_section?: string;
    /** Taille du titre : 19 px par defaut, 25 px (« moyen ») ou 40 px (« grand ») */
    taille_titre?: "normal" | "moyen" | "grand";
    /** Lignes d'ouverture, avant les sections (apéritif, amuse-bouche…) */
    entree?: string[];
    sections: { titre: string; lignes: string[] }[];
    /**
     * Le site titre les services sur certaines cartes et les met simplement
     * en gras sur d'autres : `false` reproduit la seconde forme.
     */
    services_en_titre?: boolean;
    tarif?: { label: string; montant: string };
  };
  /** Suite de sous-sections titrees sous un meme intitule. */
  sections: {
    titre?: string;
    taille_titre?: "normal" | "moyen" | "grand";
    intro?: string;
    fond_gris?: boolean;
    /** Gabarit etendu (1880 px) plutot que la largeur de contenu (1140 px) */
    large?: boolean;
    /** Deux colonnes plutot qu'une seule pile */
    deux_colonnes?: boolean;
    sections: { titre: string; intro?: string; items?: string[]; conclusion?: string }[];
  };
  citation: { texte: string; auteur?: string };
  equipe: {
    intro?: string;
    adresse?: string[];
    membres: {
      nom: string;
      fonction: string;
      photo?: string;
      telephone?: string;
      email?: string;
    }[];
  };
  bouton: { boutons: { label: string; href: string; externe?: boolean }[] };
  caracteristiques: {
    titre?: string;
    /** `icone` reprend les noms exposés par components/icons.tsx */
    items: { icone?: string; label: string }[];
  };
};

export type Bloc<T extends BlocType = BlocType> = {
  id: string;
  article_id: string;
  ordre: number;
  type: T;
  contenu: BlocContenu[T];
};

export type ArticleComplet = Article & { blocs: Bloc[] };
