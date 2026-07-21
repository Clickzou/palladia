import type { Metadata } from "next";
import PageLegale from "@/components/PageLegale";
import { politiqueCookies as c } from "@/data/politique-cookies";

export const metadata: Metadata = { title: c.metaTitle, description: c.metaDescription };

export default function CookiesPage() {
  return (
    <>
      <PageLegale
        breadcrumb="Politique de Cookies"
        titre={c.titre}
        chapo={c.chapo}
        sections={c.sections}
      />

      <section className="mx-auto max-w-4xl px-6 pb-24">
        <h2 className="text-lg font-semibold text-ink">6. Cookies placés</h2>
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
