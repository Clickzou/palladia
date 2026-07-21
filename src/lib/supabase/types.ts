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
  | "caracteristiques";

export type Article = {
  id: string;
  slug: string;
  locale: "fr" | "en" | "es";
  titre: string;
  sous_titre: string | null;
  chapo: string | null;
  image_hero: string | null;
  image_vignette: string | null;
  statut: ArticleStatut;
  date_publication: string;
  seo_title: string | null;
  seo_description: string | null;
  groupe_id: string;
  /** Ordre d'affichage manuel ; null = classement par date */
  position: number | null;
};

/** Contenu de chaque type de bloc (colonne jsonb `contenu`). */
export type BlocContenu = {
  texte: { titre?: string; paragraphes: string[]; liste?: string[]; centre?: boolean };
  texte_image: {
    titre?: string;
    paragraphes: string[];
    liste?: string[];
    image: string;
    alt: string;
    position: "gauche" | "droite";
  };
  cartes: {
    titre?: string;
    /** Bande grise pleine largeur derriere les cartes */
    fond_gris?: boolean;
    /** Place le titre de chaque carte sous son visuel plutot qu'au-dessus */
    titre_sous_image?: boolean;
    cartes: { titre: string; image?: string; alt?: string; paragraphes: string[]; liste?: string[] }[];
  };
  bandeau: { texte: string; accent?: string; sous_texte?: string };
  bandeau_image: {
    image: string;
    titre: string;
    paragraphes?: string[];
    liste?: string[];
    boutons?: { label: string; href: string }[];
  };
  carrousel: { images: { src: string; alt: string }[] };
  liste_cochee: { titre?: string; intro?: string; items: string[]; conclusion?: string };
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
