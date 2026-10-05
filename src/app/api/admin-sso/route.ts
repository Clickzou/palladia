import { NextResponse } from "next/server";

import { verifierLaissezPasser } from "@/lib/admin/laissez-passer";
import { sessionSansMotDePasse } from "@/lib/admin/session-sans-mot-de-passe";
import { createClient } from "@/lib/supabase/server";

/**
 * GET /api/admin-sso/?jeton=… — connexion automatique à l'éditeur des menus
 * depuis clickzou.fr (laissez-passer signé, 2 min max). Le compte doit déjà
 * exister dans Supabase Auth ; la session est posée dans les cookies lus par
 * @supabase/ssr, puis on ouvre /adminpclickzou. Tout échec mène à l'écran de
 * connexion habituel.
 */
export async function GET(requete: Request) {
  const url = new URL(requete.url);
  const editeur = new URL("/adminpclickzou", url.origin);
  const email = verifierLaissezPasser(url.searchParams.get("jeton"), "hotelpalladia.com");
  if (!email) return NextResponse.redirect(editeur);
  const session = await sessionSansMotDePasse(email);
  if (!session) return NextResponse.redirect(editeur);
  const supabase = await createClient();
  const { error } = await supabase.auth.setSession({ access_token: session.access_token, refresh_token: session.refresh_token });
  if (error) console.error("[admin-sso]", error.message);
  return NextResponse.redirect(editeur);
}
