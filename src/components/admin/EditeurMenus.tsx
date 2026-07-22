"use client";

import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import type { MenuJour, MenuSemaine } from "@/lib/menus";
import {
  annulerProgrammation,
  enregistrerBrouillon,
  lireEtat,
  publierBrouillon,
  type Cle,
  type Etat,
  type Langue,
} from "@/lib/brouillon-menus";
import { traduire } from "@/app/[locale]/adminpclickzou/actions";
import Connexion from "./Connexion";
import { ChampsJour, ChampsSemaine } from "./ChampsMenu";
import CartesMenus from "@/components/restaurant/CartesMenus";

const LANGUES: { code: Langue; nom: string; ou: string }[] = [
  { code: "fr", nom: "Français", ou: "ou" },
  { code: "en", nom: "English", ou: "or" },
  { code: "es", nom: "Español", ou: "o" },
];

const CLES: Cle[] = ["semaine", "jour"];

const dateLisible = (iso: string) =>
  new Date(iso).toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" });

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
 * On travaille sur un brouillon : traduire, corriger, enregistrer autant qu'on
 * veut sans que rien ne change sur le site. « Publier » fait basculer ce
 * brouillon en ligne, tout de suite ou a la date choisie.
 *
 * Le français fait foi : c'est lui qu'on saisit, et c'est de lui que partent
 * les traductions. Les versions anglaise et espagnole restent modifiables —
 * une traduction automatique se trompe sur un nom de plat.
 */
export default function EditeurMenus() {
  const [supabase] = useState(() => createClient());
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [etat, setEtat] = useState<Etat | null>(null);
  const [langue, setLangue] = useState<Langue>("fr");
  const [message, setMessage] = useState<{ ok: boolean; texte: string } | null>(null);
  const [enCours, setEnCours] = useState<string | null>(null);
  const [apercu, setApercu] = useState(false);
  const [quand, setQuand] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, [supabase]);

  const charger = useCallback(async () => {
    const r = await lireEtat(supabase);
    if ("erreur" in r) {
      setMessage({ ok: false, texte: r.erreur });
      return;
    }
    setEtat(r);
  }, [supabase]);

  useEffect(() => {
    if (session) charger();
  }, [session, charger]);

  if (session === undefined) return null;
  if (!session) return <Connexion supabase={supabase} />;

  const majMenu = (cle: Cle, valeur: unknown) =>
    setEtat((e) =>
      e ? { ...e, brouillon: { ...e.brouillon, [cle]: { ...e.brouillon[cle], [langue]: valeur } } } : e,
    );

  /** Version affichée : la langue choisie, ou le français si rien n'existe encore. */
  const valeur = (cle: Cle) =>
    (etat?.brouillon[cle]?.[langue] ?? etat?.brouillon[cle]?.fr) as MenuSemaine | MenuJour;

  const enregistrer = async (quoi: Langue[], annonce: string, source = etat) => {
    if (!source) return;
    setEnCours("enregistrement");
    setMessage(null);

    const erreur = await enregistrerBrouillon(supabase, source.brouillon, quoi, session.user.id);
    setEnCours(null);
    setMessage(erreur ? { ok: false, texte: erreur } : { ok: true, texte: annonce });
  };

  const traduireTout = async () => {
    if (!etat) return;
    setEnCours("traduction");
    setMessage(null);

    // Les deux menus partent ensemble : quatre traductions enchainees, c'etait
    // une demi-minute d'attente devant un formulaire fige.
    const [semaine, jour] = await Promise.all([
      traduire(etat.brouillon.semaine.fr),
      traduire(etat.brouillon.jour.fr),
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

    const apres: Etat = {
      ...etat,
      brouillon: {
        semaine: { ...etat.brouillon.semaine, en: semaine.en, es: semaine.es },
        jour: { ...etat.brouillon.jour, en: jour.en, es: jour.es },
      },
    };
    setEtat(apres);
    setLangue("en");

    // Enregistre dans le brouillon, donc invisible du public : dix secondes
    // d'attente perdues par un rechargement, ce serait dommage.
    await enregistrer(
      ["fr", "en", "es"],
      "Traductions enregistrées dans le brouillon. Relisez-les avant de publier.",
      apres,
    );
  };

  const publier = async (immediat: boolean) => {
    if (!etat) return;

    const date = immediat ? new Date() : new Date(quand);
    if (!immediat && (!quand || Number.isNaN(date.getTime()))) {
      setMessage({ ok: false, texte: "Choisissez une date et une heure de publication." });
      return;
    }
    if (!immediat && date.getTime() <= Date.now()) {
      setMessage({ ok: false, texte: "La date de publication doit être dans le futur." });
      return;
    }

    setEnCours("publication");
    setMessage(null);

    const erreur = await publierBrouillon(supabase, etat.brouillon, date, session.user.id);
    if (erreur) {
      setMessage({ ok: false, texte: erreur });
      setEnCours(null);
      return;
    }

    await charger();
    setQuand("");
    setEnCours(null);
    setMessage({
      ok: true,
      texte: immediat
        ? "Menus publiés. Ils sont en ligne."
        : `Publication programmée pour le ${dateLisible(date.toISOString())}.`,
    });
  };

  const annuler = async () => {
    if (!etat?.programme?.publie_le) return;
    setEnCours("annulation");
    const erreur = await annulerProgrammation(supabase, etat.programme.publie_le);
    await charger();
    setEnCours(null);
    setMessage(
      erreur ? { ok: false, texte: erreur } : { ok: true, texte: "Publication programmée annulée." },
    );
  };

  const occupe = enCours !== null;

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
          {etat?.enLigne.semaine?.publie_le && (
            <p className="mt-2 text-sm text-muted">
              En ligne depuis le {dateLisible(etat.enLigne.semaine.publie_le)}
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

      <p className="mt-6 border-l-2 border-gold bg-cream px-4 py-3 text-sm text-body">
        Vous travaillez sur un <strong>brouillon</strong>. Rien de ce que vous saisissez ici n’est
        visible par vos clients tant que vous n’avez pas publié.
      </p>

      {etat?.programme?.publie_le && (
        <p className="mt-3 flex flex-wrap items-center gap-3 border-l-2 border-[#a33] bg-[#fdeaea] px-4 py-3 text-sm text-ink">
          Une version paraîtra le {dateLisible(etat.programme.publie_le)}.
          <button
            type="button"
            onClick={annuler}
            disabled={occupe}
            className="cursor-pointer underline underline-offset-4 hover:text-[#a33] disabled:opacity-50"
          >
            Annuler cette programmation
          </button>
        </p>
      )}

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

        <span className="ml-auto flex flex-wrap gap-3">
          <button
            type="button"
            onClick={traduireTout}
            disabled={occupe}
            className="flex cursor-pointer items-center gap-2 rounded-full border border-gold px-6 py-2 text-sm text-gold transition-colors hover:bg-gold hover:text-white disabled:opacity-50"
          >
            {enCours === "traduction" && <Rouet />}
            {enCours === "traduction" ? "Traduction en cours…" : "Traduire depuis le français"}
          </button>

          <button
            type="button"
            onClick={() =>
              enregistrer(
                langue === "fr" ? ["fr"] : [langue],
                `Version ${LANGUES.find((l) => l.code === langue)?.nom} enregistrée dans le brouillon.`,
              )
            }
            disabled={occupe}
            className="flex cursor-pointer items-center gap-2 rounded-full border border-black/25 px-6 py-2 text-sm text-ink transition-colors hover:border-gold hover:text-gold disabled:opacity-50"
          >
            {enCours === "enregistrement" && <Rouet />}
            Enregistrer cette langue
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
          className={`mt-4 px-4 py-3 ${message.ok ? "bg-cream text-ink" : "bg-[#fdeaea] text-[#a33]"}`}
        >
          {message.texte}
        </p>
      )}

      <button
        type="button"
        onClick={() => setApercu((a) => !a)}
        className="mt-6 cursor-pointer text-sm text-gold underline underline-offset-4"
      >
        {apercu ? "Masquer l’aperçu" : "Voir l’aperçu des trois langues"}
      </button>

      {/* Apercu du rendu reel : le meme composant que la page Restaurant, pour
          qu'il ne puisse pas deriver de ce que verront les clients. */}
      {apercu && etat && (
        <div className="mt-8 space-y-12 border-y border-black/10 bg-cream/60 py-10">
          {LANGUES.map((l) => {
            const traduit = l.code === "fr" || etat.brouillon.semaine[l.code];
            return (
              <section key={l.code}>
                <h3 className="px-6 text-sm tracking-wide text-muted uppercase">
                  {l.nom}
                  {!traduit && " — pas encore traduit, le français s’affichera"}
                </h3>
                <div className="mt-4 px-6">
                  <CartesMenus
                    semaine={
                      (etat.brouillon.semaine[l.code] ?? etat.brouillon.semaine.fr) as MenuSemaine
                    }
                    jour={(etat.brouillon.jour[l.code] ?? etat.brouillon.jour.fr) as MenuJour}
                    ou={l.ou}
                  />
                </div>
              </section>
            );
          })}
        </div>
      )}

      {!etat ? (
        <p className="mt-12 text-muted">Chargement…</p>
      ) : (
        <>
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

          {/* Publication : la seule action qui rend le travail visible. */}
          <section className="mt-16 border-t border-black/10 pt-10">
            <h2 className="titre-moyen text-ink">Publier</h2>
            <p className="mt-3 text-body">
              Les trois langues partent ensemble. Pensez à enregistrer vos corrections avant.
            </p>

            <div className="mt-8 flex flex-wrap items-end gap-4">
              <button
                type="button"
                onClick={() => publier(true)}
                disabled={occupe}
                className="flex cursor-pointer items-center gap-2 rounded-full bg-gold px-10 py-3 font-medium text-white transition-colors hover:bg-gold-dark disabled:opacity-50"
              >
                {enCours === "publication" && <Rouet />}
                Publier maintenant
              </button>

              <span className="text-muted">ou</span>

              <div>
                <label className="block text-sm text-muted" htmlFor="quand">
                  Programmer pour
                </label>
                <input
                  id="quand"
                  type="datetime-local"
                  value={quand}
                  onChange={(e) => setQuand(e.target.value)}
                  className="mt-1 border border-black/20 bg-white px-3 py-2.5 text-body outline-none focus:border-gold"
                />
              </div>

              <button
                type="button"
                onClick={() => publier(false)}
                disabled={occupe || !quand}
                className="cursor-pointer rounded-full border border-gold px-8 py-3 font-medium text-gold transition-colors hover:bg-gold hover:text-white disabled:opacity-50"
              >
                Programmer
              </button>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
