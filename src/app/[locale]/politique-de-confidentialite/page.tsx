import type { Metadata } from "next";
import { metadonnees } from "@/data/seo";
import { traduire, traduireContenu } from "@/i18n/contenu";
import PageLegale from "@/components/PageLegale";
import { politiqueConfidentialite as pFr } from "@/data/politique-confidentialite";

/** Titre et description dans la langue de la page, avec les alternatives hreflang. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return metadonnees("/politique-de-confidentialite", locale);
}

export default async function ConfidentialitePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const p = traduireContenu(pFr, locale);

  return (
    <PageLegale
      breadcrumb={traduire("Politique de confidentialité", locale)}
      titre={p.titre}
      sections={p.sections}
    />
  );
}
