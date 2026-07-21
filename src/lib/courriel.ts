import { Resend } from "resend";

/**
 * Envoi des notifications par courriel, via Resend.
 *
 * La cle vit dans `.env.local` (RESEND_API_KEY), jamais dans le depot. Sans
 * elle, l'envoi est simplement ignore : le formulaire continue d'enregistrer
 * la demande, ce qui vaut mieux que de la refuser faute de notification.
 *
 * L'expediteur doit appartenir a un domaine verifie dans Resend. Tant que
 * hotelpalladia.com ne l'est pas, on retombe sur l'adresse de test fournie
 * par Resend, qui n'accepte d'ecrire qu'au proprietaire du compte.
 */
const cle = process.env.RESEND_API_KEY;
const expediteur = process.env.RESEND_FROM ?? "Hôtel Palladia <onboarding@resend.dev>";

export const courrielConfigure = Boolean(cle);

type Message = {
  destinataires: readonly string[];
  sujet: string;
  /** Corps en texte brut : converti en HTML simple, sans mise en forme. */
  lignes: string[];
  /** Adresse a laquelle repondre — celle du demandeur. */
  repondreA?: string;
};

/**
 * Envoie un message et signale si l'operation a abouti. N'echoue jamais bruyamment :
 * l'appelant decide quoi faire d'un envoi manque.
 */
export async function envoyerCourriel({
  destinataires,
  sujet,
  lignes,
  repondreA,
}: Message): Promise<boolean> {
  if (!cle) {
    console.warn("RESEND_API_KEY absente : notification non envoyée.");
    return false;
  }

  const echapper = (t: string) =>
    t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  try {
    const { error } = await new Resend(cle).emails.send({
      from: expediteur,
      to: [...destinataires],
      replyTo: repondreA,
      subject: sujet,
      text: lignes.join("\n"),
      html: lignes.map((l) => `<p>${echapper(l)}</p>`).join(""),
    });

    if (error) {
      console.error("Envoi du courriel refusé :", error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.error("Envoi du courriel impossible :", e instanceof Error ? e.message : e);
    return false;
  }
}
