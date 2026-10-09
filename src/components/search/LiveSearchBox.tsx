"use client";

import React, { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useLiveSearch } from "@/features/search/useLiveSearch";
import { Search, Loader2, AlertCircle, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { formatRelativeTime } from "@/lib/utils";
import { Category } from "@/types/news";

interface LiveSearchBoxProps {
  categories: Category[];
  initialQuery?: string;
  initialCategory?: string;
}

export function LiveSearchBox({
  categories,
  initialQuery = "",
  initialCategory = "",
}: LiveSearchBoxProps) {
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const debouncedQuery = useDebounce(searchTerm, 300);
  const { data, isLoading, isError, error } = useLiveSearch(debouncedQuery, selectedCategory);

  return (
    <div className="w-full space-y-8">
      {/* Search Input Bar */}
      <div className="relative">
        <Search className="absolute left-5 top-4 h-5 w-5 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Ketik topik berita, kata kunci, nama jurnalis, atau isu..."
          className="w-full rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 pl-14 pr-12 py-4 text-base sm:text-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 shadow-md shadow-slate-200/40 dark:shadow-none transition-all"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-4 top-4 p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            title="Hapus pencarian"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        {isLoading && (
          <div className="absolute right-10 top-4">
            <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
          </div>
        )}
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        <button
          onClick={() => setSelectedCategory("")}
          className={`rounded-xl px-4 py-2 text-xs font-bold whitespace-nowrap transition-all shadow-2xs cursor-pointer ${
            !selectedCategory
              ? "bg-blue-600 text-white shadow-xs"
              : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:text-blue-600"
          }`}
        >
          Semua Rubrik
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.slug === selectedCategory ? "" : cat.slug)}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold whitespace-nowrap transition-all shadow-2xs cursor-pointer ${
              selectedCategory === cat.slug
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:text-blue-600"
            }`}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: cat.color || "#2563eb" }}
            />
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Results View */}
      <div className="space-y-6">
        {debouncedQuery.trim().length <= 1 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 p-12 text-center text-sm text-slate-500 bg-slate-50/50 dark:bg-slate-900/40">
            <p className="font-semibold text-slate-700 dark:text-slate-300">
              Ketik minimal 2 karakter untuk mencari arsip berita secara seketika.
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Contoh kata kunci: &quot;AI&quot;, &quot;Energi&quot;, &quot;Saham&quot;,
              &quot;Antariksa&quot;
            </p>
          </div>
        ) : isError ? (
          <div className="flex items-center gap-3 rounded-2xl bg-red-50 dark:bg-red-950/40 p-5 text-sm text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span>Terjadi kesalahan saat mencari: {(error as Error)?.message}</span>
          </div>
        ) : data?.articles.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 p-14 text-center bg-white dark:bg-slate-900/70 shadow-xs">
            <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Tidak ada artikel yang cocok dengan &quot;{debouncedQuery}&quot;
            </p>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-md mx-auto">
              Coba gunakan istilah yang lebih umum atau atur ulang pilihan rubrik di atas.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between pb-3 mb-5 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                Ditemukan {data?.total} artikel untuk &quot;{debouncedQuery}&quot;
              </span>
              <span className="text-xs text-blue-600 dark:text-blue-400 font-bold">
                Pencarian Cepat
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {data?.articles.map((article) => (
                <div
                  key={article.id}
                  className="flex gap-4 p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/70 hover:shadow-lg hover:border-blue-500/40 transition-all group"
                >
                  <div className="relative h-24 sm:h-28 w-28 sm:w-32 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-800">
                    <Image
                      src={article.featuredImageUrl}
                      alt={article.title}
                      fill
                      sizes="128px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
                        {article.category.name}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                        <Link href={`/berita/${article.slug}`}>{article.title}</Link>
                      </h4>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                      <span>{formatRelativeTime(article.publishedAt)}</span>
                      <span className="text-blue-600 dark:text-blue-400 font-bold flex items-center gap-0.5">
                        Baca <ArrowUpRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
