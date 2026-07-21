"use client";

import Image from "next/image";
import { useState } from "react";
import { enregistrerConsentement, lireConsentement } from "@/lib/consentement";

/**
 * Lecteur YouTube differé : tant que le visiteur n’a pas cliqué, seule une
 * image est affichée. L’iframe — et les cookies Google qui vont avec — n’est
 * chargée qu’au clic. La page reste légère et aucun traceur n’est déposé
 * sans action de l’internaute.
 */
export default function VideoYoutube({
  id,
  titre,
  poster,
  className = "",
}: {
  id: string;
  titre: string;
  poster: string;
  className?: string;
}) {
  const [actif, setActif] = useState(false);

  /**
   * Un clic sur la vidéo vaut consentement pour les contenus externes : le
   * visiteur demande explicitement à voir un contenu YouTube. On l'enregistre
   * pour ne pas le lui redemander à chaque vidéo.
   */
  const lancer = () => {
    const c = lireConsentement();
    if (c && !c.categories.marketing) {
      enregistrerConsentement({ ...c.categories, marketing: true });
    }
    setActif(true);
  };

  if (actif) {
    return (
      <div className={`relative ${className}`}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={titre}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={lancer}
      aria-label={`Lire la vidéo : ${titre}`}
      className={`group relative block w-full cursor-pointer overflow-hidden ${className}`}
    >
      <Image
        src={poster}
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex size-24 items-center justify-center rounded-full border-2 border-white/90 bg-black/20 backdrop-blur-sm transition-transform group-hover:scale-110">
          {/* Triangle de lecture */}
          <svg viewBox="0 0 24 24" className="ml-1 size-10 fill-white" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
