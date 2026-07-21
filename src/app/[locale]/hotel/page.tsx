import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import PhotoGrid from "@/components/PhotoGrid";
import { booking } from "@/config/site";
import { hotel } from "@/data/hotel";
import { PICTOS_SERVICES } from "@/components/icons-services";

export const metadata: Metadata = {
  title: hotel.metaTitle,
  description: hotel.metaDescription,
};


/** Affiche le pictogramme correspondant a la cle du service. */
function Picto({ nom, className = "" }: { nom: string; className?: string }) {
  const Icone = PICTOS_SERVICES[nom as keyof typeof PICTOS_SERVICES];
  if (!Icone) return null;
  return <Icone className={`size-9 shrink-0 text-ink-soft ${className}`} strokeWidth={1.5} />;
}

export default function HotelPage() {
  // L'accessibilite PMR est presentee seule, centree, en fin de liste.
  const services = hotel.services.filter((s) => s.icone !== "pmr");
  const pmr = hotel.services.find((s) => s.icone === "pmr");

  return (
    <>
      <PageHeader breadcrumb="Hôtel" title={hotel.title} subtitle={hotel.subtitle} />

      {/* Presentation : texte et tableau a gauche, video a droite */}
      <section className="mx-auto grid max-w-[1500px] items-start gap-12 px-6 pb-20 lg:grid-cols-2">
        <div>
          <div className="space-y-5 leading-relaxed text-body">
            {hotel.presentation.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>

          <figure className="mt-12 text-center">
            <Image
              src={hotel.tableau.src}
              alt={hotel.tableau.legende}
              width={300}
              height={300}
              className="mx-auto h-auto w-full max-w-[300px]"
            />
            <figcaption className="mt-4 text-body italic">{hotel.tableau.legende}</figcaption>
          </figure>
        </div>

        <div className="relative aspect-[3/4] w-full overflow-hidden lg:sticky lg:top-32">
          <video
            className="absolute inset-0 size-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/hotel/vue-4.jpg"
            aria-label="Présentation en vidéo de l’Hôtel Palladia"
          >
            <source src="/videos/hotel-presentation.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* Services */}
      <section className="bg-cream px-6 py-20">
        <h2 className="section-title">{hotel.servicesTitre}</h2>
        <div className="mx-auto mt-6 mb-16 h-px w-20 bg-gold" />

        <ul className="mx-auto grid max-w-5xl gap-x-16 gap-y-12 md:grid-cols-2">
          {services.map((s) => (
            <li key={s.nom} className="flex gap-5">
              <Picto nom={s.icone} />
              <div>
                <h3 className="font-display text-2xl text-gold">{s.nom}</h3>
                <p className="mt-2 leading-relaxed text-body">{s.detail}</p>
              </div>
            </li>
          ))}
        </ul>

        {pmr && (
          <div className="mx-auto mt-16 max-w-4xl text-center">
            <Picto nom="pmr" className="mx-auto" />
            <h3 className="mt-4 font-display text-2xl text-gold">{pmr.nom}</h3>
            <p className="mt-3 leading-relaxed text-body">{pmr.detail}</p>
          </div>
        )}
      </section>

      <PhotoGrid images={[...hotel.galerie]} columns={2} mode="paysage" />

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
