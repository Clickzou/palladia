/**
 * Ouvre une session Supabase pour un compte existant SANS mot de passe, côté
 * serveur : lien magique généré par l'API d'administration (clé de service),
 * aussitôt échangé contre une session. Sert la connexion automatique depuis
 * clickzou.fr (laissez-passer vérifié en amont).
 */
export async function sessionSansMotDePasse(email: string): Promise<{ access_token: string; refresh_token: string; expires_in: number } | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !service || !anon) return null;
  const lien = await fetch(`${url}/auth/v1/admin/generate_link`, {
    method: "POST",
    headers: { apikey: service, Authorization: `Bearer ${service}`, "Content-Type": "application/json" },
    body: JSON.stringify({ type: "magiclink", email }),
    cache: "no-store",
  });
  if (!lien.ok) return null;
  const { hashed_token } = (await lien.json()) as { hashed_token?: string };
  if (!hashed_token) return null;
  const verif = await fetch(`${url}/auth/v1/verify`, {
    method: "POST",
    headers: { apikey: anon, "Content-Type": "application/json" },
    body: JSON.stringify({ type: "magiclink", token_hash: hashed_token }),
    cache: "no-store",
  });
  if (!verif.ok) return null;
  const s = (await verif.json()) as { access_token?: string; refresh_token?: string; expires_in?: number };
  return s.access_token && s.refresh_token ? { access_token: s.access_token, refresh_token: s.refresh_token, expires_in: s.expires_in ?? 3600 } : null;
}
