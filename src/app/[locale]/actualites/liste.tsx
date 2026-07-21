import Image from "next/image";
import { Link } from "@/i18n/navigation";
import PageHeader from "@/components/PageHeader";
import { listerArticlesPagines } from "@/lib/blog";
import { social } from "@/config/site";

/** Liste paginee des actualites, partagee par /actualites et /actualites/[page]. */
export default async function ListeActualites({
  locale,
  page,
}: {
  locale: string;
  page: number;
}) {
  const { articles, pages } = await listerArticlesPagines(locale, page);

  return (
    <>
      <PageHeader
        breadcrumb="Actualités"
        title="Actualités"
        subtitle="Découvrez les actualités de l’Hôtel Palladia"
      />

      {articles.length === 0 ? (
        <p className="px-6 pb-24 text-center text-muted">Aucun article pour le moment.</p>
      ) : (
        <>
          <div className="mx-auto grid max-w-[1700px] gap-8 px-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <article key={a.id} className="flex flex-col bg-cream">
                <Link
                  href={`/${a.slug}`}
                  className="group relative block aspect-[16/9] overflow-hidden"
                >
                  {a.image_vignette && (
                    <Image
                      src={a.image_vignette}
                      alt={a.titre}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </Link>

                <div className="flex grow flex-col px-8 py-8 text-center">
                  <h2 className="font-semibold text-ink">
                    <Link href={`/${a.slug}`} className="transition-colors hover:text-gold">
                      {a.titre}
                    </Link>
                  </h2>

                  {a.chapo && <p className="mt-4 grow leading-relaxed text-muted">{a.chapo}</p>}

                  <Link
                    href={`/${a.slug}`}
                    className="mt-6 text-sm font-medium tracking-wide text-gold uppercase transition-colors hover:text-gold-dark"
                  >
                    En savoir plus
                    <span className="sr-only"> sur {a.titre}</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {pages > 1 && (
            <nav aria-label="Pagination" className="flex justify-center gap-4 px-6 py-16">
              {page > 1 && (
                <Link
                  href={page - 1 === 1 ? "/actualites" : `/actualites/${page - 1}`}
                  className="text-ink underline underline-offset-4 hover:text-gold"
                >
                  « Précédent
                </Link>
              )}

              {Array.from({ length: pages }, (_, i) => i + 1).map((n) =>
                n === page ? (
                  <span key={n} aria-current="page" className="font-semibold text-ink">
                    {n}
                  </span>
                ) : (
                  <Link
                    key={n}
                    href={n === 1 ? "/actualites" : `/actualites/${n}`}
                    className="text-ink underline underline-offset-4 hover:text-gold"
                  >
                    {n}
                  </Link>
                ),
              )}

              {page < pages && (
                <Link
                  href={`/actualites/${page + 1}`}
                  className="text-ink underline underline-offset-4 hover:text-gold"
                >
                  Suivant »
                </Link>
              )}
            </nav>
          )}
        </>
      )}

      {/* Instagram */}
      <section className="px-6 pb-24 text-center">
        <h2 className="section-title">Sur Instagram</h2>
        <h3 className="mt-4 font-normal tracking-wide text-ink-soft uppercase">
          Nos dernières publications sur Instagram
        </h3>
        <div className="mx-auto mt-6 h-px w-20 bg-gold" />
        <a
          href={social.instagram}
          target="_blank"
          rel="noopener"
          className="mt-10 inline-block rounded-full bg-[#d6336c] px-10 py-4 font-medium text-white transition-opacity hover:opacity-90"
        >
          Suivez-nous sur Instagram
        </a>
      </section>
    </>
  );
}
