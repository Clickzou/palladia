import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import VueArticle from "@/components/blog/VueArticle";
import { articleFichier, dateAtteinte, estReservePremium, versArticleComplet } from "@/lib/articles-fichiers";
import { apercuValide } from "@/lib/articles-fichiers/tableau-de-bord";

/**
 * `/blog/apercu/<slug>?sig=…` (et `/en/…`, `/es/…`) — relecture d'un article
 * fichier programmé depuis le tableau de bord Clickzou. Voir
 * src/lib/articles-fichiers/tableau-de-bord.ts.
 *
 * Jamais indexable : sans signature valide → 404, rien ne fuit, pas même le
 * titre ; balise robots noindex ici ; en-têtes X-Robots-Tag et
 * Referrer-Policy no-referrer (next.config.ts), pour que la signature ne parte
 * pas dans le Referer des liens sortants ; ni canonical, ni données
 * structurées, ni sitemap.
 *
 * Seule page publique qui montre un article dont la date n'est pas atteinte.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Aperçu d’article",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default async function ApercuArticle({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ sig?: string | string[] }>;
}) {
  const { locale, slug } = await params;
  const { sig } = await searchParams;
  const article = articleFichier(slug);
  if (!article || !apercuValide(article.slug, typeof sig === "string" ? sig : undefined)) notFound();
  // Réservé au pack Full SEO (premium.ts) : ni publié, ni lisible par lien d'aperçu.
  if (estReservePremium(article)) notFound();

  // Déjà en ligne : l'aperçu n'a plus lieu d'être, on renvoie vers la vraie page.
  if (dateAtteinte(article)) redirect(locale === "fr" ? `/${slug}` : `/${locale}/${slug}`);

  return (
    <VueArticle
      article={versArticleComplet(article, locale)}
      locale={locale}
      slug={slug}
      apercu={{ datePublication: article.datePublication }}
    />
  );
}
