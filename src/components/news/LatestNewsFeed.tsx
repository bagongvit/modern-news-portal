"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Article, Category } from "@/types/news";
import { NewsCard } from "./NewsCard";
import { Flame, ArrowRight, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";

interface LatestNewsFeedProps {
  articles: Article[];
  categories: Category[];
}

export function LatestNewsFeed({ articles, categories }: LatestNewsFeedProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Only show category pills that actually have at least 1 article
  const activeCategories = useMemo(() => {
    const counts = new Map<string, number>();
    articles.forEach((a) => {
      const slug = a.category.slug;
      counts.set(slug, (counts.get(slug) || 0) + 1);
    });

    return categories.filter((c) => (counts.get(c.slug) || 0) > 0);
  }, [articles, categories]);

  const filteredArticles = useMemo(() => {
    if (selectedCategory === "all") {
      return articles.slice(0, 6);
    }
    return articles.filter((a) => a.category.slug === selectedCategory).slice(0, 6);
  }, [articles, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Header Section with Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b-2 border-slate-950 dark:border-slate-100 gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <Flame className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 dark:text-white">
              Berita Terkini & Analisis
            </h2>
          </div>
        </div>
        <Link
          href="/search"
          className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
        >
          <span>Buka Seluruh Arsip Berita</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Interactive Category Filter Pills */}
      <div
        className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1"
        role="tablist"
        aria-label="Filter Berita Terkini"
      >
        <button
          role="tab"
          aria-selected={selectedCategory === "all"}
          onClick={() => setSelectedCategory("all")}
          className={cn(
            "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer",
            selectedCategory === "all"
              ? "bg-blue-600 text-white shadow-xs font-black"
              : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700",
          )}
        >
          Semua Berita ({articles.length})
        </button>

        {activeCategories.map((cat) => {
          const isSelected = selectedCategory === cat.slug;
          const count = articles.filter((a) => a.category.slug === cat.slug).length;

          return (
            <button
              key={cat.id}
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelectedCategory(cat.slug)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer",
                isSelected
                  ? "bg-blue-600 text-white shadow-xs font-black"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700",
              )}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: cat.color || "#2563eb" }}
              />
              <span>{cat.name}</span>
              <span className="opacity-70 text-[10px]">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Articles Feed */}
      {filteredArticles.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-12 text-center bg-slate-50/50 dark:bg-slate-900/40">
          <Newspaper className="h-8 w-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Belum ada berita pada topik ini saat ini.
          </p>
          <button
            onClick={() => setSelectedCategory("all")}
            className="mt-3 text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer"
          >
            Kembali ke semua berita
          </button>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Top Story as Horizontal Card */}
          {filteredArticles[0] && <NewsCard article={filteredArticles[0]} variant="horizontal" />}

          {/* 2-Column Grid for Next Stories */}
          {filteredArticles.length > 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredArticles.slice(1, 5).map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          )}

          {/* Bottom Story as Horizontal Card (if 6 items available) */}
          {filteredArticles[5] && <NewsCard article={filteredArticles[5]} variant="horizontal" />}
        </div>
      )}
    </div>
  );
}
