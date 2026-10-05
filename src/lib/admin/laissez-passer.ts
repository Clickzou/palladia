/**
 * Laissez-passer de connexion automatique émis par clickzou.fr (tableau de bord
 * de JC, vue administrateur d'un client → onglet « Vos outils »). Demande de JC
 * du 05/10/2026 : ne plus retaper e-mail et mot de passe sur cet outil.
 *
 * Format : base64url(JSON {s: domaine, e: e-mail, x: expiration en s}) + "." +
 * base64url(HMAC-SHA256(secret, partie 1)). Secret partagé avec clickzou.fr :
 * CLICKZOU_SSO_SECRET (32 caractères au moins ; absent = connexion auto fermée).
 * Validité 2 minutes au plus.
 */
import { createHmac, timingSafeEqual } from "node:crypto";

export function verifierLaissezPasser(jeton: string | null, domaine: string): string | null {
  const secret = process.env.CLICKZOU_SSO_SECRET;
  if (!jeton || !secret || secret.length < 32) return null;
  const [corps, signature] = jeton.split(".");
  if (!corps || !signature) return null;
  const attendue = createHmac("sha256", secret).update(corps).digest("base64url");
  const a = Buffer.from(signature);
  const b = Buffer.from(attendue);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const { s, e, x } = JSON.parse(Buffer.from(corps, "base64url").toString("utf8")) as { s?: string; e?: string; x?: number };
    const maintenant = Math.floor(Date.now() / 1000);
    if (s !== domaine || typeof e !== "string" || typeof x !== "number" || x < maintenant || x > maintenant + 120) return null;
    return e.toLowerCase();
  } catch {
    return null;
  }
}
