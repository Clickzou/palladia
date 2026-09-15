import { createClient } from "./supabase/server";
import { supabaseConfigure } from "./blog";

export type Evenement = {
  id: string;
  titre: string;
  sous_titre: string | null;
  categorie: string;
  affiche: string | null;
  affiche_alt: string | null;
  debut: string;
  lieu: string | null;
  tarif: string | null;
  description: string | null;
  lien_billetterie: string | null;
};

/** Prochaines représentations (les dates passées disparaissent d’elles-mêmes). */
export async function prochainsEvenements(limite = 12): Promise<Evenement[]> {
  if (!supabaseConfigure) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("evenements_a_venir")
    .select("*")
    .limit(limite);

  if (error) {
    console.error("Lecture de la programmation impossible :", error.message);
    return [];
  }
  return data ?? [];
}

/** Représentations passées, pour une rubrique « ils sont passés chez nous ». */
export async function evenementsPasses(limite = 8): Promise<Evenement[]> {
  if (!supabaseConfigure) return [];
  const supabase = await createClient();
  const { data } = await supabase.from("evenements_passes").select("*").limit(limite);
  return data ?? [];
}

/**
 * « samedi 6 décembre 2025 », sans l'heure.
 *
 * Les horaires figurent deja dans le sous-titre (« Dîner : 19h30 · Spectacle :
 * 21h00 »), et l'heure tiree de `debut` les contredisait : les serveurs sont a
 * l'heure UTC, un spectacle a 21h00 s'affichait « à 19h00 ». Le fuseau reste
 * cale sur Paris pour que le jour, lui, ne bascule jamais.
 */
export function formaterDate(iso: string, locale = "fr") {
  return new Date(iso).toLocaleDateString(locale, {
    timeZone: "Europe/Paris",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
