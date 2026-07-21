import type { Metadata } from "next";
import { metadonnees } from "@/data/seo";
import ListeActualites from "./liste";

export const metadata: Metadata = metadonnees("/actualites");

export default async function ActualitesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <ListeActualites locale={locale} page={1} />;
}
