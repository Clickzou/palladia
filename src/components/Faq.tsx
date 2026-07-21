"use client";

import { useState } from "react";

/**
 * FAQ en accordéon.
 *
 * Toutes les réponses sont présentes dans le HTML, même repliées : elles sont
 * masquées visuellement par l’attribut `hidden`, jamais retirées du document.
 * Sans cela, Google n’indexerait que la réponse ouverte — et les données
 * structurées FAQPage décriraient un contenu introuvable dans la page.
 */
export default function Faq({
  items,
}: {
  items: readonly { question: string; reponse: string }[];
}) {
  const [ouvert, setOuvert] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-6xl divide-y divide-black/10 border border-black/10">
      {items.map((item, i) => {
        const actif = ouvert === i;
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                onClick={() => setOuvert(actif ? null : i)}
                aria-expanded={actif}
                aria-controls={`faq-reponse-${i}`}
                className="flex w-full items-center gap-4 px-6 py-5 text-left transition-colors hover:bg-cream"
              >
                <span aria-hidden className="text-xl leading-none text-ink-soft">
                  {actif ? "−" : "+"}
                </span>
                <span className="font-medium text-ink">{item.question}</span>
              </button>
            </h3>

            <div id={`faq-reponse-${i}`} hidden={!actif} className="bg-cream px-6 pb-6 pl-16">
              <p className="leading-relaxed text-body">{item.reponse}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
