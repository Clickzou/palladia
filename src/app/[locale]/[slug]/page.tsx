import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import ArticleBlocs from "@/components/blog/ArticleBlocs";
import { lireArticle } from "@/lib/blog";

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

  return {
    title: article.seo_title ?? article.titre,
    description: article.seo_description ?? article.chapo ?? undefined,
    openGraph: {
      title: article.seo_title ?? article.titre,
      description: article.seo_description ?? article.chapo ?? undefined,
      images: article.image_hero ? [article.image_hero] : undefined,
      type: "article",
      publishedTime: article.date_publication,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  const article = await lireArticle(slug, locale);
  if (!article) notFound();

  return (
    <article>
      <header className="px-6 pt-8 pb-10 text-center">
        <nav aria-label="Fil d’Ariane" className="text-sm">
          <Link href="/" className="text-[#8b3a3a] underline hover:text-gold">
            Accueil
          </Link>
          <span className="mx-1 text-muted">»</span>
          <Link href="/actualites" className="text-[#8b3a3a] underline hover:text-gold">
            Actualités
          </Link>
          <span className="mx-1 text-muted">»</span>
          <span className="font-semibold text-ink">{article.titre}</span>
        </nav>

        {/* Largeur bornee : les titres longs se repartissent sur deux lignes
            plutot que de s’etaler sur toute la largeur de l’ecran. */}
        <h1 className="section-title mx-auto mt-10 max-w-5xl">{article.titre}</h1>
        {article.sous_titre && (
          <p className="mt-4 tracking-wide text-ink-soft uppercase md:text-lg">
            {article.sous_titre}
          </p>
        )}
        <div className="mx-auto mt-6 h-px w-20 bg-gold" />
      </header>

      {article.image_hero && (
        // Hauteur fixe : tous les articles ont un en-tete de meme dimension,
        // quel que soit le format du fichier d’origine.
        <div className="relative h-[300px] w-full md:h-[500px] lg:h-[600px]">
          <Image
            src={article.image_hero}
            alt={article.titre}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}

      <ArticleBlocs blocs={article.blocs} />

      {/* Donnees structurees pour le referencement */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.titre,
            datePublished: article.date_publication,
            image: article.image_hero ?? undefined,
            author: { "@type": "Organization", name: "Hôtel Palladia" },
            publisher: { "@type": "Organization", name: "Hôtel Palladia" },
          }),
        }}
      />
    </article>
  );
}
