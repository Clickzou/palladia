"use client";

import Image from "next/image";
import { useState } from "react";
import { IconChevronLeft, IconChevronRight } from "./icons";

/**
 * Carrousel pleine largeur affichant plusieurs visuels de front (trois sur
 * grand ecran, un sur mobile), avec defilement par fleches. Le decalage se
 * fait en pourcentage, ce qui evite toute mesure au chargement.
 */
export default function CarrouselLarge({
  images,
}: {
  images: readonly { src: string; alt: string }[];
}) {
  const [index, setIndex] = useState(0);

  // On ne defile pas au-dela de la derniere image : la borne depend du
  // nombre de vignettes visibles, estime a trois sur grand ecran.
  const maxIndex = Math.max(0, images.length - 1);
  const aller = (pas: number) =>
    setIndex((i) => Math.min(maxIndex, Math.max(0, i + pas)));

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${index * (100 / 3)}%)` }}
      >
        {images.map((img) => (
          <div
            key={img.src}
            className="relative aspect-[3/2] w-full shrink-0 md:w-1/2 lg:w-1/3"
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

      <button
        type="button"
        onClick={() => aller(-1)}
        disabled={index === 0}
        aria-label="Visuels précédents"
        className="absolute top-1/2 left-3 z-10 flex size-12 -translate-y-1/2 items-center justify-center text-white/90 drop-shadow-lg transition-all hover:scale-110 hover:text-gold disabled:pointer-events-none disabled:opacity-30"
      >
        <IconChevronLeft className="size-8 fill-current" />
      </button>

      <button
        type="button"
        onClick={() => aller(1)}
        disabled={index >= maxIndex}
        aria-label="Visuels suivants"
        className="absolute top-1/2 right-3 z-10 flex size-12 -translate-y-1/2 items-center justify-center text-white/90 drop-shadow-lg transition-all hover:scale-110 hover:text-gold disabled:pointer-events-none disabled:opacity-30"
      >
        <IconChevronRight className="size-8 fill-current" />
      </button>
    </div>
  );
}
