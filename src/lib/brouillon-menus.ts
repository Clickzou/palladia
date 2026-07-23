"use client";

import type { SupabaseClient } from "@supabase/supabase-js";

/** `snack` est la carte du room service : meme mecanique, autre page. */
export type Cle = "semaine" | "jour" | "snack";
export type Langue = "fr" | "en" | "es";

export type Version = {
  id: string;
  cle: Cle;
  fr: unknown;
  en: unknown;
  es: unknown;
  publie_le: string | null;
  modifie_le: string;
};

export type Etat = {
  /** Ce qu'on est en train de preparer, jamais visible du public. */
  brouillon: Record<Cle, Version>;
  /** Ce que le site affiche en ce moment. */
  enLigne: Record<Cle, Version | undefined>;
  /** Version datee du futur, si l'hotel en a programme une. */
  programme: Version | undefined;
};

const CLES: Cle[] = ["semaine", "jour", "snack"];

/**
 * Etat complet des menus pour le tableau de bord.
 *
 * S'il n'existe pas de brouillon, on en cree un a partir de ce qui est en
 * ligne : l'hotel repart toujours de la carte affichee, jamais d'un formulaire
 * vide.
 */
export async function lireEtat(supabase: SupabaseClient): Promise<Etat | { erreur: string }> {
  const { data, error } = await supabase
    .from("menus_versions")
    .select("id, cle, fr, en, es, publie_le, modifie_le")
    .order("publie_le", { ascending: false, nullsFirst: true });

  if (error) return { erreur: `Lecture impossible : ${error.message}` };

  const versions = (data ?? []) as Version[];
  const maintenant = Date.now();

  const enLigne = {} as Record<Cle, Version | undefined>;
  const brouillon = {} as Record<Cle, Version>;

  for (const cle of CLES) {
    const desCe = versions.filter((v) => v.cle === cle);
    enLigne[cle] = desCe.find((v) => v.publie_le && Date.parse(v.publie_le) <= maintenant);

    const existant = desCe.find((v) => v.publie_le === null);
    if (existant) {
      brouillon[cle] = existant;
      continue;
    }

    // Pas de brouillon : on repart de la carte en ligne.
    const source = enLigne[cle];
    // Une carte absente de la base signifie une migration non appliquee : le
    // dire, plutot que de laisser chercher une panne du tableau de bord.
    if (!source) {
      return {
        erreur: `Aucune carte « ${cle} » en base : la migration correspondante n’a pas été appliquée. Prévenez Clickzou.`,
      };
    }

    const { data: cree, error: erreurCreation } = await supabase
      .from("menus_versions")
      .insert({ cle, fr: source.fr, en: source.en, es: source.es, publie_le: null })
      .select("id, cle, fr, en, es, publie_le, modifie_le")
      .single();

    if (erreurCreation) return { erreur: `Brouillon impossible : ${erreurCreation.message}` };
    brouillon[cle] = cree as Version;
  }

  const programme = versions.find((v) => v.publie_le && Date.parse(v.publie_le) > maintenant);

  return { brouillon, enLigne, programme };
}

/** Ecrit le brouillon. `quoi` limite l'ecriture aux langues indiquees. */
export async function enregistrerBrouillon(
  supabase: SupabaseClient,
  brouillon: Record<Cle, Version>,
  quoi: Langue[],
  utilisateur: string,
): Promise<string | null> {
  for (const cle of CLES) {
    const v = brouillon[cle];
    const champs: Record<string, unknown> = { modifie_par: utilisateur };
    for (const langue of quoi) champs[langue] = v[langue];

    const { error } = await supabase.from("menus_versions").update(champs).eq("id", v.id);
    if (error) return `Enregistrement refusé : ${error.message}`;
  }
  return null;
}

/**
 * Met le brouillon en ligne, tout de suite ou a la date choisie.
 *
 * Le brouillon devient la version publiee : il n'y a plus de brouillon
 * ensuite, et la prochaine modification en recree un depuis la carte affichee.
 */
export async function publierBrouillon(
  supabase: SupabaseClient,
  brouillon: Record<Cle, Version>,
  quand: Date,
  utilisateur: string,
): Promise<string | null> {
  for (const cle of CLES) {
    const v = brouillon[cle];
    const { error } = await supabase
      .from("menus_versions")
      .update({
        fr: v.fr,
        en: v.en,
        es: v.es,
        publie_le: quand.toISOString(),
        modifie_par: utilisateur,
      })
      .eq("id", v.id);

    if (error) return `Publication refusée : ${error.message}`;
  }
  return null;
}

/** Annule une publication programmee en la ramenant a l'etat de brouillon. */
export async function annulerProgrammation(
  supabase: SupabaseClient,
  quand: string,
): Promise<string | null> {
  const { error } = await supabase.from("menus_versions").delete().eq("publie_le", quand);
  return error ? `Annulation refusée : ${error.message}` : null;
}
