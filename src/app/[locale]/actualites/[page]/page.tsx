import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ListeActualites from "../liste";

/**
 * Pages 2 et suivantes : /actualites/2, /actualites/3…
 * Reprend le format d'URL du site WordPress, pour ne pas perdre
 * les pages deja indexees.
 */
type Props = { params: Promise<{ locale: string; page: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params;
  return {
    title: `Actualités du Palladia — page ${page} - Le Palladia hôtel 4 étoiles Toulouse`,
    description:
      "Toute l’actualité de l’Hôtel Palladia à Toulouse : événements, spectacles, offres et vie de l’établissement.",
    // Les pages de liste au-dela de la premiere n'ont pas vocation a etre indexees
    robots: { index: false, follow: true },
  };
}

export default async function ActualitesPaginees({ params }: Props) {
  const { locale, page } = await params;
  const numero = Number(page);

  if (!Number.isInteger(numero) || numero < 2) notFound();

  return <ListeActualites locale={locale} page={numero} />;
}
