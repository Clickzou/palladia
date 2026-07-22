"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { aConsenti } from "@/lib/consentement";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Mesure d'audience Google Analytics, subordonnee au consentement.
 *
 * Le script n'est pas seulement neutralise en l'absence d'accord : il n'est
 * pas charge du tout. C'est ce qu'annonce la politique de cookies, et la
 * seule lecture qui tienne devant la CNIL — un script charge depose ses
 * cookies avant meme qu'on lui demande quoi que ce soit.
 */
export default function Analytics({ id }: { id?: string }) {
  const [actif, setActif] = useState(false);
  const chemin = usePathname();

  useEffect(() => {
    const relire = () => setActif(aConsenti("statistiques"));
    relire();
    window.addEventListener("palladia:consentement", relire);
    return () => window.removeEventListener("palladia:consentement", relire);
  }, []);

  /** Retrait du consentement : on coupe la mesure et on efface les cookies. */
  useEffect(() => {
    if (!id) return;
    // Interrupteur reconnu par gtag.js. Il doit suivre le consentement dans
    // les deux sens : pose une fois pour toutes, il neutraliserait la mesure
    // meme apres un accord.
    (window as unknown as Record<string, boolean>)[`ga-disable-${id}`] = !actif;
    if (actif) return;

    for (const c of document.cookie.split(";")) {
      const nom = c.split("=")[0].trim();
      if (!nom.startsWith("_ga")) continue;
      // Le cookie est pose sur le domaine racine : il faut le viser pour l'effacer.
      const domaine = location.hostname.replace(/^www\./, "");
      document.cookie = `${nom}=; Max-Age=0; path=/`;
      document.cookie = `${nom}=; Max-Age=0; path=/; domain=.${domaine}`;
    }
  }, [actif, id]);

  /**
   * File d'attente de gtag, installee des l'accord donne. Elle doit exister
   * avant que la bibliotheque arrive : sinon les premiers envois, dont la vue
   * de la page d'entree, seraient perdus. gtag.js rejoue la file au chargement.
   */
  useEffect(() => {
    if (!actif || !id) return;
    window.dataLayer = window.dataLayer ?? [];
    // gtag.js ne rejoue que les entrees poussees comme objet `arguments` : un
    // simple tableau est ignore, et rien ne part vers Google. D'ou la fonction
    // classique plutot qu'une flechee.
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag("js", new Date());
    // Les vues de page sont envoyees ci-dessous, a chaque changement d'URL :
    // laisser gtag les envoyer lui-meme ferait doublon sur la premiere.
    window.gtag("config", id, { send_page_view: false, anonymize_ip: true });
  }, [actif, id]);

  /**
   * Vue de page a chaque navigation. Next.js change d'URL sans recharger :
   * sans cet envoi, Analytics ne verrait que la premiere page visitee.
   */
  useEffect(() => {
    if (!actif || !id || !window.gtag) return;
    window.gtag("event", "page_view", {
      page_path: chemin,
      page_location: location.href,
      page_title: document.title,
    });
  }, [chemin, actif, id]);

  if (!id || !actif) return null;

  return (
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
  );
}
