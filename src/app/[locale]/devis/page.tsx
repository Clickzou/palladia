import type { Metadata } from "next";
import FormulaireDevis from "@/components/FormulaireDevis";
import { site } from "@/config/site";
import { IconMail, IconMap, IconPhone } from "@/components/icons";

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

      <div className="px-6 pb-20">
        <FormulaireDevis type={type && types.includes(type) ? type : "autre"} />
      </div>

      {/* Coordonnees directes : la page Contact ayant ete supprimee, ce bloc
          reste le point d'entree pour toute demande non commerciale. */}
      <section className="bg-cream px-6 py-16 text-center">
        <h2 className="font-display text-xl tracking-wide text-ink uppercase md:text-2xl">
          Une autre demande ? Contactez-nous directement
        </h2>
        <div className="mx-auto mt-5 h-px w-16 bg-gold" />

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 text-body">
          <a href={site.phoneHref} className="flex items-center gap-2 hover:text-gold">
            <IconPhone /> {site.phone}
          </a>
          <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-gold">
            <IconMail /> {site.email}
          </a>
          <a
            href={site.maps}
            target="_blank"
            rel="noopener"
            className="flex items-center gap-2 hover:text-gold"
          >
            <IconMap /> {site.address}
          </a>
        </div>
      </section>
    </>
  );
}
