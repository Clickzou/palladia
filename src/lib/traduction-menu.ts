import type { Menus } from "./menus";

/**
 * Traduction automatique des menus, par l'API Claude.
 *
 * Un service de traduction generique rend « cochon grille » par « grilled
 * pig » : on donne donc le contexte — carte d'un restaurant gastronomique —
 * et la consigne de garder les termes culinaires français consacres.
 *
 * Le resultat n'est qu'une proposition : l'hotel le corrige dans le formulaire
 * avant publication.
 */
const MODELE = "claude-sonnet-5";

const CONSIGNE = `Tu traduis la carte d'un restaurant gastronomique français, à Toulouse.

Règles :
- Rends une cuisine appétissante, pas une traduction littérale. « Cochon grillé »
  se dit « grilled pork », jamais « grilled pig ».
- Garde en français les termes culinaires consacrés que la clientèle
  internationale reconnaît : sabayon, tartare, pak-choï, kalamansi, shimeji.
- Conserve les prix, les symboles € et la ponctuation tels quels.
- Conserve les retours à la ligne exactement où ils sont : ils commandent la
  mise en page.
- Conserve le balisage **gras** s'il y en a.
- Ne rends que du JSON, de structure identique à l'entrée. Aucun commentaire.`;

/** Anglais britannique et castillan, comme le reste du site. */
const LANGUES = { en: "anglais britannique", es: "espagnol d'Espagne (castillan)" };

export type ResultatTraduction = { en?: Menus[keyof Menus]; es?: Menus[keyof Menus]; erreur?: string };

export async function traduireMenu(
  menu: unknown,
  langues: (keyof typeof LANGUES)[] = ["en", "es"],
): Promise<ResultatTraduction> {
  const cle = process.env.ANTHROPIC_API_KEY;
  if (!cle) return { erreur: "La clé de traduction n’est pas configurée (ANTHROPIC_API_KEY)." };

  const resultat: ResultatTraduction = {};

  for (const langue of langues) {
    try {
      const rep = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": cle,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: MODELE,
          max_tokens: 4000,
          system: CONSIGNE,
          messages: [
            {
              role: "user",
              content: `Traduis ce menu en ${LANGUES[langue]}.\n\n${JSON.stringify(menu, null, 2)}`,
            },
          ],
        }),
      });

      if (!rep.ok) {
        return { ...resultat, erreur: `Traduction refusée (${rep.status}) : ${await rep.text()}` };
      }

      const { content } = await rep.json();
      const texte: string = content?.[0]?.text ?? "";
      // Le modele encadre parfois sa reponse d'un bloc de code.
      const json = texte.replace(/^```(?:json)?\s*|\s*```$/g, "").trim();
      resultat[langue] = JSON.parse(json);
    } catch (e) {
      return {
        ...resultat,
        erreur: `Traduction impossible : ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }

  return resultat;
}
