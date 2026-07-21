import type { Metadata } from "next";
import { metadonnees } from "@/data/seo";
import Faq from "@/components/Faq";
import { tourisme as t } from "@/data/tourisme";

export const metadata: Metadata = metadonnees("/visites-toulouse");

/** Met en gras les segments encadrés par ** dans les textes d’introduction. */
function EnGras({ texte }: { texte: string }) {
  const morceaux = texte.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {morceaux.map((m, i) => (i % 2 === 1 ? <strong key={m}>{m}</strong> : m))}
    </>
  );
}

export default function TourismePage() {
  return (
    <>
      <header className="mx-auto max-w-5xl px-6 pt-16 pb-10 text-center">
        <h1 className="section-title">{t.title}</h1>
        <div className="mx-auto mt-6 h-px w-20 bg-gold" />
        <div className="mt-10 space-y-5 leading-relaxed text-body">
          {t.intro.map((p) => (
            <p key={p.slice(0, 40)}>
              <EnGras texte={p} />
            </p>
          ))}
        </div>
      </header>

      {/* Carte interactive uMap */}
      <section className="bg-cream py-14">
        <h2 className="px-6 text-center text-lg font-semibold tracking-wide text-ink uppercase md:text-xl">
          📖 Carte interactive des lieux incontournables à Toulouse
        </h2>
        <div className="mt-10">
          <iframe
            src={t.carteUrl}
            title="Carte des points d’intérêt à Toulouse proches de l’Hôtel Palladia"
            loading="lazy"
            className="h-[70vh] min-h-[420px] w-full border-0"
          />
        </div>
        <p className="mt-5 text-center">
          <a
            href={t.carteUrl}
            target="_blank"
            rel="noopener"
            className="text-[#8b3a3a] underline underline-offset-4 hover:text-gold"
          >
            Voir en plein écran
          </a>
        </p>
      </section>

      {/* Liste des lieux */}
      <section className="px-6 py-20">
        <h2 className="text-center text-lg font-semibold tracking-wide text-ink uppercase md:text-xl">
          Liste des lieux incontournables à Toulouse
        </h2>

        <ul className="mx-auto mt-14 grid max-w-[1500px] gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {t.lieux.map((lieu) => (
            <li
              key={lieu.nom}
              className="flex flex-col border border-gold/50 px-6 py-8 text-center"
            >
              <h3 className="font-display text-lg tracking-wide text-ink uppercase">
                {lieu.nom}
              </h3>
              <p className="mt-4 grow leading-relaxed text-body">{lieu.description}</p>
              <p className="mt-5 text-sm text-muted">{lieu.adresse}</p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${lieu.nom} ${lieu.adresse}`,
                )}`}
                target="_blank"
                rel="noopener"
                className="mt-6 self-center rounded-full bg-gold px-7 py-2.5 text-sm font-medium text-white underline-offset-2 transition-colors hover:bg-gold-dark"
              >
                Découvrir
                <span className="sr-only"> {lieu.nom}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="bg-cream px-6 py-20">
        <h2 className="mb-12 text-center text-lg font-semibold tracking-wide text-ink uppercase md:text-xl">
          🙋 FAQ – Visiter Toulouse depuis l’Hôtel Palladia
        </h2>
        <Faq items={t.faq} />
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: t.faq.map((f) => ({
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
