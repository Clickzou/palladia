import { createClient } from "./supabase/server";
import { supabaseConfigure } from "./blog";

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
