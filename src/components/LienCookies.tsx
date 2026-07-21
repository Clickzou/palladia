"use client";

import { reinitialiserConsentement } from "@/lib/consentement";

/**
 * Lien de pied de page permettant de revenir sur son choix de cookies.
 * Obligatoire : le consentement doit être retirable aussi facilement
 * qu'il a été donné.
 */
export default function LienCookies({ libelle }: { libelle: string }) {
  return (
    <button
      type="button"
      onClick={reinitialiserConsentement}
      className="cursor-pointer transition-colors hover:text-gold"
    >
      {libelle}
    </button>
  );
}
