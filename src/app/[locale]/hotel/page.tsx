import type { Metadata } from "next";
import { metadonnees } from "@/data/seo";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import PhotoGrid from "@/components/PhotoGrid";
import VideoFond from "@/components/VideoFond";
import { booking, reserverEn } from "@/config/site";
import { hotel as hotelFr } from "@/data/hotel";
import { traduire, traduireContenu } from "@/i18n/contenu";
import { PICTOS_SERVICES } from "@/components/icons-services";

/** Titre et description dans la langue de la page, avec les alternatives hreflang. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return metadonnees("/hotel", locale);
}


/** Affiche le pictogramme correspondant a la cle du service. */
function Picto({ nom, className = "" }: { nom: string; className?: string }) {
  const Icone = PICTOS_SERVICES[nom as keyof typeof PICTOS_SERVICES];
  if (!Icone) return null;
  return <Icone className={`size-9 shrink-0 text-gold ${className}`} strokeWidth={1.5} />;
}

export default async function HotelPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const hotel = traduireContenu(hotelFr, locale);
  const t = (texte: string) => traduire(texte, locale);

  // L’accessibilite PMR est presentee seule, centree, en fin de liste.
  const services = hotel.services.filter((s) => s.icone !== "pmr");
  const pmr = hotel.services.find((s) => s.icone === "pmr");

  return (
    <>
      <PageHeader breadcrumb={t("Hôtel")} title={hotel.title} subtitle={hotel.subtitle} />

      <p className="mx-auto max-w-4xl px-6 pb-14 text-center font-semibold text-ink">
        {hotel.chapo}
      </p>

      {/* Presentation : texte et tableau a gauche, video a droite.
          Mise en page large, proche pleine largeur, comme sur le site d’origine. */}
      <section className="mx-auto grid max-w-[1800px] items-stretch gap-10 px-8 pb-20 lg:grid-cols-2 lg:gap-14">
        <div>
          <div className="space-y-5 leading-relaxed text-body">
            {hotel.presentation.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>

          <figure className="mt-12 text-center">
            <Image
              src={hotel.tableau.src}
              alt={hotel.tableau.legende}
              width={300}
              height={300}
              className="mx-auto h-auto w-full max-w-[300px]"
            />
            <figcaption className="mt-4 text-body italic">{hotel.tableau.legende}</figcaption>
          </figure>
        </div>

        <div className="relative min-h-[420px] w-full overflow-hidden lg:min-h-full">
          <VideoFond
            src="/videos/hotel-presentation.mp4"
            poster="/images/hotel/vue-4.jpg"
            className="absolute inset-0 size-full object-cover"
            ariaLabel={t("Présentation en vidéo de l’Hôtel Palladia")}
          />
        </div>
      </section>

      {/* Services — grille pleine largeur, 100 px de marge.
          Quatre colonnes separees par des filets : chaque service occupe une
          cellule de meme gabarit, ce qui regle l'irregularite des intitules
          longs sans reserver de vide sous les courts. */}
      <section className="bg-cream py-24">
        <div className="px-6 lg:px-[100px]">
          <h2 className="section-title">{hotel.servicesTitre}</h2>
          <div className="mx-auto mt-6 h-px w-20 bg-gold" />

          <ul className="mt-16 grid gap-x-12 gap-y-14 sm:grid-cols-2 xl:grid-cols-4">
            {services.map((s) => (
              <li key={s.nom} className="border-l-2 border-gold pl-6">
                <Picto nom={s.icone} />
                <h3 className="titre-mini mt-5 text-left text-ink">{s.nom}</h3>
                <p className="mt-3 leading-relaxed text-body">{s.detail}</p>
              </li>
            ))}
          </ul>

          {/* L'accessibilite ferme la grille, centree sur toute la largeur :
              c'est un engagement de l'hotel, pas un service parmi douze. */}
          {pmr && (
            <div className="mt-20 text-center">
              {/* Un filet centre plutot qu'une barre a gauche : ce bloc est
                  centre, une barre laterale le desequilibrerait. */}
              <div className="mx-auto mb-10 h-px w-20 bg-gold" />
              <Picto nom="pmr" className="mx-auto" />
              <h3 className="titre-mini mt-5 text-ink">{pmr.nom}</h3>
              <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-body">{pmr.detail}</p>
            </div>
          )}
        </div>
      </section>

      <PhotoGrid images={[...hotel.galerie]} columns={2} mode="paysage" />

      {/* Preparez votre sejour */}
      <section className="bg-cream px-6 py-14">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-6 sm:flex-row">
          <h2 className="titre-mini text-ink">
            {t("Préparez votre séjour")}
          </h2>
          <a
            href={reserverEn(booking.premium, locale)}
            target="_blank"
            rel="noopener"
            className="rounded-md bg-gold px-8 py-4 font-medium text-white transition-colors hover:bg-gold-dark"
          >
            {t("Réservez au meilleur prix")}
          </a>
        </div>
      </section>
    </>
  );
}
