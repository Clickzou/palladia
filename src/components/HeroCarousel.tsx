"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { IconChevronLeft, IconChevronRight } from "./icons";

type Slide = { src: string; alt: string };

/**
 * Carrousel plein ecran de la premiere section, avec le H1 en surimpression.
 * Fondu enchaine automatique, fleches de navigation et pastilles.
 * Respecte prefers-reduced-motion.
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
  /** Incremente a chaque action manuelle pour relancer le minuteur. */
  const [tick, setTick] = useState(0);

  const aller = useCallback(
    (pas: number) => {
      setIndex((i) => (i + pas + slides.length) % slides.length);
      setTick((t) => t + 1);
    },
    [slides.length],
  );

  useEffect(() => {
    if (slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, interval);
    return () => clearInterval(id);
  }, [slides.length, interval, tick]);

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
          quality={92}
          className={`object-cover transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Degrade plutot qu'un voile uniforme : l'image reste lisible en haut,
          le texte reste lisible en bas, sans assombrir toute la photo. */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 via-45% to-black/10" />

      {/* Second degrade, lateral : le texte est a gauche et les photos y sont
          parfois claires (literie, mur blanc). Sans lui, le sous-titre dore
          disparait sur certaines images du carrousel. */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/10 via-45% to-transparent" />

      {/* Texte en bas a gauche, aligne sur la marge de 100 px du reste du site.
          Centrer un titre sur une photo est la mise en page par defaut ; la
          decaler laisse voir l'image et pose un rythme plus calme. */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-20 text-white lg:px-[100px] lg:pb-24">
        {subtitle && (
          <p className="text-sm font-bold tracking-[0.25em] text-gold uppercase md:text-lg">
            {subtitle}
          </p>
        )}
        <h1 className="titre-page mt-4 max-w-4xl text-left text-white lg:text-[68px] lg:leading-[1.1]">
          {title}
        </h1>

        {/* Un lien souligne plutot qu'une pastille pleine : la reservation
            reste l'action principale, sans crier. */}
        <a
          href={ctaHref}
          target="_blank"
          rel="noopener"
          className="mt-8 inline-block border-b border-gold pb-1 text-sm font-medium tracking-[0.15em] uppercase transition-colors hover:text-gold"
        >
          {ctaLabel}
        </a>
      </div>

      {/* Les commandes se regroupent en bas a droite : deux chevrons a
          mi-hauteur au-dessus de la photo attiraient l'oeil avant le titre. */}
      {slides.length > 1 && (
        <div className="absolute right-6 bottom-8 z-20 flex items-center gap-6 lg:right-[100px]">
          <div className="flex gap-2">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => {
                  setIndex(i);
                  setTick((t) => t + 1);
                }}
                aria-label={`Image ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                className={`h-px transition-all ${
                  i === index ? "w-10 bg-gold" : "w-5 bg-white/50 hover:bg-white"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => aller(-1)}
              aria-label="Image précédente"
              className="flex size-9 items-center justify-center text-white/70 transition-colors hover:text-gold"
            >
              <IconChevronLeft className="size-5 fill-current" />
            </button>
            <button
              type="button"
              onClick={() => aller(1)}
              aria-label="Image suivante"
              className="flex size-9 items-center justify-center text-white/70 transition-colors hover:text-gold"
            >
              <IconChevronRight className="size-5 fill-current" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
