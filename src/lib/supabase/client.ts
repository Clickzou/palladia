"use client";

import { createBrowserClient } from "@supabase/ssr";

/**
 * Client Supabase cote navigateur, pour l'espace d'administration.
 *
 * La cle publiable ne donne aucun droit par elle-meme : ce sont les politiques
 * RLS qui autorisent l'ecriture, et seulement a une session authentifiee.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
