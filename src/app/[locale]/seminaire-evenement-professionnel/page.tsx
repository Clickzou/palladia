import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import PageHeader from "@/components/PageHeader";
import Faq from "@/components/Faq";
import { IconCheck } from "@/components/icons";
import { seminaires as s } from "@/data/seminaires";

export const metadata: Metadata = {
  title: s.metaTitle,
  description: s.metaDescription,
};

export default function SeminairesPage() {
  return (
    <>
      <PageHeader
        breadcrumb="Séminaire événement professionnel"
        title={s.title}
        subtitle={s.subtitle}
      />

      {/* Atouts + présentation */}
      <section className="mx-auto grid max-w-7xl items-start gap-10 px-6 pb-20 lg:grid-cols-2">
        <div className="bg-cream px-8 py-12 text-center">
          <ul className="space-y-4">
            {s.atouts.map((a) => (
              <li key={a} className="flex items-start justify-center gap-3 text-body">
                <IconCheck className="mt-1 size-4 shrink-0 fill-gold" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/devis"
            className="mt-10 inline-block rounded-full bg-gold px-9 py-4 font-medium text-white transition-colors hover:bg-gold-dark"
          >
            Demandez un devis
          </Link>
        </div>

        <div className="space-y-5 leading-relaxed text-body">
          {s.presentation.map((p, i) => (
            <p key={p.slice(0, 30)} className={i === 1 || i === 2 ? "font-semibold text-ink" : ""}>
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Fiches techniques des salons */}
      <section className="px-6 pb-20">
        <h2 className="section-title">Fiches techniques de nos salons</h2>
        <p className="mt-4 text-center tracking-wide text-ink-soft uppercase">{s.subtitle}</p>
        <div className="mx-auto mt-6 mb-14 h-px w-20 bg-gold" />

        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {s.salons.map((salon) => (
            <article key={salon.nom} className="bg-cream">
              <div className="px-6 py-6 text-center">
                <h3 className="font-display text-xl tracking-wide text-gold uppercase">
                  {salon.nom}
                </h3>
                <p className="mt-2 text-body">{salon.places}</p>
              </div>
              <div className="relative aspect-[16/10]">
                <Image
                  src={salon.image}
                  alt={`Salon ${salon.nom} de l’Hôtel Palladia`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <p className="px-6 py-5 text-center text-body">{salon.detail}</p>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-gold">{s.noteModulables}</p>
      </section>

      {/* Tableau des capacités */}
      <section className="px-6 pb-20">
        <h2 className="section-title">Résumé capacités des salles</h2>
        <div className="mx-auto mt-6 mb-12 h-px w-20 bg-gold" />

        <div className="mx-auto max-w-5xl overflow-x-auto">
          <table className="w-full min-w-3xl border-collapse text-center">
            <caption className="sr-only">
              Capacité d’accueil de chaque salle selon la configuration
            </caption>
            <thead>
              <tr className="bg-ink-soft text-white">
                <th scope="col" className="px-4 py-4 text-left font-semibold">
                  Capacité des salles
                  <span className="block text-xs font-normal opacity-80">Suivant le placement</span>
                </th>
                {s.configurations.map((c) => (
                  <th key={c} scope="col" className="px-3 py-4 text-sm font-medium">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {s.capacites.map((ligne) => (
                <tr key={ligne.salle} className="border-b border-black/10 even:bg-cream">
                  <th scope="row" className="px-4 py-4 text-left font-semibold text-ink">
                    {ligne.salle}
                    {ligne.surface && (
                      <span className="ml-1 font-normal text-muted">({ligne.surface})</span>
                    )}
                  </th>
                  {ligne.valeurs.map((v, i) => (
                    <td key={s.configurations[i]} className="px-3 py-4 text-body">
                      {v ?? <span className="text-muted">–</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/devis"
            className="inline-block rounded-full bg-gold px-10 py-4 font-medium text-white transition-colors hover:bg-gold-dark"
          >
            Demande de Devis Séminaire
          </Link>
        </div>
      </section>

      {/* Séminaire hybride */}
      <section className="bg-cream px-6 py-20 text-center">
        <h2 className="section-title">{s.hybride.titre}</h2>
        <div className="mx-auto mt-6 mb-10 h-px w-20 bg-gold" />
        <h3 className="font-display text-2xl tracking-wide text-ink uppercase md:text-3xl">
          {s.hybride.sousTitre}
        </h3>
        <p className="mx-auto mt-8 max-w-3xl text-body">{s.hybride.accroche}</p>
        <p className="mx-auto mt-4 max-w-3xl text-body">{s.hybride.texte}</p>
      </section>

      {/* Contenu éditorial */}
      {s.sections.map((section) => (
        <section key={section.titre} className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="text-center font-display text-2xl tracking-wide text-gold uppercase md:text-3xl">
            {section.titre}
          </h2>

          {"intro" in section &&
            section.intro?.map((p) => (
              <p key={p.slice(0, 30)} className="mt-6 leading-relaxed text-body">
                {p}
              </p>
            ))}

          {"sousTitre" in section && section.sousTitre && (
            <h3 className="mt-10 text-lg tracking-wide text-ink uppercase">{section.sousTitre}</h3>
          )}

          {section.chapo && <p className="mt-6 leading-relaxed text-body">{section.chapo}</p>}

          {section.points.map((point) => (
            <div key={point.num} className="mt-10">
              <h3 className="text-lg tracking-wide text-ink uppercase">
                {point.num} {point.titre}
              </h3>
              {"image" in point && point.image ? (
                <div className="mt-5 grid items-center gap-8 sm:grid-cols-[240px_1fr]">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={point.image}
                      alt=""
                      fill
                      sizes="240px"
                      className="object-cover"
                    />
                  </div>
                  <p className="leading-relaxed text-body">{point.texte}</p>
                </div>
              ) : (
                <p className="mt-4 leading-relaxed text-body">{point.texte}</p>
              )}
            </div>
          ))}
        </section>
      ))}

      {/* Devis */}
      <section className="bg-cream px-6 py-20 text-center">
        <h2 className="section-title">{s.devis.titre}</h2>
        <p className="mx-auto mt-8 max-w-3xl leading-relaxed text-body">{s.devis.texte}</p>
        <Link
          href="/devis"
          className="mt-10 inline-block rounded-full bg-gold px-10 py-4 font-medium text-white transition-colors hover:bg-gold-dark"
        >
          {s.devis.cta}
        </Link>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20">
        <h2 className="mb-12 text-center font-display text-2xl tracking-wide text-ink md:text-3xl">
          🙋 FAQ séminaire Toulouse
        </h2>
        <Faq items={s.faq} />
      </section>

      {/* Donnees structurees : le site d'origine n'en avait pas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: s.faq.map((f) => ({
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
