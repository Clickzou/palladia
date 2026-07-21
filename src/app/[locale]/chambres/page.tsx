import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { booking } from "@/config/site";
import { rooms } from "@/data/rooms";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Chambres & Suites - Le Palladia hôtel 4 étoiles Toulouse",
  description:
    "Découvrez les quatre catégories de chambres de l’Hôtel Palladia à Toulouse : Confort, Prestige, Suite Junior et la Suite.",
};

export default function ChambresPage() {
  return (
    <>
      <PageHeader
        breadcrumb="Chambres"
        title="Chambres & Suites"
        subtitle="Quatre catégories pour répondre à toutes vos préférences"
      />

      <p className="mx-auto max-w-4xl px-6 pb-16 text-center leading-relaxed text-body">
        Chaque chambre est soigneusement élaborée avec une vision esthétique distinctive, créant une
        atmosphère à la fois sophistiquée et accueillante. Nos quatre catégories de chambres offrent
        une variété d’options pour répondre à toutes vos préférences et exigences.
      </p>

      <section className="mx-auto grid max-w-[1500px] gap-8 px-6 pb-20 md:grid-cols-2">
        {rooms.map((room) => (
          <article key={room.slug} className="flex flex-col bg-cream">
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
