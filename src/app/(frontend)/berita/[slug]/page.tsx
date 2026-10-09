import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getArticleBySlug, getRelatedArticles, getCommentsByArticleId } from "@/lib/cms/payload";
import {
  generatePortalMetadata,
  generateNewsArticleJsonLd,
  generateBreadcrumbJsonLd,
} from "@/lib/seo";
import { ArticleHeader } from "@/components/article/ArticleHeader";
import { ArticleContent } from "@/components/article/ArticleContent";
import { TableOfContents } from "@/components/article/TableOfContents";
import { AuthorBioBox } from "@/components/article/AuthorBioBox";
import { CommentSection } from "@/components/article/CommentSection";
import { ReadingProgressBar } from "@/components/article/ReadingProgressBar";
import { AiArticleBrief } from "@/components/article/AiArticleBrief";
import { ArticleViewTracker } from "@/components/article/ArticleViewTracker";
import { ReadingControls } from "@/components/article/ReadingControls";
import { FloatingReadingDock } from "@/components/article/FloatingReadingDock";
import { ArticleReactions } from "@/components/article/ArticleReactions";
import { LiveBlogTimeline } from "@/components/article/LiveBlogTimeline";
import { NewsCard } from "@/components/news/NewsCard";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Artikel Tidak Ditemukan",
    };
  }

  return generatePortalMetadata({
    title: article.title,
    description: article.lead,
    path: `/berita/${article.slug}`,
    image: article.featuredImageUrl,
    type: "article",
    publishedTime: article.publishedAt,
    authors: [article.author.name],
  });
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const [relatedArticles, comments] = await Promise.all([
    getRelatedArticles(article.slug, article.category.slug, 3),
    getCommentsByArticleId(article.id),
  ]);
  const jsonLd = generateNewsArticleJsonLd(article);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Beranda", path: "/" },
    { name: article.category.name, path: `/kategori/${article.category.slug}` },
    { name: article.title, path: `/berita/${article.slug}` },
  ]);

  return (
    <>
      {/* Top Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Structured Data for Google News SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          {/* Record to Reading History */}
          <ArticleViewTracker
            article={{
              id: article.id,
              title: article.title,
              slug: article.slug,
              lead: article.lead,
              featuredImageUrl: article.featuredImageUrl,
              categoryName: article.category.name,
              categorySlug: article.category.slug,
              categoryColor: article.category.color,
              publishedAt: article.publishedAt,
              readingTimeMinutes: article.readingTimeMinutes,
              authorName: article.author.name,
            }}
          />

          {/* Article Header (Title, Author, Timestamp, Share, Fact-Check) */}
          <ArticleHeader article={article} />

          {/* AI Quick Brief / TL;DR & Mengapa Penting? */}
          <AiArticleBrief article={article} />

          {/* Reader Comfort Toolbar (Font Resizer, Mode Fokus, Bookmark) */}
          <ReadingControls
            article={{
              id: article.id,
              title: article.title,
              slug: article.slug,
              lead: article.lead,
              featuredImageUrl: article.featuredImageUrl,
              categoryName: article.category.name,
              categorySlug: article.category.slug,
              categoryColor: article.category.color,
              publishedAt: article.publishedAt,
              readingTimeMinutes: article.readingTimeMinutes,
              authorName: article.author.name,
            }}
          />

          {/* Table of Contents */}
          <TableOfContents />

          {/* Main Editorial Content */}
          <ArticleContent article={article} />

          {/* Real-time Live Report Timeline (for Breaking News & Live Events) */}
          {article.isBreaking && <LiveBlogTimeline articleTitle={article.title} />}

          {/* Interactive Reader Pulse Reactions Barometer */}
          <ArticleReactions articleId={article.id} />

          {/* Author Biography Box */}
          <AuthorBioBox author={article.author} />

          {/* Discussion & Comments */}
          <CommentSection
            articleId={article.id}
            articleSlug={article.slug}
            authorName={article.author.name}
            initialComments={comments}
          />

          {/* Related Articles Section */}
          {relatedArticles.length > 0 && (
            <section
              className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800"
              aria-label="Berita Terkait"
            >
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Rekomendasi Terkait
                </span>
                <h3 className="text-2xl font-bold text-slate-950 dark:text-white tracking-tight">
                  Baca Juga Topik Serupa
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((rel) => (
                  <NewsCard key={rel.id} article={rel} />
                ))}
              </div>
            </section>
          )}

          {/* Floating Sticky Reading Action Dock (Medium / Substack style) */}
          <FloatingReadingDock
            article={{
              id: article.id,
              title: article.title,
              slug: article.slug,
              lead: article.lead,
              featuredImageUrl: article.featuredImageUrl,
              categoryName: article.category.name,
              categorySlug: article.category.slug,
              categoryColor: article.category.color,
              publishedAt: article.publishedAt,
              readingTimeMinutes: article.readingTimeMinutes,
              authorName: article.author.name,
            }}
            commentCount={comments.length}
          />
        </div>
      </article>
    </>
  );
}
