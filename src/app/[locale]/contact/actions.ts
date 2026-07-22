"use server";

import { createClient } from "@/lib/supabase/server";
import { supabaseConfigure } from "@/lib/blog";
import { envoyerCourriel } from "@/lib/courriel";
import { destinataires } from "@/config/site";

export type EtatContact = { ok: boolean; message: string } | null;

/**
 * Message de la page Contact.
 *
 * Meme table que les demandes de devis — meme suivi, un seul endroit ou
 * regarder — mais un type distinct et un autre destinataire : l'accueil
 * general, pas le service commercial.
 *
 * Comme pour le devis, un envoi de courriel manque ne fait pas echouer la
 * demande : elle est deja enregistree, et la perdre serait plus grave que de
 * ne pas notifier.
 */
export async function envoyerContact(
  _etat: EtatContact,
  formData: FormData,
): Promise<EtatContact> {
  const champ = (nom: string) => String(formData.get(nom) ?? "").trim();

  const nom = champ("nom");
  const prenom = champ("prenom");
  const email = champ("email");
  const message = champ("message");

  if (!nom || !prenom || !email) {
    return { ok: false, message: "Merci de renseigner vos nom, prénom et e-mail." };
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { ok: false, message: "L’adresse e-mail ne semble pas valide." };
  }
  if (!message) {
    return { ok: false, message: "Merci d’écrire votre message." };
  }
  // Piège à robots : un champ masqué que seul un automate remplit
  if (champ("site_web")) {
    return { ok: true, message: "Merci, votre message a bien été envoyé." };
  }

  if (!supabaseConfigure) {
    return {
      ok: false,
      message:
        "Le formulaire n’est pas encore relié à la base. Merci de nous écrire à info@hotelpalladia.com.",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("demandes_devis").insert({
    type: "contact",
    nom,
    prenom,
    telephone: champ("telephone") || null,
    email,
    message,
    locale: champ("locale") || "fr",
  });

  if (error) {
    console.error("Enregistrement du message impossible :", error.message);
    return {
      ok: false,
      message:
        "Votre message n’a pas pu être enregistré. Merci de réessayer ou de nous appeler au 05 62 12 01 20.",
    };
  }

  await envoyerCourriel({
    destinataires: destinataires.contact,
    sujet: `Message depuis le site — ${prenom} ${nom}`,
    repondreA: email,
    lignes: [
      `Nom : ${prenom} ${nom}`,
      `E-mail : ${email}`,
      `Téléphone : ${champ("telephone") || "non renseigné"}`,
      "",
      message,
    ],
  });

  return {
    ok: true,
    message: "Merci, votre message a bien été envoyé. Nous vous répondrons rapidement.",
  };
}
