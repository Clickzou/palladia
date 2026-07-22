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

/**
 * Adresse de deroutement, pour essayer les formulaires sans ecrire a l'hotel.
 * Tant que le domaine n'est pas verifie, Resend refuse d'ailleurs tout autre
 * destinataire que le proprietaire du compte : sans ce reglage, l'envoi ne
 * peut pas etre teste du tout.
 *
 * A laisser vide en production — un deroutement oublie detournerait les
 * demandes reelles. D'ou la trace ecrite a chaque envoi.
 */
const deroutement = process.env.COURRIEL_TEST?.trim();

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

  const vraisDestinataires = [...destinataires];
  if (deroutement) {
    console.warn(
      `COURRIEL_TEST actif : notification deroutee vers ${deroutement} ` +
        `au lieu de ${vraisDestinataires.join(", ")}.`,
    );
  }

  try {
    const { error } = await new Resend(cle).emails.send({
      from: expediteur,
      to: deroutement ? [deroutement] : vraisDestinataires,
      replyTo: repondreA,
      subject: deroutement ? `[TEST → ${vraisDestinataires.join(", ")}] ${sujet}` : sujet,
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
