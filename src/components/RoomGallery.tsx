"use client";

import Image from "next/image";
import { useState } from "react";
import { IconChevronLeft, IconChevronRight } from "./icons";

/** Galerie a fleches, comme le carrousel Elementor des pages chambres. */
export default function RoomGallery({
  images,
}: {
  images: { src: string; alt: string }[];
}) {
  const [i, setI] = useState(0);
  const go = (step: number) => setI((v) => (v + step + images.length) % images.length);

  return (
    <div className="relative aspect-[5/3] w-full overflow-hidden">
      {images.map((img, n) => (
        <Image
          key={img.src}
          src={img.src}
          alt={img.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={`object-cover transition-opacity duration-500 ${
            n === i ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Image précédente"
            className="absolute top-1/2 left-3 -translate-y-1/2 p-2 text-white drop-shadow-lg transition-transform hover:scale-125"
          >
            <IconChevronLeft />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Image suivante"
            className="absolute top-1/2 right-3 -translate-y-1/2 p-2 text-white drop-shadow-lg transition-transform hover:scale-125"
          >
            <IconChevronRight />
          </button>
        </>
      )}
    </div>
  );
}
