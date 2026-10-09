"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  PenSquare,
  ExternalLink,
  Clock,
  Eye,
  Filter,
  CheckCircle2,
  FileEdit,
  Archive,
  ArrowUpDown,
  Sparkles,
} from "lucide-react";
import { formatRelativeTime, formatReadingTime } from "@/lib/utils";
import { ReporterAiAssistantModal } from "./ReporterAiAssistantModal";

export interface ReporterArticle {
  id: string | number;
  title: string;
  slug: string;
  lead?: string;
  status: "published" | "draft" | "archived";
  updatedAt: string;
  publishedAt?: string;
  readingTimeMinutes?: number;
  viewCount?: number;
  category?: {
    id?: string | number;
    name?: string;
    slug?: string;
    color?: string;
  } | null;
}

interface ReporterArticleDeskProps {
  articles: ReporterArticle[];
}

export function ReporterArticleDesk({ articles }: ReporterArticleDeskProps) {
  const [activeTab, setActiveTab] = useState<"all" | "published" | "draft" | "archived">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"latest" | "title" | "views">("latest");
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // Tab counts
  const counts = useMemo(() => {
    return {
      all: articles.length,
      published: articles.filter((a) => a.status === "published").length,
      draft: articles.filter((a) => a.status === "draft").length,
      archived: articles.filter((a) => a.status === "archived").length,
    };
  }, [articles]);

  // Filter and sort articles
  const filteredArticles = useMemo(() => {
    return articles
      .filter((article) => {
        // Tab filter
        if (activeTab !== "all" && article.status !== activeTab) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchTitle = article.title.toLowerCase().includes(q);
          const matchLead = (article.lead || "").toLowerCase().includes(q);
          const matchCat = (article.category?.name || "").toLowerCase().includes(q);
          return matchTitle || matchLead || matchCat;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "title") {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === "views") {
          return (b.viewCount || 0) - (a.viewCount || 0);
        }
        // default latest updatedAt
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      });
  }, [articles, activeTab, searchQuery, sortBy]);

  return (
    <div className="space-y-6">
      {/* Search and Filters Bar */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-4 shadow-sm backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0">
            <button
              onClick={() => setActiveTab("all")}
              className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-slate-900 text-white shadow-sm dark:bg-blue-600"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              <span>Semua Tulisan</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] font-extrabold ${
                  activeTab === "all"
                    ? "bg-white/20 text-white"
                    : "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                }`}
              >
                {counts.all}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("published")}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all cursor-pointer ${
                activeTab === "published"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-950/70"
              }`}
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Terbit</span>
              <span className="rounded-full bg-emerald-200/60 dark:bg-emerald-900 px-1.5 py-0.2 text-[10px]">
                {counts.published}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("draft")}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all cursor-pointer ${
                activeTab === "draft"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-300 dark:hover:bg-amber-950/70"
              }`}
            >
              <FileEdit className="h-3.5 w-3.5" />
              <span>Draf</span>
              <span className="rounded-full bg-amber-200/60 dark:bg-amber-900 px-1.5 py-0.2 text-[10px]">
                {counts.draft}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("archived")}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all cursor-pointer ${
                activeTab === "archived"
                  ? "bg-slate-700 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
              }`}
            >
              <Archive className="h-3.5 w-3.5" />
              <span>Arsip</span>
              <span className="rounded-full bg-slate-200 dark:bg-slate-700 px-1.5 py-0.2 text-[10px]">
                {counts.archived}
              </span>
            </button>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-60">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari naskah artikel..."
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "latest" | "title" | "views")}
                className="appearance-none rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 pl-7 pr-7 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="latest">Terbaru</option>
                <option value="views">Terpopuler</option>
                <option value="title">Judul (A-Z)</option>
              </select>
              <ArrowUpDown className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-400" />
            </div>

            {/* AI Assistant Button */}
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-xs cursor-pointer transition-all"
              title="Buka Asisten AI Redaksi"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Asisten AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* AI Assistant Modal */}
      <ReporterAiAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />

      {/* Article Cards Grid */}
      {filteredArticles.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 mb-3">
            <Filter className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Tidak ada artikel yang cocok
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            {searchQuery
              ? `Tidak ditemukan tulisan dengan kata kunci "${searchQuery}". Coba kata kunci lain atau bersihkan pencarian.`
              : "Belum ada tulisan di kategori status ini."}
          </p>
          {(searchQuery || activeTab !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveTab("all");
              }}
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-blue-50 dark:bg-blue-950 px-3.5 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-100 transition-colors cursor-pointer"
            >
              <span>Reset Filter</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredArticles.map((article) => {
            const isPublished = article.status === "published";
            const isDraft = article.status === "draft";
            const isArchived = article.status === "archived";

            return (
              <article
                key={article.id}
                className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 shadow-xs hover:shadow-md hover:border-blue-400/60 dark:hover:border-blue-700/60 transition-all duration-200"
              >
                {/* Left Content Area */}
                <div className="flex-1 min-w-0 space-y-2.5">
                  {/* Badges Bar */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Status Pill */}
                    {isPublished && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Tayang Publik</span>
                      </span>
                    )}
                    {isDraft && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 text-[11px] font-bold text-amber-700 dark:text-amber-400 border border-amber-200/80 dark:border-amber-800">
                        <FileEdit className="h-3 w-3" />
                        <span>Draf Naskah</span>
                      </span>
                    )}
                    {isArchived && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-[11px] font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        <Archive className="h-3 w-3" />
                        <span>Diarsipkan</span>
                      </span>
                    )}

                    {/* Category Tag */}
                    {article.category?.name && (
                      <span
                        className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-xs"
                        style={{ backgroundColor: article.category.color || "#2563eb" }}
                      >
                        {article.category.name}
                      </span>
                    )}

                    <span className="text-[11px] text-slate-400 dark:text-slate-500">
                      • Diperbarui {formatRelativeTime(article.updatedAt)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white leading-snug line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    <a href={`/admin/collections/articles/${article.id}`}>{article.title}</a>
                  </h3>

                  {/* Lead Snippet */}
                  {article.lead && (
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {article.lead}
                    </p>
                  )}

                  {/* Article Stats Meta */}
                  <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      <span>{formatReadingTime(article.readingTimeMinutes || 3)}</span>
                    </div>

                    {isPublished && (
                      <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-semibold">
                        <Eye className="h-3.5 w-3.5" />
                        <span>{article.viewCount?.toLocaleString("id-ID") || "0"} pembaca</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800 shrink-0">
                  <a
                    href={`/admin/collections/articles/${article.id}`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2 text-xs font-bold text-white shadow-sm shadow-blue-500/20 hover:shadow-md transition-all cursor-pointer"
                  >
                    <PenSquare className="h-3.5 w-3.5" />
                    <span>Edit Naskah</span>
                  </a>

                  {isPublished && (
                    <Link
                      href={`/berita/${article.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
                      title="Buka tampilan artikel publik"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>Lihat di Web</span>
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
