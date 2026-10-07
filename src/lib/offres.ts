import { createClient } from "./supabase/server";
import { supabaseConfigure } from "./blog";
import type { ArticleComplet, BlocContenu } from "./supabase/types";

export type Offre = {
  id: string;
  slug: string;
  titre: string;
  prix: string | null;
  paragraphes: string[];
  conditions: string | null;
  inclus: string[];
  affiche: string | null;
  affiche_alt: string | null;
  visible_du: string;
  visible_au: string;
  position: number | null;
};

/**
 * Offres affichables aujourd'hui.
 *
 * La vue `offres_en_cours` filtre sur `current_date` : une offre echue
 * disparait d'elle-meme, sans intervention ni tache planifiee. C'est tout
 * l'objet de la table (0069) — les offres vivaient auparavant en dur dans
 * src/data/offres-saison.ts, sans aucune date, et une offre de 2025 est restee
 * en ligne jusqu'en septembre 2026.
 *
 * Un tableau vide est une reponse legitime, pas une panne : entre deux
 * saisons, la page le dit et garde ses sections permanentes.
 */
export async function offresEnCours(): Promise<Offre[]> {
  if (!supabaseConfigure) return [];

  const supabase = await createClient();
  const { data, error } = await supabase.from("offres_en_cours").select("*");

  if (error) {
    console.error("Lecture des offres impossible :", error.message);
    return [];
  }
  return data ?? [];
}

/**
 * Remplace le texte des blocs relies a une offre (`contenu.offre`) par le
 * contenu de l'offre, tant qu'elle est en cours. Hors de sa fenetre, l'offre
 * n'est pas renvoyee par `offres_en_cours` et le bloc garde son texte
 * permanent : un tarif ne survit jamais a sa saison dans un article.
 *
 * A appeler AVANT traduireContenu, pour que les phrases de l'offre passent
 * par le dictionnaire comme le reste de l'article.
 */
export async function appliquerOffres(article: ArticleComplet): Promise<ArticleComplet> {
  const relies = article.blocs.some(
    (b) => b.type === "texte" && (b.contenu as BlocContenu["texte"]).offre,
  );
  if (!relies) return article;

  const offres = await offresEnCours();
  return {
    ...article,
    blocs: article.blocs.map((b) => {
      const c = b.contenu as BlocContenu["texte"];
      if (b.type !== "texte" || !c.offre) return b;
      const offre = offres.find((o) => o.slug === c.offre);
      if (!offre) return b;
      return {
        ...b,
        contenu: {
          ...c,
          titre: c.titre_offre ?? c.titre,
          paragraphes: offre.paragraphes,
          liste: offre.inclus.length > 0 ? offre.inclus : undefined,
          note: offre.conditions ?? c.note,
        },
      };
    }),
  };
}
