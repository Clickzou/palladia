"use server";

import { createClient } from "@/lib/supabase/server";
import { supabaseConfigure } from "@/lib/blog";
import { envoyerCourriel } from "@/lib/courriel";
import { destinataires } from "@/config/site";

export type EtatDevis = { ok: boolean; message: string } | null;

/**
 * Enregistre une demande de devis. Les politiques RLS autorisent l’insertion
 * anonyme mais interdisent toute lecture : une demande déposée n’est visible
 * que par l’équipe authentifiée.
 *
 * L’équipe est prévenue par courriel, comme sur l’ancien site. Un envoi manqué
 * ne fait pas échouer la demande : elle est déjà enregistrée, et la perdre
 * serait plus grave que de ne pas notifier.
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

  const intitules: Record<string, string> = {
    salle_reunion: "Salle de réunion",
    mariage: "Mariage",
    evenement_hybride: "Événement hybride",
    reservation_groupe: "Réservation de groupe",
    autre: "Demande générale",
  };
  const type = champ("type") || "autre";

  await envoyerCourriel({
    destinataires: destinataires.devis,
    sujet: `Demande de devis — ${intitules[type] ?? type} — ${prenom} ${nom}`,
    repondreA: email,
    lignes: [
      `Type de demande : ${intitules[type] ?? type}`,
      `Nom : ${prenom} ${nom}`,
      `E-mail : ${email}`,
      `Téléphone : ${champ("telephone") || "non renseigné"}`,
      `Entreprise : ${champ("entreprise") || "non renseignée"}`,
      `Date souhaitée : ${champ("date_evenement") || "non renseignée"}` +
        (champ("date_flexible") === "Non" ? " (date ferme)" : " (date flexible)"),
      `Budget : ${champ("budget") || "non renseigné"}`,
      "",
      champ("message") || "(aucun message)",
    ],
  });

  return {
    ok: true,
    message: "Merci, votre demande a bien été envoyée. Notre équipe commerciale vous répondra rapidement.",
  };
}
