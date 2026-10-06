import { NextResponse } from "next/server";
import { articlesPourTableauDeBord } from "@/lib/articles-fichiers/api";
import { ENTETES_TABLEAU_DE_BORD, refusTableauDeBord } from "@/lib/articles-fichiers/tableau-de-bord";

/**
 * GET /api/articles-programmes — articles du Palladia pour le tableau de bord
 * client Clickzou (onglet « Articles programmés »), au contrat `ArticleClient`
 * de clickzou-v2 (src/lib/espace-client/articles.ts).
 *
 * Couvre les deux sources : articles en base (publiés, lecture seule) et
 * articles fichiers de contenu/articles/ (publiés ou programmés ; un
 * programmé porte son lien d'aperçu signé). Les brouillons ne sortent pas.
 *
 * Bearer `TABLEAU_DE_BORD_CLE` : 503 si la clé n'est pas posée sur le
 * serveur, 401 si elle ne correspond pas.
 */
export const dynamic = "force-dynamic";

export async function GET(requete: Request) {
  const refus = refusTableauDeBord(requete);
  if (refus) return NextResponse.json({ ok: false }, { status: refus, headers: ENTETES_TABLEAU_DE_BORD });

  try {
    const articles = await articlesPourTableauDeBord(new URL(requete.url).origin);
    return NextResponse.json({ ok: true, site: "Hôtel Palladia", articles }, { headers: ENTETES_TABLEAU_DE_BORD });
  } catch (e) {
    console.error("[articles-programmes]", (e as Error).message);
    return NextResponse.json({ ok: false, erreur: "Lecture des articles impossible" }, { status: 502, headers: ENTETES_TABLEAU_DE_BORD });
  }
}
