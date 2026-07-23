"use server";

import { createClient } from "@/lib/supabase/server";
import { supabaseConfigure } from "@/lib/blog";
import { envoyerCourriel } from "@/lib/courriel";
import { destinataires } from "@/config/site";

export type EtatGroupe = { ok: boolean; message: string } | null;

/** JJ/MM/AAAA : la date telle que la lira la reception, pas l'ISO du formulaire. */
const enClair = (iso: string) => {
  const [a, m, j] = iso.split("-");
  return a && m && j ? `${j}/${m}/${a}` : iso;
};

/**
 * Enregistre une demande de reservation de groupe.
 *
 * Elle rejoint les autres demandes dans `demandes_devis`, sous le type
 * `reservation_groupe` — meme table, meme suivi — mais part a la reception et
 * non au service commercial : c'est un sejour a bloquer, pas un devis a
 * chiffrer.
 *
 * Comme pour le devis, un envoi de courriel manque ne fait pas echouer la
 * demande : elle est deja enregistree, et la perdre serait plus grave que de
 * ne pas notifier.
 */
export async function envoyerReservationGroupe(
  _etat: EtatGroupe,
  formData: FormData,
): Promise<EtatGroupe> {
  const champ = (nom: string) => String(formData.get(nom) ?? "").trim();

  const nom = champ("nom");
  const prenom = champ("prenom");
  const email = champ("email");
  const telephone = champ("telephone");
  const nbPersonnes = champ("nb_personnes");
  const arrivee = champ("date_arrivee");
  const depart = champ("date_depart");

  if (!nom || !prenom || !email || !telephone || !nbPersonnes || !arrivee || !depart) {
    return {
      ok: false,
      message:
        "Merci de renseigner vos nom, prénom, téléphone, e-mail, le nombre de personnes et vos dates de séjour.",
    };
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { ok: false, message: "L’adresse e-mail ne semble pas valide." };
  }

  const personnes = Number(nbPersonnes);
  if (!Number.isInteger(personnes) || personnes < 1) {
    return { ok: false, message: "Le nombre de personnes doit être un nombre entier." };
  }
  // Verifie ici en plus de la base : un message vaut mieux qu'un enregistrement
  // refuse par une contrainte, que le visiteur ne comprendrait pas.
  if (depart <= arrivee) {
    return { ok: false, message: "La date de départ doit être postérieure à la date d’arrivée." };
  }

  // Piège à robots : un champ masqué que seul un automate remplit
  if (champ("site_web")) {
    return { ok: true, message: "Merci, votre demande a bien été envoyée." };
  }

  if (!supabaseConfigure) {
    return {
      ok: false,
      message:
        "Le formulaire n’est pas encore relié à la base. Merci de nous écrire à reservation@hotelpalladia.com.",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("demandes_devis").insert({
    type: "reservation_groupe",
    nom,
    prenom,
    telephone,
    email,
    entreprise: champ("entreprise") || null,
    nb_personnes: personnes,
    date_arrivee: arrivee,
    date_depart: depart,
    message: champ("message") || null,
    locale: champ("locale") || "fr",
  });

  if (error) {
    console.error("Enregistrement de la demande de groupe impossible :", error.message);
    return {
      ok: false,
      message:
        "Votre demande n’a pas pu être enregistrée. Merci de réessayer ou de nous appeler au 05 62 12 01 20.",
    };
  }

  await envoyerCourriel({
    destinataires: destinataires.reservation,
    sujet: `Réservation de groupe — ${personnes} personnes du ${enClair(arrivee)} au ${enClair(depart)} — ${prenom} ${nom}`,
    repondreA: email,
    lignes: [
      `Nom : ${prenom} ${nom}`,
      `E-mail : ${email}`,
      `Téléphone : ${telephone}`,
      `Société : ${champ("entreprise") || "non renseignée"}`,
      "",
      `Nombre de personnes : ${personnes}`,
      `Arrivée : ${enClair(arrivee)}`,
      `Départ : ${enClair(depart)}`,
      "",
      champ("message") || "(aucun message)",
    ],
  });

  return {
    ok: true,
    message:
      "Merci, votre demande a bien été envoyée. Notre service réservation vous répondra rapidement.",
  };
}
