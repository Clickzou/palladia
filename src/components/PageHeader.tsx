import { Link } from "@/i18n/navigation";

/**
 * En-tete editorial commun aux pages de rubrique (Restaurant, Spa, Seminaires...) :
 * fil d’Ariane, titre dore, sous-titre, filet et bouton d’action facultatif.
 */
export default function PageHeader({
  breadcrumb,
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  external = false,
}: {
  breadcrumb: string;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  external?: boolean;
}) {
  return (
    <header className="apparait-haut px-6 pt-8 pb-12 text-center">
      <nav aria-label="Fil d’Ariane" className="text-sm">
        <Link href="/" className="text-[#8b3a3a] underline hover:text-gold">
          Accueil
        </Link>
        <span className="mx-1 text-muted">»</span>
        <span className="font-semibold text-ink">{breadcrumb}</span>
      </nav>

      {/* 40 px : sur le site, le titre en tete de page est plus petit que
          celui incruste dans un visuel d’en-tete (55 px). */}
      <h1 className="section-title mt-14">{title}</h1>
      {/* Sous-titre en h2 : il structure la page, comme sur le site d’origine.
          Mesure : Roboto 22 px, capitales. */}
      {subtitle && (
        <h2 className="mt-4 text-[22px] font-normal text-body uppercase">{subtitle}</h2>
      )}
      <div className="mx-auto mt-6 h-px w-20 bg-gold" />

      {ctaLabel && ctaHref && (
        <div className="mt-10">
          {external ? (
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener"
              className="bouton-or inline-block rounded-md px-9 py-4 font-medium"
            >
              {ctaLabel}
            </a>
          ) : (
            <Link
              href={ctaHref}
              className="bouton-or inline-block rounded-md px-9 py-4 font-medium"
            >
              {ctaLabel}
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
