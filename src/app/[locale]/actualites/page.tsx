import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import PageHeader from "@/components/PageHeader";
import { listerArticles } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Actualités du Palladia - Le Palladia hôtel 4 étoiles Toulouse",
  description:
    "Toute l’actualité de l’Hôtel Palladia à Toulouse : événements, spectacles, offres et vie de l’établissement.",
};

export default async function ActualitesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const articles = await listerArticles(locale);

  return (
    <>
      <PageHeader breadcrumb="Actualités" title="Actualités du Palladia" />

      {articles.length === 0 ? (
        <p className="px-6 pb-24 text-center text-muted">
          Aucun article pour le moment.
        </p>
      ) : (
        <div className="mx-auto grid max-w-7xl gap-10 px-6 pb-24 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <article key={a.id} className="flex flex-col">
              <Link href={`/${a.slug}`} className="group relative block aspect-[3/2] overflow-hidden">
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

              <time
                dateTime={a.date_publication}
                className="mt-5 text-sm tracking-wide text-muted uppercase"
              >
                {new Date(a.date_publication).toLocaleDateString(locale, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>

              <h2 className="mt-2 font-display text-xl text-ink">
                <Link href={`/${a.slug}`} className="transition-colors hover:text-gold">
                  {a.titre}
                </Link>
              </h2>

              {a.chapo && <p className="mt-3 grow leading-relaxed text-body">{a.chapo}</p>}

              <Link
                href={`/${a.slug}`}
                className="mt-5 self-start bg-gold px-6 py-2.5 text-sm font-semibold tracking-wide text-white uppercase transition-colors hover:bg-gold-dark"
              >
                Lire la suite
              </Link>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
