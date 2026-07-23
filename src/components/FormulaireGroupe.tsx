"use client";

import { useActionState, useState } from "react";
import { useLocale } from "next-intl";
import {
  envoyerReservationGroupe,
  type EtatGroupe,
} from "@/app/[locale]/reservation-groupe/actions";

const CHAMP =
  "w-full border border-black/20 bg-white px-4 py-3 text-body outline-none transition-colors focus:border-gold";
const LABEL = "block text-sm text-ink";

/**
 * Libelles deja traduits, fournis par la page : ce composant s'execute cote
 * client et ne peut donc pas appeler `traduire` lui-meme.
 */
export type LibellesGroupe = {
  piege: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  societe: string;
  societePlaceholder: string;
  nbPersonnes: string;
  arrivee: string;
  depart: string;
  message: string;
  messagePlaceholder: string;
  facultatif: string;
  obligatoires: string;
  envoiEnCours: string;
  envoyer: string;
};

export default function FormulaireGroupe({ libelles: l }: { libelles: LibellesGroupe }) {
  const locale = useLocale();
  const [etat, action, enCours] = useActionState<EtatGroupe, FormData>(
    envoyerReservationGroupe,
    null,
  );

  /**
   * L'arrivee borne le depart : le navigateur refuse alors une date anterieure,
   * sans attendre l'envoi pour le dire.
   */
  const [arrivee, setArrivee] = useState("");

  if (etat?.ok) {
    return (
      <p
        role="status"
        className="mx-auto max-w-2xl border border-gold/50 bg-cream px-8 py-10 text-center text-lg text-ink"
      >
        {etat.message}
      </p>
    );
  }

  return (
    <form action={action} className="mx-auto max-w-5xl">
      <input type="hidden" name="locale" value={locale} />

      {/* Piège à robots, invisible et ignoré des lecteurs d’écran */}
      <div aria-hidden className="absolute left-[-9999px]">
        <label>
          {l.piege}
          <input type="text" name="site_web" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className={LABEL} htmlFor="nom">
            {l.nom} *
          </label>
          <input id="nom" name="nom" required placeholder={l.nom} className={`mt-2 ${CHAMP}`} />
        </div>
        <div>
          <label className={LABEL} htmlFor="prenom">
            {l.prenom} *
          </label>
          <input
            id="prenom"
            name="prenom"
            required
            placeholder={l.prenom}
            className={`mt-2 ${CHAMP}`}
          />
        </div>

        <div>
          <label className={LABEL} htmlFor="telephone">
            {l.telephone} *
          </label>
          <input
            id="telephone"
            name="telephone"
            type="tel"
            required
            placeholder={l.telephone}
            className={`mt-2 ${CHAMP}`}
          />
        </div>
        <div>
          <label className={LABEL} htmlFor="email">
            {l.email} *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder={l.email}
            className={`mt-2 ${CHAMP}`}
          />
        </div>

        <div>
          <label className={LABEL} htmlFor="nb_personnes">
            {l.nbPersonnes} *
          </label>
          <input
            id="nb_personnes"
            name="nb_personnes"
            type="number"
            min={1}
            required
            inputMode="numeric"
            className={`mt-2 ${CHAMP}`}
          />
        </div>
        <div>
          <label className={LABEL} htmlFor="entreprise">
            {l.societe}{" "}
            <span className="text-muted">({l.facultatif})</span>
          </label>
          <input
            id="entreprise"
            name="entreprise"
            placeholder={l.societePlaceholder}
            className={`mt-2 ${CHAMP}`}
          />
        </div>

        <div>
          <label className={LABEL} htmlFor="date_arrivee">
            {l.arrivee} *
          </label>
          <input
            id="date_arrivee"
            name="date_arrivee"
            type="date"
            required
            value={arrivee}
            onChange={(e) => setArrivee(e.target.value)}
            className={`mt-2 ${CHAMP}`}
          />
        </div>
        <div>
          <label className={LABEL} htmlFor="date_depart">
            {l.depart} *
          </label>
          <input
            id="date_depart"
            name="date_depart"
            type="date"
            required
            min={arrivee || undefined}
            className={`mt-2 ${CHAMP}`}
          />
        </div>

        <div className="md:col-span-2">
          <label className={LABEL} htmlFor="message">
            {l.message} <span className="text-muted">({l.facultatif})</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            placeholder={l.messagePlaceholder}
            className={`mt-2 ${CHAMP}`}
          />
        </div>
      </div>

      <p className="mt-6 text-sm text-muted">* {l.obligatoires}</p>

      {etat && !etat.ok && (
        <p role="alert" className="mt-4 text-[#8b3a3a]">
          {etat.message}
        </p>
      )}

      <button
        type="submit"
        disabled={enCours}
        className="mt-6 rounded-md bg-gold px-10 py-4 font-medium text-white transition-colors hover:bg-gold-dark disabled:opacity-60"
      >
        {enCours ? l.envoiEnCours : l.envoyer}
      </button>
    </form>
  );
}
