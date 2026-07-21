import type { Metadata } from "next";
import PageLegale from "@/components/PageLegale";
import { politiqueConfidentialite as p } from "@/data/politique-confidentialite";

export const metadata: Metadata = { title: p.metaTitle, description: p.metaDescription };

export default function ConfidentialitePage() {
  return (
    <PageLegale
      breadcrumb="Politique de confidentialité"
      titre={p.titre}
      sections={p.sections}
    />
  );
}
