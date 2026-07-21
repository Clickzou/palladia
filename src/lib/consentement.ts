"use client";

/**
 * Gestion du consentement aux cookies.
 *
 * Règles retenues, conformes aux recommandations de la CNIL :
 *  - aucun traceur n'est déposé avant un choix explicite ;
 *  - refuser doit être aussi simple qu'accepter (un seul clic, même niveau) ;
 *  - le choix est conservé 6 mois, puis redemandé ;
 *  - le visiteur peut revenir sur sa décision à tout moment.
 *
 * Le consentement est stocké en localStorage plutôt qu'en cookie : c'est un
 * choix de préférence utilisateur, pas une donnée à transmettre au serveur.
 */

export type Categories = {
  /** Toujours actif : sans lui le site ne fonctionne pas. */
  necessaire: true;
  statistiques: boolean;
  marketing: boolean;
};

export type Consentement = {
  categories: Categories;
  /** Date du choix, au format ISO */
  date: string;
  version: number;
};

const CLE = "palladia-consentement";

/** Incrémenter pour redemander leur choix à tous les visiteurs. */
export const VERSION = 1;

/** Six mois : durée maximale recommandée par la CNIL. */
const VALIDITE_MS = 6 * 30 * 24 * 60 * 60 * 1000;

export const TOUT_REFUSER: Categories = {
  necessaire: true,
  statistiques: false,
  marketing: false,
};

export const TOUT_ACCEPTER: Categories = {
  necessaire: true,
  statistiques: true,
  marketing: true,
};

/** Choix enregistré, ou null s'il n'existe pas, a expiré ou n'est plus à jour. */
export function lireConsentement(): Consentement | null {
  if (typeof window === "undefined") return null;

  try {
    const brut = window.localStorage.getItem(CLE);
    if (!brut) return null;

    const c = JSON.parse(brut) as Consentement;
    if (c.version !== VERSION) return null;
    if (Date.now() - new Date(c.date).getTime() > VALIDITE_MS) return null;

    return c;
  } catch {
    return null;
  }
}

export function enregistrerConsentement(categories: Categories): Consentement {
  const c: Consentement = { categories, date: new Date().toISOString(), version: VERSION };
  try {
    window.localStorage.setItem(CLE, JSON.stringify(c));
  } catch {
    // Navigation privée ou stockage refusé : le bandeau réapparaîtra, ce qui
    // est préférable à un consentement supposé.
  }
  window.dispatchEvent(new CustomEvent("palladia:consentement", { detail: c }));
  return c;
}

/** Efface le choix : le bandeau sera reproposé. */
export function reinitialiserConsentement() {
  try {
    window.localStorage.removeItem(CLE);
  } catch {
    /* sans effet */
  }
  window.dispatchEvent(new CustomEvent("palladia:consentement", { detail: null }));
}

/** Raccourci pour conditionner le chargement d'un script tiers. */
export function aConsenti(categorie: "statistiques" | "marketing"): boolean {
  return lireConsentement()?.categories[categorie] ?? false;
}
