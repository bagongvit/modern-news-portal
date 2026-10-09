import { Article, Category, BreakingNewsItem, SiteConfig, Comment, Author } from "@/types/news";
import { siteConfig } from "@/config/site";
import type { Payload, Where } from "payload";

let cachedPayload: Payload | null = null;

export async function getPayloadClient(): Promise<Payload | null> {
  if (cachedPayload) return cachedPayload;

  try {
    const { getPayload } = await import("payload");
    const configPromise = (await import("@payload-config")).default;
    cachedPayload = await getPayload({ config: configPromise });
    return cachedPayload;
  } catch (error) {
    console.error("Payload CMS is unavailable:", error);
    return null;
  }
}

export async function getArticles(options?: {
  categorySlug?: string;
  limit?: number;
  featuredOnly?: boolean;
}): Promise<Article[]> {
  const payload = await getPayloadClient();
  if (!payload) return [];

  try {
    const whereClause: Where = { status: { equals: "published" } };
    if (options?.featuredOnly) whereClause.isFeatured = { equals: true };
    if (options?.categorySlug) whereClause["category.slug"] = { equals: options.categorySlug };

    const result = await payload.find({
      collection: "articles",
      overrideAccess: false,
      where: whereClause,
      limit: options?.limit ?? 10,
      sort: "-publishedAt",
      depth: 2,
    });
    return result.docs as unknown as Article[];
  } catch (error) {
    console.error("Unable to load articles from Payload CMS:", error);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const payload = await getPayloadClient();
  if (!payload) return null;

  try {
    const result = await payload.find({
      collection: "articles",
      overrideAccess: false,
      where: { slug: { equals: slug }, status: { equals: "published" } },
      limit: 1,
      depth: 2,
    });
    // Relationship depth 2 populates nested CMS documents into the frontend article shape.
    return (result.docs[0] as unknown as Article | undefined) ?? null;
  } catch (error) {
    console.error("Unable to load article from Payload CMS:", error);
    return null;
  }
}

export async function getRelatedArticles(
  currentSlug: string,
  categorySlug: string,
  limit: number = 3,
): Promise<Article[]> {
  const articles = await getArticles({ categorySlug, limit: limit + 1 });
  return articles.filter((article) => article.slug !== currentSlug).slice(0, limit);
}

export async function getCategories(): Promise<Category[]> {
  const payload = await getPayloadClient();
  if (!payload) return [];

  try {
    const result = await payload.find({
      collection: "categories",
      overrideAccess: false,
      limit: 100,
      sort: "name",
    });
    return result.docs as unknown as Category[];
  } catch (error) {
    console.error("Unable to load categories from Payload CMS:", error);
    return [];
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find((category) => category.slug === slug) ?? null;
}

export async function getBreakingNews(): Promise<BreakingNewsItem[]> {
  const payload = await getPayloadClient();
  if (!payload) return [];

  try {
    const globalData = await payload.findGlobal({
      slug: "breaking-news",
      overrideAccess: false,
    });
    if (!globalData?.isActive || !globalData.headline || !globalData.url) return [];
    return [
      {
        id: String(globalData.id),
        headline: globalData.headline,
        url: globalData.url,
        badgeText: globalData.badgeText || "BREAKING",
        publishedAt: new Date().toISOString(),
      },
    ];
  } catch (error) {
    console.error("Unable to load breaking news from Payload CMS:", error);
    return [];
  }
}

export async function searchArticles(query: string, categorySlug?: string): Promise<Article[]> {
  const allArticles = await getArticles({ limit: 50, categorySlug });
  const normalizedQuery = query.toLowerCase().trim();

  return allArticles.filter(
    (article) =>
      !normalizedQuery ||
      article.title.toLowerCase().includes(normalizedQuery) ||
      article.lead.toLowerCase().includes(normalizedQuery) ||
      article.content.toLowerCase().includes(normalizedQuery) ||
      article.tags.some((tag) => tag.name.toLowerCase().includes(normalizedQuery)),
  );
}

export async function getSiteSettings(): Promise<SiteConfig> {
  return siteConfig;
}

export async function getCommentsByArticleId(articleId: string): Promise<Comment[]> {
  const payload = await getPayloadClient();
  if (!payload) return [];

  try {
    const result = await payload.find({
      collection: "comments",
      overrideAccess: false,
      where: {
        and: [{ article: { equals: articleId } }, { status: { equals: "approved" } }],
      },
      sort: "-createdAt",
      limit: 100,
    });

    return (result.docs as unknown as Array<Record<string, unknown>>).map((doc) => ({
      id: String(doc.id),
      articleId:
        typeof doc.article === "object" && doc.article !== null
          ? String((doc.article as { id: string | number }).id)
          : String(doc.article ?? articleId),
      name: String(doc.name ?? "Pembaca"),
      email: typeof doc.email === "string" ? doc.email : "",
      content: String(doc.content ?? ""),
      createdAt: String(doc.createdAt ?? new Date().toISOString()),
      status: (doc.status as "approved" | "pending" | "spam") ?? "approved",
    }));
  } catch (error) {
    console.error("Unable to load comments from Payload CMS:", error);
    return [];
  }
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  const payload = await getPayloadClient();
  if (!payload) return null;

  try {
    const result = await payload.find({
      collection: "authors",
      overrideAccess: false,
      where: { slug: { equals: slug } },
      limit: 1,
    });
    return (result.docs[0] as unknown as Author | undefined) ?? null;
  } catch (error) {
    console.error("Unable to load author from Payload CMS:", error);
    return null;
  }
}

export async function getArticlesByAuthorSlug(
  authorSlug: string,
  limit: number = 20,
): Promise<Article[]> {
  const payload = await getPayloadClient();
  if (!payload) return [];

  try {
    const result = await payload.find({
      collection: "articles",
      overrideAccess: false,
      where: {
        and: [{ status: { equals: "published" } }, { "author.slug": { equals: authorSlug } }],
      },
      sort: "-publishedAt",
      limit,
      depth: 2,
    });
    return result.docs as unknown as Article[];
  } catch (error) {
    console.error("Unable to load articles by author from Payload CMS:", error);
    return [];
  }
}
