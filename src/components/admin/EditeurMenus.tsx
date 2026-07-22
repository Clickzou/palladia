"use client";

import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import type { MenuJour, MenuSemaine } from "@/lib/menus";
import { traduire } from "@/app/[locale]/adminpclickzou/actions";
import Connexion from "./Connexion";
import { ChampsJour, ChampsSemaine } from "./ChampsMenu";

type Ligne = { cle: "semaine" | "jour"; fr: unknown; en: unknown; es: unknown; modifie_le: string };
type Langue = "fr" | "en" | "es";

const LANGUES: { code: Langue; nom: string }[] = [
  { code: "fr", nom: "Français" },
  { code: "en", nom: "English" },
  { code: "es", nom: "Español" },
];

/** Indicateur d'attente : la traduction prend une dizaine de secondes. */
function Rouet() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 animate-spin" aria-hidden>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Tableau de bord des menus du restaurant.
 *
 * Le français fait foi : c'est lui qu'on saisit, et c'est de lui que partent
 * les traductions. Les versions anglaise et espagnole restent modifiables —
 * une traduction automatique se trompe sur un nom de plat, et on doit pouvoir
 * la corriger sans attendre.
 */
export default function EditeurMenus() {
  const [supabase] = useState(() => createClient());
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [lignes, setLignes] = useState<Record<string, Ligne> | null>(null);
  const [langue, setLangue] = useState<Langue>("fr");
  const [message, setMessage] = useState<{ ok: boolean; texte: string } | null>(null);
  const [enCours, setEnCours] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, [supabase]);

  const charger = useCallback(async () => {
    const { data, error } = await supabase.from("menus").select("cle, fr, en, es, modifie_le");
    if (error) {
      setMessage({ ok: false, texte: `Lecture impossible : ${error.message}` });
      return;
    }
    setLignes(Object.fromEntries((data as Ligne[]).map((l) => [l.cle, l])));
  }, [supabase]);

  useEffect(() => {
    if (session) charger();
  }, [session, charger]);

  if (session === undefined) return null;
  if (!session) return <Connexion supabase={supabase} />;

  const majMenu = (cle: "semaine" | "jour", valeur: unknown) =>
    setLignes((l) => (l ? { ...l, [cle]: { ...l[cle], [langue]: valeur } } : l));

  /** Version affichée : la langue choisie, ou le français si rien n'existe encore. */
  const valeur = (cle: "semaine" | "jour") =>
    (lignes?.[cle]?.[langue] ?? lignes?.[cle]?.fr) as MenuSemaine | MenuJour | undefined;

  const enregistrer = async () => {
    if (!lignes) return;
    setEnCours("enregistrement");
    setMessage(null);

    for (const cle of ["semaine", "jour"] as const) {
      const l = lignes[cle];
      const { error } = await supabase
        .from("menus")
        .update({ fr: l.fr, en: l.en, es: l.es, modifie_par: session.user.id })
        .eq("cle", cle);

      if (error) {
        setMessage({ ok: false, texte: `Enregistrement refusé : ${error.message}` });
        setEnCours(null);
        return;
      }
    }

    await charger();
    setEnCours(null);
    setMessage({ ok: true, texte: "Menus publiés. Ils sont en ligne." });
  };

  const traduireTout = async () => {
    if (!lignes) return;
    setEnCours("traduction");
    setMessage(null);

    // Les deux menus partent ensemble : quatre traductions enchainees, c'etait
    // une demi-minute d'attente devant un formulaire fige.
    const [semaine, jour] = await Promise.all([
      traduire(lignes.semaine.fr),
      traduire(lignes.jour.fr),
    ]);

    const rate = semaine.erreur ?? jour.erreur;
    if (rate) {
      setMessage({ ok: false, texte: rate });
      setEnCours(null);
      return;
    }

    // Une reponse sans erreur mais sans traduction laissait croire au succes,
    // et le formulaire retombait sur le français sans rien dire.
    if (!semaine.en || !semaine.es || !jour.en || !jour.es) {
      setMessage({
        ok: false,
        texte: "La traduction n’a rien renvoyé. Réessayez ; si cela persiste, prévenez Clickzou.",
      });
      setEnCours(null);
      return;
    }

    setLignes((l) =>
      l
        ? {
            ...l,
            semaine: { ...l.semaine, en: semaine.en, es: semaine.es },
            jour: { ...l.jour, en: jour.en, es: jour.es },
          }
        : l,
    );

    setEnCours(null);
    setLangue("en");
    setMessage({
      ok: true,
      texte: "Traductions proposées. Relisez-les, corrigez si besoin, puis publiez.",
    });
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-14">
      {/* Fil d'ariane de l'espace d'administration. Le chevron « » » est celui
          qu'emploie le fil d'ariane du site public. */}
      <p className="text-sm tracking-wide text-muted uppercase">
        Tableau de bord Clickzou <span aria-hidden>»</span> Hôtel Palladia
      </p>

      <header className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="section-title">Menus du restaurant</h1>
          {lignes?.semaine && (
            <p className="mt-2 text-sm text-muted">
              Dernière modification le{" "}
              {new Date(lignes.semaine.modifie_le).toLocaleString("fr-FR", {
                dateStyle: "long",
                timeStyle: "short",
              })}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={() => supabase.auth.signOut()}
          className="cursor-pointer text-sm text-muted underline underline-offset-4 hover:text-gold"
        >
          Se déconnecter
        </button>
      </header>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        {LANGUES.map((l) => (
          <button
            key={l.code}
            type="button"
            onClick={() => setLangue(l.code)}
            className={`cursor-pointer rounded-full px-5 py-2 text-sm transition-colors ${
              langue === l.code
                ? "bg-gold text-white"
                : "border border-black/20 text-ink hover:border-gold"
            }`}
          >
            {l.nom}
          </button>
        ))}

        <span className="ml-auto flex gap-3">
          <button
            type="button"
            onClick={traduireTout}
            disabled={enCours !== null}
            className="flex cursor-pointer items-center gap-2 rounded-full border border-gold px-6 py-2 text-sm text-gold transition-colors hover:bg-gold hover:text-white disabled:opacity-50"
          >
            {enCours === "traduction" && <Rouet />}
            {enCours === "traduction" ? "Traduction en cours…" : "Traduire depuis le français"}
          </button>
          <button
            type="button"
            onClick={enregistrer}
            disabled={enCours !== null}
            className="flex cursor-pointer items-center gap-2 rounded-full bg-gold px-8 py-2 text-sm font-medium text-white transition-colors hover:bg-gold-dark disabled:opacity-50"
          >
            {enCours === "enregistrement" && <Rouet />}
            {enCours === "enregistrement" ? "Publication…" : "Publier"}
          </button>
        </span>
      </div>

      {langue !== "fr" && (
        <p className="mt-4 border-l-2 border-gold bg-cream px-4 py-3 text-sm text-body">
          Version {LANGUES.find((l) => l.code === langue)?.nom}. Corrigez librement : vos
          modifications remplacent la traduction automatique et sont conservées.
        </p>
      )}

      {message && (
        <p
          role={message.ok ? "status" : "alert"}
          className={`mt-4 px-4 py-3 ${
            message.ok ? "bg-cream text-ink" : "bg-[#fdeaea] text-[#a33]"
          }`}
        >
          {message.texte}
        </p>
      )}

      {!lignes ? (
        <p className="mt-12 text-muted">Chargement…</p>
      ) : (
        <div className="mt-12 space-y-16">
          <section>
            <h2 className="titre-moyen text-ink">Menu de la semaine</h2>
            <div className="mt-6">
              <ChampsSemaine
                menu={valeur("semaine") as MenuSemaine}
                onChange={(m) => majMenu("semaine", m)}
              />
            </div>
          </section>

          <section>
            <h2 className="titre-moyen text-ink">Menu du jour</h2>
            <div className="mt-6">
              <ChampsJour menu={valeur("jour") as MenuJour} onChange={(m) => majMenu("jour", m)} />
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
