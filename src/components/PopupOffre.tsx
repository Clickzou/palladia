"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { lireConsentement } from "@/lib/consentement";

/**
 * Fenetre promotionnelle de l'offre en cours, reprise de la popup Elementor.
 *
 * Elle s'ouvre cinq secondes apres l'arrivee, une seule fois par jour et par
 * visiteur, et s'efface d'elle-meme passee la date de fin de l'offre :
 * personne n'a a penser a la retirer du site fin aout.
 */
export type Offre = {
  image: string;
  alt: string;
  libelleBouton: string;
  lien: string;
  fermer: string;
  /** Dernier jour d'affichage, au format AAAA-MM-JJ. */
  jusquAu: string;
};

const CLE = "palladia-popup-offre";
const DELAI = 5000;

export default function PopupOffre({ offre }: { offre: Offre }) {
  const [visible, setVisible] = useState(false);
  const boite = useRef<HTMLDivElement>(null);
  const fermeture = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const aujourdhui = new Date().toISOString().slice(0, 10);
    if (aujourdhui > offre.jusquAu) return;
    // La date du dernier affichage sert de memoire : un visiteur ne la revoit
    // pas le meme jour, mais la retrouve le lendemain.
    if (localStorage.getItem(CLE) === aujourdhui) return;

    let minuterie: ReturnType<typeof setTimeout>;

    /**
     * La fenetre recouvrirait le bandeau de consentement, que la CNIL veut
     * accessible d'emblee : on attend donc que le visiteur ait tranche.
     */
    const armer = () => {
      if (!lireConsentement()) return;
      window.removeEventListener("palladia:consentement", armer);
      minuterie = setTimeout(() => {
        localStorage.setItem(CLE, aujourdhui);
        setVisible(true);
      }, DELAI);
    };

    armer();
    window.addEventListener("palladia:consentement", armer);
    return () => {
      clearTimeout(minuterie);
      window.removeEventListener("palladia:consentement", armer);
    };
  }, [offre.jusquAu]);

  useEffect(() => {
    if (!visible) return;
    fermeture.current?.focus();

    // Le fond ne defile plus tant que la fenetre est ouverte.
    const defilement = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const auClavier = (e: KeyboardEvent) => {
      if (e.key === "Escape") return fermer();
      if (e.key !== "Tab" || !boite.current) return;
      // Piege a tabulation : la navigation clavier ne sort pas de la fenetre.
      const cibles = boite.current.querySelectorAll<HTMLElement>("a[href], button");
      const premier = cibles[0];
      const dernier = cibles[cibles.length - 1];
      if (e.shiftKey && document.activeElement === premier) {
        e.preventDefault();
        dernier.focus();
      } else if (!e.shiftKey && document.activeElement === dernier) {
        e.preventDefault();
        premier.focus();
      }
    };

    document.addEventListener("keydown", auClavier);
    return () => {
      document.removeEventListener("keydown", auClavier);
      document.body.style.overflow = defilement;
    };
  }, [visible]);

  const fermer = () => setVisible(false);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) fermer();
      }}
    >
      <div
        ref={boite}
        role="dialog"
        aria-modal="true"
        aria-label={offre.alt}
        className="relative w-full max-w-[640px] bg-white shadow-2xl"
      >
        <button
          ref={fermeture}
          type="button"
          onClick={fermer}
          aria-label={offre.fermer}
          className="absolute top-3 right-3 z-10 grid size-9 place-items-center rounded-full bg-ink/70 text-white transition-colors hover:bg-ink"
        >
          <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
            <path
              d="M6 6l12 12M18 6L6 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <a href={offre.lien} target="_blank" rel="noopener" className="block">
          <Image
            src={offre.image}
            alt={offre.alt}
            width={1280}
            height={800}
            priority
            sizes="(max-width: 680px) 100vw, 640px"
            className="h-auto w-full"
          />
        </a>

        <div className="border border-gold/40 p-4">
          <a
            href={offre.lien}
            target="_blank"
            rel="noopener"
            className="mx-auto block w-fit rounded-full bg-gold px-10 py-3 font-medium text-white transition-colors hover:bg-gold-dark"
          >
            {offre.libelleBouton}
          </a>
        </div>
      </div>
    </div>
  );
}
