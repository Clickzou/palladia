import type { Metadata } from "next";
import PageLegale from "@/components/PageLegale";
import { mentionsLegales as m } from "@/data/mentions-legales";

export const metadata: Metadata = { title: m.metaTitle, description: m.metaDescription };

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
