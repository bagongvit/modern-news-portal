import React from "react";
import Link from "next/link";
import { Article } from "@/types/news";
import { TrendingUp, Flame } from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";
import { BookmarkButton } from "@/components/shared/BookmarkButton";

interface TrendingWidgetProps {
  articles: Article[];
}

export function TrendingWidget({ articles }: TrendingWidgetProps) {
  const trending = [...articles].sort((a, b) => b.viewCount - a.viewCount).slice(0, 5);

  const getRankBadgeClass = (idx: number) => {
    switch (idx) {
      case 0:
        return "bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-xs font-black";
      case 1:
        return "bg-gradient-to-br from-slate-400 to-slate-600 text-white shadow-xs font-black";
      case 2:
        return "bg-gradient-to-br from-amber-700 to-orange-800 text-white shadow-xs font-black";
      default:
        return "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold";
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-5 sm:p-6 shadow-xs">
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400">
            <Flame className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
            Paling Banyak Dibaca
          </h3>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/60 px-2 py-0.5 rounded-full">
          Minggu Ini
        </span>
      </div>

      <ol className="flex flex-col space-y-4">
        {trending.map((art, idx) => (
          <li
            key={art.id}
            className="flex items-start gap-3.5 group p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-xl text-xs transition-transform group-hover:scale-110 ${getRankBadgeClass(
                idx,
              )}`}
            >
              0{idx + 1}
            </span>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Link
                  href={`/kategori/${art.category.slug}`}
                  className="text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {art.category.name}
                </Link>
                <span className="text-[10px] text-slate-300 dark:text-slate-700">•</span>
                <span className="text-[10px] text-slate-400">
                  {formatRelativeTime(art.publishedAt)}
                </span>
              </div>

              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                <Link href={`/berita/${art.slug}`}>{art.title}</Link>
              </h4>

              <div className="flex items-center justify-between mt-1.5">
                <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-500 dark:text-slate-400">
                  <TrendingUp className="h-3 w-3 text-red-500" />
                  <span>{art.viewCount.toLocaleString("id-ID")} kali dibaca</span>
                </div>
                <BookmarkButton
                  article={{
                    id: art.id,
                    title: art.title,
                    slug: art.slug,
                    lead: art.lead,
                    featuredImageUrl: art.featuredImageUrl,
                    categoryName: art.category.name,
                    categorySlug: art.category.slug,
                    categoryColor: art.category.color,
                    publishedAt: art.publishedAt,
                    readingTimeMinutes: art.readingTimeMinutes,
                    authorName: art.author.name,
                  }}
                  className="h-6 w-6 rounded-lg text-slate-400 hover:text-blue-600 opacity-80 group-hover:opacity-100"
                />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
