import type { Metadata } from "next";
import ListeActualites from "./liste";

export const metadata: Metadata = {
  title: "Actualités du Palladia - Le Palladia hôtel 4 étoiles Toulouse",
  description:
    "Toute l’actualité de l’Hôtel Palladia à Toulouse : événements, spectacles, offres et vie de l’établissement.",
};

export default async function ActualitesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <ListeActualites locale={locale} page={1} />;
}
