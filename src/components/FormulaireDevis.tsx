"use client";

import { useActionState } from "react";
import { useLocale } from "next-intl";
import { envoyerDevis, type EtatDevis } from "@/app/[locale]/devis/actions";

const CHAMP =
  "w-full border border-black/20 bg-white px-4 py-3 text-body outline-none transition-colors focus:border-gold";
const LABEL = "block text-sm text-ink";

export default function FormulaireDevis({ type = "autre" }: { type?: string }) {
  const locale = useLocale();
  const [etat, action, enCours] = useActionState<EtatDevis, FormData>(envoyerDevis, null);

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
      <input type="hidden" name="type" value={type} />
      <input type="hidden" name="locale" value={locale} />

      {/* Piège à robots, invisible et ignoré des lecteurs d’écran */}
      <div aria-hidden className="absolute left-[-9999px]">
        <label>
          Ne pas remplir
          <input type="text" name="site_web" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className={LABEL} htmlFor="nom">Nom</label>
          <input id="nom" name="nom" required placeholder="Nom" className={`mt-2 ${CHAMP}`} />
        </div>
        <div>
          <label className={LABEL} htmlFor="prenom">Prénom</label>
          <input id="prenom" name="prenom" required placeholder="Prénom" className={`mt-2 ${CHAMP}`} />
        </div>

        <div>
          <label className={LABEL} htmlFor="telephone">Téléphone</label>
          <input id="telephone" name="telephone" type="tel" placeholder="Téléphone" className={`mt-2 ${CHAMP}`} />
        </div>
        <div>
          <label className={LABEL} htmlFor="email">E-mail</label>
          <input id="email" name="email" type="email" required placeholder="E-mail" className={`mt-2 ${CHAMP}`} />
        </div>

        <div>
          <label className={LABEL} htmlFor="entreprise">Entreprise</label>
          <input id="entreprise" name="entreprise" placeholder="Nom de votre entreprise" className={`mt-2 ${CHAMP}`} />
        </div>
        <div>
          <label className={LABEL} htmlFor="budget">Budget de l’événement</label>
          <input id="budget" name="budget" placeholder="Quel est votre budget approximatif ?" className={`mt-2 ${CHAMP}`} />
        </div>

        <div>
          <label className={LABEL} htmlFor="date_evenement">Date de l’événement</label>
          <input
            id="date_evenement"
            name="date_evenement"
            placeholder="Date souhaitée pour votre événement ?"
            className={`mt-2 ${CHAMP}`}
          />
        </div>
        <div>
          <label className={LABEL} htmlFor="date_flexible">Date flexible ?</label>
          <select id="date_flexible" name="date_flexible" defaultValue="Oui" className={`mt-2 ${CHAMP}`}>
            <option>Oui</option>
            <option>Non</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className={LABEL} htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows={6}
            placeholder="Veuillez indiquer des informations complémentaires si nécessaire"
            className={`mt-2 ${CHAMP}`}
          />
        </div>
      </div>

      {etat && !etat.ok && (
        <p role="alert" className="mt-6 text-[#8b3a3a]">
          {etat.message}
        </p>
      )}

      <button
        type="submit"
        disabled={enCours}
        className="mt-8 rounded-md bg-gold px-10 py-4 font-medium text-white transition-colors hover:bg-gold-dark disabled:opacity-60"
      >
        {enCours ? "Envoi en cours…" : "Envoyer"}
      </button>
    </form>
  );
}
