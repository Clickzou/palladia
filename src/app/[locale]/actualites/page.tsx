import type { Metadata } from "next";
import { metadonnees } from "@/data/seo";
import ListeActualites from "./liste";

/** Titre et description dans la langue de la page, avec les alternatives hreflang. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return metadonnees("/actualites", locale);
}

export default async function ActualitesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <ListeActualites locale={locale} page={1} />;
}
