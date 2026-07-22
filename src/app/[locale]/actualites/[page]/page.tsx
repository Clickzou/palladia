import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ListeActualites from "../liste";
import { traduire } from "@/i18n/contenu";
import { IMAGE_PARTAGE, ogLocale } from "@/data/seo";

/**
 * Pages 2 et suivantes : /actualites/2, /actualites/3…
 * Reprend le format d’URL du site WordPress, pour ne pas perdre
 * les pages deja indexees.
 */
type Props = { params: Promise<{ locale: string; page: string }> };

const SITE = "https://www.hotelpalladia.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, page } = await params;
  const chemin = `/actualites/${page}`;
  const t = (texte: string) => traduire(texte, locale);

  // Le numero figure dans le titre comme dans la description : sans lui, les
  // quatre pages de liste seraient indistinguables et Google n'en garderait
  // qu'une. Intitules courts, pour tenir dans les 65 signes affiches.
  const titre = `${t("Actualités du Palladia")} — ${t("page")} ${page} | ${t("Hôtel Palladia Toulouse")}`;
  const description = `${t("Page")} ${page} ${t("des actualités de l’Hôtel Palladia à Toulouse : événements, spectacles, offres et vie de l’établissement.")}`;

  return {
    title: titre,
    description,
    /**
     * Chaque page de liste porte des articles differents : elle est indexable
     * et se declare canonique d'elle-meme. La renvoyer vers /actualites aurait
     * prive de tout lien interne les treize articles qui n'y figurent pas.
     */
    alternates: {
      canonical: locale === "fr" ? `${SITE}${chemin}` : `${SITE}/${locale}${chemin}`,
      languages: {
        fr: `${SITE}${chemin}`,
        en: `${SITE}/en${chemin}`,
        es: `${SITE}/es${chemin}`,
        "x-default": `${SITE}${chemin}`,
      },
    },
    openGraph: {
      title: titre,
      description,
      url: locale === "fr" ? `${SITE}${chemin}` : `${SITE}/${locale}${chemin}`,
      siteName: "Hôtel Palladia",
      locale: ogLocale(locale),
      type: "website",
      images: [{ ...IMAGE_PARTAGE, alt: t(IMAGE_PARTAGE.alt) }],
    },
  };
}

export default async function ActualitesPaginees({ params }: Props) {
  const { locale, page } = await params;
  const numero = Number(page);

  if (!Number.isInteger(numero) || numero < 2) notFound();

  return <ListeActualites locale={locale} page={numero} />;
}
