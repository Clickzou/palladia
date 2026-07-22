"use client";

import { useEffect } from "react";

/**
 * Declenche les apparitions au defilement pour tout le site.
 *
 * Un seul observateur monte dans le gabarit surveille la page entiere. Les
 * pages et composants n'ont donc qu'a poser la classe `apparait` : ils restent
 * des composants serveur, sans frontiere client supplementaire.
 *
 * Un `MutationObserver` prend en charge les elements ajoutes apres coup
 * (changement de page, contenu ouvert par l'utilisateur).
 */
export default function RevelateurAnimations() {
  useEffect(() => {
    const doux = window.matchMedia("(prefers-reduced-motion: reduce)");

    /** Tout afficher d'un coup, sans animer : reglage systeme, ou secours. */
    const toutAfficher = () => {
      document
        .querySelectorAll(".apparait, .apparait-image")
        .forEach((e) => e.classList.add("est-visible"));
    };

    if (doux.matches) {
      toutAfficher();
      return;
    }

    // Marge basse negative : l'element se revele une fois vraiment entre dans
    // le champ, pas des qu'il effleure le bas de l'ecran.
    const observateur = new IntersectionObserver(
      (entrees) => {
        for (const entree of entrees) {
          if (!entree.isIntersecting) continue;
          entree.target.classList.add("est-visible");
          // L'animation ne joue qu'une fois : rejouer au retour en arriere
          // donnerait une page qui clignote au defilement.
          observateur.unobserve(entree.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    const observer = (racine: ParentNode) => {
      racine.querySelectorAll(".apparait:not(.est-visible), .apparait-image:not(.est-visible)")
        .forEach((e) => observateur.observe(e));
    };

    observer(document);

    const mutations = new MutationObserver((liste) => {
      for (const m of liste) {
        for (const noeud of m.addedNodes) {
          if (noeud instanceof HTMLElement) observer(noeud.parentNode ?? document);
        }
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observateur.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}
