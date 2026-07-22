import type { Metadata } from "next";
import { traduireContenu } from "@/i18n/contenu";
import { metadonnees } from "@/data/seo";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import { presse as presseFr } from "@/data/presse";
import { social } from "@/config/site";

/** Titre et description dans la langue de la page, avec les alternatives hreflang. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return metadonnees("/presse", locale);
}

export default async function PressePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const presse = traduireContenu(presseFr, locale);

  return (
    <>
      <PageHeader breadcrumb="Presse" title={presse.title} subtitle={presse.subtitle} />

      <section className="grid gap-6 px-6 pb-24 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:px-[100px]">
        {presse.articles.map((a) => (
          <article
            key={a.url}
            className="flex flex-col border border-gold/50 bg-white px-5 py-6 text-center"
          >
            <h2 className="text-[22px] font-normal text-body uppercase">{a.media}</h2>

            <div className="mt-5 grow">
              {a.image ? (
                <Image
                  src={a.image}
                  alt={a.titre}
                  width={400}
                  height={300}
                  sizes="(max-width: 640px) 100vw, 20vw"
                  className="h-auto w-full"
                />
              ) : (
                <p className="px-2 py-6 text-sm leading-relaxed text-body">{a.titre}</p>
              )}
            </div>

            <a
              href={a.url}
              target="_blank"
              rel="noopener"
              className="mt-6 self-center rounded-full bg-gold px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-gold-dark"
            >
              Voir l’article
              <span className="sr-only"> : {a.titre}</span>
            </a>
          </article>
        ))}
      </section>

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
