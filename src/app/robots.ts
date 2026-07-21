import type { MetadataRoute } from "next";

const BASE = "https://www.hotelpalladia.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Les pages de liste au-dela de la premiere n'ont pas de contenu propre
      disallow: ["/actualites/2", "/actualites/3", "/actualites/4", "/api/"],
    },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
