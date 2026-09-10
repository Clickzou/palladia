import { createClient } from "./supabase/server";
import { supabaseConfigure } from "./blog";
import { offresSaison } from "@/data/offres-saison";

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
 * Repli tant que la migration 0069 n'a pas ete jouee dans l'editeur SQL.
 *
 * PostgREST ne sait pas creer de table : le DDL doit etre colle a la main.
 * D'ici la, la page continue d'afficher les offres ecrites dans
 * src/data/offres-saison.ts, exactement comme avant — mieux vaut une offre
 * figee qu'une page vide. Ce pont, et le tableau `offres` de ce fichier,
 * disparaissent une fois la table en place.
 */
function offresDeSecours(): Offre[] {
  return offresSaison.offres.map((o, i) => ({
    id: o.slug,
    slug: o.slug,
    titre: o.titre,
    prix: o.prix,
    paragraphes: [...o.paragraphes],
    conditions: "conditions" in o ? (o.conditions as string) : null,
    inclus: [...o.inclus],
    affiche: o.affiche,
    affiche_alt: o.afficheAlt,
    visible_du: offresSaison.validite.debut,
    visible_au: offresSaison.validite.fin,
    position: i + 1,
  }));
}

/**
 * Offres affichables aujourd'hui.
 *
 * La vue `offres_en_cours` filtre sur `current_date` : une offre echue
 * disparait d'elle-meme, sans intervention. C'est tout l'objet de la table —
 * le site WordPress laissait une offre 2025 en ligne en 2026.
 *
 * Un tableau vide est une reponse legitime, pas une panne : entre deux
 * saisons, la page affiche ses sections permanentes sans aucune offre.
 */
export async function offresEnCours(): Promise<Offre[]> {
  if (!supabaseConfigure) return offresDeSecours();

  const supabase = await createClient();
  const { data, error } = await supabase.from("offres_en_cours").select("*");

  if (error) {
    // `42P01` : la table n'existe pas encore. Toute autre erreur est un vrai
    // incident, mais le repli reste preferable a une page amputee.
    console.error("Lecture des offres impossible :", error.message);
    return offresDeSecours();
  }
  return data ?? [];
}
