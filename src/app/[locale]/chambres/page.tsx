import type { Metadata } from "next";
import Image from "next/image";
import { Coffee, Croissant } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { booking } from "@/config/site";
import { rooms } from "@/data/rooms";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Chambres & Suites - Le Palladia hôtel 4 étoiles Toulouse",
  description:
    "Découvrez les quatre catégories de chambres de l’Hôtel Palladia à Toulouse : Confort, Prestige, Suite Junior et la Suite, pour un total de 90 chambres.",
};

export default function ChambresPage() {
  return (
    <>
      <PageHeader
        breadcrumb="Chambres et Suites"
        title="Chambres"
        subtitle="4 catégories de chambres pour un total de 90 chambres"
      />

      <p className="mx-auto max-w-4xl px-6 text-center leading-relaxed text-body">
        Chaque chambre est conçue selon une approche esthétique unique, lui conférant une ambiance
        raffinée et chaleureuse. De la Confort à la Suite, les 4 catégories vous permettent de
        choisir la chambre qui correspond le mieux à vos exigences.
      </p>

      {/* Petit dejeuner */}
      <div className="px-6 py-14 text-center">
        <span className="mx-auto flex w-fit items-end gap-1 text-gold">
          <Croissant className="size-12" strokeWidth={1.2} />
          <Coffee className="size-10" strokeWidth={1.2} />
        </span>
        <p className="mx-auto mt-8 max-w-3xl leading-relaxed text-gold">
          Le petit déjeuner est servi au restaurant sous forme de buffet de 6h30 à 10h00 du lundi au
          samedi.
          <br />
          Dimanche et jours fériés le petit déjeuner est servi jusqu’à 11h00.
        </p>

        <Link
          href="/devis"
          className="mt-10 inline-block rounded-full bg-gold px-9 py-4 font-medium text-white transition-colors hover:bg-gold-dark"
        >
          Réservation Groupe ? Par ici →
        </Link>
      </div>

      {/* Les quatre categories */}
      <section className="mx-auto grid max-w-[1500px] gap-8 px-6 pb-20 md:grid-cols-2">
        {rooms.map((room) => (
          <article key={room.slug} className="flex flex-col border border-gold/60">
            <Link href={`/${room.slug}`} className="group relative block aspect-[3/2] overflow-hidden">
              <Image
                src={room.heroImage}
                alt={room.hero}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </Link>

            <div className="flex grow flex-col px-8 py-8 text-center">
              <h2 className="font-display text-2xl tracking-wide text-gold uppercase">
                <Link href={`/${room.slug}`} className="transition-colors hover:text-gold-dark">
                  {room.hero}
                </Link>
              </h2>
              <p className="mt-2 font-semibold text-ink">{room.surface}</p>
              <p className="mt-5 grow leading-relaxed text-body">{room.lead}</p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href={`/${room.slug}`}
                  className="rounded-full border border-gold px-7 py-2.5 text-sm font-medium text-gold transition-colors hover:bg-gold hover:text-white"
                >
                  En savoir plus
                </Link>
                <a
                  href={booking.premium}
                  target="_blank"
                  rel="noopener"
                  className="rounded-full bg-gold px-7 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gold-dark"
                >
                  Réserver
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
