import type { Metadata } from "next";
import Image from "next/image";
import { booking } from "@/config/site";
import { offresEte as o } from "@/data/offres-ete";
import PhotoGrid from "@/components/PhotoGrid";
import { IconCheck } from "@/components/icons";
import { existsSync } from "node:fs";
import { join } from "node:path";

export const metadata: Metadata = {
  title: o.metaTitle,
  description: o.metaDescription,
};

/** Met en gras les segments encadrés par ** */
function EnGras({ texte }: { texte: string }) {
  return (
    <>
      {texte.split(/\*\*(.+?)\*\*/g).map((m, i) => (i % 2 === 1 ? <strong key={m}>{m}</strong> : m))}
    </>
  );
}

/** Les affiches promotionnelles ne sont pas encore fournies : on ne casse pas le rendu. */
const afficheDisponible = (chemin: string) =>
  existsSync(join(process.cwd(), "public", chemin));

export default function OffresEtePage() {
  return (
    <>
      <header className="px-6 pt-14 pb-12 text-center">
        <p className="mx-auto mb-8 w-fit rounded-full border-2 border-gold px-6 py-3 text-xs font-semibold tracking-[0.2em] text-gold uppercase">
          Établissement 100 % toulousain indépendant
        </p>
        <h1 className="section-title">{o.title}</h1>
        <div className="mx-auto mt-6 h-px w-20 bg-gold" />
        <p className="mx-auto mt-8 max-w-3xl leading-relaxed text-body">
          <EnGras texte={o.chapo} />
        </p>
      </header>

      {/* Offres, alternées texte / affiche */}
      {o.offres.map((offre, i) => {
        const afficheAdroite = i % 2 === 0;
        const aAffiche = afficheDisponible(offre.affiche);

        return (
          <section
            key={offre.slug}
            className={`grid items-stretch md:grid-cols-2 ${i % 2 === 1 ? "bg-cream" : ""}`}
          >
            <div
              className={`flex flex-col justify-center px-8 py-14 lg:px-16 ${
                afficheAdroite ? "" : "md:order-2"
              }`}
            >
              <h2 className="font-display text-2xl tracking-wide text-ink uppercase md:text-3xl">
                {offre.titre}
              </h2>
              <p className="mt-3 font-semibold tracking-wide text-gold uppercase">{offre.prix}</p>

              <div className="mt-6 space-y-4 leading-relaxed text-body">
                {offre.paragraphes.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>

              {offre.conditions && (
                <p className="mt-5 font-medium text-ink italic">{offre.conditions}</p>
              )}

              {offre.inclus.length > 0 && (
                <>
                  <h3 className="mt-6 font-semibold text-ink">Inclus :</h3>
                  <ul className="mt-3 space-y-2">
                    {offre.inclus.map((item) => (
                      <li key={item} className="flex gap-3 text-body">
                        <IconCheck className="mt-1.5 size-3.5 shrink-0 fill-gold" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <a
                href={booking.premium}
                target="_blank"
                rel="noopener"
                className="mt-8 self-start rounded-full bg-gold px-9 py-3 font-medium text-white transition-colors hover:bg-gold-dark"
              >
                Réserver
                <span className="sr-only"> — {offre.titre}</span>
              </a>
            </div>

            <div className={`relative min-h-[320px] md:min-h-[520px] ${afficheAdroite ? "" : "md:order-1"}`}>
              {aAffiche ? (
                <Image
                  src={offre.affiche}
                  alt={offre.afficheAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center bg-ink-soft px-8 text-center">
                  <span className="font-display text-3xl text-gold md:text-4xl">{offre.prix}</span>
                  <span className="mt-4 text-sm tracking-wide text-white/70 uppercase">
                    {offre.titre}
                  </span>
                </div>
              )}
            </div>
          </section>
        );
      })}

      {/* Pourquoi reserver en direct */}
      <section className="bg-gold px-6 py-20 text-center text-white">
        <h2 className="font-display text-2xl tracking-wide uppercase md:text-4xl">
          {o.argumentsTitre}
        </h2>
        <div className="mx-auto mt-6 h-px w-20 bg-white/70" />
        <ul className="mx-auto mt-10 flex max-w-lg flex-col gap-3">
          {o.arguments.map((a) => (
            <li key={a} className="flex items-center justify-center gap-3 text-lg md:text-xl">
              <IconCheck className="size-5 fill-current" />
              {a}
            </li>
          ))}
        </ul>
      </section>

      {/* Reservation */}
      <section className="px-6 py-20 text-center">
        <h2 className="section-title">{o.reservation.titre}</h2>
        <div className="mx-auto mt-6 h-px w-20 bg-gold" />
        <a
          href={o.reservation.telephoneHref}
          className="mt-8 block font-semibold text-gold hover:underline"
        >
          {o.reservation.telephone}
        </a>
        <p className="mt-2 text-body">{o.reservation.siteWeb}</p>
        <a
          href={booking.premium}
          target="_blank"
          rel="noopener"
          className="mt-8 inline-block rounded-full bg-gold px-10 py-4 font-medium text-white transition-colors hover:bg-gold-dark"
        >
          Réserver
        </a>
      </section>

      <PhotoGrid images={[...o.bandeau]} columns={4} />
    </>
  );
}
