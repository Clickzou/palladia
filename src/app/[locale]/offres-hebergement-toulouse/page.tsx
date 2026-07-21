import type { Metadata } from "next";
import { metadonnees } from "@/data/seo";
import Image from "next/image";
import { booking } from "@/config/site";
import { offresEte as o } from "@/data/offres-ete";
import PhotoGrid from "@/components/PhotoGrid";
import { IconCheck } from "@/components/icons";

export const metadata: Metadata = metadonnees("/offres-hebergement-toulouse");

/** Met en gras les segments encadrés par ** */
function EnGras({ texte }: { texte: string }) {
  return (
    <>
      {texte.split(/\*\*(.+?)\*\*/g).map((m, i) => (i % 2 === 1 ? <strong key={m}>{m}</strong> : m))}
    </>
  );
}

export default function OffresEtePage() {
  return (
    <>
      <header className="px-6 pt-14 pb-12 text-center">
        <Image
          src="/images/logo-independant.png"
          alt="Établissement 100 % toulousain indépendant"
          width={300}
          height={272}
          className="mx-auto mb-8 h-auto w-40 md:w-48"
        />
        <h1 className="section-title">{o.title}</h1>
        <div className="mx-auto mt-6 h-px w-20 bg-gold" />
        <p className="mx-auto mt-8 max-w-3xl leading-relaxed text-body">
          <EnGras texte={o.chapo} />
        </p>
      </header>

      {/* Offres, alternées texte / affiche */}
      {o.offres.map((offre, i) => {
        const afficheAdroite = i % 2 === 0;

        return (
          <section key={offre.slug} className="grid items-stretch bg-cream md:grid-cols-2">
            <div
              className={`flex flex-col justify-center px-8 py-14 lg:px-16 ${
                afficheAdroite ? "" : "md:order-2"
              }`}
            >
              <h2 className="section-title text-ink">
                {offre.titre}
              </h2>
              <h3 className="mt-3 font-semibold tracking-wide text-gold uppercase">{offre.prix}</h3>

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

            {/* L’affiche occupe toute la moitie, sans marge, comme sur le site. */}
            <div className={`relative min-h-[320px] md:min-h-[560px] ${afficheAdroite ? "" : "md:order-1"}`}>
              <Image
                src={offre.affiche}
                alt={offre.afficheAlt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </section>
        );
      })}

      {/* Pourquoi reserver en direct — bandeau dore en biais, comme sur le site */}
      <section
        className="bg-gold px-6 py-28 text-center text-white md:py-36"
        style={{ clipPath: "polygon(0 4%, 100% 0, 100% 96%, 0 100%)" }}
      >
        <h2 className="font-display text-2xl tracking-wide uppercase md:text-4xl">
          {o.argumentsTitre}
        </h2>
        <div className="mx-auto mt-6 h-px w-20 bg-white/70" />
        <ul className="mx-auto mt-10 flex max-w-lg flex-col gap-2">
          {o.arguments.map((a) => (
            <li key={a} className="flex items-center justify-center gap-3 text-xl md:text-2xl">
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
