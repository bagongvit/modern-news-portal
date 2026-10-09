"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  X,
  ArrowRight,
  TrendingUp,
  FileText,
  Bookmark,
  Sparkles,
  Command,
  Loader2,
  ExternalLink,
  Compass,
  Moon,
  Sun,
  Orbit,
  BarChart2,
  Tag,
  Zap,
} from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { useLiveSearch } from "@/features/search/useLiveSearch";
import { useTheme } from "next-themes";
import { toast } from "@/lib/toast";

interface ActionItem {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  badge?: string;
  category: "command" | "rubrik" | "link";
  action: () => void;
}

const SUGGESTED_TOPICS = [
  "Teknologi & AI",
  "Ekonomi & Bisnis",
  "Energi Hijau",
  "Sains & Antariksa",
  "Semikonduktor",
  "Pasar Saham",
];

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "articles" | "actions">("all");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const debouncedQuery = useDebounce(query, 200);
  const { data, isLoading } = useLiveSearch(debouncedQuery);

  // System quick action commands
  const quickActions: ActionItem[] = useMemo(() => {
    return [
      {
        id: "act-theme-dark",
        label: "Aktifkan Tema Gelap (Dark Mode)",
        description: "Tampilan kontras nyaman untuk malam hari",
        icon: Moon,
        badge: "Tampilan",
        category: "command",
        action: () => {
          setTheme("dark");
          toast.info("Tema Gelap Diaktifkan", "Tampilan");
          setIsOpen(false);
        },
      },
      {
        id: "act-theme-solar",
        label: "Aktifkan Tema Solar Cosmos",
        description: "Palet warna galaksi amber emas eksklusif",
        icon: Orbit,
        badge: "Tampilan",
        category: "command",
        action: () => {
          setTheme("solar");
          toast.info("Tema Solar Cosmos Diaktifkan", "Tampilan");
          setIsOpen(false);
        },
      },
      {
        id: "act-theme-light",
        label: "Aktifkan Tema Terang (Light Mode)",
        description: "Tampilan tajam untuk siang hari",
        icon: Sun,
        badge: "Tampilan",
        category: "command",
        action: () => {
          setTheme("light");
          toast.info("Tema Terang Diaktifkan", "Tampilan");
          setIsOpen(false);
        },
      },
      {
        id: "act-bookmarks",
        label: "Buka Daftar Baca Nanti (Bookmarks)",
        description: "Lihat koleksi artikel yang Anda simpan",
        icon: Bookmark,
        badge: "Fitur",
        category: "command",
        action: () => {
          window.dispatchEvent(new Event("open-bookmark-drawer"));
          setIsOpen(false);
        },
      },
      {
        id: "act-stats",
        label: "Lihat Statistik & Topic Diet Literasi",
        description: "Cek total menit baca dan distribusi minat baca Anda",
        icon: BarChart2,
        badge: "Analitik",
        category: "command",
        action: () => {
          window.dispatchEvent(new Event("open-bookmark-drawer"));
          setIsOpen(false);
        },
      },
      {
        id: "act-rubrik-tekno",
        label: "Rubrik Teknologi & AI",
        description: "Inovasi komputasi awan, gadget, dan revolusi kecerdasan buatan",
        icon: Zap,
        badge: "Rubrik",
        category: "rubrik",
        action: () => {
          setIsOpen(false);
          router.push("/kategori/teknologi");
        },
      },
      {
        id: "act-rubrik-bisnis",
        label: "Rubrik Bisnis & Finansial",
        description: "Analisis pasar modal, makroekonomi, dan kebijakan fiskal",
        icon: TrendingUp,
        badge: "Rubrik",
        category: "rubrik",
        action: () => {
          setIsOpen(false);
          router.push("/kategori/bisnis");
        },
      },
      {
        id: "act-rubrik-sains",
        label: "Rubrik Sains & Antariksa",
        description: "Eksplorasi luar angkasa, energi hijau, dan riset iklim",
        icon: Sparkles,
        badge: "Rubrik",
        category: "rubrik",
        action: () => {
          setIsOpen(false);
          router.push("/kategori/sains");
        },
      },
      {
        id: "act-editorial-standards",
        label: "Standar Editorial & Kode Etik Pers",
        description: "Pedoman verifikasi fakta dan transparansi ruang redaksi",
        icon: Compass,
        badge: "Redaksi",
        category: "link",
        action: () => {
          setIsOpen(false);
          router.push("/standar-editorial");
        },
      },
    ];
  }, [setTheme, router]);

  // Filtered action items based on query
  const filteredActions = useMemo(() => {
    if (!query.trim()) return quickActions.slice(0, 5);
    const q = query.toLowerCase();
    return quickActions.filter(
      (act) => act.label.toLowerCase().includes(q) || act.description.toLowerCase().includes(q)
    );
  }, [query, quickActions]);

  // Listen for Ctrl+K, Cmd+K, or custom open event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
      setActiveFilter("all");
    }
  }, [isOpen]);

  const handleSelectArticle = (slug: string) => {
    setIsOpen(false);
    router.push(`/berita/${slug}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-3 sm:p-6 md:p-16 flex items-start justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity duration-200"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Palette Modal */}
      <div className="relative w-full max-w-2xl transform overflow-hidden rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl transition-all animate-in fade-in zoom-in-95 duration-200 z-10">
        {/* Search Header Input */}
        <div className="flex items-center border-b border-slate-200 dark:border-slate-800 px-4 py-3.5">
          <Search className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ketik topik, judul berita, perintah sistem (mis: tema, simpanan)..."
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
          />
          {isLoading && <Loader2 className="h-4 w-4 text-blue-600 animate-spin mr-2 shrink-0" />}
          {query && !isLoading && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mr-2 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-500">
            ESC
          </kbd>
        </div>

        {/* Filter Pills Bar */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/60 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
              activeFilter === "all"
                ? "bg-blue-600 text-white shadow-2xs"
                : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-blue-500 border border-slate-200 dark:border-slate-700"
            }`}
          >
            Semua
          </button>
          <button
            onClick={() => setActiveFilter("articles")}
            className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
              activeFilter === "articles"
                ? "bg-blue-600 text-white shadow-2xs"
                : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-blue-500 border border-slate-200 dark:border-slate-700"
            }`}
          >
            Artikel Berita ({data?.articles?.length || 0})
          </button>
          <button
            onClick={() => setActiveFilter("actions")}
            className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
              activeFilter === "actions"
                ? "bg-blue-600 text-white shadow-2xs"
                : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-blue-500 border border-slate-200 dark:border-slate-700"
            }`}
          >
            Perintah & Pintasan ({filteredActions.length})
          </button>
        </div>

        {/* Content Area */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4">
          {/* 1. System Actions Section */}
          {(activeFilter === "all" || activeFilter === "actions") && filteredActions.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2 px-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <span>Perintah & Pintasan Cepat</span>
                <span className="text-[10px] text-blue-600 dark:text-blue-400">Tekan untuk eksekusi</span>
              </div>
              <div className="space-y-1.5">
                {filteredActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <div
                      key={action.id}
                      onClick={action.action}
                      className="group flex items-center justify-between gap-3 p-2.5 rounded-2xl hover:bg-blue-50/80 dark:hover:bg-slate-800/80 transition-colors cursor-pointer border border-transparent hover:border-blue-200 dark:hover:border-slate-700"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 shrink-0">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {action.label}
                          </h4>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                            {action.description}
                          </p>
                        </div>
                      </div>

                      {action.badge && (
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-wider shrink-0">
                          {action.badge}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. Article Results Section */}
          {(activeFilter === "all" || activeFilter === "articles") && query.trim().length > 1 && (
            <div>
              <div className="flex items-center justify-between mb-2 px-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <span>Hasil Berita Relevan</span>
                <span>{data?.articles?.length || 0} Ditemukan</span>
              </div>

              {data?.articles && data.articles.length > 0 ? (
                <div className="space-y-2">
                  {data.articles.map((article) => (
                    <div
                      key={article.id}
                      onClick={() => handleSelectArticle(article.slug)}
                      className="group flex items-center justify-between gap-3 p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {article.featuredImageUrl && (
                          <div className="relative h-12 w-14 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                            <Image
                              src={article.featuredImageUrl}
                              alt={article.title}
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="min-w-0">
                          <span
                            className="text-[10px] font-bold uppercase tracking-wider block"
                            style={{ color: article.category?.color || "#2563eb" }}
                          >
                            {article.category?.name}
                          </span>
                          <h4 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {article.title}
                          </h4>
                          <span className="text-[10px] text-slate-400">
                            {article.author?.name} • ±{article.readingTimeMinutes} menit baca
                          </span>
                        </div>
                      </div>

                      <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0" />
                    </div>
                  ))}
                </div>
              ) : !isLoading ? (
                <div className="py-6 text-center text-xs text-slate-500">
                  Tidak ditemukan artikel untuk &quot;{query}&quot;. Coba kata kunci yang lebih umum.
                </div>
              ) : null}
            </div>
          )}

          {/* 3. Suggested Topics Pill Cloud */}
          {!query.trim() && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2 px-2 flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-amber-500" />
                <span>Tren Isu Redaksi</span>
              </span>
              <div className="flex flex-wrap gap-2 px-2">
                {SUGGESTED_TOPICS.map((topic, idx) => (
                  <button
                    key={idx}
                    onClick={() => setQuery(topic)}
                    className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950 text-xs text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors cursor-pointer"
                  >
                    #{topic}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 px-4 py-2.5 text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono">
                Ctrl
              </kbd>
              <kbd className="rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono">
                K
              </kbd>
              <span>untuk buka kapan saja</span>
            </span>
          </div>

          <Link
            href="/search"
            onClick={() => setIsOpen(false)}
            className="font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>Pencarian Lengkap</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
