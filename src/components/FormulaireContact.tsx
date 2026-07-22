"use client";

import { useActionState } from "react";
import { useLocale } from "next-intl";
import { envoyerContact, type EtatContact } from "@/app/[locale]/contact/actions";

const CHAMP =
  "w-full border border-black/20 bg-white px-4 py-3 text-body outline-none transition-colors focus:border-gold";
const LABEL = "block text-sm text-ink";

/**
 * Libelles deja traduits, fournis par la page : ce composant s'execute cote
 * client et ne peut donc pas appeler `traduire` lui-meme.
 */
export type LibellesContact = {
  piege: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  message: string;
  messagePlaceholder: string;
  envoiEnCours: string;
  envoyer: string;
};

export default function FormulaireContact({ libelles: l }: { libelles: LibellesContact }) {
  const locale = useLocale();
  const [etat, action, enCours] = useActionState<EtatContact, FormData>(envoyerContact, null);

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
    <form action={action} className="mx-auto max-w-3xl">
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
            {l.nom}
          </label>
          <input id="nom" name="nom" required placeholder={l.nom} className={`mt-2 ${CHAMP}`} />
        </div>
        <div>
          <label className={LABEL} htmlFor="prenom">
            {l.prenom}
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
            {l.telephone}
          </label>
          <input
            id="telephone"
            name="telephone"
            type="tel"
            placeholder={l.telephone}
            className={`mt-2 ${CHAMP}`}
          />
        </div>
        <div>
          <label className={LABEL} htmlFor="email">
            {l.email}
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

        <div className="md:col-span-2">
          <label className={LABEL} htmlFor="message">
            {l.message}
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={8}
            placeholder={l.messagePlaceholder}
            className={`mt-2 ${CHAMP}`}
          />
        </div>
      </div>

      {etat && !etat.ok && (
        <p role="alert" className="mt-6 text-center text-[#a33]">
          {etat.message}
        </p>
      )}

      <button
        type="submit"
        disabled={enCours}
        className="mt-8 cursor-pointer rounded-full bg-gold px-12 py-4 font-medium text-white transition-colors hover:bg-gold-dark disabled:opacity-60"
      >
        {enCours ? l.envoiEnCours : l.envoyer}
      </button>
    </form>
  );
}
