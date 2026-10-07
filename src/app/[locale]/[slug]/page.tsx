import type { Metadata } from "next";
import { notFound } from "next/navigation";
import VueArticle from "@/components/blog/VueArticle";
import { lireArticle } from "@/lib/blog";
import { appliquerOffres } from "@/lib/offres";
import { traduireContenu } from "@/i18n/contenu";
import { ogLocale } from "@/data/seo";

/**
 * Article de blog. Les URLs sont a la racine (/zenith-de-toulouse-hotel-palladia)
 * comme sur le site WordPress : Next donne la priorite aux routes statiques
 * (/restaurant, /spa...), cette route ne capte donc que le reste.
 */
type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await lireArticle(slug, locale);
  if (!article) return {};

  const SITE = "https://www.hotelpalladia.com";
  const traduit = traduireContenu(article, locale);

  return {
    title: traduit.seo_title ?? traduit.titre,
    description: traduit.seo_description ?? traduit.chapo ?? undefined,
    // Les trois langues partagent le meme slug : on le declare a Google.
    alternates: {
      canonical: locale === "fr" ? `${SITE}/${slug}` : `${SITE}/${locale}/${slug}`,
      languages: {
        fr: `${SITE}/${slug}`,
        en: `${SITE}/en/${slug}`,
        es: `${SITE}/es/${slug}`,
        "x-default": `${SITE}/${slug}`,
      },
    },
    openGraph: {
      title: traduit.seo_title ?? traduit.titre,
      description: traduit.seo_description ?? traduit.chapo ?? undefined,
      url: locale === "fr" ? `${SITE}/${slug}` : `${SITE}/${locale}/${slug}`,
      siteName: "Hôtel Palladia",
      locale: ogLocale(locale),
      images: article.image_hero ?? article.image_vignette
        ? [(article.image_hero ?? article.image_vignette)!]
        : undefined,
      type: "article",
      publishedTime: article.date_publication,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  const lu = await lireArticle(slug, locale);
  if (!lu) notFound();
  // Les blocs relies a une offre prennent ses tarifs tant qu'elle est en cours.
  const source = await appliquerOffres(lu);

  return <VueArticle article={traduireContenu(source, locale)} locale={locale} slug={slug} />;
}
