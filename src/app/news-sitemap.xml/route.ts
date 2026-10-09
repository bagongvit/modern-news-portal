import { NextResponse } from "next/server";
import { getArticles } from "@/lib/cms/payload";
import { getSiteUrl } from "@/lib/seo/site-url";

export const revalidate = 300; // 5 minutes cache

export async function GET() {
  const articles = await getArticles({ limit: 50 });
  const siteUrl = getSiteUrl().origin;

  const urlEntries = articles
    .map((article) => {
      const pubDate = new Date(article.publishedAt).toISOString();
      const titleEscaped = article.title
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");

      return `  <url>
    <loc>${siteUrl}/berita/${article.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>Modern News Portal</news:name>
        <news:language>id</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${titleEscaped}</news:title>
    </news:news>
  </url>`;
    })
    .join("\n");

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urlEntries}
</urlset>`;

  return new NextResponse(sitemapXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
