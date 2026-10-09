import { NextResponse } from "next/server";
import { getArticles } from "@/lib/cms/payload";
import { siteConfig } from "@/config/site";
import { getSiteUrl } from "@/lib/seo/site-url";

export async function GET() {
  const baseUrl = getSiteUrl().origin;
  const articles = await getArticles({ limit: 30 });

  const itemsXml = articles
    .map((article) => {
      const articleUrl = `${baseUrl}/berita/${article.slug}`;
      const pubDate = new Date(article.publishedAt).toUTCString();

      return `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${articleUrl}</link>
      <guid isPermaLink="true">${articleUrl}</guid>
      <description><![CDATA[${article.lead}]]></description>
      <category><![CDATA[${article.category.name}]]></category>
      <dc:creator><![CDATA[${article.author.name}]]></dc:creator>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join("\n");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.siteName}</title>
    <link>${baseUrl}</link>
    <description>${siteConfig.description}</description>
    <language>id-ID</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(rssFeed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
