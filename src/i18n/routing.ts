import { defineRouting } from "next-intl/routing";

/**
 * Le site d'origine (TranslatePress) sert le francais a la racine et prefixe
 * l'anglais et l'espagnol : /restaurant/, /en/restaurant/, /es/restaurant/.
 * On reproduit ce schema a l'identique pour ne perdre aucune position SEO.
 */
export const routing = defineRouting({
  locales: ["fr", "en", "es"],
  defaultLocale: "fr",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
