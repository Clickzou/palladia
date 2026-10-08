import Image from "next/image";
import { Link } from "@/i18n/navigation";
import ArticleBlocs from "@/components/blog/ArticleBlocs";
import { ratioImage } from "@/lib/images";
import type { ArticleComplet, BlocContenu } from "@/lib/supabase/types";
import { traduire } from "@/i18n/contenu";

/**
 * Corps d'un article de blog (en-tête, visuel, blocs, données structurées),
 * partagé par la page publique /<slug> et l'aperçu signé des articles
 * programmés (/blog/apercu/<slug>). L'article est déjà traduit.
 *
 * `apercu` : bandeau de relecture, et aucune donnée structurée — une page
 * d'aperçu ne doit rien déclarer aux moteurs.
 */
export default function VueArticle({
  article,
  locale,
  slug,
  apercu,
}: {
  article: ArticleComplet;
  locale: string;
  slug: string;
  apercu?: { datePublication: string };
}) {
  const SITE = "https://www.hotelpalladia.com";
  const prefixe = locale === "fr" ? SITE : `${SITE}/${locale}`;

  /**
   * Questions du ou des blocs `sections` marques `faq`. Seules celles qui
   * portent une reponse sont retenues : un balisage FAQPage sans reponse est
   * rejete par Google.
   */
  const questions = article.blocs
    .filter((b) => b.type === "sections" && (b.contenu as BlocContenu["sections"]).faq)
    .flatMap((b) => (b.contenu as BlocContenu["sections"]).sections)
    .filter((s): s is { titre: string; intro: string } => Boolean(s.intro));

  return (
    <article>
      {apercu && (
        <p className="bg-gold px-6 py-3 text-center text-sm font-medium text-white">
          Aperçu — article programmé, parution le {apercu.datePublication.split("-").reverse().join("/")}. Cette page n’est pas publique.
        </p>
      )}
      {/* `apparait-haut` s'anime des le premier rendu, sans attendre
          l'observateur : c'est l'element le plus haut de l'ecran. */}
      <header className="apparait-haut px-6 pt-8 pb-10 text-center">
        <nav aria-label={traduire("Fil d’Ariane", locale)} className="text-sm">
          <Link href="/" className="text-[#8b3a3a] underline hover:text-gold">
            {traduire("Accueil", locale)}
          </Link>
          <span className="mx-1 text-muted">»</span>
          <Link href="/actualites" className="text-[#8b3a3a] underline hover:text-gold">
            {traduire("Actualités", locale)}
          </Link>
          <span className="mx-1 text-muted">»</span>
          <span className="font-semibold text-ink">{article.titre}</span>
        </nav>

        {/* Largeur bornee : les titres longs se repartissent sur deux lignes
            plutot que de s’etaler sur toute la largeur de l’ecran. */}
        {/* Le site distingue le titre WordPress (fil d’Ariane, vignettes) du
            titre affiche en tete d’article : `titre_page` porte le second. */}
        <h1 className="section-title mx-auto mt-10 max-w-[1800px]">
          {article.titre_page ?? article.titre}
        </h1>
        {/* Mesure du site : h2 Roboto 22 px, capitales, couleur du corps */}
        {article.sous_titre && (
          <h2 className="mt-4 text-[22px] font-normal text-body uppercase">
            {article.sous_titre}
          </h2>
        )}
        <div className="mx-auto mt-6 h-px w-20 bg-gold" />
      </header>

      {article.image_hero && (
        // Comme sur le site d’origine : pleine largeur, aux proportions
        // naturelles du fichier.
        <div
          className="apparait-haut relative w-full overflow-hidden"
          style={{ aspectRatio: ratioImage(article.image_hero, "1920 / 664") }}
        >
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

      {!apercu && (
        <>
        {/* Donnees structurees pour le referencement */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: article.titre,
              description: article.seo_description ?? undefined,
              url: `${prefixe}/${slug}`,
              mainEntityOfPage: `${prefixe}/${slug}`,
              inLanguage: locale,
              datePublished: article.date_publication,
              image: article.image_hero ?? undefined,
              // Auteur et editeur renvoient a la fiche de l'hotel posee sur
              // l'accueil (donnees-structurees.ts) : adresse, 4 etoiles,
              // 90 chambres sont ainsi rattaches a chaque article.
              author: { "@type": "Hotel", "@id": `${SITE}/#hotel`, name: "Hôtel Palladia" },
              publisher: { "@type": "Hotel", "@id": `${SITE}/#hotel`, name: "Hôtel Palladia" },
            }),
          }}
        />

        {/*
          Fil d’Ariane : il est affiche en tete d’article depuis l’origine, mais
          Google ne pouvait pas le lire. Sans ce balisage il affiche l’URL brute
          dans ses resultats plutot que « Accueil › Actualités › … ».
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { nom: traduire("Accueil", locale), url: prefixe },
                { nom: traduire("Actualités", locale), url: `${prefixe}/actualites` },
                { nom: article.titre, url: `${prefixe}/${slug}` },
              ].map((e, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: e.nom,
                item: e.url,
              })),
            }),
          }}
        />

        {/*
          Foire aux questions : un bloc `sections` marque `faq` decrit des
          questions et leurs reponses. Google en fait un accordeon dans ses
          resultats, ce qui elargit la place occupee par la page.
        */}
        {questions.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: questions.map((q) => ({
                  "@type": "Question",
                  name: q.titre,
                  acceptedAnswer: { "@type": "Answer", text: q.intro },
                })),
              }),
            }}
          />
        )}
        </>
      )}
    </article>
  );
}
