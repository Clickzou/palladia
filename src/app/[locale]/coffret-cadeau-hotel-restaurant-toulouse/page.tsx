import type { Metadata } from "next";
import { metadonnees } from "@/data/seo";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Faq from "@/components/Faq";
import { coffrets as c } from "@/data/coffrets";
import { IconCheck } from "@/components/icons";

export const metadata: Metadata = metadonnees("/coffret-cadeau-hotel-restaurant-toulouse");

export default function CoffretsPage() {
  return (
    <>
      <PageHeader breadcrumb="Coffrets Cadeaux" title={c.title} />
      <p className="px-6 pb-16 text-center text-body">{c.chapo}</p>

      {/* Coffrets */}
      <section className="mx-auto grid max-w-[1500px] gap-8 px-6 pb-20 md:grid-cols-2 xl:grid-cols-3">
        {c.offres.map((o) => (
          <article key={o.nom} className="flex flex-col bg-cream">
            <div className="relative aspect-[16/10]">
              <Image
                src={o.image}
                alt={`Coffret cadeau ${o.nom}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>

            <div className="flex grow flex-col px-8 py-8 text-center">
              <h2 className="font-display text-xl tracking-wide text-ink uppercase md:text-2xl">
                {o.nom}
              </h2>
              <p className="mt-3 text-body">
                {o.prix} {o.pour}
              </p>

              <a
                href={c.boutique}
                target="_blank"
                rel="noopener"
                className="mx-auto mt-6 rounded-full bg-gold px-9 py-3 font-medium text-white transition-colors hover:bg-gold-dark"
              >
                Découvrir
                <span className="sr-only"> le coffret {o.nom}</span>
              </a>

              <ul className="mt-8 space-y-3 text-left leading-relaxed text-body">
                {o.inclus.map((i) => (
                  <li key={i.slice(0, 30)} className="flex gap-3">
                    <IconCheck className="mt-1.5 size-3.5 shrink-0 fill-gold" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>

      {/* Avantages */}
      <section className="bg-cream px-6 py-20 text-center">
        <h2 className="section-title">{c.garantiesTitre}</h2>
        <p className="mt-4 text-body">{c.garantiesSousTitre}</p>

        <ul className="mx-auto mt-14 grid max-w-[1400px] gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {c.garanties.map((g) => (
            <li key={g.slice(0, 25)} className="flex flex-col items-center gap-4">
              <IconCheck className="size-8 fill-ink-soft" />
              <span className="leading-relaxed text-body">{g}</span>
            </li>
          ))}
        </ul>

        <a
          href={c.boutique}
          target="_blank"
          rel="noopener"
          className="mt-14 inline-block rounded-full bg-gold px-10 py-4 font-medium text-white transition-colors hover:bg-gold-dark"
        >
          Boutique Officielle Coffrets Cadeaux
        </a>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20">
        <h2 className="section-title mb-12">FAQ sur nos coffrets cadeaux</h2>
        <Faq items={c.faq} />
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: c.faq.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.reponse },
            })),
          }),
        }}
      />
    </>
  );
}
