import type { Metadata } from "next";
import { traduire } from "@/i18n/contenu";
import { lireMenus } from "@/lib/menus";
import { metadonnees } from "@/data/seo";
import CarteSnack from "@/components/restaurant/CarteSnack";
import PageHeader from "@/components/PageHeader";

/** Titre et description dans la langue de la page, avec les alternatives hreflang. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return metadonnees("/carte-room-service", locale);
}

/**
 * Carte du room service.
 *
 * C'est l'adresse qu'imprime le QR code des chambres : elle ne doit plus
 * jamais changer. Le contenu, lui, vient de la base — l'hotel le met a jour
 * depuis le tableau de bord, sans que le QR code ait a etre reimprime.
 */
export default async function CarteRoomServicePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = (texte: string) => traduire(texte, locale);
  const { snack } = await lireMenus(locale);

  return (
    <>
      <PageHeader
        breadcrumb={t("Room Service")}
        title={snack.titre}
        subtitle={t("Servi dans votre chambre")}
      />

      {/* Fond sable de la carte imprimee : la page blanche laissait la carte
          flotter dans le vide. */}
      <section className="bg-sable px-6 py-16">
        <CarteSnack carte={snack} />

        <p className="mx-auto mt-8 max-w-3xl text-center text-body">
          {t("Pour commander, composez le")} <strong className="text-sapin">{snack.poste}</strong>{" "}
          {t("depuis le téléphone de votre chambre.")}
        </p>
      </section>
    </>
  );
}
