import type { Metadata } from "next";
import { metadonnees } from "@/data/seo";
import FormulaireDevis from "@/components/FormulaireDevis";
import { site } from "@/config/site";
import { traduire } from "@/i18n/contenu";
import { IconMail, IconMap, IconPhone } from "@/components/icons";

/** Titre et description dans la langue de la page, avec les alternatives hreflang. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return metadonnees("/devis", locale);
}

/** `?type=mariage` ou `?type=salle_reunion` pré-oriente la demande. */
export default async function DevisPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ type?: string }>;
}) {
  const { locale } = await params;
  const { type } = await searchParams;
  const types = ["salle_reunion", "mariage", "evenement_hybride", "reservation_groupe"];
  const t = (texte: string) => traduire(texte, locale);

  // Le formulaire est un composant client : ses libelles sont traduits ici,
  // sur le serveur, puis passes en props.
  const libelles = {
    piege: t("Ne pas remplir"),
    nom: t("Nom"),
    prenom: t("Prénom"),
    telephone: t("Téléphone"),
    email: t("E-mail"),
    entreprise: t("Entreprise"),
    entreprisePlaceholder: t("Nom de votre entreprise"),
    budget: t("Budget de l’événement"),
    budgetPlaceholder: t("Quel est votre budget approximatif ?"),
    dateEvenement: t("Date de l’événement"),
    dateEvenementPlaceholder: t("Date souhaitée pour votre événement ?"),
    dateFlexible: t("Date flexible ?"),
    oui: t("Oui"),
    non: t("Non"),
    message: t("Message"),
    messagePlaceholder: t("Veuillez indiquer des informations complémentaires si nécessaire"),
    envoiEnCours: t("Envoi en cours…"),
    envoyer: t("Envoyer"),
  };

  return (
    <>
      <header className="px-6 pt-16 pb-10 text-center">
        <h1 className="section-title">{t("Demande de devis")}</h1>
        <h2 className="mt-4 text-[22px] font-normal text-body uppercase">
          {t("Pour vos séminaires, conférences, soirée d’entreprise & mariages")}
        </h2>
        <div className="mx-auto mt-6 h-px w-20 bg-gold" />
      </header>

      <div className="px-6 pb-20">
        <FormulaireDevis
          type={type && types.includes(type) ? type : "autre"}
          libelles={libelles}
        />
      </div>

      {/* Coordonnees directes : la page Contact ayant ete supprimee, ce bloc
          reste le point d’entree pour toute demande non commerciale. */}
      <section className="bg-cream px-6 py-16 text-center">
        <h2 className="font-display text-xl tracking-wide text-ink uppercase md:text-2xl">
          {t("Une autre demande ? Contactez-nous directement")}
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
