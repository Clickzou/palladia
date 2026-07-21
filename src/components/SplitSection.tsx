import Image from "next/image";
import { Link } from "@/i18n/navigation";

/**
 * Section moitie image / moitie texte, alternee gauche-droite,
 * telle qu’utilisee sur toute la page d’accueil du site d’origine.
 */
export default function SplitSection({
  title,
  text,
  image,
  imageAlt,
  ctaLabel,
  ctaHref,
  external = false,
  reversed = false,
  tinted = false,
}: {
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  ctaLabel: string;
  ctaHref: string;
  external?: boolean;
  reversed?: boolean;
  tinted?: boolean;
}) {
  return (
    <section className="grid items-stretch md:grid-cols-2">
      <div className={`relative min-h-[300px] md:min-h-[520px] ${reversed ? "md:order-2" : ""}`}>
        <Image src={image} alt={imageAlt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
      </div>

      <div
        className={`flex flex-col justify-center px-8 py-16 lg:px-20 ${
          tinted ? "bg-cream" : "bg-white"
        }`}
      >
        <h2 className="font-display text-3xl tracking-wide text-gold uppercase lg:text-4xl">
          {title}
        </h2>
        <div className="mt-5 h-px w-16 bg-gold" />
        <p className="mt-6 leading-relaxed text-body">{text}</p>

        {external ? (
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener"
            className="mt-8 self-start bg-gold px-8 py-3 text-sm font-semibold tracking-wider text-white uppercase transition-colors hover:bg-gold-dark"
          >
            {ctaLabel}
          </a>
        ) : (
          <Link
            href={ctaHref}
            className="mt-8 self-start bg-gold px-8 py-3 text-sm font-semibold tracking-wider text-white uppercase transition-colors hover:bg-gold-dark"
          >
            {ctaLabel}
          </Link>
        )}
      </div>
    </section>
  );
}
