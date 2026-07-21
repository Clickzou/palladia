"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Slide = { src: string; alt: string };

/**
 * Carrousel plein ecran de la premiere section, avec le H1 en surimpression.
 * Fondu enchaine automatique ; respecte prefers-reduced-motion.
 */
export default function HeroCarousel({
  slides,
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  interval = 6000,
}: {
  slides: Slide[];
  title: string;
  subtitle?: string;
  ctaLabel: string;
  ctaHref: string;
  interval?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, interval);
    return () => clearInterval(id);
  }, [slides.length, interval]);

  return (
    <section className="relative h-[68vh] min-h-[420px] w-full overflow-hidden lg:h-[80vh]">
      {slides.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          priority={i === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <h1 className="font-display text-4xl tracking-wide uppercase drop-shadow-lg md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg tracking-wide drop-shadow-md md:text-2xl">{subtitle}</p>
        )}
        <a
          href={ctaHref}
          target="_blank"
          rel="noopener"
          className="mt-8 bg-gold px-10 py-4 text-sm font-semibold tracking-wider uppercase transition-colors hover:bg-gold-dark"
        >
          {ctaLabel}
        </a>
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-3">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Image ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-8 bg-gold" : "w-2 bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
