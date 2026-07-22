import Image from "next/image";
import { Link } from "@/i18n/navigation";

/**
 * Carte d'une prestation evenementielle (salles, mariages, spectacles).
 *
 * Ces trois sections partageaient le meme gabarit image/texte pleine largeur
 * que les sections phares, ce qui donnait six blocs identiques a la suite.
 * Regroupees en cartes, elles se lisent d'un coup d'oeil comme une offre
 * unique, et la page cesse de derouler la meme forme.
 *
 * La carte entiere est cliquable : le titre porte le lien et un calque en
 * couvre la surface, ce qui laisse un seul intitule aux lecteurs d'ecran.
 */
export default function CarteEvenement({
  title,
  text,
  image,
  imageAlt,
  ctaLabel,
  href,
  delai = "0s",
}: {
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  ctaLabel: string;
  href: string;
  /** Decalage d'apparition, pour que les cartes arrivent l'une apres l'autre. */
  delai?: string;
}) {
  return (
    <article
      style={{ "--delai": delai } as React.CSSProperties}
      className="apparait group relative flex flex-col"
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="survol-zoom object-cover"
        />
      </div>

      <div className="mt-7 border-l-2 border-gold pl-6 transition-[padding] duration-500 group-hover:pl-8">
        {/* h2 et non h3 : ces trois cartes sont des sections de la page au
            meme titre que les blocs qui les precedent, et rien ne les
            chapeaute. */}
        <h2 className="titre-mini text-left text-ink">
          <Link href={href} className="before:absolute before:inset-0 before:content-['']">
            {title}
          </Link>
        </h2>
        {/* Texte tronque a l'affichage seulement : il reste entier dans la
            page pour les moteurs de recherche. */}
        <p className="mt-3 line-clamp-4 leading-relaxed text-body">{text}</p>
        {/* Une fleche qui avance au survol : le seul indice qu'il s'agit d'un
            lien, puisque la carte entiere est cliquable. */}
        <p className="mt-5 flex items-center gap-2 text-sm font-medium tracking-[0.12em] text-gold uppercase">
          {ctaLabel}
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-500 group-hover:translate-x-1.5"
          >
            →
          </span>
        </p>
      </div>
    </article>
  );
}
