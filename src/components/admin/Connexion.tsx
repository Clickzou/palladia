"use client";

import { useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";

const CHAMP =
  "w-full border border-black/20 bg-white px-4 py-3 text-body outline-none transition-colors focus:border-gold";

/** Écran de connexion de l'espace d'administration. */
export default function Connexion({ supabase }: { supabase: SupabaseClient }) {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState<string | null>(null);
  const [enCours, setEnCours] = useState(false);

  const envoyer = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnCours(true);
    setErreur(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password: motDePasse });

    // Message volontairement vague : distinguer « compte inconnu » de « mot de
    // passe faux » renseignerait qui possede un compte.
    if (error) setErreur("Identifiants incorrects.");
    setEnCours(false);
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-20">
      <h1 className="section-title text-center">Administration</h1>
      <div className="mx-auto mt-6 h-px w-20 bg-gold" />

      <form onSubmit={envoyer} className="mt-12 space-y-5">
        <div>
          <label className="block text-sm text-ink" htmlFor="email">
            Adresse e-mail
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`mt-2 ${CHAMP}`}
          />
        </div>

        <div>
          <label className="block text-sm text-ink" htmlFor="mdp">
            Mot de passe
          </label>
          <input
            id="mdp"
            type="password"
            required
            autoComplete="current-password"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            className={`mt-2 ${CHAMP}`}
          />
        </div>

        {erreur && (
          <p role="alert" className="text-center text-[#a33]">
            {erreur}
          </p>
        )}

        <button
          type="submit"
          disabled={enCours}
          className="w-full cursor-pointer rounded-full bg-gold px-10 py-3.5 font-medium text-white transition-colors hover:bg-gold-dark disabled:opacity-60"
        >
          {enCours ? "Connexion…" : "Se connecter"}
        </button>
      </form>
    </div>
  );
}
