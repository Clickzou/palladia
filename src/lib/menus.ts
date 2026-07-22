import { createClient } from "./supabase/server";
import { supabaseConfigure } from "./blog";
import { restaurant } from "@/data/restaurant";

/** Menu de la semaine : trois services, chacun avec ses choix. */
export type MenuSemaine = {
  titre: string;
  sections: { titre: string; choix: string[] }[];
  note: string;
};

/** Menu du jour : formules, tarifs a la carte et menu enfant. */
export type MenuJour = {
  titre: string;
  sousTitre: string;
  intro: string;
  formules: { prix: string; detail: string }[];
  tarifsTitre: string;
  tarifs: string[];
  enfant: { titre: string; prix: string; detail: string };
};

export type Menus = { semaine: MenuSemaine; jour: MenuJour };

/** Les menus figes dans le code, servis tant que la base n'a rien. */
const SECOURS: Menus = {
  semaine: restaurant.menuSemaine as unknown as MenuSemaine,
  jour: restaurant.menuJour as unknown as MenuJour,
};

/**
 * Menus du restaurant dans la langue demandee.
 *
 * Deux filets de securite : sans traduction enregistree on sert le français,
 * et sans base joignable on sert la version du code. La carte d'un restaurant
 * ne doit jamais disparaitre d'une page parce qu'une requete a echoue.
 */
export async function lireMenus(locale: string): Promise<Menus> {
  if (!supabaseConfigure) return SECOURS;

  const supabase = await createClient();
  const { data, error } = await supabase.from("menus").select("cle, fr, en, es");

  if (error || !data?.length) {
    if (error) console.error("Lecture des menus impossible :", error.message);
    return SECOURS;
  }

  const choisir = (ligne: Record<string, unknown>) =>
    (locale !== "fr" ? (ligne[locale] as unknown) : null) ?? ligne.fr;

  const semaine = data.find((l) => l.cle === "semaine");
  const jour = data.find((l) => l.cle === "jour");

  return {
    semaine: semaine ? (choisir(semaine) as MenuSemaine) : SECOURS.semaine,
    jour: jour ? (choisir(jour) as MenuJour) : SECOURS.jour,
  };
}
