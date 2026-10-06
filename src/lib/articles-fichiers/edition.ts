import { type ArticleFichier, estEditable } from "./index";
import { estTriplet } from "./valider.mjs";

/**
 * Textes modifiables d'un article fichier, pour l'éditeur de l'espace client
 * Clickzou (onglet « Articles programmés »). Contrat de Clickzou :
 * `src/lib/espace-client/edition-article.ts` du dépôt clickzou-v2.
 *
 * Le client relit la version FRANÇAISE. Clickzou écrit ses modifications dans
 * `contenu/corrections-client.json` (commit sur main) ; le chargeur les
 * applique. Les versions anglaise et espagnole ne suivent pas seules : la
 * correction doit ensuite être reportée dans le fichier de l'article et
 * retraduite (le contrôle de build le rappelle tant que l'entrée existe).
 */
export type ChampEditable = { chemin: string; section: string; libelle: string; texte: string };

const LIBELLES: Record<string, string> = {
  paragraphes: "Paragraphe",
  apres: "Paragraphe",
  liste: "Liste — élément",
  apres_liste: "Liste — élément",
  items: "Liste — élément",
  intro: "Texte",
  conclusion: "Conclusion",
  note: "Note",
};

export function champsEditables(a: ArticleFichier): ChampEditable[] {
  const champs: ChampEditable[] = [];
  const ajouter = (chemin: string, section: string, libelle: string, v: unknown) => {
    if (estTriplet(v) && (v as { fr: string }).fr.trim() && estEditable(`${chemin}.fr`)) {
      champs.push({ chemin: `${chemin}.fr`, section, libelle, texte: (v as { fr: string }).fr });
    }
  };

  ajouter("chapo", "Introduction", "Chapô", a.chapo);
  (a.aRetenir ?? []).forEach((p, i) => ajouter(`aRetenir.${i}`, "À retenir", `Point ${i + 1}`, p));

  // Les titres ne sont pas modifiables : ils servent d'en-tête de section.
  let section = "Début de l'article";
  let n = 0;
  a.blocs.forEach((b, bi) => {
    const c = b.contenu as Record<string, unknown>;
    if (estTriplet(c.titre)) {
      n += 1;
      section = `Section ${n} — ${(c.titre as { fr: string }).fr}`;
    }
    const faq = c.faq === true;
    const parcourir = (chemin: string, v: unknown, cle: string, sousSection: string) => {
      if (estTriplet(v)) {
        const base = LIBELLES[cle];
        if (!base) return;
        const index = /\.(\d+)$/.exec(chemin)?.[1];
        const libelle = faq && cle === "intro" ? "Réponse" : index !== undefined && base.endsWith("élément") ? `${base} ${Number(index) + 1}` : base;
        return ajouter(chemin, sousSection, libelle, v);
      }
      if (Array.isArray(v)) return v.forEach((x, i) => parcourir(`${chemin}.${i}`, x, cle, sousSection));
      if (v && typeof v === "object") {
        const o = v as Record<string, unknown>;
        // Sous-section ou carte titrée : son titre (verrouillé) nomme le groupe.
        const sous = estTriplet(o.titre) ? `${section} › ${(o.titre as { fr: string }).fr}` : sousSection;
        for (const [k, x] of Object.entries(o)) parcourir(`${chemin}.${k}`, x, k, sous);
      }
    };
    for (const [k, x] of Object.entries(c)) parcourir(`blocs.${bi}.contenu.${k}`, x, k, section);
  });
  return champs;
}
