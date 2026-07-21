import en from "@/../messages/contenu.en.json";
import es from "@/../messages/contenu.es.json";

/**
 * Traduction du contenu editorial.
 *
 * Les donnees des pages restent ecrites en français dans src/data : les
 * traduire a l'affichage evite d'entretenir trois jeux de donnees paralleles,
 * et une phrase non traduite retombe sur le français plutot que de disparaitre.
 *
 * Les traductions sont ecrites a la main. Celles du site d'origine, produites
 * automatiquement par TranslatePress, ne sont pas reprises.
 */
const dictionnaires: Record<string, Record<string, string>> = { en, es };

/** Traduit une phrase, ou la rend telle quelle si elle n'est pas au dictionnaire. */
export function traduire(texte: string, locale: string): string {
  if (locale === "fr") return texte;
  return dictionnaires[locale]?.[texte.trim()] ?? texte;
}

/**
 * Traduit recursivement toutes les chaines d'une structure de donnees.
 * Les cles, les URLs et les chemins d'images sont laisses intacts.
 */
export function traduireContenu<T>(valeur: T, locale: string): T {
  if (locale === "fr") return valeur;

  const passe = (v: unknown): unknown => {
    if (typeof v === "string") {
      // Ni URL, ni chemin de fichier, ni identifiant technique
      if (/^(https?:|mailto:|tel:|\/|#)/.test(v) || /\.(jpe?g|png|webp|avif|pdf|svg)$/i.test(v)) {
        return v;
      }
      return traduire(v, locale);
    }
    if (Array.isArray(v)) return v.map(passe);
    if (v && typeof v === "object") {
      return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, passe(x)]));
    }
    return v;
  };

  return passe(valeur) as T;
}
