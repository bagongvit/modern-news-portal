"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useReadingHistory } from "@/hooks/useReadingHistory";
import { formatReadingTime, formatRelativeTime } from "@/lib/utils";
import {
  Bookmark,
  History,
  BarChart2,
  X,
  Trash2,
  ArrowUpRight,
  Clock,
  Sparkles,
  Award,
  BookOpen,
  PieChart,
  CheckCircle2,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/lib/toast";

interface BookmarkDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookmarkDrawer({ isOpen, onClose }: BookmarkDrawerProps) {
  const [activeTab, setActiveTab] = useState<"bookmarks" | "history" | "stats">("bookmarks");
  const { bookmarks, removeBookmark, clearBookmarks } = useBookmarks();
  const { history, removeFromHistory, clearHistory } = useReadingHistory();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Reading Stats Calculation
  const stats = useMemo(() => {
    const totalArticles = history.length;
    const totalMinutes = history.reduce((acc, curr) => acc + (curr.readingTimeMinutes || 3), 0);

    // Group by category
    const categoryCounts: Record<string, { count: number; color?: string }> = {};
    history.forEach((h) => {
      const cat = h.categoryName || "Umum";
      if (!categoryCounts[cat]) {
        categoryCounts[cat] = { count: 0, color: h.categoryColor };
      }
      categoryCounts[cat].count += 1;
    });

    const categoryBreakdown = Object.entries(categoryCounts)
      .map(([name, data]) => ({
        name,
        count: data.count,
        color: data.color || "#2563eb",
        percentage: totalArticles > 0 ? Math.round((data.count / totalArticles) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count);

    // Reading badge level
    let badgeTitle = "Penjelajah Berita Pemula";
    let badgeDesc = "Mulai bangun kebiasaan membaca berita berkualitas setiap hari.";
    if (totalArticles >= 10) {
      badgeTitle = "Eksekutif Melek Berita (Literat Senior)";
      badgeDesc = "Wawasan Anda sangat mendalam dan terhubung dengan dinamika global.";
    } else if (totalArticles >= 4) {
      badgeTitle = "Pembaca Kritis Terinformasi";
      badgeDesc = "Secara konsisten mengikuti perkembangan isu penting bangsa.";
    }

    return {
      totalArticles,
      totalMinutes,
      categoryBreakdown,
      badgeTitle,
      badgeDesc,
      topCategory: categoryBreakdown[0]?.name || "Belum ada",
    };
  }, [history]);

  const handleExportData = () => {
    if (bookmarks.length === 0 && history.length === 0) {
      toast.info("Belum ada data bacaan untuk diekspor.", "Ekspor");
      return;
    }
    const exportPayload = {
      exportedAt: new Date().toISOString(),
      portal: "Modern News Portal",
      stats: {
        totalArticlesRead: stats.totalArticles,
        literacyMinutes: stats.totalMinutes,
        badgeTitle: stats.badgeTitle,
        topCategory: stats.topCategory,
      },
      bookmarks,
      history,
    };
    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `modern-news-arsip-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Arsip literasi berhasil diunduh sebagai file JSON!", "Ekspor Data");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Flyout Panel */}
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <aside
          aria-label="Daftar Artikel Tersimpan, Riwayat, dan Statistik"
          className="w-screen max-w-md bg-white dark:bg-slate-950 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col transform transition-transform duration-300 ease-in-out animate-in slide-in-from-right"
        >
          {/* Header */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs">
                  {activeTab === "bookmarks" && <Bookmark className="h-4 w-4 fill-white" />}
                  {activeTab === "history" && <History className="h-4 w-4 text-white" />}
                  {activeTab === "stats" && <BarChart2 className="h-4 w-4 text-white" />}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-950 dark:text-white">
                    {activeTab === "bookmarks" && "Daftar Baca Nanti"}
                    {activeTab === "history" && "Riwayat Bacaan"}
                    {activeTab === "stats" && "Statistik Wawasan Saya"}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {activeTab === "bookmarks" && `${bookmarks.length} artikel tersimpan`}
                    {activeTab === "history" && `${history.length} artikel telah dibaca`}
                    {activeTab === "stats" && `Total ±${stats.totalMinutes} menit literasi digital`}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Tutup panel"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Segmented 3-Tab Switcher */}
            <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-slate-200/70 dark:bg-slate-800/80 text-[11px] font-bold">
              <button
                onClick={() => setActiveTab("bookmarks")}
                className={cn(
                  "flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg transition-all cursor-pointer",
                  activeTab === "bookmarks"
                    ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-2xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white",
                )}
              >
                <Bookmark className="h-3 w-3" />
                <span>Simpan ({bookmarks.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("history")}
                className={cn(
                  "flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg transition-all cursor-pointer",
                  activeTab === "history"
                    ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-2xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white",
                )}
              >
                <History className="h-3 w-3" />
                <span>Riwayat ({history.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("stats")}
                className={cn(
                  "flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg transition-all cursor-pointer",
                  activeTab === "stats"
                    ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-2xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white",
                )}
              >
                <BarChart2 className="h-3 w-3" />
                <span>Statistik</span>
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {activeTab === "bookmarks" && (
              // BOOKMARKS TAB
              bookmarks.length === 0 ? (
                <div className="py-16 text-center space-y-4">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/60 shadow-xs">
                    <Bookmark className="h-8 w-8" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      Belum Ada Berita Tersimpan
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
                      Klik tombol <strong>&quot;Baca Nanti&quot;</strong> atau ikon bookmark (🔖) pada
                      artikel untuk menyimpannya di sini.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {bookmarks.map((item) => (
                    <article
                      key={item.id}
                      className="group relative flex gap-3.5 p-3.5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500/40 hover:shadow-md transition-all"
                    >
                      <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                        <Image
                          src={item.featuredImageUrl}
                          alt={item.title}
                          fill
                          sizes="96px"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <span
                            className="text-[10px] font-bold uppercase tracking-wider block mb-0.5"
                            style={{ color: item.categoryColor || "#2563eb" }}
                          >
                            {item.categoryName}
                          </span>
                          <h4 className="text-xs font-bold text-slate-950 dark:text-slate-100 line-clamp-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            <Link href={`/berita/${item.slug}`} onClick={onClose}>
                              {item.title}
                            </Link>
                          </h4>
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 mt-2">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{formatReadingTime(item.readingTimeMinutes)}</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => removeBookmark(item.id)}
                              className="p-1 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                              title="Hapus dari simpanan"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                            <Link
                              href={`/berita/${item.slug}`}
                              onClick={onClose}
                              className="p-1 rounded-md text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
                            >
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )
            )}

            {activeTab === "history" && (
              // HISTORY TAB
              history.length === 0 ? (
                <div className="py-16 text-center space-y-4">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 shadow-xs">
                    <History className="h-8 w-8" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      Belum Ada Riwayat Bacaan
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
                      Artikel yang Anda buka akan otomatis tercatat di sini sehingga Anda dapat melanjutkan bacaan kapan saja.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {history.map((item) => (
                    <article
                      key={item.id}
                      className="group relative flex gap-3.5 p-3.5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500/40 hover:shadow-md transition-all"
                    >
                      <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                        <Image
                          src={item.featuredImageUrl}
                          alt={item.title}
                          fill
                          sizes="96px"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-0.5">
                            <span
                              className="text-[10px] font-bold uppercase tracking-wider block"
                              style={{ color: item.categoryColor || "#2563eb" }}
                            >
                              {item.categoryName}
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium">
                              {formatRelativeTime(item.viewedAt)}
                            </span>
                          </div>
                          <h4 className="text-xs font-bold text-slate-950 dark:text-slate-100 line-clamp-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            <Link href={`/berita/${item.slug}`} onClick={onClose}>
                              {item.title}
                            </Link>
                          </h4>
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 mt-2">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{formatReadingTime(item.readingTimeMinutes)}</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => removeFromHistory(item.id)}
                              className="p-1 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                              title="Hapus dari riwayat"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                            <Link
                              href={`/berita/${item.slug}`}
                              onClick={onClose}
                              className="p-1 rounded-md text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
                            >
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )
            )}

            {activeTab === "stats" && (
              // STATS TAB (Reading Diet & Insights)
              <div className="space-y-5 animate-in fade-in duration-200">
                {/* Achievement Level Badge */}
                <div className="p-4 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-amber-300" />
                    <span className="text-[11px] font-black uppercase tracking-wider text-blue-200">
                      Profil Literasi Pembaca
                    </span>
                  </div>
                  <h4 className="text-base font-extrabold leading-tight">
                    {stats.badgeTitle}
                  </h4>
                  <p className="text-xs text-blue-100 leading-relaxed font-light">
                    {stats.badgeDesc}
                  </p>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Artikel Selesai
                    </span>
                    <p className="text-2xl font-black text-slate-950 dark:text-white">
                      {stats.totalArticles}
                    </p>
                    <span className="text-[10px] text-slate-400">Total eksplorasi</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Waktu Literasi
                    </span>
                    <p className="text-2xl font-black text-blue-600 dark:text-blue-400">
                      ±{stats.totalMinutes}m
                    </p>
                    <span className="text-[10px] text-slate-400">Menit berkualitas</span>
                  </div>
                </div>

                {/* Topic Breakdown Bar */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5 uppercase tracking-wider">
                      <PieChart className="h-3.5 w-3.5 text-blue-600" />
                      <span>Distribusi Minat Topik</span>
                    </h5>
                    <span className="text-[10px] text-slate-400">
                      Favorit: <strong>{stats.topCategory}</strong>
                    </span>
                  </div>

                  {stats.categoryBreakdown.length > 0 ? (
                    <div className="space-y-2.5">
                      {stats.categoryBreakdown.map((cat) => (
                        <div key={cat.name} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="font-semibold text-slate-800 dark:text-slate-200">
                              {cat.name}
                            </span>
                            <span className="text-slate-500 font-mono text-[11px]">
                              {cat.count} artikel ({cat.percentage}%)
                            </span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${cat.percentage}%`,
                                backgroundColor: cat.color,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 text-center py-4">
                      Belum ada data topik. Mulai membaca berita untuk melihat grafik minat Anda.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 flex items-center justify-between">
            {activeTab === "bookmarks" && bookmarks.length > 0 && (
              <button
                onClick={clearBookmarks}
                className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Hapus Semua ({bookmarks.length})</span>
              </button>
            )}

            {activeTab === "history" && history.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Bersihkan Riwayat ({history.length})</span>
              </button>
            )}

            {activeTab === "stats" && (
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>Data privat tersimpan lokal</span>
              </div>
            )}

            <div className="flex items-center gap-2 ml-auto">
              {(bookmarks.length > 0 || history.length > 0) && (
                <button
                  onClick={handleExportData}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 text-xs font-bold transition-all shadow-2xs cursor-pointer"
                  title="Ekspor daftar baca nanti dan riwayat sebagai file JSON"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Ekspor</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
              >
                Selesai
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
