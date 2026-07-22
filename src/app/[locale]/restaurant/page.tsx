import type { Metadata } from "next";
import { traduire, traduireContenu } from "@/i18n/contenu";
import { lireMenus } from "@/lib/menus";
import CartesMenus from "@/components/restaurant/CartesMenus";
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
  const t = (texte: string) => traduire(texte, locale);
  // Les deux menus changent chaque semaine : ils viennent de la base, ou
  // l'hotel les modifie depuis /admin, et non du dictionnaire.
  const menus = await lireMenus(locale);

  return (
    <>
      <PageHeader
        breadcrumb={t("Restaurant")}
        title={r.title}
        subtitle={r.subtitle}
        ctaLabel={t("Réserver une table")}
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
            {t("Consulter la carte")}
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
              {t("Découvrez notre chef de Cuisine")}, {r.chef.name}
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
            alt={`${r.chef.name}, ${t("chef de cuisine de l’Hôtel Palladia")}`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Menus */}
      <section className="bg-cream px-6 py-20">
        <h2 className="section-title">{t("Menu")}</h2>
        <h3 className="mt-4 text-center text-[22px] font-normal text-body uppercase">
          {t("Découvrez notre menu de la semaine")}
        </h3>
        <div className="mx-auto mt-6 h-px w-20 bg-gold" />

        <div className="mt-14">
          <CartesMenus semaine={menus.semaine} jour={menus.jour} ou={t("ou")} />
        </div>
      </section>

      {/* Bar Lounge */}
      <section className="grid items-stretch md:grid-cols-2">
        <VideoYoutube
          id={r.bar.videoId}
          titre={t("Le bar lounge de l’Hôtel Palladia")}
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

          <h3 className="titre-mini mt-8 text-left">{t("Modes de paiement acceptés")}</h3>
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
          {t("Réserver une table")}
        </a>
      </section>
      <section className="px-6 py-14 text-center">
        <a
          href="/carte-restaurant.pdf"
          target="_blank"
          rel="noopener"
          className="inline-block rounded-full bg-ink-soft px-10 py-4 font-medium text-white transition-colors hover:bg-ink"
        >
          {t("Voir la carte du restaurant")}
        </a>
      </section>
    </>
  );
}
