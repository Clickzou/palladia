import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import PhotoGrid from "@/components/PhotoGrid";
import { booking } from "@/config/site";
import { hotel } from "@/data/hotel";
import { IconCheck } from "@/components/icons";

export const metadata: Metadata = {
  title: hotel.metaTitle,
  description: hotel.metaDescription,
};

export default function HotelPage() {
  return (
    <>
      <PageHeader breadcrumb="Hôtel" title={hotel.title} subtitle={hotel.subtitle} />

      <section className="mx-auto max-w-4xl space-y-5 px-6 pb-16 leading-relaxed text-body">
        {hotel.presentation.map((p) => (
          <p key={p.slice(0, 40)}>{p}</p>
        ))}
      </section>

      <PhotoGrid images={[...hotel.galerie]} columns={4} />

      {/* Services */}
      <section className="px-6 py-20">
        <h2 className="section-title">{hotel.servicesTitre}</h2>
        <div className="mx-auto mt-6 mb-14 h-px w-20 bg-gold" />

        <ul className="mx-auto grid max-w-[1400px] gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {hotel.services.map((s) => (
            <li key={s.nom} className="flex gap-4 border-l-2 border-gold/60 pl-5">
              <IconCheck className="mt-1 size-4 shrink-0 fill-gold" />
              <div>
                <h3 className="font-semibold tracking-wide text-ink uppercase">{s.nom}</h3>
                <p className="mt-2 leading-relaxed text-body">{s.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Preparez votre sejour */}
      <section className="bg-cream px-6 py-14">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-6 sm:flex-row">
          <h2 className="font-display text-xl tracking-wide text-ink uppercase md:text-2xl">
            Préparez votre séjour
          </h2>
          <a
            href={booking.premium}
            target="_blank"
            rel="noopener"
            className="rounded-md bg-gold px-8 py-4 font-medium text-white transition-colors hover:bg-gold-dark"
          >
            Réservez au meilleur prix
          </a>
        </div>
      </section>
    </>
  );
}
