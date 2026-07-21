import PageHeader from "./PageHeader";

export type SectionLegale = {
  titre: string;
  paragraphes: readonly string[];
};

/**
 * Gabarit des pages légales : titre, sections numérotées, texte en colonne
 * étroite pour rester lisible.
 */
export default function PageLegale({
  breadcrumb,
  titre,
  chapo,
  enTete,
  sections,
}: {
  breadcrumb: string;
  titre: string;
  chapo?: string;
  /** Bloc d'identification en paires libellé / valeur */
  enTete?: readonly (readonly [string, string])[];
  sections: readonly SectionLegale[];
}) {
  return (
    <>
      <PageHeader breadcrumb={breadcrumb} title={titre} />

      <div className="mx-auto max-w-4xl px-6 pb-24">
        {chapo && <p className="mb-10 leading-relaxed text-body">{chapo}</p>}

        {enTete && (
          <dl className="mb-12 grid gap-x-6 gap-y-2 sm:grid-cols-[auto_1fr]">
            {enTete.map(([libelle, valeur]) => (
              <div key={libelle} className="contents">
                <dt className="font-semibold text-ink">{libelle} :</dt>
                <dd className="text-body">{valeur}</dd>
              </div>
            ))}
          </dl>
        )}

        {sections.map((s) => (
          <section key={s.titre} className="mt-10">
            <h2 className="text-lg font-semibold text-ink">{s.titre}</h2>
            <div className="mt-4 space-y-4 leading-relaxed text-body">
              {s.paragraphes.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
