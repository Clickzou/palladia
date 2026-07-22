import type { MetadataRoute } from "next";

const BASE = "https://www.hotelpalladia.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Les pages de liste paginees restent ouvertes au crawl : chacune porte
      // des articles differents, et treize d'entre eux n'ont aucun autre lien
      // interne. Les fermer revenait a couper le site de son propre blog.
      disallow: ["/api/"],
    },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
