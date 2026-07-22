import type { MenuJour, MenuSemaine } from "@/lib/menus";

/**
 * Les deux encadres de menus, tels qu'ils s'affichent sur la page Restaurant.
 *
 * Ce composant sert aussi d'apercu dans le tableau de bord : l'hotel voit
 * exactement ce que verront ses clients. Dupliquer le balisage aurait laisse
 * l'apercu deriver du site des la premiere retouche.
 *
 * Le site titre chaque service en h4 dore 19 px et regroupe ses options dans
 * un seul paragraphe, separees par « ou ».
 */
export default function CartesMenus({
  semaine,
  jour,
  ou,
}: {
  semaine: MenuSemaine;
  jour: MenuJour;
  /** Separateur entre deux choix : « ou », « or », « o ». */
  ou: string;
}) {
  return (
    <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
      <article className="bg-white px-8 py-12 text-center shadow-sm">
        <h2 className="titre-moyen text-ink">{semaine.titre}</h2>
        {semaine.sections.map((s, i) => (
          <div key={`${s.titre}-${i}`} className="mt-8">
            <h4 className="titre-mini">{s.titre}</h4>
            <p className="mt-3 whitespace-pre-line text-body">{s.choix.join(`\n${ou}\n`)}</p>
          </div>
        ))}
        <p className="mt-10 text-sm text-muted italic">{semaine.note}</p>
      </article>

      <article className="bg-white px-8 py-12 text-center shadow-sm">
        <h2 className="titre-moyen text-ink">{jour.titre}</h2>
        <h4 className="titre-mini mt-2">{jour.sousTitre}</h4>

        <p className="mt-8 text-body">{jour.intro}</p>
        {jour.formules.map((f, i) => (
          <div key={`${f.prix}-${i}`} className="mt-4">
            <h4 className="titre-mini">{f.prix}</h4>
            <p className="mt-1 text-body">{f.detail.replace(/\*\*/g, "")}</p>
          </div>
        ))}

        <p className="mt-8 text-body">{jour.tarifsTitre}</p>
        <div className="mt-3 space-y-1 text-body">
          {jour.tarifs.map((t, i) => (
            <p key={`${t}-${i}`}>{t}</p>
          ))}
        </div>

        <div className="mt-10 border-t border-black/10 pt-8">
          <h4 className="titre-mini">{jour.enfant.titre}</h4>
          <h4 className="titre-mini mt-4">{jour.enfant.prix}</h4>
          <p className="mt-1 text-body">{jour.enfant.detail}</p>
        </div>
      </article>
    </div>
  );
}
