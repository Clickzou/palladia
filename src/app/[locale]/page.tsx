import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { booking } from "@/config/site";
import HeroCarousel from "@/components/HeroCarousel";
import SplitSection from "@/components/SplitSection";
import { IconPin, IconValise } from "@/components/icons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

/** Bandeau de 4 visuels sous le texte d'introduction, sur une seule ligne. */
const BANDEAU = [
  { src: "/images/bandeau-1.jpg", alt: "L'Hôtel Palladia, proche de l'aéroport de Toulouse" },
  { src: "/images/bandeau-2.jpg", alt: "Hôtel de luxe 4 étoiles à Toulouse" },
  { src: "/images/bandeau-3.jpg", alt: "Intérieur de l'Hôtel Palladia" },
  { src: "/images/bandeau-4.jpg", alt: "Le spa de l'Hôtel Palladia" },
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <>
      <HeroCarousel
        slides={[
          { src: "/images/hero-1.jpg", alt: "Chambre de luxe à l'Hôtel Palladia" },
          { src: "/images/hero-4.webp", alt: "L'Hôtel Palladia, 4 étoiles à Toulouse" },
          { src: "/images/hero-2.jpg", alt: "Chambre Prestige" },
          { src: "/images/hero-5.jpg", alt: "Le spa de l'Hôtel Palladia" },
          { src: "/images/hero-3.jpg", alt: "Hôtel 4 étoiles à Toulouse" },
        ]}
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        ctaLabel={t("heroCta")}
        ctaHref={booking.rooms}
      />

      {/* Introduction */}
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <Image
          src="/images/logo-independant.png"
          alt="Établissement 100 % toulousain indépendant"
          width={300}
          height={272}
          className="mx-auto mb-8 h-auto w-40 md:w-48"
        />
        <h2 className="section-title">{t("introTitle")}</h2>
        <div className="mx-auto mt-5 h-px w-20 bg-gold" />
        <p
          className="mt-8 text-lg leading-relaxed text-body"
          dangerouslySetInnerHTML={{ __html: t.raw("introText") as string }}
        />
      </section>

      {/* Bandeau de 4 visuels, alignes sur une ligne a partir du format tablette */}
      <section className="grid grid-cols-2 lg:grid-cols-4">
        {BANDEAU.map((img) => (
          <div key={img.src} className="relative aspect-[3/2]">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
        ))}
      </section>

      {/* Nous trouver / Votre séjour */}
      <section className="mx-auto grid max-w-5xl gap-14 px-6 py-24 text-center md:grid-cols-2">
        <div>
          <IconPin className="mx-auto size-12 fill-gold" />
          <h2 className="mt-6 font-display text-2xl text-ink">{t("trouverTitle")}</h2>
          <p className="mt-5 leading-relaxed text-body">{t("trouverText")}</p>
        </div>
        <div>
          <IconValise className="mx-auto size-12 fill-gold" />
          <h2 className="mt-6 font-display text-2xl text-ink">{t("sejourTitle")}</h2>
          <p className="mt-5 leading-relaxed text-body">{t("sejourText")}</p>
        </div>
      </section>

      <SplitSection
        title={t("chambresTitle")}
        text={t("chambresText")}
        image="/images/chambres.jpg"
        imageAlt="Suite de l'Hôtel Palladia"
        ctaLabel={t("chambresCta")}
        ctaHref={booking.rooms}
        external
      />

      <SplitSection
        title={t("restaurantTitle")}
        text={t("restaurantText")}
        image="/images/restaurant.jpg"
        imageAlt="Salle du restaurant"
        ctaLabel={t("restaurantCta")}
        ctaHref={booking.restaurant}
        external
        reversed
        tinted
      />

      <SplitSection
        title={t("spaTitle")}
        text={t("spaText")}
        image="/images/spa.jpg"
        imageAlt="Espace bien-être"
        ctaLabel={t("spaCta")}
        ctaHref={booking.spa}
        external
      />

      <SplitSection
        title={t("sallesTitle")}
        text={t("sallesText")}
        image="/images/salles-reunion.jpg"
        imageAlt="Amphithéâtre de 285 places"
        ctaLabel={t("sallesCta")}
        ctaHref="/seminaire-evenement-professionnel"
        reversed
        tinted
      />

      <SplitSection
        title={t("mariagesTitle")}
        text={t("mariagesText")}
        image="/images/mariages.jpg"
        imageAlt="Réception de mariage"
        ctaLabel={t("mariagesCta")}
        ctaHref="/devis"
      />

      <SplitSection
        title={t("spectaclesTitle")}
        text={t("spectaclesText")}
        image="/images/spectacles.jpg"
        imageAlt="Spectacle à l'Hôtel Palladia"
        ctaLabel={t("spectaclesCta")}
        ctaHref="/spectacle-toulouse"
        reversed
        tinted
      />

      {/* Bandeau spectacles */}
      <section className="bg-ink px-6 py-16 text-center text-white">
        <p className="font-display text-2xl tracking-wide uppercase md:text-3xl">
          {t("bandeauSpectacles")}
        </p>
        <Link
          href="/spectacle-toulouse"
          className="mt-8 inline-block bg-gold px-10 py-4 text-sm font-semibold tracking-wider uppercase transition-colors hover:bg-gold-dark"
        >
          {t("bandeauSpectaclesCta")}
        </Link>
      </section>

      {/* Coffrets cadeaux */}
      <section className="grid items-stretch md:grid-cols-2">
        <div className="relative min-h-[300px] md:min-h-[460px]">
          <Image
            src="/images/coffrets.jpg"
            alt="Coffrets cadeaux de l'Hôtel Palladia"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center bg-cream px-8 py-16 lg:px-20">
          <h2 className="font-display text-3xl tracking-wide text-gold uppercase lg:text-4xl">
            {t("coffretsTitle")}
          </h2>
          <div className="mt-5 h-px w-16 bg-gold" />
          <p className="mt-6 leading-relaxed text-body">{t("coffretsText")}</p>
          <Link
            href="/coffret-cadeau-hotel-restaurant-toulouse"
            className="mt-8 self-start bg-gold px-8 py-3 text-sm font-semibold tracking-wider text-white uppercase transition-colors hover:bg-gold-dark"
          >
            {t("coffretsCta")}
          </Link>
        </div>
      </section>
    </>
  );
}
