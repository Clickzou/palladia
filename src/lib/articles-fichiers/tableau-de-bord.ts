import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Accès du tableau de bord client Clickzou (clickzou.fr/espace-client, onglet
 * « Articles programmés ») — même contrat que les sites Alps et Un Seul Souffle.
 *
 * `Authorization: Bearer <TABLEAU_DE_BORD_CLE>` ; la même valeur est posée côté
 * Clickzou (`PALLADIA_TABLEAU_DE_BORD_CLE`). Clé absente ou de moins de
 * 32 caractères : la route répond 503 plutôt que de s'ouvrir par oubli.
 * Comparaison à temps constant.
 */
export function cleTableauDeBord(): string | null {
  const cle = process.env.TABLEAU_DE_BORD_CLE;
  return cle && cle.length >= 32 ? cle : null;
}

function egalTempsConstant(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

/** 503 si la clé n'est pas configurée, 401 si l'en-tête ne correspond pas, sinon null. */
export function refusTableauDeBord(requete: Request): 401 | 503 | null {
  const cle = cleTableauDeBord();
  if (!cle) return 503;
  return egalTempsConstant(`Bearer ${cle}`, requete.headers.get("authorization") ?? "") ? null : 401;
}

/** En-têtes de toutes les réponses : jamais en cache, jamais indexées. */
export const ENTETES_TABLEAU_DE_BORD = {
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow",
} as const;

/* ─────────── Aperçu signé des articles programmés ─────────── */

/**
 * Un article programmé répond 404 sur son adresse ; il ne se lit que par
 * /blog/apercu/<slug>?sig=<HMAC-SHA256 du slug, base64url, clé du tableau de
 * bord>. Lien impossible à deviner, et non réutilisable pour un autre article.
 * Les liens sont fabriqués ici et transmis par l'API : la clé ne sort pas.
 */
const signer = (slug: string, cle: string) => createHmac("sha256", cle).update(slug).digest("base64url");

/** Chemin d'aperçu signé (sans domaine, langue française) ; null si la clé manque. */
export function cheminApercu(slug: string): string | null {
  const cle = cleTableauDeBord();
  return cle ? `/blog/apercu/${slug}?sig=${signer(slug, cle)}` : null;
}

export function apercuValide(slug: string, sig: string | undefined): boolean {
  const cle = cleTableauDeBord();
  return Boolean(cle && sig && egalTempsConstant(signer(slug, cle), sig));
}
