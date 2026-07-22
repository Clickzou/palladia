"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

export type LieuCarte = {
  nom: string;
  lat?: number;
  lng?: number;
  description: string;
  adresse: string;
  site?: string;
};

/**
 * Carte des lieux a visiter, dessinee par le site lui-meme.
 *
 * Elle remplace l'iframe uMap : les fiches y etaient stockees chez
 * OpenStreetMap et restaient en français dans les trois langues. Ici elles
 * viennent de src/data/tourisme.ts, qui passe par le dictionnaire.
 *
 * Les tuiles restent servies par OpenStreetMap France, comme sur la carte
 * d'origine, mais aucun cookie n'est depose.
 */
export default function CarteTourisme({
  lieux,
  hotel,
  libelles,
}: {
  lieux: readonly LieuCarte[];
  /** Point de repere : l'hotel, mis en avant parmi les lieux a visiter. */
  hotel: { nom: string; adresse: string; lat: number; lng: number };
  libelles: { decouvrir: string; carte: string; pleinEcran: string };
}) {
  const conteneur = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!conteneur.current) return;
    let carte: import("leaflet").Map | undefined;
    let annule = false;

    // Leaflet touche a `window` des son import : il ne peut pas etre charge
    // pendant le rendu serveur.
    import("leaflet").then((L) => {
      if (annule || !conteneur.current) return;

      // Cadrage repris de la carte uMap d'origine, plutot qu'un ajustement
      // automatique : Nailloux et Aeroscopia, a une vingtaine de kilometres,
      // ecraseraient le centre de Toulouse.
      carte = L.map(conteneur.current, { scrollWheelZoom: false }).setView(
        [43.604666, 1.395435],
        14,
      );
      L.tileLayer("https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png", {
        maxZoom: 20,
        attribution:
          'map data © <a href="https://osm.org/copyright">OpenStreetMap contributors</a> under ODbL',
      }).addTo(carte);

      const echapper = (t: string) =>
        t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

      const marqueur = (couleur: string) =>
        L.divIcon({
          className: "",
          html:
            `<svg viewBox="0 0 24 32" width="24" height="32" aria-hidden="true">` +
            `<path d="M12 0C5.4 0 0 5.4 0 12c0 8.4 12 20 12 20s12-11.6 12-20c0-6.6-5.4-12-12-12z" fill="${couleur}"/>` +
            `<circle cx="12" cy="12" r="4.5" fill="#fff"/></svg>`,
          iconSize: [24, 32],
          iconAnchor: [12, 32],
          popupAnchor: [0, -30],
        });

      const ajouter = (
        lieu: { nom: string; adresse: string; description?: string; site?: string },
        lat: number,
        lng: number,
        couleur: string,
      ) => {
        const lien = lieu.site
          ? `<a href="${echapper(lieu.site)}" target="_blank" rel="noopener">${echapper(libelles.decouvrir)}</a>`
          : "";
        L.marker([lat, lng], { icon: marqueur(couleur), title: lieu.nom, alt: lieu.nom })
          .addTo(carte!)
          // Etiquette affichee en permanence, comme sur la carte d'origine.
          .bindTooltip(lieu.nom, { permanent: true, direction: "right", offset: [10, -14] })
          .bindPopup(
            `<strong>${echapper(lieu.nom)}</strong>` +
              (lieu.description ? `<br>${echapper(lieu.description)}` : "") +
              `<br><span class="adresse">${echapper(lieu.adresse)}</span>` +
              (lien ? `<br>${lien}` : ""),
          );
      };

      ajouter(hotel, hotel.lat, hotel.lng, "#c9943f");
      for (const l of lieux) {
        if (typeof l.lat === "number" && typeof l.lng === "number") {
          ajouter(l, l.lat, l.lng, "#3c6e8f");
        }
      }

    });

    return () => {
      annule = true;
      carte?.remove();
    };
  }, [lieux, hotel, libelles]);

  return (
    <>
      <div
        ref={conteneur}
        role="application"
        aria-label={libelles.carte}
        className="h-[70vh] min-h-[420px] w-full [&_.leaflet-popup-content]:text-center [&_.adresse]:text-muted"
      />
      <p className="mt-5 text-center">
        <button
          type="button"
          onClick={() => {
            conteneur.current?.requestFullscreen().then(
              // Leaflet doit recalculer sa taille apres le changement d'ecran.
              () => setTimeout(() => window.dispatchEvent(new Event("resize")), 100),
              () => {},
            );
          }}
          className="cursor-pointer text-[#8b3a3a] underline underline-offset-4 hover:text-gold"
        >
          {libelles.pleinEcran}
        </button>
      </p>
    </>
  );
}
