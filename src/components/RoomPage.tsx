import Image from "next/image";
import { Link } from "@/i18n/navigation";
import RoomGallery from "./RoomGallery";
import { booking } from "@/config/site";
import type { Room } from "@/data/rooms";
import { IconBed, IconExpand, IconLock, IconTv, IconWifi } from "./icons";

/**
 * Gabarit commun aux 4 pages chambres :
 * hero + bandeau caracteristiques + texte/galerie + CTA sejour + visuel de pied de page.
 */
export default function RoomPage({ room }: { room: Room }) {
  const features = [
    { icon: <IconExpand />, label: room.surface },
    { icon: <IconBed />, label: "Lit Queen\nou King size" },
    { icon: <IconTv />, label: "Chaînes internationales\net Canal+" },
    { icon: <IconWifi />, label: "WIFI\npar fibre optique" },
    { icon: <IconLock />, label: "Coffre sécurisé" },
  ];

  return (
    <>
      {/* Hero — 200 px de plus que la hauteur de reference */}
      <section className="relative h-[calc(70vh+200px)] min-h-[660px] w-full">
        <Image
          src={room.heroImage}
          alt={room.hero}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <h1 className="font-display text-4xl tracking-wide uppercase drop-shadow-lg md:text-6xl">
            {room.hero}
          </h1>
          <a
            href={booking.rooms}
            target="_blank"
            rel="noopener"
            className="mt-8 bg-gold px-10 py-4 text-sm font-semibold tracking-wider uppercase transition-colors hover:bg-gold-dark"
          >
            {room.ctaHero}
          </a>
        </div>
      </section>

      {/* Bandeau caracteristiques, en chevauchement sur le hero */}
      <div className="relative z-20 mx-auto -mt-24 max-w-6xl px-6">
        <ul className="grid grid-cols-2 gap-8 rounded-2xl bg-white px-8 py-10 shadow-xl md:grid-cols-5">
          {features.map((f) => (
            <li key={f.label} className="flex flex-col items-center gap-3 text-center">
              <span className="text-gold">{f.icon}</span>
              <span className="text-sm leading-snug whitespace-pre-line text-ink-soft md:text-base">
                {f.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Fil d'Ariane */}
      <nav aria-label="Fil d’Ariane" className="py-8 text-center text-sm">
        <Link href="/" className="text-[#8b3a3a] underline hover:text-gold">
          Accueil
        </Link>
        <span className="mx-1 text-muted">»</span>
        <span className="font-semibold text-ink">{room.breadcrumb}</span>
      </nav>

      {/* Texte + visuel */}
      <section className="mx-auto grid max-w-[1700px] items-center gap-12 px-8 pb-20 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="font-display text-3xl tracking-wide text-gold uppercase lg:text-4xl">
            {room.heading}
          </h2>
          <p
            className={`mt-8 leading-relaxed ${
              room.leadGras ? "font-semibold text-ink" : "text-body"
            }`}
          >
            {room.lead}
          </p>
          {room.paragraphs.map((p) => (
            <p key={p.slice(0, 40)} className="mt-5 leading-relaxed text-body">
              {p}
            </p>
          ))}
        </div>

        {/* Carrousel si plusieurs visuels, image seule sinon — comme sur le site */}
        {room.gallery.length > 1 ? (
          <RoomGallery images={room.gallery} />
        ) : (
          <div className="relative aspect-[5/3] w-full overflow-hidden">
            <Image
              src={room.gallery[0].src}
              alt={room.gallery[0].alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        )}
      </section>

      {/* Preparez votre sejour */}
      <section className="bg-cream px-6 py-14">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-6 sm:flex-row">
          <h2 className="font-display text-xl tracking-wide text-ink uppercase md:text-2xl">
            Préparez votre séjour
          </h2>
          <a
            href={booking.rooms}
            target="_blank"
            rel="noopener"
            className="rounded-md bg-gold px-8 py-4 text-base font-medium text-white transition-colors hover:bg-gold-dark"
          >
            Réservez au meilleur prix
          </a>
        </div>
      </section>

      {/* Video de presentation, pleine largeur */}
      <section className="relative h-[60vh] min-h-[380px] w-full overflow-hidden">
        <video
          className="absolute inset-0 size-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/images/hotel/vue-3.jpg"
          aria-label="L’Hôtel Palladia en vidéo"
        >
          <source src="/videos/hotel-presentation.mp4" type="video/mp4" />
        </video>
      </section>
    </>
  );
}
