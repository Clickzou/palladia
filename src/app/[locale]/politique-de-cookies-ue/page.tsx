import type { Metadata } from "next";
import { metadonnees } from "@/data/seo";
import { traduire, traduireContenu } from "@/i18n/contenu";
import PageLegale from "@/components/PageLegale";
import { politiqueCookies as cFr } from "@/data/politique-cookies";

/** Titre et description dans la langue de la page, avec les alternatives hreflang. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return metadonnees("/politique-de-cookies-ue", locale);
}

export default async function CookiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const c = traduireContenu(cFr, locale);
  const t = (texte: string) => traduire(texte, locale);

  return (
    <>
      <PageLegale
        breadcrumb={t("Politique de Cookies")}
        titre={c.titre}
        chapo={c.chapo}
        sections={c.sections}
      />

      <section className="mx-auto max-w-4xl px-6 pb-24">
        <h2 className="text-lg font-semibold text-ink">{t("6. Cookies placés")}</h2>
        <ul className="mt-4 divide-y divide-black/10 border border-black/10">
          {c.services.map(([service, finalite]) => (
            <li key={service} className="flex flex-wrap items-center justify-between gap-2 px-5 py-4">
              <span className="text-ink">{service}</span>
              <span className="text-sm text-muted">{finalite}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
