import type { Metadata } from "next";
import { metadonnees } from "@/data/seo";
import { traduireContenu } from "@/i18n/contenu";
import PageLegale from "@/components/PageLegale";
import { mentionsLegales as mFr } from "@/data/mentions-legales";

/** Titre et description dans la langue de la page, avec les alternatives hreflang. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return metadonnees("/mentions-legales", locale);
}

export default async function MentionsLegalesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const m = traduireContenu(mFr, locale);

  return (
    <PageLegale
      breadcrumb="Mentions légales"
      titre={m.titre}
      enTete={m.editeur}
      sections={[
        { titre: "Informations complémentaires", paragraphes: m.complements },
        ...m.sections,
        { titre: m.rgpdTitre, paragraphes: [] },
        ...m.rgpd,
      ]}
    />
  );
}
