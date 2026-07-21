import type { Metadata } from "next";
import { metadonnees } from "@/data/seo";
import PageLegale from "@/components/PageLegale";
import { politiqueConfidentialite as p } from "@/data/politique-confidentialite";

export const metadata: Metadata = metadonnees("/politique-de-confidentialite");

export default function ConfidentialitePage() {
  return (
    <PageLegale
      breadcrumb="Politique de confidentialité"
      titre={p.titre}
      sections={p.sections}
    />
  );
}
