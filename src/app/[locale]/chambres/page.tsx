import type { Metadata } from "next";
import { traduire, traduireContenu } from "@/i18n/contenu";
import { metadonnees } from "@/data/seo";
import Image from "next/image";
import { Coffee, Croissant, Dog } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { rooms as roomsFr } from "@/data/rooms";
import PageHeader from "@/components/PageHeader";

/** Titre et description dans la langue de la page, avec les alternatives hreflang. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return metadonnees("/chambres", locale);
}

export default async function ChambresPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const rooms = traduireContenu(roomsFr, locale);
  const t = (texte: string) => traduire(texte, locale);

  return (
    <>
      <PageHeader
        breadcrumb={t("Chambres et Suites")}
        title={t("Chambres")}
        subtitle={t("4 catégories de chambres pour un total de 90 chambres")}
      />

      <p className="mx-auto max-w-4xl px-6 text-center leading-relaxed text-body">
        {t(
          "Chaque chambre est conçue selon une approche esthétique unique, lui conférant une ambiance raffinée et chaleureuse. De la Confort à la Suite, les 4 catégories vous permettent de choisir la chambre qui correspond le mieux à vos exigences.",
        )}
      </p>

      {/* Petit dejeuner */}
      <div className="px-6 py-14 text-center">
        <span className="mx-auto flex w-fit items-end gap-1 text-gold">
          <Croissant className="size-12" strokeWidth={1.2} />
          <Coffee className="size-10" strokeWidth={1.2} />
        </span>
        <p className="mx-auto mt-8 max-w-3xl leading-relaxed text-gold">
          {t(
            "Le petit déjeuner est servi au restaurant sous forme de buffet de 6h30 à 10h00 du lundi au samedi.",
          )}
          <br />
          {t("Dimanche et jours fériés le petit déjeuner est servi jusqu’à 11h00.")}
        </p>

        {/* Le devis evenementiel reclamait un budget et une date unique : on
            n'y decrivait pas un sejour. Ce bouton mene desormais au formulaire
            de reservation de groupe, qui part a la reception. */}
        <Link
          href="/reservation-groupe"
          className="mt-10 inline-block rounded-full bg-gold px-9 py-4 font-medium text-white transition-colors hover:bg-gold-dark"
        >
          {t("Réservation Groupe ? Par ici →")}
        </Link>
      </div>

      {/* Les quatre categories, de la plus spacieuse a la plus simple */}
      <section className="mx-auto grid max-w-[1500px] gap-8 px-6 pb-20 md:grid-cols-2">
        {[...rooms].reverse().map((room) => (
          <article key={room.slug} className="flex flex-col border border-gold/50 bg-cream/60 p-3">
            <Link href={`/${room.slug}`} className="group relative block aspect-[3/2] overflow-hidden">
              <Image
                src={room.heroImage}
                alt={room.titreCourt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </Link>

            <div className="flex grow flex-col px-6 py-8 text-center">
              <h2 className="font-display text-3xl tracking-wide text-ink uppercase">
                <Link href={`/${room.slug}`} className="transition-colors hover:text-gold">
                  {room.titreCourt}
                </Link>
              </h2>
              <p className="mt-6 grow leading-relaxed text-body">{room.resume}</p>

              <Link
                href={`/${room.slug}`}
                className="mx-auto mt-8 rounded-full bg-gold px-9 py-3 font-medium text-white transition-colors hover:bg-gold-dark"
              >
                {t("Découvrir")}
                <span className="sr-only"> {t("la chambre")} {room.titreCourt}</span>
              </Link>
            </div>
          </article>
        ))}
      </section>

      {/* Animaux de compagnie */}
      <div className="px-6 pb-20 text-center">
        <Dog className="mx-auto size-10 text-gold" strokeWidth={1.2} />
        {/* Titre sur le site, malgre sa longueur : on garde le meme niveau */}
        <h3 className="mx-auto mt-6 max-w-3xl text-[15px] leading-relaxed font-normal text-body">
          {t(
            "Les animaux de compagnie (de moins de 10 kg) sont autorisés, avec un supplément de 15 € par jour, par animal, dans la limite de 1 animal par chambre sur demande uniquement.",
          )}
        </h3>
      </div>
    </>
  );
}
