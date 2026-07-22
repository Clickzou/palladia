"use server";

import { traduireMenu, type ResultatTraduction } from "@/lib/traduction-menu";
import { createClient } from "@/lib/supabase/server";

/**
 * Traduit un menu en anglais et en espagnol.
 *
 * Cote serveur uniquement : la cle de l'API Claude ne doit jamais atteindre le
 * navigateur. On verifie aussi la session — sans quoi n'importe qui pourrait
 * appeler cette action et consommer le compte.
 */
export async function traduire(menu: unknown): Promise<ResultatTraduction> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { erreur: "Session expirée. Reconnectez-vous." };

  return traduireMenu(menu);
}
