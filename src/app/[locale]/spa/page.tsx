import type { Metadata } from "next";
import { booking } from "@/config/site";
import { spa } from "@/data/spa";
import PageHeader from "@/components/PageHeader";
import RoomGallery from "@/components/RoomGallery";

export const metadata: Metadata = {
  title: spa.metaTitle,
  description: spa.metaDescription,
};

export default function SpaPage() {
  return (
    <>
      <PageHeader breadcrumb="Spa" title={spa.title} subtitle={spa.subtitle} />

      <p className="mx-auto max-w-4xl px-6 pb-14 text-center text-lg leading-relaxed text-body">
        {spa.intro}
      </p>

      <RoomGallery images={[...spa.carrousel]} />

      {/* Presentation, horaires et contact */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <p className="text-lg leading-relaxed text-body">{spa.presentation}</p>

        <h2 className="mt-10 font-semibold tracking-wide text-ink uppercase">
          Horaires d’ouverture :
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-body">
          {spa.horaires.join(", ")}.
        </p>
        <p className="mt-4 text-lg text-body">{spa.fermeture}</p>

        <a
          href={spa.telephoneHref}
          className="mt-6 inline-block text-lg font-semibold text-ink underline underline-offset-4 hover:text-gold"
        >
          {spa.telephone}
        </a>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href={booking.spa}
            target="_blank"
            rel="noopener"
            className="rounded-full bg-gold px-9 py-4 font-medium text-white transition-colors hover:bg-gold-dark"
          >
            Offres Clients Hôtel
          </a>
          <a
            href={booking.spa}
            target="_blank"
            rel="noopener"
            className="rounded-full bg-gold px-9 py-4 font-medium text-white transition-colors hover:bg-gold-dark"
          >
            Prestations Proposées
          </a>
        </div>
      </section>

      {/* Bandeau formules */}
      <section
        className="relative flex h-[340px] items-center justify-center bg-cover bg-center"
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
            <h3 className="font-display text-2xl text-ink">{f.nom}</h3>
            <div className="mx-auto mt-5 h-px w-16 bg-gold" />
            <p className="mt-6 text-lg text-ink">
              {f.prix} {f.pour}
            </p>
            <ul className="mt-8 grow space-y-2 leading-relaxed text-body">
              {f.inclus.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <a
              href={booking.spa}
              target="_blank"
              rel="noopener"
              className="mx-auto mt-8 rounded-full bg-gold px-9 py-3 font-medium text-white transition-colors hover:bg-gold-dark"
            >
              Réserver
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
