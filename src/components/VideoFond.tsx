"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Video d'ambiance en fond de section, muette et en boucle.
 *
 * Une balise `<video autoPlay>` telechargee d'emblee coute plusieurs mega-octets
 * a chaque visite, y compris quand le visiteur ne descend jamais jusqu'a elle.
 * La source n'est donc posee qu'a l'approche de l'ecran ; jusque-la, seule
 * l'image d'attente est chargee, et c'est elle qui s'affiche.
 *
 * Trois cas ou la video n'est jamais chargee, l'image d'attente tenant lieu de
 * fond : le visiteur demande moins d'animations, son navigateur signale un
 * forfait de donnees limite, ou la connexion est lente.
 */
export default function VideoFond({
  src,
  poster,
  className = "",
  ariaLabel,
}: {
  src: string;
  poster: string;
  className?: string;
  ariaLabel: string;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const [source, setSource] = useState<string | null>(null);

  useEffect(() => {
    const noeud = video.current;
    if (!noeud) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // `connection` n'existe que sur les navigateurs Chromium ; ailleurs on
    // charge normalement.
    const reseau = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (reseau?.saveData) return;
    if (reseau?.effectiveType && /^(slow-)?2g$|^3g$/.test(reseau.effectiveType)) return;

    const observateur = new IntersectionObserver(
      (entrees) => {
        if (!entrees.some((e) => e.isIntersecting)) return;
        observateur.disconnect();
        setSource(src);
      },
      // Un ecran d'avance : la video est prete quand la section arrive.
      { rootMargin: "300px" },
    );

    observateur.observe(noeud);
    return () => observateur.disconnect();
  }, [src]);

  // Le chargement puis la lecture ne peuvent partir qu'une fois la source
  // rendue dans le DOM.
  useEffect(() => {
    const noeud = video.current;
    if (!noeud || !source) return;
    noeud.load();
    // Un refus de lecture automatique laisse simplement l'image d'attente.
    void noeud.play().catch(() => {});
  }, [source]);

  return (
    <video
      ref={video}
      className={className}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      aria-label={ariaLabel}
    >
      {source && <source src={source} type="video/mp4" />}
    </video>
  );
}
