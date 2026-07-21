"use server";

import { createClient } from "@/lib/supabase/server";
import { supabaseConfigure } from "@/lib/blog";

export type EtatDevis = { ok: boolean; message: string } | null;

/**
 * Enregistre une demande de devis. Les politiques RLS autorisent l’insertion
 * anonyme mais interdisent toute lecture : une demande déposée n’est visible
 * que par l’équipe authentifiée.
 *
 * ATTENTION — aucune notification n’est envoyée pour l’instant. L’ancien site
 * prévenait `destinataires.devis` (voir config/site.ts) à chaque demande ;
 * ici, elles s’empilent en base sans que personne ne soit alerté. Il reste à
 * brancher un service d’envoi (Resend, SMTP OVH…) et à fournir sa clé.
 */
export async function envoyerDevis(
  _etat: EtatDevis,
  formData: FormData,
): Promise<EtatDevis> {
  const champ = (nom: string) => String(formData.get(nom) ?? "").trim();

  const nom = champ("nom");
  const prenom = champ("prenom");
  const email = champ("email");

  if (!nom || !prenom || !email) {
    return { ok: false, message: "Merci de renseigner vos nom, prénom et e-mail." };
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { ok: false, message: "L’adresse e-mail ne semble pas valide." };
  }
  // Piège à robots : un champ masqué que seul un automate remplit
  if (champ("site_web")) {
    return { ok: true, message: "Merci, votre demande a bien été envoyée." };
  }

  if (!supabaseConfigure) {
    return {
      ok: false,
      message: "Le formulaire n’est pas encore relié à la base. Merci de nous écrire à info@hotelpalladia.com.",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("demandes_devis").insert({
    type: champ("type") || "autre",
    nom,
    prenom,
    telephone: champ("telephone") || null,
    email,
    entreprise: champ("entreprise") || null,
    budget: champ("budget") || null,
    date_evenement: champ("date_evenement") || null,
    date_flexible: champ("date_flexible") !== "Non",
    message: champ("message") || null,
    locale: champ("locale") || "fr",
  });

  if (error) {
    console.error("Enregistrement de la demande impossible :", error.message);
    return {
      ok: false,
      message: "Votre demande n’a pas pu être enregistrée. Merci de réessayer ou de nous appeler au 05 62 12 01 20.",
    };
  }

  return {
    ok: true,
    message: "Merci, votre demande a bien été envoyée. Notre équipe commerciale vous répondra rapidement.",
  };
}
