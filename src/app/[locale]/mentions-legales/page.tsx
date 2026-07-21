import type { Metadata } from "next";
import { metadonnees } from "@/data/seo";
import PageLegale from "@/components/PageLegale";
import { mentionsLegales as m } from "@/data/mentions-legales";

export const metadata: Metadata = metadonnees("/mentions-legales");

export default function MentionsLegalesPage() {
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
