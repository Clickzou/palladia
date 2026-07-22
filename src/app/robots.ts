import type { MetadataRoute } from "next";

const BASE = "https://www.hotelpalladia.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Les pages de liste au-dela de la premiere n'ont pas de contenu propre.
      // Les chemins sont compares par prefixe : sans la declinaison /en et /es,
      // seule la version française serait ecartee de l'index.
      disallow: [
        ...["", "/en", "/es"].flatMap((prefixe) => [
          `${prefixe}/actualites/2`,
          `${prefixe}/actualites/3`,
          `${prefixe}/actualites/4`,
        ]),
        "/api/",
      ],
    },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
