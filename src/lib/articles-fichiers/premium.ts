import reglage from "../../../contenu/articles-premium.json";

/**
 * Articles réservés au pack Full SEO (décision de JC du 07/10/2026, « option A ») :
 * l'Hôtel Palladia n'a pas souscrit le pack Full SEO, les articles rédigés par
 * Clickzou à paraître ne sont donc PAS publiés. Même mécanisme que le site
 * d'ATB Charpente (`articles-premium.json` + `reservePremium` dans l'API).
 *
 * Réglage : `contenu/articles-premium.json`.
 *   - `"publier": false` : un article fichier dont `datePublication` est
 *     postérieure à `reservesApres` est réservé (404, absent des listes et du
 *     sitemap, pas d'aperçu signé) ; listé dans le tableau de bord Clickzou en
 *     « programme » avec `reservePremium: true`.
 *   - `"publier": true` (commit + push) : rien n'est réservé, chaque article
 *     paraît à sa date sans autre travail.
 * Les articles en base (déjà en ligne) ne sont jamais concernés.
 */
export const PUBLICATION_ARTICLES_RESERVES: boolean = reglage.publier === true;
const RESERVES_APRES: string = reglage.reservesApres;

/** Vrai si l'article fichier est réservé au pack Full SEO (donc jamais affiché sur le site). */
export function estReservePremium(a: { datePublication: string }): boolean {
  return !PUBLICATION_ARTICLES_RESERVES && a.datePublication > RESERVES_APRES;
}
