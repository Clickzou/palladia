import type { MetadataRoute } from "next";
import { seo } from "@/data/seo";
import { ARTICLES_PAR_PAGE, listerSlugs } from "@/lib/blog";
import { routing } from "@/i18n/routing";

export const dynamic = "force-dynamic";

const BASE = "https://www.hotelpalladia.com";

/** URL d'une route dans une langue donnée : le français reste à la racine. */
function url(route: string, locale: string) {
  const chemin = route === "/" ? "" : route;
  return locale === routing.defaultLocale ? `${BASE}${chemin}` : `${BASE}/${locale}${chemin}`;
}

/**
 * Sitemap des trois langues, avec les alternatives hreflang.
 *
 * Le site WordPress n'y listait que le français : les 90 pages traduites
 * étaient absentes, découvertes seulement via les balises hreflang des pages
 * françaises — donc plus tard et recrawlées moins souvent.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = Object.keys(seo);
  const articles = await listerSlugs();

  const entrees: MetadataRoute.Sitemap = [];

  const ajouter = (route: string, priorite: number, frequence: "daily" | "weekly" | "monthly") => {
    for (const locale of routing.locales) {
      entrees.push({
        url: url(route, locale),
        lastModified: new Date(),
        changeFrequency: frequence,
        priority: priorite,
        alternates: {
          languages: Object.fromEntries(routing.locales.map((l) => [l, url(route, l)])),
        },
      });
    }
  };

  // Pages principales
  for (const route of routes) {
    const priorite = route === "/" ? 1 : route.startsWith("/politique") || route === "/mentions-legales" ? 0.3 : 0.8;
    ajouter(route, priorite, route === "/" ? "weekly" : "monthly");
  }

  /**
   * Pages de liste au-delà de la première. Sans elles, les treize articles
   * qui n'apparaissent pas sur /actualites ne reçoivent aucun lien interne :
   * Google les découvre par le sitemap, mais sans le moindre appui du site.
   */
  const publies = articles.filter((a) => a.locale === routing.defaultLocale).length;
  for (let page = 2; page <= Math.ceil(publies / ARTICLES_PAR_PAGE); page++) {
    ajouter(`/actualites/${page}`, 0.4, "monthly");
  }

  // Articles du blog, à la racine comme sur WordPress
  for (const { slug, locale } of articles) {
    if (locale !== routing.defaultLocale) continue; // évite les doublons
    ajouter(`/${slug}`, 0.6, "monthly");
  }

  return entrees;
}
