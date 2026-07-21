"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IconChevronLeft, IconChevronRight } from "./icons";

/**
 * Carrousel pleine largeur affichant plusieurs visuels de front (trois sur
 * grand ecran, deux sur tablette, un sur mobile).
 *
 * Le defilement s'appuie sur le scroll natif avec accrochage : le navigateur
 * calcule lui-meme les limites, ce qui evite l'espace vide qu'un decalage en
 * pourcentage produit quand toutes les images tiennent deja a l'ecran.
 * Bonus : le glissement tactile fonctionne sans code supplementaire.
 */
export default function CarrouselLarge({
  images,
}: {
  images: readonly { src: string; alt: string }[];
}) {
  const piste = useRef<HTMLDivElement>(null);
  const [debut, setDebut] = useState(true);
  const [fin, setFin] = useState(false);

  /** Met a jour l'etat des fleches selon la position de defilement. */
  const majBornes = () => {
    const el = piste.current;
    if (!el) return;
    setDebut(el.scrollLeft <= 1);
    setFin(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  };

  useEffect(() => {
    majBornes();
    window.addEventListener("resize", majBornes);
    return () => window.removeEventListener("resize", majBornes);
  }, []);

  const aller = (sens: 1 | -1) => {
    const el = piste.current;
    if (!el) return;
    // On defile d'une vignette : la largeur du premier enfant
    const pas = el.firstElementChild?.clientWidth ?? el.clientWidth / 3;
    el.scrollBy({ left: sens * pas, behavior: "smooth" });
  };

  return (
    <div className="relative w-full">
      <div
        ref={piste}
        onScroll={majBornes}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((img) => (
          <div
            key={img.src}
            className="relative aspect-[3/2] w-full shrink-0 snap-start md:w-1/2 lg:w-1/3"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Fleches masquees lorsqu'il n'y a rien a faire defiler */}
      {!(debut && fin) && (
        <>
          <button
            type="button"
            onClick={() => aller(-1)}
            disabled={debut}
            aria-label="Visuels précédents"
            className="absolute top-1/2 left-3 z-10 flex size-12 -translate-y-1/2 items-center justify-center text-white/90 drop-shadow-lg transition-all hover:scale-110 hover:text-gold disabled:pointer-events-none disabled:opacity-0"
          >
            <IconChevronLeft className="size-8 fill-current" />
          </button>

          <button
            type="button"
            onClick={() => aller(1)}
            disabled={fin}
            aria-label="Visuels suivants"
            className="absolute top-1/2 right-3 z-10 flex size-12 -translate-y-1/2 items-center justify-center text-white/90 drop-shadow-lg transition-all hover:scale-110 hover:text-gold disabled:pointer-events-none disabled:opacity-0"
          >
            <IconChevronRight className="size-8 fill-current" />
          </button>
        </>
      )}
    </div>
  );
}
