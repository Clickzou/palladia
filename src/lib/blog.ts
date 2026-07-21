import { createClient } from "./supabase/server";
import type { Article, ArticleComplet, Bloc } from "./supabase/types";

/**
 * Tant que les variables Supabase ne sont pas renseignees (.env.local), le blog
 * se comporte comme s’il etait vide plutot que de faire echouer le rendu.
 */
export const supabaseConfigure = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

/** Nombre d’articles affichés par page de liste. */
export const ARTICLES_PAR_PAGE = 6;

/** Liste des articles publiés d’une langue, du plus récent au plus ancien. */
export async function listerArticles(locale: string): Promise<Article[]> {
  if (!supabaseConfigure) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("locale", locale)
    .eq("statut", "publie")
    .order("position", { ascending: true, nullsFirst: false })
    .order("date_publication", { ascending: false });

  if (error) {
    console.error("Lecture des articles impossible :", error.message);
    return [];
  }
  return data ?? [];
}

/**
 * Une page d’articles, avec le nombre total de pages.
 * La pagination est faite côté base : seules les 6 lignes utiles remontent.
 */
export async function listerArticlesPagines(
  locale: string,
  page = 1,
): Promise<{ articles: Article[]; pages: number; page: number }> {
  if (!supabaseConfigure) return { articles: [], pages: 0, page: 1 };

  const supabase = await createClient();
  const debut = (page - 1) * ARTICLES_PAR_PAGE;

  const { data, count, error } = await supabase
    .from("articles")
    .select("*", { count: "exact" })
    .eq("locale", locale)
    .eq("statut", "publie")
    // `position` fixe l’ordre voulu par l’hotel ; les articles qui n’en ont
    // pas sont classes ensuite, du plus recent au plus ancien.
    .order("position", { ascending: true, nullsFirst: false })
    .order("date_publication", { ascending: false })
    .range(debut, debut + ARTICLES_PAR_PAGE - 1);

  if (error) {
    console.error("Lecture des articles impossible :", error.message);
    return { articles: [], pages: 0, page };
  }

  return {
    articles: data ?? [],
    pages: Math.ceil((count ?? 0) / ARTICLES_PAR_PAGE),
    page,
  };
}

/** Un article et ses blocs, ou null s’il n’existe pas / n’est pas publié. */
export async function lireArticle(
  slug: string,
  locale: string,
): Promise<ArticleComplet | null> {
  if (!supabaseConfigure) return null;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*, article_blocs(*)")
    .eq("slug", slug)
    .eq("locale", locale)
    .eq("statut", "publie")
    .maybeSingle();

  if (error || !data) return null;

  const { article_blocs, ...article } = data as Article & { article_blocs: Bloc[] };
  return {
    ...article,
    blocs: (article_blocs ?? []).sort((a, b) => a.ordre - b.ordre),
  };
}

/** Slugs publiés, pour la génération statique et le sitemap. */
export async function listerSlugs(): Promise<{ slug: string; locale: string }[]> {
  if (!supabaseConfigure) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select("slug, locale")
    .eq("statut", "publie");

  return data ?? [];
}
