import { NextResponse } from "next/server";
import { articleFichier, dateAtteinte, FICHIER_CORRECTIONS } from "@/lib/articles-fichiers";
import { articlesBaseComplets } from "@/lib/articles-fichiers/api";
import { champsEditables } from "@/lib/articles-fichiers/edition";
import { ENTETES_TABLEAU_DE_BORD, refusTableauDeBord } from "@/lib/articles-fichiers/tableau-de-bord";

/**
 * GET /api/articles-programmes/contenu?slug=<slug> — textes modifiables d'un
 * article, pour l'éditeur de l'espace client Clickzou (contrat de
 * clickzou-v2 src/lib/espace-client/edition-article.ts).
 *
 * - Article fichier : la version française de ses textes (corrections déjà
 *   enregistrées incluses) ; Clickzou écrit les modifications dans
 *   `contenu/corrections-client.json`.
 * - Article en base : LECTURE SEULE (`lectureSeule: true`, aucun champ) — la
 *   base n'est pas modifiable depuis le dépôt ; une correction passe par une
 *   demande à Clickzou.
 */
export const dynamic = "force-dynamic";

export async function GET(requete: Request) {
  const refus = refusTableauDeBord(requete);
  if (refus) return NextResponse.json({ ok: false }, { status: refus, headers: ENTETES_TABLEAU_DE_BORD });

  const slug = new URL(requete.url).searchParams.get("slug") ?? "";
  const fichier = articleFichier(slug);

  if (fichier) {
    return NextResponse.json(
      {
        ok: true,
        slug: fichier.slug,
        titre: fichier.titre.fr,
        datePublication: fichier.datePublication,
        statut: dateAtteinte(fichier) ? "publie" : "programme",
        fichierCorrections: FICHIER_CORRECTIONS,
        lectureSeule: false,
        champs: champsEditables(fichier),
      },
      { headers: ENTETES_TABLEAU_DE_BORD },
    );
  }

  let enBase;
  try {
    enBase = (await articlesBaseComplets()).find((a) => a.slug === slug);
  } catch (e) {
    console.error("[articles-programmes/contenu]", (e as Error).message);
    return NextResponse.json({ ok: false, erreur: "Lecture des articles impossible" }, { status: 502, headers: ENTETES_TABLEAU_DE_BORD });
  }
  if (!enBase) {
    return NextResponse.json({ ok: false, erreur: "Article introuvable" }, { status: 404, headers: ENTETES_TABLEAU_DE_BORD });
  }
  return NextResponse.json(
    {
      ok: true,
      slug: enBase.slug,
      titre: enBase.titre,
      datePublication: enBase.date_publication.slice(0, 10),
      statut: "publie",
      fichierCorrections: FICHIER_CORRECTIONS,
      lectureSeule: true,
      champs: [],
    },
    { headers: ENTETES_TABLEAU_DE_BORD },
  );
}
