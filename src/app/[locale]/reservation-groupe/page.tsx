import type { Metadata } from "next";
import { metadonnees } from "@/data/seo";
import FormulaireGroupe from "@/components/FormulaireGroupe";
import { site } from "@/config/site";
import { traduire } from "@/i18n/contenu";
import { IconMail, IconPhone } from "@/components/icons";
import PageHeader from "@/components/PageHeader";

/** Titre et description dans la langue de la page, avec les alternatives hreflang. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return metadonnees("/reservation-groupe", locale);
}

/**
 * Demande de reservation de groupe.
 *
 * Le bouton de la page Chambres menait au devis evenementiel, qui reclamait un
 * budget et une seule date : personne ne pouvait y decrire un sejour. Ce
 * formulaire-ci demande ce qui sert a bloquer des chambres — combien de
 * personnes, de quand a quand — et part a la reception.
 */
export default async function ReservationGroupePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = (texte: string) => traduire(texte, locale);

  // Le formulaire est un composant client : ses libelles sont traduits ici,
  // sur le serveur, puis passes en props.
  const libelles = {
    piege: t("Ne pas remplir"),
    nom: t("Nom"),
    prenom: t("Prénom"),
    telephone: t("Téléphone"),
    email: t("E-mail"),
    societe: t("Société"),
    societePlaceholder: t("Nom de votre société"),
    nbPersonnes: t("Nombre de personnes"),
    arrivee: t("Date d’arrivée"),
    depart: t("Date de départ"),
    message: t("Message"),
    messagePlaceholder: t("Précisez vos besoins : nombre de chambres, restauration, salle de réunion…"),
    facultatif: t("facultatif"),
    obligatoires: t("Champs obligatoires"),
    envoiEnCours: t("Envoi en cours…"),
    envoyer: t("Envoyer ma demande"),
  };

  return (
    <>
      <PageHeader
        breadcrumb={t("Réservation de groupe")}
        title={t("Réservation de groupe")}
        subtitle={t("Un séjour à plusieurs, une demande sur mesure")}
      />

      <p className="mx-auto max-w-3xl px-6 text-center text-body">
        {t(
          "À partir de dix personnes, notre service réservation vous propose un tarif et un accompagnement adaptés. Indiquez-nous vos dates, nous revenons vers vous rapidement.",
        )}
      </p>

      <div className="px-6 pt-12 pb-20">
        <FormulaireGroupe libelles={libelles} />
      </div>

      {/* Pour qui prefere le telephone a un formulaire. */}
      <section className="bg-cream px-6 py-16 text-center">
        <h2 className="font-display text-xl tracking-wide text-ink uppercase md:text-2xl">
          {t("Vous préférez nous joindre directement ?")}
        </h2>
        <div className="mx-auto mt-5 h-px w-16 bg-gold" />

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 text-body">
          <a href={site.phoneHref} className="flex items-center gap-2 hover:text-gold">
            <IconPhone /> {site.phone}
          </a>
          <a
            href="mailto:reservation@hotelpalladia.com"
            className="flex items-center gap-2 hover:text-gold"
          >
            <IconMail /> reservation@hotelpalladia.com
          </a>
        </div>
      </section>
    </>
  );
}
