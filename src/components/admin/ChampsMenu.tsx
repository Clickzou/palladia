"use client";

import type { MenuJour, MenuSemaine } from "@/lib/menus";

const CHAMP =
  "w-full border border-black/20 bg-white px-3 py-2 text-body outline-none transition-colors focus:border-gold";
const ETIQUETTE = "block text-sm text-muted";

/**
 * Formulaires des deux menus.
 *
 * Chaque champ correspond exactement a ce qui s'affiche sur le site : pas de
 * JSON, pas de balisage a connaitre. Les retours a la ligne dans un plat sont
 * conserves — ils commandent la mise en page de la carte.
 */

export function ChampsSemaine({
  menu,
  onChange,
}: {
  menu: MenuSemaine;
  onChange: (m: MenuSemaine) => void;
}) {
  const majSection = (i: number, section: MenuSemaine["sections"][number]) =>
    onChange({ ...menu, sections: menu.sections.map((s, n) => (n === i ? section : s)) });

  const retirerSection = (i: number) =>
    onChange({ ...menu, sections: menu.sections.filter((_, n) => n !== i) });

  const ajouterSection = () =>
    onChange({ ...menu, sections: [...menu.sections, { titre: "", choix: [""] }] });

  return (
    <div className="space-y-8">
      <div>
        <label className={ETIQUETTE}>Titre de l’encadré</label>
        <input
          value={menu.titre}
          onChange={(e) => onChange({ ...menu, titre: e.target.value })}
          className={`mt-1 ${CHAMP}`}
        />
      </div>

      {menu.sections.map((section, i) => (
        <fieldset key={i} className="border border-black/10 p-5">
          {/* L'encadre porte le nom saisi : « Entrée », « Plat »… « Partie 2 »
              n'aurait rien dit a qui compose la carte. */}
          <legend className="px-2 text-sm font-semibold text-ink">
            {section.titre.trim() || "Nouvelle partie"}
          </legend>

          <div className="flex items-end gap-2">
            <div className="grow">
              <label className={ETIQUETTE}>Intitulé — Entrée, Plat, Dessert, Fromage…</label>
              <input
                value={section.titre}
                onChange={(e) => majSection(i, { ...section, titre: e.target.value })}
                className={`mt-1 ${CHAMP}`}
              />
            </div>
            <button
              type="button"
              onClick={() => retirerSection(i)}
              className="shrink-0 cursor-pointer px-3 py-2 text-sm text-muted hover:text-[#a33]"
            >
              Supprimer cette partie
            </button>
          </div>

          <label className={`${ETIQUETTE} mt-5`}>
            Choix proposés — un par bloc. Le retour à la ligne dans un plat est conservé tel quel.
          </label>
          <div className="mt-1 space-y-2">
            {section.choix.map((choix, n) => (
              <div key={n} className="flex gap-2">
                <textarea
                  rows={2}
                  value={choix}
                  onChange={(e) =>
                    majSection(i, {
                      ...section,
                      choix: section.choix.map((c, m) => (m === n ? e.target.value : c)),
                    })
                  }
                  className={CHAMP}
                />
                <button
                  type="button"
                  aria-label={`Supprimer le choix ${n + 1}`}
                  onClick={() =>
                    majSection(i, { ...section, choix: section.choix.filter((_, m) => m !== n) })
                  }
                  className="shrink-0 cursor-pointer px-3 text-muted hover:text-[#a33]"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => majSection(i, { ...section, choix: [...section.choix, ""] })}
            className="mt-3 cursor-pointer text-sm text-gold underline underline-offset-4"
          >
            + Ajouter un choix
          </button>
        </fieldset>
      ))}

      <button
        type="button"
        onClick={ajouterSection}
        className="cursor-pointer rounded-full border border-gold px-6 py-2 text-sm text-gold transition-colors hover:bg-gold hover:text-white"
      >
        + Ajouter une partie
      </button>

      <div>
        <label className={ETIQUETTE}>Mention en bas d’encadré</label>
        <textarea
          rows={3}
          value={menu.note}
          onChange={(e) => onChange({ ...menu, note: e.target.value })}
          className={`mt-1 ${CHAMP}`}
        />
      </div>
    </div>
  );
}

export function ChampsJour({
  menu,
  onChange,
}: {
  menu: MenuJour;
  onChange: (m: MenuJour) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={ETIQUETTE}>Titre</label>
          <input
            value={menu.titre}
            onChange={(e) => onChange({ ...menu, titre: e.target.value })}
            className={`mt-1 ${CHAMP}`}
          />
        </div>
        <div>
          <label className={ETIQUETTE}>Sous-titre</label>
          <input
            value={menu.sousTitre}
            onChange={(e) => onChange({ ...menu, sousTitre: e.target.value })}
            className={`mt-1 ${CHAMP}`}
          />
        </div>
      </div>

      <div>
        <label className={ETIQUETTE}>Phrase d’introduction</label>
        <input
          value={menu.intro}
          onChange={(e) => onChange({ ...menu, intro: e.target.value })}
          className={`mt-1 ${CHAMP}`}
        />
      </div>

      <fieldset className="border border-black/10 p-5">
        <legend className="px-2 text-sm font-semibold text-ink">Formules</legend>
        {menu.formules.map((f, i) => (
          <div key={i} className="mt-2 grid gap-2 sm:grid-cols-[8rem_1fr_auto]">
            <input
              value={f.prix}
              placeholder="25 €"
              onChange={(e) =>
                onChange({
                  ...menu,
                  formules: menu.formules.map((x, n) =>
                    n === i ? { ...x, prix: e.target.value } : x,
                  ),
                })
              }
              className={CHAMP}
            />
            <input
              value={f.detail}
              placeholder="(entrée + plat ou plat + dessert)"
              onChange={(e) =>
                onChange({
                  ...menu,
                  formules: menu.formules.map((x, n) =>
                    n === i ? { ...x, detail: e.target.value } : x,
                  ),
                })
              }
              className={CHAMP}
            />
            <button
              type="button"
              aria-label={`Supprimer la formule ${i + 1}`}
              onClick={() =>
                onChange({ ...menu, formules: menu.formules.filter((_, n) => n !== i) })
              }
              className="cursor-pointer px-3 text-muted hover:text-[#a33]"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange({ ...menu, formules: [...menu.formules, { prix: "", detail: "" }] })}
          className="mt-3 cursor-pointer text-sm text-gold underline underline-offset-4"
        >
          + Ajouter une formule
        </button>
      </fieldset>

      <fieldset className="border border-black/10 p-5">
        <legend className="px-2 text-sm font-semibold text-ink">Tarifs à la carte</legend>

        <label className={ETIQUETTE}>Intitulé</label>
        <input
          value={menu.tarifsTitre}
          onChange={(e) => onChange({ ...menu, tarifsTitre: e.target.value })}
          className={`mt-1 ${CHAMP}`}
        />

        <div className="mt-3 space-y-2">
          {menu.tarifs.map((t, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={t}
                placeholder="Entrées : 12 €"
                onChange={(e) =>
                  onChange({
                    ...menu,
                    tarifs: menu.tarifs.map((x, n) => (n === i ? e.target.value : x)),
                  })
                }
                className={CHAMP}
              />
              <button
                type="button"
                aria-label={`Supprimer la ligne ${i + 1}`}
                onClick={() => onChange({ ...menu, tarifs: menu.tarifs.filter((_, n) => n !== i) })}
                className="shrink-0 cursor-pointer px-3 text-muted hover:text-[#a33]"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onChange({ ...menu, tarifs: [...menu.tarifs, ""] })}
          className="mt-3 cursor-pointer text-sm text-gold underline underline-offset-4"
        >
          + Ajouter une ligne
        </button>
      </fieldset>

      <fieldset className="border border-black/10 p-5">
        <legend className="px-2 text-sm font-semibold text-ink">Menu enfant</legend>
        <div className="grid gap-3 sm:grid-cols-3">
          <input
            value={menu.enfant.titre}
            placeholder="Menu Moussaillon"
            onChange={(e) => onChange({ ...menu, enfant: { ...menu.enfant, titre: e.target.value } })}
            className={CHAMP}
          />
          <input
            value={menu.enfant.prix}
            placeholder="12 €"
            onChange={(e) => onChange({ ...menu, enfant: { ...menu.enfant, prix: e.target.value } })}
            className={CHAMP}
          />
          <input
            value={menu.enfant.detail}
            placeholder="Plat + dessert + boisson"
            onChange={(e) =>
              onChange({ ...menu, enfant: { ...menu.enfant, detail: e.target.value } })
            }
            className={CHAMP}
          />
        </div>
      </fieldset>
    </div>
  );
}
