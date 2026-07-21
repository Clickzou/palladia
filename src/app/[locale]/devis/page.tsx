import type { Metadata } from "next";
import FormulaireDevis from "@/components/FormulaireDevis";

export const metadata: Metadata = {
  title: "Demande de devis - Le Palladia hôtel 4 étoiles Toulouse",
  description:
    "Demandez un devis pour vos séminaires, conférences, soirées d’entreprise et mariages à l’Hôtel Palladia, Toulouse.",
};

/** `?type=mariage` ou `?type=salle_reunion` pré-oriente la demande. */
export default async function DevisPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const types = ["salle_reunion", "mariage", "evenement_hybride"];

  return (
    <>
      <header className="px-6 pt-16 pb-10 text-center">
        <h1 className="section-title">Demande de devis</h1>
        <p className="mt-4 tracking-wide text-ink-soft uppercase md:text-lg">
          Pour vos séminaires, conférences, soirée d’entreprise &amp; mariages
        </p>
        <div className="mx-auto mt-6 h-px w-20 bg-gold" />
      </header>

      <div className="px-6 pb-24">
        <FormulaireDevis type={type && types.includes(type) ? type : "autre"} />
      </div>
    </>
  );
}
