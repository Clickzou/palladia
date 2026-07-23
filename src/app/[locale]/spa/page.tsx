import type { Metadata } from "next";
import { traduire, traduireContenu } from "@/i18n/contenu";
import { metadonnees } from "@/data/seo";
import { booking } from "@/config/site";
import { spa as spaFr } from "@/data/spa";
import PageHeader from "@/components/PageHeader";
import CarrouselLarge from "@/components/CarrouselLarge";

/** Titre et description dans la langue de la page, avec les alternatives hreflang. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return metadonnees("/spa", locale);
}

export default async function SpaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const spa = traduireContenu(spaFr, locale);
  const t = (texte: string) => traduire(texte, locale);

  return (
    <>
      <PageHeader breadcrumb={t("Spa")} title={spa.title} subtitle={spa.subtitle} />

      <p className="mx-auto max-w-4xl px-6 pb-14 text-center leading-relaxed text-body">
        {spa.intro}
      </p>

      <CarrouselLarge images={spa.carrousel} />

      {/* Presentation, horaires et contact */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <p className="leading-relaxed text-body">{spa.presentation}</p>

        <h2 className="mt-10 font-semibold tracking-wide text-ink uppercase">
          {t("Horaires d’ouverture :")}
        </h2>
        <p className="mt-4 leading-relaxed text-body">
          {spa.horaires.join(", ")}.
        </p>
        <p className="mt-4 text-body">{spa.fermeture}</p>

        <a
          href={spa.telephoneHref}
          className="mt-6 inline-block text-lg font-semibold text-ink underline underline-offset-4 hover:text-gold"
        >
          {spa.telephone}
        </a>

        {/* Ces deux boutons menaient tous deux a la billetterie Secretbox. Le
            site d'origine ouvrait, lui, la grille tarifaire reservee aux
            clients de l'hotel et le site du spa — deux destinations que la
            reprise avait confondues. */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href={spa.tarifsPdf}
            target="_blank"
            rel="noopener"
            className="rounded-full bg-gold px-9 py-4 font-medium text-white transition-colors hover:bg-gold-dark"
          >
            {t("Offres Clients Hôtel")}
          </a>
          <a
            href={spa.siteSpa}
            target="_blank"
            rel="noopener"
            className="rounded-full bg-gold px-9 py-4 font-medium text-white transition-colors hover:bg-gold-dark"
          >
            {t("Prestations Proposées")}
          </a>
        </div>
      </section>

      {/* Bandeau formules */}
      <section
        className="relative flex h-[440px] items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/spa/formules-bandeau.jpg')" }}
      >
        <h2 className="px-6 text-center font-display text-3xl tracking-wide text-white uppercase drop-shadow-lg md:text-5xl">
          {spa.forfaitsTitre}
        </h2>
      </section>

      {/* Forfaits */}
      <section className="grid gap-px bg-black/10 md:grid-cols-3">
        {spa.forfaits.map((f) => (
          <article key={f.nom} className="flex flex-col bg-cream px-8 py-14 text-center">
            <h3 className="titre-section text-ink">{f.nom}</h3>
            <div className="mx-auto mt-5 h-px w-16 bg-gold" />
            <h4 className="mt-6 text-lg font-normal text-ink">
              {f.prix} {f.pour}
            </h4>
            <ul className="mt-8 grow space-y-2 leading-relaxed text-body">
              {f.inclus.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <a
              href={f.reservation}
              target="_blank"
              rel="noopener"
              className="mx-auto mt-8 rounded-full bg-gold px-9 py-3 font-medium text-white transition-colors hover:bg-gold-dark"
            >
              {t("Réserver")}
              <span className="sr-only"> {t("le")} {f.nom}</span>
            </a>
          </article>
        ))}
      </section>

      {/* Conditions generales */}
      <section className="bg-ink-soft px-6 py-16 text-center text-white/90">
        <h2 className="font-semibold tracking-wide uppercase">{spa.cgvTitre}</h2>
        <div className="mx-auto mt-8 max-w-4xl space-y-3 leading-relaxed">
          {spa.cgv.map((c) => (
            <p key={c.slice(0, 30)}>{c}</p>
          ))}
        </div>
      </section>
    </>
  );
}
