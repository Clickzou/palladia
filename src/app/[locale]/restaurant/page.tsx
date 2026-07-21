import type { Metadata } from "next";
import Image from "next/image";
import { booking } from "@/config/site";
import { restaurant as r } from "@/data/restaurant";
import PageHeader from "@/components/PageHeader";
import PhotoGrid from "@/components/PhotoGrid";

export const metadata: Metadata = {
  title: r.metaTitle,
  description: r.metaDescription,
};

export default function RestaurantPage() {
  return (
    <>
      <PageHeader
        breadcrumb="Restaurant"
        title={r.title}
        subtitle={r.subtitle}
        ctaLabel="Réserver une table"
        ctaHref={booking.restaurant}
        external
      />

      {/* Presentation + portrait du chef */}
      <section className="mx-auto grid max-w-[1800px] items-start gap-12 px-8 pb-20 lg:grid-cols-2 lg:gap-16">
        <div>
          <Image
            src="/images/restaurant/picto-carte.png"
            alt=""
            width={90}
            height={90}
            className="h-20 w-auto"
          />
          <a
            href="/carte-restaurant.pdf"
            target="_blank"
            rel="noopener"
            className="mt-6 inline-block rounded-md bg-gold px-8 py-3 font-medium text-white transition-colors hover:bg-gold-dark"
          >
            Consulter la carte
          </a>

          {/* Bloc d'introduction : lignes serrees, comme sur le site */}
          <div className="mt-10 leading-relaxed text-body">
            {r.intro.map((p) => (
              <p key={p.slice(0, 30)}>{p}</p>
            ))}
          </div>

          <p className="mt-8">
            <a
              href={r.chef.href}
              className="font-semibold text-[#8b3a3a] underline underline-offset-4 hover:text-gold"
            >
              Découvrez notre chef de Cuisine, {r.chef.name}
            </a>
          </p>

          <div className="mt-8 space-y-4">
            {r.horaires.map((h) => (
              <p key={h.texte.slice(0, 30)} className={h.fort ? "font-semibold text-ink" : "text-body"}>
                {h.texte}
              </p>
            ))}
          </div>
        </div>

        <div className="relative aspect-[3/4] w-full">
          <Image
            src="/images/restaurant/chef.jpg"
            alt={`${r.chef.name}, chef de cuisine de l’Hôtel Palladia`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Menus */}
      <section className="bg-cream px-6 py-20">
        <h2 className="section-title">Menu</h2>
        <p className="mt-4 text-center text-lg tracking-wide text-ink-soft uppercase">
          Découvrez notre menu de la semaine
        </p>
        <div className="mx-auto mt-6 h-px w-20 bg-gold" />

        <div className="mx-auto mt-14 grid max-w-6xl gap-10 md:grid-cols-2">
          {/* Menu de la semaine */}
          <article className="bg-white px-8 py-12 text-center shadow-sm">
            <h3 className="font-display text-2xl tracking-wide text-gold uppercase">
              {r.menuSemaine.titre}
            </h3>
            {r.menuSemaine.sections.map((s) => (
              <div key={s.titre} className="mt-8">
                <h4 className="font-semibold tracking-wide text-ink uppercase">{s.titre}</h4>
                <ul className="mt-3 space-y-2 text-body">
                  {s.choix.map((c) => (
                    <li key={c.slice(0, 25)} className="whitespace-pre-line">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <p className="mt-10 text-sm text-muted italic">{r.menuSemaine.note}</p>
          </article>

          {/* Menu du jour */}
          <article className="bg-white px-8 py-12 text-center shadow-sm">
            <h3 className="font-display text-2xl tracking-wide text-gold uppercase">
              {r.menuJour.titre}
            </h3>
            <p className="mt-2 tracking-wide text-ink-soft uppercase">{r.menuJour.sousTitre}</p>

            <p className="mt-8 font-semibold text-ink">{r.menuJour.intro}</p>
            <ul className="mt-3 space-y-1 text-body">
              {r.menuJour.formules.map((f) => (
                <li key={f.prix}>
                  <span className="font-semibold text-ink">{f.prix}</span>{" "}
                  {f.detail.replace(/\*\*/g, "")}
                </li>
              ))}
            </ul>

            <p className="mt-8 font-semibold text-ink">{r.menuJour.tarifsTitre}</p>
            <ul className="mt-3 space-y-1 text-body">
              {r.menuJour.tarifs.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>

            <div className="mt-10 border-t border-black/10 pt-8">
              <h4 className="font-semibold tracking-wide text-ink uppercase">
                {r.menuJour.enfant.titre}
              </h4>
              <p className="mt-2 text-body">
                <span className="font-semibold text-ink">{r.menuJour.enfant.prix}</span> —{" "}
                {r.menuJour.enfant.detail}
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* Bar Lounge */}
      <section className="grid items-stretch md:grid-cols-2">
        <div className="relative min-h-[320px] md:min-h-[520px]">
          <Image
            src="/images/restaurant/bar-lounge.jpg"
            alt="Le bar lounge de l’Hôtel Palladia"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center px-8 py-16 lg:px-20">
          <h2 className="font-display text-3xl tracking-wide text-gold uppercase lg:text-4xl">
            {r.bar.titre}
          </h2>
          <p className="mt-2 tracking-wide text-ink-soft uppercase">{r.bar.sousTitre}</p>
          <div className="mt-6 space-y-4 leading-relaxed text-body">
            {r.bar.paragraphes.map((p) => (
              <p key={p.slice(0, 30)}>{p}</p>
            ))}
            <p className="font-semibold text-ink">{r.bar.privatisation}</p>
            <p>{r.bar.horaires}</p>
          </div>

          <h3 className="mt-8 font-semibold tracking-wide text-ink uppercase">
            Modes de paiement acceptés
          </h3>
          <p className="mt-2 text-body">{r.bar.paiement}</p>
        </div>
      </section>

      {/* Galerie */}
      <section className="py-20">
        <h2 className="section-title">{r.galerieTitre}</h2>
        <div className="mx-auto mt-6 mb-12 h-px w-20 bg-gold" />
        <PhotoGrid images={[...r.galerie]} />
      </section>

      {/* Actions de fin de page */}
      <section className="bg-cream px-6 py-14 text-center">
        <a
          href={booking.restaurant}
          target="_blank"
          rel="noopener"
          className="inline-block rounded-full bg-gold px-10 py-4 font-medium text-white transition-colors hover:bg-gold-dark"
        >
          Réserver une table
        </a>
      </section>
      <section className="px-6 py-14 text-center">
        <a
          href="/carte-restaurant.pdf"
          target="_blank"
          rel="noopener"
          className="inline-block rounded-full bg-ink-soft px-10 py-4 font-medium text-white transition-colors hover:bg-ink"
        >
          Voir la carte du restaurant
        </a>
      </section>
    </>
  );
}
