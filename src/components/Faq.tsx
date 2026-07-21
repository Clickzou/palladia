"use client";

import { useState } from "react";

/**
 * FAQ en accordéon. Le balisage <details>/<summary> reste accessible et
 * dépliable même si le JavaScript ne se charge pas.
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
                className="flex w-full items-center gap-4 px-6 py-5 text-left transition-colors hover:bg-cream"
              >
                <span aria-hidden className="text-xl leading-none text-ink-soft">
                  {actif ? "−" : "+"}
                </span>
                <span className="font-medium text-ink">{item.question}</span>
              </button>
            </h3>
            {actif && (
              <div className="bg-cream px-6 pb-6 pl-16">
                <p className="leading-relaxed text-body">{item.reponse}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
