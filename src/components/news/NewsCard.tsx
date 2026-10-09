import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types/news";
import { formatRelativeTime, formatReadingTime } from "@/lib/utils";
import { Clock, ArrowUpRight } from "lucide-react";
import { BookmarkButton } from "@/components/shared/BookmarkButton";

interface NewsCardProps {
  article: Article;
  variant?: "default" | "compact" | "horizontal" | "overlay";
}

export function NewsCard({ article, variant = "default" }: NewsCardProps) {
  const bookmarkData = {
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
  };

  if (variant === "compact") {
    return (
      <article className="group flex items-start gap-4 py-3.5 border-b border-slate-100 dark:border-slate-800/80 last:border-b-0 transition-colors">
        <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-800">
          <Image
            src={article.featuredImageUrl}
            alt={article.title}
            fill
            sizes="96px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-between flex-1 min-w-0">
          <Link
            href={`/kategori/${article.category.slug}`}
            className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 hover:underline mb-1"
          >
            {article.category.name}
          </Link>
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            <Link href={`/berita/${article.slug}`}>{article.title}</Link>
          </h4>
          <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            <span>{formatRelativeTime(article.publishedAt)}</span>
            <span>•</span>
            <span>{formatReadingTime(article.readingTimeMinutes)}</span>
          </div>
        </div>
      </article>
    );
  }

  if (variant === "horizontal") {
    return (
      <article className="group flex flex-col sm:flex-row gap-5 p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/70 hover:shadow-lg hover:border-blue-500/30 transition-all duration-300">
        <div className="relative h-48 sm:h-auto sm:w-72 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-800">
          <Image
            src={article.featuredImageUrl}
            alt={article.title}
            fill
            sizes="(max-width: 640px) 100vw, 288px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <Link
              href={`/kategori/${article.category.slug}`}
              className="inline-block rounded-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm backdrop-blur-md"
              style={{ backgroundColor: `${article.category.color}ee` || "#2563eb" }}
            >
              {article.category.name}
            </Link>
          </div>
          <div className="absolute top-3 right-3 z-10">
            <BookmarkButton article={bookmarkData} />
          </div>
        </div>

        <div className="flex flex-col justify-between flex-1 py-1">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
              <Clock className="h-3.5 w-3.5" />
              <span>{formatRelativeTime(article.publishedAt)}</span>
              <span>•</span>
              <span>{formatReadingTime(article.readingTimeMinutes)}</span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-950 dark:text-slate-50 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              <Link href={`/berita/${article.slug}`}>{article.title}</Link>
            </h3>

            <p className="mt-2.5 text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
              {article.lead}
            </p>
          </div>

          <div className="flex items-center justify-between mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs">
            <div className="flex items-center gap-2">
              {article.author.avatar && (
                <Link
                  href={`/penulis/${article.author.slug}`}
                  className="relative h-6 w-6 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 hover:opacity-80 transition-opacity"
                >
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    fill
                    sizes="24px"
                    className="object-cover"
                  />
                </Link>
              )}
              {article.author.slug ? (
                <Link
                  href={`/penulis/${article.author.slug}`}
                  className="font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {article.author.name}
                </Link>
              ) : (
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {article.author.name}
                </span>
              )}
            </div>

            <Link
              href={`/berita/${article.slug}`}
              className="flex items-center gap-1 font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              <span>Baca Artikel</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // Default Vertical Editorial Card
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-xs hover:shadow-xl hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Image
          src={article.featuredImageUrl}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Floating Category Pill */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <Link
            href={`/kategori/${article.category.slug}`}
            className="inline-block rounded-md px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-md backdrop-blur-md"
            style={{ backgroundColor: `${article.category.color}f0` || "#2563eb" }}
          >
            {article.category.name}
          </Link>
        </div>

        {/* Floating Bookmark Button */}
        <div className="absolute top-3.5 right-3.5 z-10">
          <BookmarkButton article={bookmarkData} />
        </div>

        {/* Read Time Float */}
        <div className="absolute bottom-3 right-3 z-10 rounded-md bg-slate-950/70 backdrop-blur-md px-2 py-0.5 text-[10px] font-semibold text-white">
          {formatReadingTime(article.readingTimeMinutes)}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-2.5">
          <Clock className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
          <span>{formatRelativeTime(article.publishedAt)}</span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white leading-snug line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          <Link href={`/berita/${article.slug}`}>{article.title}</Link>
        </h3>

        <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed flex-1 font-normal">
          {article.lead}
        </p>

        <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            {article.author.avatar && (
              <Link
                href={`/penulis/${article.author.slug}`}
                className="relative h-6 w-6 shrink-0 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 hover:opacity-80 transition-opacity"
              >
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  fill
                  sizes="24px"
                  className="object-cover"
                />
              </Link>
            )}
            {article.author.slug ? (
              <Link
                href={`/penulis/${article.author.slug}`}
                className="font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate text-[11px]"
              >
                {article.author.name}
              </Link>
            ) : (
              <span className="font-semibold text-slate-700 dark:text-slate-300 truncate text-[11px]">
                {article.author.name}
              </span>
            )}
          </div>

          <Link
            href={`/berita/${article.slug}`}
            className="flex items-center gap-0.5 font-bold text-blue-600 dark:text-blue-400 hover:underline shrink-0"
          >
            <span>Baca</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
