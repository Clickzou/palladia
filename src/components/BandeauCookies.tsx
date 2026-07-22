"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import {
  TOUT_ACCEPTER,
  TOUT_REFUSER,
  enregistrerConsentement,
  lireConsentement,
  type Categories,
} from "@/lib/consentement";

/** Libelles du bandeau, traduits cote serveur : ce composant est client. */
export type LibellesCookies = {
  titre: string;
  texte: string;
  enSavoirPlus: string;
  legende: string;
  toutAccepter: string;
  toutRefuser: string;
  personnaliser: string;
  enregistrer: string;
  toujoursActifs: string;
  categories: { titre: string; detail: string }[];
};

/**
 * Bandeau de consentement aux cookies.
 *
 * « Tout refuser » est présenté au même niveau que « Tout accepter » : la CNIL
 * impose que refuser soit aussi simple qu'accepter. Le bandeau ne se ferme
 * pas au clic à côté ni au défilement — seul un choix explicite le valide.
 */
export default function BandeauCookies({ libelles }: { libelles: LibellesCookies }) {
  const [visible, setVisible] = useState(false);
  const [reglages, setReglages] = useState(false);
  const [choix, setChoix] = useState<Categories>(TOUT_REFUSER);

  useEffect(() => {
    // Affiché uniquement si aucun choix valide n'est enregistré
    if (!lireConsentement()) setVisible(true);
  }, []);

  const valider = (categories: Categories) => {
    enregistrerConsentement(categories);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookies-titre"
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-gold/40 bg-ink-soft text-white shadow-2xl"
    >
      <div className="mx-auto max-w-6xl px-6 py-6">
        <h2 id="cookies-titre" className="font-display text-xl text-gold">
          {libelles.titre}
        </h2>

        <p className="mt-3 leading-relaxed text-white/85">
          {libelles.texte}{" "}
          <Link
            href="/politique-de-cookies-ue"
            className="underline underline-offset-4 hover:text-gold"
          >
            {libelles.enSavoirPlus}
          </Link>
        </p>

        {reglages && (
          <fieldset className="mt-6 space-y-4 border-t border-white/15 pt-5">
            <legend className="sr-only">{libelles.legende}</legend>

            <Categorie
              {...libelles.categories[0]}
              mentionFigee={libelles.toujoursActifs}
              coche
              fige
            />
            <Categorie
              {...libelles.categories[1]}
              coche={choix.statistiques}
              onChange={(v) => setChoix({ ...choix, statistiques: v })}
            />
            <Categorie
              {...libelles.categories[2]}
              coche={choix.marketing}
              onChange={(v) => setChoix({ ...choix, marketing: v })}
            />
          </fieldset>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => valider(TOUT_ACCEPTER)}
            className="rounded-full bg-gold px-8 py-3 font-medium text-white transition-colors hover:bg-gold-dark"
          >
            {libelles.toutAccepter}
          </button>

          {/* Meme poids visuel que l'acceptation : exigence CNIL */}
          <button
            type="button"
            onClick={() => valider(TOUT_REFUSER)}
            className="rounded-full bg-gold px-8 py-3 font-medium text-white transition-colors hover:bg-gold-dark"
          >
            {libelles.toutRefuser}
          </button>

          {reglages ? (
            <button
              type="button"
              onClick={() => valider(choix)}
              className="rounded-full border border-white/50 px-8 py-3 font-medium transition-colors hover:border-gold hover:text-gold"
            >
              {libelles.enregistrer}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setReglages(true)}
              className="rounded-full border border-white/50 px-8 py-3 font-medium transition-colors hover:border-gold hover:text-gold"
            >
              {libelles.personnaliser}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Categorie({
  titre,
  detail,
  coche,
  fige = false,
  mentionFigee,
  onChange,
}: {
  titre: string;
  detail: string;
  coche: boolean;
  fige?: boolean;
  mentionFigee?: string;
  onChange?: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-4">
      <input
        type="checkbox"
        checked={coche}
        disabled={fige}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-1 size-5 shrink-0 accent-[#c9943f] disabled:opacity-60"
      />
      <span>
        <span className="font-semibold">
          {titre}
          {fige && <span className="ml-2 text-sm font-normal text-white/60">{mentionFigee}</span>}
        </span>
        <span className="mt-1 block text-sm leading-relaxed text-white/70">{detail}</span>
      </span>
    </label>
  );
}
