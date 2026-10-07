import { createClient } from "./supabase/server";
import type { Article, ArticleComplet, Bloc } from "./supabase/types";
import { articleFichier, articlesFichiersPublies, estEnLigne, versArticleComplet } from "./articles-fichiers";

/**
 * Le blog réunit deux sources :
 *   - les articles en base Supabase (historiques, inchangés) ;
 *   - les articles « fichiers » de `contenu/articles/` (depuis le 06/10/2026,
 *     publiables par un simple commit — voir src/lib/articles-fichiers).
 * La base l'emporte si un même slug existait des deux côtés.
 */

/**
 * Tant que les variables Supabase ne sont pas renseignees (.env.local), le blog
 * se comporte comme s’il etait vide plutot que de faire echouer le rendu.
 */
export const supabaseConfigure = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

/** Nombre d’articles affichés par page de liste. */
export const ARTICLES_PAR_PAGE = 6;

/**
 * Langue effectivement stockée en base pour une langue demandée.
 *
 * Les articles ne sont écrits qu’en français : leur traduction se fait à
 * l’affichage, par le dictionnaire. Interroger la base en `en` ne remontait
 * rien, et la page Actualités s’affichait vide dans les deux autres langues.
 */
async function langueDisponible(supabase: Awaited<ReturnType<typeof createClient>>, locale: string) {
  if (locale === "fr") return "fr";
  const { count } = await supabase
    .from("articles")
    .select("id", { count: "exact", head: true })
    .eq("locale", locale)
    .eq("statut", "publie");
  return count ? locale : "fr";
}

/** Articles publiés en base, dans l’ordre voulu par l’hôtel. */
async function articlesEnBase(locale: string): Promise<Article[]> {
  if (!supabaseConfigure) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("locale", await langueDisponible(supabase, locale))
    .eq("statut", "publie")
    // `position` fixe l’ordre voulu par l’hotel ; les articles qui n’en ont
    // pas sont classes ensuite, du plus recent au plus ancien.
    .order("position", { ascending: true, nullsFirst: false })
    .order("date_publication", { ascending: false });

  if (error) {
    console.error("Lecture des articles impossible :", error.message);
    return [];
  }
  return data ?? [];
}

/**
 * Liste des articles publiés d’une langue.
 *
 * Les articles fichiers publiés passent EN TÊTE, du plus récent au plus
 * ancien : ce sont les plus récents du site (l’hôtel classe ses nouveautés en
 * premier, cf. la position 1 donnée à chaque nouvel article en base). Les
 * articles en base suivent, dans leur ordre `position` inchangé.
 */
export async function listerArticles(locale: string): Promise<Article[]> {
  const base = await articlesEnBase(locale);
  const enBase = new Set(base.map((a) => a.slug));
  const fichiers = articlesFichiersPublies()
    .filter((a) => !enBase.has(a.slug))
    .map((a) => {
      const { blocs: _blocs, ...article } = versArticleComplet(a, locale);
      void _blocs;
      return article as Article;
    });
  return [...fichiers, ...base];
}

/**
 * Une page d’articles, avec le nombre total de pages.
 * La liste est fusionnée puis découpée ici : une vingtaine de lignes au plus,
 * sans colonne lourde (les blocs ne sont pas chargés).
 */
export async function listerArticlesPagines(
  locale: string,
  page = 1,
): Promise<{ articles: Article[]; pages: number; page: number }> {
  const tous = await listerArticles(locale);
  const debut = (page - 1) * ARTICLES_PAR_PAGE;
  return {
    articles: tous.slice(debut, debut + ARTICLES_PAR_PAGE),
    pages: Math.ceil(tous.length / ARTICLES_PAR_PAGE),
    page,
  };
}

/** Un article en base et ses blocs, ou null. */
async function lireArticleEnBase(slug: string, locale: string): Promise<ArticleComplet | null> {
  if (!supabaseConfigure) return null;
  const supabase = await createClient();

  const chercher = async (langue: string) =>
    supabase
      .from("articles")
      .select("*, article_blocs(*)")
      .eq("slug", slug)
      .eq("locale", langue)
      .eq("statut", "publie")
      .maybeSingle();

  let { data, error } = await chercher(locale);
  if ((error || !data) && locale !== "fr") ({ data, error } = await chercher("fr"));

  if (error || !data) return null;

  const { article_blocs, ...article } = data as Article & { article_blocs: Bloc[] };
  return {
    ...article,
    blocs: (article_blocs ?? []).sort((a, b) => a.ordre - b.ordre),
  };
}

/**
 * Un article et ses blocs, ou null s’il n’existe pas / n’est pas publié.
 *
 * En base, faute de version traduite, on sert la version française plutôt
 * qu’une page introuvable : le contenu éditorial est traduit à l’affichage par
 * le dictionnaire. Un article fichier, lui, porte ses trois langues ; s’il est
 * programmé (date future) ou réservé au pack Full SEO (premium.ts), il reste
 * introuvable : 404.
 */
export async function lireArticle(
  slug: string,
  locale: string,
): Promise<ArticleComplet | null> {
  const enBase = await lireArticleEnBase(slug, locale);
  if (enBase) return enBase;
  const fichier = articleFichier(slug);
  return fichier && estEnLigne(fichier) ? versArticleComplet(fichier, locale) : null;
}

/** Slugs publiés, pour la génération statique et le sitemap. */
export async function listerSlugs(): Promise<
  { slug: string; locale: string; date_publication: string }[]
> {
  let base: { slug: string; locale: string; date_publication: string }[] = [];
  if (supabaseConfigure) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("articles")
      .select("slug, locale, date_publication")
      .eq("statut", "publie");
    base = data ?? [];
  }
  const enBase = new Set(base.map((a) => a.slug));
  const fichiers = articlesFichiersPublies()
    .filter((a) => !enBase.has(a.slug))
    .map((a) => ({ slug: a.slug, locale: "fr", date_publication: a.datePublication }));
  return [...base, ...fichiers];
}
