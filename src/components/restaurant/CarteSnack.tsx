import type { CarteSnack as Carte } from "@/lib/menus";

/**
 * Carte du room service.
 *
 * Elle remplace l'image que servait WordPress : lisible sur un telephone, donc
 * sans le pincement-zoom qu'imposait un JPG de carte A4 — et c'est un telephone
 * que tient le client qui vient de scanner le QR code de sa chambre.
 *
 * L'habillage reprend celui de la carte imprimee du restaurant : fond sable,
 * aplats organiques, titres vert sapin, filets dores sous chaque plat. Les
 * couleurs sont relevees au pixel sur le PDF (voir globals.css) — l'ecran et le
 * papier doivent se reconnaitre l'un l'autre.
 *
 * Comme CartesMenus, ce composant sert aussi d'apercu dans le tableau de bord :
 * l'hotel voit exactement ce que verront ses clients.
 */
export default function CarteSnack({ carte }: { carte: Carte }) {
  // Ni ombre ni bordure sur la carte : l'ombre dessinait un lisere gris tout
  // autour, que l'on prenait pour un cadre. Elle se detache par sa couleur.
  return (
    <article className="relative mx-auto max-w-5xl overflow-hidden bg-white">
      {/* Aplats organiques du document imprime. Purement decoratifs : ils
          restent derriere le texte et ne changent rien a sa lecture. Des
          rayons dissymetriques plutot qu'un trace SVG — un viewBox etire a la
          hauteur de la carte transformait les courbes en bandes droites. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-40 size-[30rem] rounded-[58%_42%_63%_37%/45%_55%_45%_55%] bg-sable" />
        <div className="absolute top-1/3 -right-48 size-[32rem] rounded-[42%_58%_38%_62%/55%_38%_62%_45%] bg-sable" />
        <div className="absolute -bottom-40 left-1/3 size-[26rem] rounded-[55%_45%_35%_65%/60%_40%_60%_40%] bg-sable" />
      </div>

      <div className="relative px-6 py-12 sm:px-12">
        {/* Commander, c'est decrocher : le numero passe avant la carte. */}
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-[2.5rem] bg-sapin px-8 py-8 text-center text-white">
          <span className="flex items-center gap-4">
            <svg viewBox="0 0 24 24" className="size-8 shrink-0 fill-white" aria-hidden>
              <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1z" />
            </svg>
            <span className="font-display text-5xl leading-none font-semibold">{carte.poste}</span>
          </span>
          <span className="h-px w-16 bg-or-carte" />
          <span className="text-[17px] leading-snug">{carte.disponibilite}</span>
        </div>

        <div className="mt-14 grid gap-x-16 gap-y-14 md:grid-cols-2">
          {carte.sections.map((section, i) => (
            <section key={`${section.titre}-${i}`}>
              {/* Capitales espacees vert sapin : le titre de rubrique du
                  document imprime (« COTÉ FROID », « DESSERT »). */}
              <h2 className="font-display text-[26px] font-semibold tracking-[0.08em] text-sapin uppercase">
                {section.titre}
              </h2>

              <dl className="mt-6">
                {section.plats.map((plat, n) => (
                  <div key={`${plat.nom}-${n}`} className="mt-5 first:mt-0">
                    <div className="flex items-baseline gap-4">
                      <dt className="grow font-semibold text-ink">{plat.nom}</dt>
                      <dd className="shrink-0 text-[21px] whitespace-nowrap text-sapin">
                        {plat.prix}
                      </dd>
                    </div>
                    {/* Le filet dore sous chaque plat vient de la carte papier. */}
                    <div className="mt-1 h-px w-full bg-or-carte/60" />
                  </div>
                ))}
              </dl>

              {section.note && (
                <p className="mt-6 text-[17px] leading-snug font-semibold text-sapin">
                  {section.note}
                </p>
              )}
            </section>
          ))}
        </div>

        <footer className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-sapin/20 pt-8">
          <p className="flex items-center gap-3 font-semibold text-sapin">
            <svg viewBox="0 0 24 24" className="size-6 shrink-0 fill-sapin" aria-hidden>
              <path d="M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9m0 16a7 7 0 1 1 7-7 7 7 0 0 1-7 7m.5-11H11v5l4.2 2.5.8-1.2-3.5-2.1z" />
            </svg>
            {carte.attente}
          </p>
          <div className="text-sm text-muted">
            {carte.mentions.map((mention, i) => (
              <p key={`${mention}-${i}`}>{mention}</p>
            ))}
          </div>
        </footer>
      </div>
    </article>
  );
}
