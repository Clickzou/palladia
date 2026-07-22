import Image from "next/image";
import { Link } from "@/i18n/navigation";

/**
 * Section principale de la page d'accueil : une grande image et un bloc de
 * texte, en alternance gauche-droite.
 *
 * Deux differences avec `SplitSection`, qui reste utilise ailleurs :
 *
 * - le partage n'est pas 50/50 mais 7/5. Deux moities strictement egales,
 *   repetees, donnent le rythme mecanique d'un gabarit ;
 * - un numero d'ordre en chiffres dores situe la section dans la page et
 *   remplace le filet horizontal, identique d'un bloc a l'autre.
 */
export default function SectionPhare({
  numero,
  title,
  text,
  image,
  imageAlt,
  ctaLabel,
  ctaHref,
  external = false,
  reversed = false,
  tinted = false,
  lienSecondaire,
}: {
  /** Rang affiche, ex. « 01 ». Purement decoratif. */
  numero: string;
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  ctaLabel: string;
  ctaHref: string;
  /** Lien sortant (moteur de reservation) plutot que navigation interne. */
  external?: boolean;
  /** Place l'image a droite. */
  reversed?: boolean;
  /** Fond creme sur la colonne de texte. */
  tinted?: boolean;
  /** Second lien, discret, sous le bouton principal. */
  lienSecondaire?: { label: string; href: string };
}) {
  const classesBouton =
    "bouton-or self-start px-8 py-3.5 text-sm font-semibold tracking-wider uppercase";

  return (
    <section className="grid items-stretch lg:grid-cols-12">
      <div
        className={`apparait-image relative min-h-[320px] overflow-hidden lg:col-span-7 lg:min-h-[560px] ${
          reversed ? "lg:order-2" : ""
        }`}
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 58vw"
          className="object-cover"
        />
      </div>

      {/* Le texte suit l'image d'un souffle : les deux moities arrivant
          ensemble, l'effet passe inapercu. */}
      <div
        style={{ "--delai": "0.15s" } as React.CSSProperties}
        className={`apparait flex flex-col justify-center px-8 py-16 lg:col-span-5 lg:px-16 ${
          tinted ? "bg-cream" : "bg-white"
        }`}
      >
        <p className="text-sm font-semibold tracking-[0.3em] text-gold">{numero}</p>
        <h2 className="section-title mt-5 text-left">{title}</h2>
        <p className="mt-6 leading-relaxed text-body">{text}</p>

        <div className="mt-9 flex flex-col items-start gap-5">
          {external ? (
            <a href={ctaHref} target="_blank" rel="noopener" className={classesBouton}>
              {ctaLabel}
            </a>
          ) : (
            <Link href={ctaHref} className={classesBouton}>
              {ctaLabel}
            </Link>
          )}

          {lienSecondaire && (
            <Link
              href={lienSecondaire.href}
              className="lien-trait text-sm font-medium tracking-[0.12em] text-ink uppercase transition-colors hover:text-gold"
            >
              {lienSecondaire.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
