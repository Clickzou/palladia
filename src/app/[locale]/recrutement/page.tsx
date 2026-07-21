import type { Metadata } from "next";
import { recrutement as r } from "@/data/recrutement";

export const metadata: Metadata = {
  title: r.metaTitle,
  description: r.metaDescription,
};

export default function RecrutementPage() {
  return (
    <>
      <header className="px-6 pt-16 pb-10 text-center">
        <h1 className="font-display text-xl tracking-wide text-gold uppercase md:text-2xl">
          {r.titre}
        </h1>
      </header>

      <div className="mx-auto max-w-4xl px-6 pb-20">
        <p className="font-semibold tracking-wide text-ink uppercase">📣 {r.accroche}</p>

        {r.offres.map((offre) => (
          <article key={offre.poste} className="mt-10">
            <h2 className="text-lg font-semibold text-ink">{offre.poste}</h2>
            <p className="mt-5 leading-relaxed text-body">{offre.accroche}</p>

            <h3 className="mt-8 text-body">Responsabilités :</h3>
            <ul className="mt-3 space-y-2 text-body">
              {offre.responsabilites.map((item) => (
                <li key={item}>– {item}</li>
              ))}
            </ul>

            <ul className="mt-8 space-y-2 text-body">
              {offre.conditions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}

        <p className="mt-12 font-semibold text-ink">📥 Envoyez votre candidature à :</p>
        <p className="mt-2">
          👉{" "}
          <a
            href={`mailto:${r.emailCandidature}`}
            className="text-[#8b3a3a] underline underline-offset-4 hover:text-gold"
          >
            {r.emailCandidature}
          </a>
        </p>
      </div>
    </>
  );
}
