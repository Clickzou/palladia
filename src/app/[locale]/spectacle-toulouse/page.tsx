import type { Metadata } from "next";
import { metadonnees } from "@/data/seo";
import { traduire } from "@/i18n/contenu";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { formaterDate, prochainsEvenements } from "@/lib/evenements";

/** Titre et description dans la langue de la page, avec les alternatives hreflang. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return metadonnees("/spectacle-toulouse", locale);
}

export default async function SpectaclesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Le titre d’un spectacle est un nom propre : seules les mentions
  // pratiques (« Dîner : 19h30 · Spectacle : 21h00 ») passent au dictionnaire.
  const evenements = (await prochainsEvenements()).map((e) => ({
    ...e,
    sous_titre: e.sous_titre && traduire(e.sous_titre, locale),
    lieu: e.lieu && traduire(e.lieu, locale),
    description: e.description && traduire(e.description, locale),
  }));
  const t = (texte: string) => traduire(texte, locale);

  return (
    <>
      <header className="px-6 pt-16 pb-10 text-center">
        <h1 className="section-title">{t("Nos spectacles au Palladia")}</h1>
        <div className="mx-auto mt-6 h-px w-20 bg-gold" />
        <h2 className="mt-8 font-semibold tracking-wide text-ink uppercase">
          {t("Concert de musique classique, théâtre, jazz, dîner & spectacle, brunchs")}
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-body">
          {t(
            "L’hôtel Palladia, s’inscrit dans l’air du temps et met la culture à l’honneur en proposant une programmation riche et éclectique.",
          )}
        </p>
        <p className="mx-auto mt-4 max-w-3xl text-body">
          {t(
            "Pour cette saison artistique, évadez-vous vers des horizons très marqués entre concerts, spectacles et théâtre.",
          )}
        </p>
      </header>

      <section className="mx-auto max-w-5xl space-y-8 px-6 pb-24">
        {evenements.length === 0 ? (
          <div className="border border-gold/40 bg-cream px-8 py-16 text-center">
            <p className="text-lg text-ink">
              {t("La programmation de la prochaine saison est en préparation.")}
            </p>
            <Link
              href="/devis"
              className="mt-8 inline-block rounded-full bg-gold px-9 py-3 font-medium text-white transition-colors hover:bg-gold-dark"
            >
              {t("Être informé des prochaines dates")}
            </Link>
          </div>
        ) : (
          evenements.map((e) => (
            <article
              key={e.id}
              className="grid overflow-hidden border border-gold/50 sm:grid-cols-[minmax(0,320px)_1fr]"
            >
              {e.affiche ? (
                <div className="relative aspect-[2/3]">
                  <Image
                    src={e.affiche}
                    alt={e.affiche_alt ?? e.titre}
                    fill
                    sizes="(max-width: 640px) 100vw, 320px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex aspect-[2/3] items-center justify-center bg-ink-soft px-6 text-center">
                  <span className="font-display text-xl tracking-wide text-gold uppercase">
                    {e.titre}
                  </span>
                </div>
              )}

              <div className="flex flex-col justify-center px-8 py-10 text-center">
                <h2 className="font-display text-xl text-ink md:text-2xl">{e.titre}</h2>
                <p className="mt-4 text-body">{formaterDate(e.debut, locale)}</p>
                {e.sous_titre && <p className="mt-2 text-body">{e.sous_titre}</p>}
                {e.description && <p className="mt-4 text-sm text-muted">{e.description}</p>}
                {e.lieu && <p className="mt-6 text-body">{e.lieu}</p>}

                {/* Sans billetterie renseignee, pas de bouton : le repli vers
                    la reservation du restaurant envoyait qui voulait une place
                    de spectacle sur un formulaire de table. */}
                {e.lien_billetterie && (
                  <a
                    href={e.lien_billetterie}
                    target="_blank"
                    rel="noopener"
                    className="mx-auto mt-8 rounded-full bg-gold px-9 py-4 font-medium text-white transition-colors hover:bg-gold-dark"
                  >
                    {t("Plus d’infos / Réservez")}
                  </a>
                )}
              </div>
            </article>
          ))
        )}
      </section>
    </>
  );
}
