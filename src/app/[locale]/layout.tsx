import type { Metadata } from "next";
import { Roboto, Spinnaker } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BandeauCookies from "@/components/BandeauCookies";
import PopupOffre from "@/components/PopupOffre";
import { traduire } from "@/i18n/contenu";
import { booking, reserverEn } from "@/config/site";
import "../globals.css";

/**
 * Offre mise en avant a l'arrivee sur le site. Le visuel porte l'offre
 * elle-meme : seuls le bouton et les textes de substitution sont traduits.
 * Passe `jusquAu`, la fenetre ne s'ouvre plus.
 */
const OFFRE_ETE = {
  image: "/images/journee-hotel-piscine-scaled.jpg",
  jusquAu: "2026-08-31",
};

/* Polices du site d’origine : Spinnaker pour les titres, Roboto pour le texte. */
const spinnaker = Spinnaker({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-spinnaker",
  display: "swap",
});

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hotelpalladia.com"),
  icons: { icon: "/images/favicon.png" },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = (texte: string) => traduire(texte, locale);

  return (
    <html lang={locale} className={`${spinnaker.variable} ${roboto.variable}`}>
      <body className="antialiased">
        <NextIntlClientProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <BandeauCookies
            libelles={{
              titre: t("Votre vie privée"),
              texte: t(
                "Nous utilisons des cookies pour mesurer l’audience du site et afficher certains contenus externes. Vous pouvez les accepter, les refuser, ou choisir précisément.",
              ),
              enSavoirPlus: t("En savoir plus"),
              legende: t("Catégories de cookies"),
              toutAccepter: t("Tout accepter"),
              toutRefuser: t("Tout refuser"),
              personnaliser: t("Personnaliser"),
              enregistrer: t("Enregistrer mes choix"),
              toujoursActifs: t("(toujours actifs)"),
              categories: [
                {
                  titre: t("Nécessaires"),
                  detail: t(
                    "Indispensables au fonctionnement du site : navigation, préférence de langue, envoi des formulaires. Toujours actifs.",
                  ),
                },
                {
                  titre: t("Statistiques"),
                  detail: t(
                    "Mesure d’audience anonyme : pages consultées, provenance des visiteurs. Nous aide à améliorer le site.",
                  ),
                },
                {
                  titre: t("Contenus externes"),
                  detail: t(
                    "Vidéos YouTube et cartes intégrées. Sans votre accord, elles sont remplacées par une image cliquable.",
                  ),
                },
              ],
            }}
          />
          <PopupOffre
            offre={{
              ...OFFRE_ETE,
              lien: reserverEn(booking.premium, locale),
              alt: traduire(
                "Offre été : les pieds dans l’eau, la tête en vacances — chambre confort de 10h à 18h à 99 € TTC, glaces ou softs offerts, du 3 juillet au 31 août 2026",
                locale,
              ),
              libelleBouton: traduire("Voir l’offre", locale),
              fermer: traduire("Fermer", locale),
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
