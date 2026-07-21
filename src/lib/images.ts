import dimensions from "@/data/dimensions-images.json";

/**
 * Proportions d'origine d'un visuel servi depuis public/images.
 *
 * Le site WordPress affiche ses images a leur taille naturelle : reproduire
 * cela suppose de connaitre leurs dimensions, que next/image ne peut pas
 * deduire seul quand le chemin vient de la base. Le manifeste est regenere
 * par `node scripts/dimensions-images.mjs`.
 */
export function dimensionsImage(src: string): [number, number] | null {
  const d = (dimensions as Record<string, number[]>)[src];
  return d?.length === 2 ? [d[0], d[1]] : null;
}

/** Rapport largeur/hauteur au format CSS `aspect-ratio`, ou `defaut`. */
export function ratioImage(src: string, defaut = "5 / 3"): string {
  const d = dimensionsImage(src);
  return d ? `${d[0]} / ${d[1]}` : defaut;
}
