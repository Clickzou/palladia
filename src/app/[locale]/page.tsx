import type { Metadata } from "next";
import { metadonnees } from "@/data/seo";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { booking, reserverEn } from "@/config/site";
import { traduire } from "@/i18n/contenu";
import HeroCarousel from "@/components/HeroCarousel";
import SectionPhare from "@/components/SectionPhare";
import CarteEvenement from "@/components/CarteEvenement";
import { IconPin, IconValise } from "@/components/icons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  // Le titre vient des messages d'interface ; les alternatives et la canonique
  // sont celles de toutes les pages.
  return {
    ...metadonnees("/", locale),
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

/** Bandeau de 4 visuels sous le texte d’introduction, sur une seule ligne. */
const BANDEAU = [
  { src: "/images/bandeau-1.jpg", alt: "L’Hôtel Palladia, proche de l’aéroport de Toulouse" },
  { src: "/images/bandeau-2.jpg", alt: "Hôtel de luxe 4 étoiles à Toulouse" },
  { src: "/images/bandeau-3.jpg", alt: "Intérieur de l’Hôtel Palladia" },
  { src: "/images/bandeau-4.jpg", alt: "Le spa de l’Hôtel Palladia" },
];

/**
 * Images du carrousel d'accueil. L'ordre alterne les univers de l'hotel
 * plutot que d'enchainer les chambres.
 *
 * Ces visuels s'affichent sur toute la largeur de l'ecran. Ceux du dossier
 * `hd/` viennent des originaux de la mediatheque WordPress, repris dans
 * l'archive .wpress : le site d'origine ne servait que des versions reduites
 * et surcompressees (167 Ko pour 1920 px), d'ou le flou. Ne pas les remplacer
 * par un fichier recupere depuis une page web, qui sera toujours une vignette.
 */
const CARROUSEL = [
  { src: "/images/hd/chambre-luxe.jpg", alt: "Chambre de luxe à l’Hôtel Palladia" },
  { src: "/images/hd/piscine.jpg", alt: "La piscine extérieure de l’Hôtel Palladia" },
  {
    src: "/images/hd/amphitheatre.jpg",
    alt: "L’amphithéâtre de 285 places de l’Hôtel Palladia",
  },
  { src: "/images/hero-4.webp", alt: "Le hall d’accueil de l’Hôtel Palladia" },
  // Une seconde chambre, mais pas hero-2 : celle-ci cadre la meme piece que
  // la premiere, aux memes coussins rouges. La Prestige a terrasse s'en
  // distingue.
  {
    src: "/images/hd/chambre-prestige-terrasse.jpg",
    alt: "Chambre Prestige avec terrasse de l’Hôtel Palladia",
  },
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const a = (texte: string) => traduire(texte, locale);

  return (
    <>
      <HeroCarousel
        slides={CARROUSEL.map((img) => ({ src: img.src, alt: a(img.alt) }))}
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        ctaLabel={t("heroCta")}
        ctaHref={reserverEn(booking.rooms, locale)}
      />

      {/* Introduction */}
      <section className="apparait mx-auto max-w-4xl px-6 py-20 text-center">
        <Image
          src="/images/logo-independant.png"
          alt={a("Établissement 100 % toulousain indépendant")}
          width={300}
          height={272}
          className="mx-auto mb-8 h-auto w-40 md:w-48"
        />
        <h2 className="section-title">{t("introTitle")}</h2>
        <div className="mx-auto mt-5 h-px w-20 bg-gold" />
        <p
          className="mt-8 leading-relaxed text-body"
          dangerouslySetInnerHTML={{ __html: t.raw("introText") as string }}
        />
      </section>

      {/* Bandeau de 4 visuels, alignes sur une ligne a partir du format tablette */}
      <section className="grid grid-cols-2 lg:grid-cols-4">
        {BANDEAU.map((img, i) => (
          <div
            key={img.src}
            style={{ "--delai": `${i * 0.1}s` } as React.CSSProperties}
            className="apparait-image group relative aspect-3/2 overflow-hidden"
          >
            <Image
              src={img.src}
              alt={a(img.alt)}
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="survol-zoom object-cover"
            />
          </div>
        ))}
      </section>

      {/* Nous trouver / Votre sejour — aligne sur la marge de 100 px et cadre
          a gauche par une barre doree, comme les services de la page Hotel.
          Ces deux blocs etaient centres au milieu d'une colonne etroite, sans
          rapport avec le reste de la page. */}
      <section className="px-6 py-24 lg:px-[100px]">
        <div className="grid gap-14 md:grid-cols-2 md:gap-20">
          <div className="apparait border-l-2 border-gold pl-8">
            <IconPin className="size-10 fill-gold" />
            <h2 className="mt-6 font-display text-2xl text-ink">{t("trouverTitle")}</h2>
            <p className="mt-5 leading-relaxed text-body">{t("trouverText")}</p>
          </div>
          <div style={{ "--delai": "0.12s" } as React.CSSProperties} className="apparait border-l-2 border-gold pl-8">
            <IconValise className="size-10 fill-gold" />
            <h2 className="mt-6 font-display text-2xl text-ink">{t("sejourTitle")}</h2>
            <p className="mt-5 leading-relaxed text-body">{t("sejourText")}</p>
          </div>
        </div>
      </section>

      {/* Les trois univers de l'hotel, en grand format.
          Le lien « Voir les chambres & Suites » occupait auparavant une section
          entiere a lui seul, 2 000 px plus bas que ce bloc : il est rattache
          ici, ou il a un sens. */}
      <SectionPhare
        numero="01"
        title={t("chambresTitle")}
        text={t("chambresText")}
        image="/images/chambres.jpg"
        imageAlt={a("Suite de l’Hôtel Palladia")}
        ctaLabel={t("chambresCta")}
        ctaHref={reserverEn(booking.rooms, locale)}
        external
        lienSecondaire={{ label: t("suitesCta"), href: "/chambres" }}
      />

      <SectionPhare
        numero="02"
        title={t("restaurantTitle")}
        text={t("restaurantText")}
        image="/images/restaurant.jpg"
        imageAlt={a("Salle du restaurant")}
        ctaLabel={t("restaurantCta")}
        ctaHref={booking.restaurant}
        external
        reversed
        tinted
      />

      <SectionPhare
        numero="03"
        title={t("spaTitle")}
        text={t("spaText")}
        image="/images/spa.jpg"
        imageAlt={a("Espace bien-être")}
        ctaLabel={t("spaCta")}
        ctaHref={booking.spa}
        external
      />

      {/* Salles, mariages et spectacles : trois prestations evenementielles
          qui deroulaient chacune le meme bloc pleine largeur que ci-dessus.
          En cartes, elles se comparent d'un coup d'oeil et la page cesse de
          repeter six fois la meme forme. */}
      <section className="bg-cream px-6 py-24 lg:px-[100px]">
        <div className="grid gap-x-12 gap-y-16 md:grid-cols-3">
          <CarteEvenement
            title={t("sallesTitle")}
            text={t("sallesText")}
            image="/images/salles-reunion.jpg"
            imageAlt={a("Amphithéâtre de 285 places")}
            ctaLabel={t("sallesCta")}
            href="/seminaire-evenement-professionnel"
          />
          <CarteEvenement
            title={t("mariagesTitle")}
            text={t("mariagesText")}
            image="/images/mariages.jpg"
            imageAlt={a("Réception de mariage")}
            ctaLabel={t("mariagesCta")}
            href="/devis"
            delai="0.12s"
          />
          <CarteEvenement
            title={t("spectaclesTitle")}
            text={t("spectaclesText")}
            image="/images/spectacles.jpg"
            imageAlt={a("Spectacle à l’Hôtel Palladia")}
            ctaLabel={t("spectaclesCta")}
            href="/spectacle-toulouse"
            delai="0.24s"
          />
        </div>
      </section>

      {/* Presentation en video */}
      <section className="grid items-stretch md:grid-cols-2">
        <div className="apparait flex flex-col justify-center px-8 py-16 lg:px-20">
          <h2 className="section-title text-left text-ink">{t("videoTitle")}</h2>
          <div className="mt-5 h-px w-16 bg-gold" />
          <p className="mt-6 leading-relaxed text-body">{t("videoText")}</p>
        </div>
        <div className="apparait-image relative min-h-[320px] overflow-hidden md:min-h-[520px]">
          {/*
            Lecture automatique, en sourdine et en boucle : le navigateur
            l’autorise a ces conditions. `playsInline` evite le passage en
            plein ecran force sur iPhone, `poster` affiche un visuel pendant
            le chargement.
          */}
          <video
            className="absolute inset-0 size-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/bandeau-3.jpg"
            aria-label={a("Visite en vidéo de l’Hôtel Palladia")}
          >
            <source src="/videos/hotel-palladia.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* Coffrets cadeaux */}
      <section className="apparait px-6 py-20 text-center">
        <h2 className="section-title">{t("coffretsTitle")}</h2>
        <div className="mx-auto mt-5 h-px w-20 bg-gold" />
        <p className="mx-auto mt-8 max-w-2xl leading-relaxed text-body">{t("coffretsText")}</p>
        {/* Bouton carre comme ceux des sections ci-dessus : la page melangeait
            pastilles arrondies et boutons droits selon les blocs. */}
        <Link
          href="/coffret-cadeau-hotel-restaurant-toulouse"
          className="bouton-or mt-10 inline-block px-10 py-3.5 text-sm font-semibold tracking-wider uppercase"
        >
          {t("coffretsCta")}
        </Link>
      </section>

      {/* Bandeau spectacles */}
      <section className="apparait bg-gold px-6 py-14 lg:px-[100px]">
        <div className="flex flex-col items-center justify-center gap-8 text-center md:flex-row md:justify-between md:text-left">
          <h2 className="text-xl text-white md:text-2xl">{t("bandeauSpectacles")}</h2>
          <Link
            href="/spectacle-toulouse"
            className="shrink-0 border-2 border-white px-8 py-3 text-sm font-semibold tracking-wider text-white uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-gold"
          >
            {t("bandeauSpectaclesCta")}
          </Link>
        </div>
      </section>
    </>
  );
}
