import type { Metadata } from "next";
import { traduireContenu } from "@/i18n/contenu";
import { metadonnees } from "@/data/seo";
import Image from "next/image";
import { booking } from "@/config/site";
import { restaurant as rFr } from "@/data/restaurant";
import PageHeader from "@/components/PageHeader";
import PhotoGrid from "@/components/PhotoGrid";
import VideoYoutube from "@/components/VideoYoutube";

/** Titre et description dans la langue de la page, avec les alternatives hreflang. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return metadonnees("/restaurant", locale);
}

export default async function RestaurantPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const r = traduireContenu(rFr, locale);

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

          {/* Bloc d’introduction : lignes serrees, comme sur le site */}
          <div className="mt-10 leading-relaxed text-body">
            {r.intro.map((p) => (
              <p key={p.slice(0, 30)}>{p}</p>
            ))}
          </div>

          <p className="mt-8">
            <a
              href="/presse"
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
        <h3 className="mt-4 text-center text-[22px] font-normal text-body uppercase">
          Découvrez notre menu de la semaine
        </h3>
        <div className="mx-auto mt-6 h-px w-20 bg-gold" />

        <div className="mx-auto mt-14 grid max-w-6xl gap-10 md:grid-cols-2">
          {/* Menu de la semaine. Le site titre chaque service en h4 doré 19 px
              et regroupe ses options dans un seul paragraphe, separees par « ou ». */}
          <article className="bg-white px-8 py-12 text-center shadow-sm">
            <h2 className="titre-moyen text-ink">{r.menuSemaine.titre}</h2>
            {r.menuSemaine.sections.map((s) => (
              <div key={s.titre} className="mt-8">
                <h4 className="titre-mini">{s.titre}</h4>
                <p className="mt-3 whitespace-pre-line text-body">{s.choix.join("\nou\n")}</p>
              </div>
            ))}
            <p className="mt-10 text-sm text-muted italic">{r.menuSemaine.note}</p>
          </article>

          {/* Menu du jour */}
          <article className="bg-white px-8 py-12 text-center shadow-sm">
            <h2 className="titre-moyen text-ink">{r.menuJour.titre}</h2>
            <h4 className="titre-mini mt-2">{r.menuJour.sousTitre}</h4>

            <p className="mt-8 text-body">{r.menuJour.intro}</p>
            {r.menuJour.formules.map((f) => (
              <div key={f.prix} className="mt-4">
                <h4 className="titre-mini">{f.prix}</h4>
                <p className="mt-1 text-body">{f.detail.replace(/\*\*/g, "")}</p>
              </div>
            ))}

            <p className="mt-8 text-body">{r.menuJour.tarifsTitre}</p>
            <div className="mt-3 space-y-1 text-body">
              {r.menuJour.tarifs.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>

            <div className="mt-10 border-t border-black/10 pt-8">
              <h4 className="titre-mini">{r.menuJour.enfant.titre}</h4>
              <h4 className="titre-mini mt-4">{r.menuJour.enfant.prix}</h4>
              <p className="mt-1 text-body">{r.menuJour.enfant.detail}</p>
            </div>
          </article>
        </div>
      </section>

      {/* Bar Lounge */}
      <section className="grid items-stretch md:grid-cols-2">
        <VideoYoutube
          id={r.bar.videoId}
          titre="Le bar lounge de l’Hôtel Palladia"
          poster="/images/restaurant/bar-lounge.jpg"
          className="min-h-[320px] md:min-h-[520px]"
        />
        <div className="flex flex-col justify-center px-8 py-16 lg:px-20">
          <h2 className="section-title text-left">
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

          <h3 className="titre-mini mt-8 text-left">Modes de paiement acceptés</h3>
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
