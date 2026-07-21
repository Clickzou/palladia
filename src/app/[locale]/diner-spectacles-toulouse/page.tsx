import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import PageHeader from "@/components/PageHeader";
import { formaterDate, prochainsEvenements } from "@/lib/evenements";
import { booking } from "@/config/site";

export const metadata: Metadata = {
  title: "Dîners & Spectacles à Toulouse - Le Palladia hôtel 4 étoiles",
  description:
    "Partagez un moment convivial à l’Hôtel Palladia : humour, théâtre, concerts et musique classique accompagnés d’un dîner gastronomique.",
};

export default async function DinerSpectaclesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const evenements = await prochainsEvenements();

  return (
    <>
      <PageHeader
        breadcrumb="Dîner & Spectacle"
        title="Dîners & Spectacle"
        subtitle="Partagez un moment convivial à l’Hôtel Palladia"
      />

      {/* Affiches des prochaines dates */}
      {evenements.some((e) => e.affiche) && (
        <section className="grid grid-cols-2 gap-4 px-6 pb-16 lg:grid-cols-4">
          {evenements
            .filter((e) => e.affiche)
            .slice(0, 4)
            .map((e) => (
              <figure key={e.id}>
                <div className="relative aspect-[2/3] overflow-hidden">
                  <Image
                    src={e.affiche!}
                    alt={e.affiche_alt ?? e.titre}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-center font-display text-lg text-ink">
                  {new Date(e.debut).toLocaleDateString(locale, {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </figcaption>
              </figure>
            ))}
        </section>
      )}

      <p className="px-6 pb-12 text-center tracking-wide text-ink-soft uppercase">
        Ambiance assurée !
      </p>

      {/* Programmation */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        {evenements.length === 0 ? (
          <div className="border border-gold/40 bg-cream px-8 py-14 text-center">
            <p className="text-lg text-ink">
              La programmation de la prochaine saison est en préparation.
            </p>
            <p className="mt-3 text-body">
              Contactez-nous pour être informé des prochaines dates.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-full bg-gold px-9 py-3 font-medium text-white transition-colors hover:bg-gold-dark"
            >
              Nous contacter
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-black/10 border border-black/10 bg-white shadow-sm">
            {evenements.map((e) => (
              <li key={e.id} className="px-8 py-10">
                <h2 className="font-display text-lg tracking-wide text-ink uppercase md:text-xl">
                  {e.titre}
                </h2>
                {e.sous_titre && <p className="mt-1 text-body">{e.sous_titre}</p>}
                <p className="mt-1 text-body">{formaterDate(e.debut, locale)}</p>
                {e.tarif && <p className="mt-1 font-semibold text-ink">{e.tarif}</p>}
                {e.lien_billetterie && (
                  <a
                    href={e.lien_billetterie}
                    target="_blank"
                    rel="noopener"
                    className="mt-4 inline-block text-gold underline underline-offset-4 hover:text-gold-dark"
                  >
                    Réserver ma place
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Reservation */}
      <section className="px-6 pb-20 text-center">
        <h2 className="section-title text-ink-soft">Réservation</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href={booking.restaurant}
            target="_blank"
            rel="noopener"
            className="rounded-full bg-gold px-10 py-4 font-medium text-white transition-colors hover:bg-gold-dark"
          >
            Réservation
          </a>
          <Link
            href="/devis"
            className="rounded-full bg-gold px-10 py-4 font-medium text-white transition-colors hover:bg-gold-dark"
          >
            Infos groupes
          </Link>
        </div>
      </section>
    </>
  );
}
