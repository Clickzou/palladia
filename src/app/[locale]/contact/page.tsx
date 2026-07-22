import type { Metadata } from "next";
import { metadonnees } from "@/data/seo";
import FormulaireContact from "@/components/FormulaireContact";
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
  return metadonnees("/contact", locale);
}

/**
 * Page Contact. Le WordPress en avait une, mais vide : aucun contenu, aucun
 * formulaire. Elle sert ici aux demandes generales, quand /devis s'adresse au
 * service commercial — d'ou deux destinataires differents.
 */
export default async function ContactPage({
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
    message: t("Message"),
    messagePlaceholder: t("Votre question, votre demande…"),
    envoiEnCours: t("Envoi en cours…"),
    envoyer: t("Envoyer"),
  };

  return (
    <>
      <header className="px-6 pt-16 pb-10 text-center">
        <h1 className="section-title">{t("Contact")}</h1>
        <h2 className="mt-4 text-[22px] font-normal text-body uppercase">
          {t("Une question ? Notre équipe vous répond")}
        </h2>
        <div className="mx-auto mt-6 h-px w-20 bg-gold" />
      </header>

      {/* Coordonnees, avant le formulaire : beaucoup de visiteurs cherchent un
          numero de telephone, pas un champ a remplir. */}
      <section className="px-6 pb-14">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-10 gap-y-5 text-body">
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

      <div className="px-6 pb-20">
        <FormulaireContact libelles={libelles} />
      </div>

      {/* Renvoi vers le devis : une demande commerciale y est mieux traitee,
          avec les champs budget et date que ce formulaire n'a pas. */}
      <section className="bg-cream px-6 py-16 text-center">
        <h2 className="font-display text-xl tracking-wide text-ink uppercase md:text-2xl">
          {t("Un séminaire, un mariage, un événement ?")}
        </h2>
        <div className="mx-auto mt-5 h-px w-16 bg-gold" />
        <p className="mt-8 text-body">
          {t("Notre équipe commerciale établit votre devis sur mesure.")}
        </p>
        <a
          href={locale === "fr" ? "/devis" : `/${locale}/devis`}
          className="mt-8 inline-block rounded-full bg-gold px-10 py-4 font-medium text-white transition-colors hover:bg-gold-dark"
        >
          {t("Demande de devis")}
        </a>
      </section>
    </>
  );
}
