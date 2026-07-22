import type { Metadata } from "next";
import { metadonnees } from "@/data/seo";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";

/** Titre et description dans la langue de la page, avec les alternatives hreflang. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return metadonnees("/engagements", locale);
}

export default function EngagementsPage() {
  return (
    <>
      <PageHeader breadcrumb="Engagements" title="Engagements" />

      <p className="px-6 pb-12 text-center text-body">
        Ensemble protégeons la vie, protégeons la Terre
      </p>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 md:grid-cols-[280px_1fr]">
        <Image
          src="/images/clef-verte.png"
          alt="Label Clef Verte"
          width={280}
          height={280}
          className="mx-auto h-auto w-full max-w-[280px]"
        />

        <div className="space-y-6 leading-relaxed text-body">
          <p>
            Nous accordons une place centrale au respect de l’environnement. Pour nous, pour vous
            et pour les générations futures, nous mettons tout en œuvre afin de minimiser l’impact
            de notre activité sur la faune et la flore qui nous entourent. L’avenir de la planète
            et l’environnement dans lequel vivront nos enfants est un sujet qui nous concerne tous.
            Des gestes simples quotidiens peuvent faire la différence.
          </p>
          <p>
            Afin de concrétiser notre engagement et de nous inscrire dans une démarche
            d’amélioration continue, notre établissement est labélisé Clef verte pour l’année 2026.
            Ce label Clef Verte distingue les hébergements touristiques et les restaurants engagés
            dans une démarche environnementale volontaire, performante et dynamique. Le label est
            attribué annuellement par un jury indépendant constitué d’experts et de professionnels
            du tourisme et de l’environnement. Il est en constante évolution.
          </p>
          <p className="font-semibold text-ink">
            Ensemble protégeons la vie, protégeons la Terre.
          </p>
        </div>
      </section>

      {/* Bandeau documents */}
      <section className="relative flex min-h-[420px] items-center justify-center px-6 py-20">
        <Image
          src="/images/engagements-fond.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="relative z-10 flex flex-wrap justify-center gap-6">
          <a
            href="/documents/ecogestes.pdf"
            target="_blank"
            rel="noopener"
            className="rounded-full border-2 border-white bg-gold/90 px-10 py-4 font-medium text-white backdrop-blur transition-colors hover:bg-gold"
          >
            Écogestes
          </a>
          <a
            href="/documents/charte-environnementale.pdf"
            target="_blank"
            rel="noopener"
            className="rounded-full border-2 border-white bg-gold/90 px-10 py-4 font-medium text-white backdrop-blur transition-colors hover:bg-gold"
          >
            Charte environnementale
          </a>
        </div>
      </section>
    </>
  );
}
