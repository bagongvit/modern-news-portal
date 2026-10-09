"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Bookmark, Layers, Moon, Sun, Orbit, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useBookmarks } from "@/hooks/useBookmarks";
import { BookmarkDrawer } from "@/components/shared/BookmarkDrawer";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const emptySubscribe = () => () => {};

export function MobileBottomNav() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { totalBookmarks } = useBookmarks();
  const [isBookmarkOpen, setIsBookmarkOpen] = useState(false);
  const [isCategorySheetOpen, setIsCategorySheetOpen] = useState(false);

  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("solar");
    else setTheme("light");
  };

  return (
    <>
      {/* Category Bottom Sheet Modal for Mobile */}
      {isCategorySheetOpen && (
        <div className="fixed inset-0 z-50 md:hidden animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            onClick={() => setIsCategorySheetOpen(false)}
          />
          <div className="fixed bottom-0 inset-x-0 z-50 rounded-t-3xl border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                  <Layers className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
                  Kanal Rubrik Berita
                </h3>
              </div>
              <button
                onClick={() => setIsCategorySheetOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                aria-label="Tutup menu kategori"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5 py-2">
              {siteConfig.categoriesNav.map((cat) => {
                const isActive = pathname === cat.href;
                return (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    onClick={() => setIsCategorySheetOpen(false)}
                    className={cn(
                      "flex items-center gap-2.5 p-3 rounded-xl border text-xs font-bold transition-all",
                      isActive
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400"
                        : "border-slate-200/80 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 text-slate-800 dark:text-slate-200 hover:border-blue-400",
                    )}
                  >
                    <span className="h-2 w-2 rounded-full bg-blue-600" />
                    <span>{cat.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Persistent Mobile Bottom Navigation Bar */}
      <nav
        aria-label="Navigasi Bawah Seluler"
        className="fixed bottom-0 inset-x-0 z-40 md:hidden border-t border-slate-200/80 dark:border-slate-800/90 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md px-2 py-1 shadow-lg"
      >
        <div className="flex items-center justify-around h-13 max-w-md mx-auto">
          {/* 1. Beranda */}
          <Link
            href="/"
            className={cn(
              "flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-semibold transition-colors",
              pathname === "/"
                ? "text-blue-600 dark:text-blue-400 font-bold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-100",
            )}
          >
            <Home className="h-5 w-5 mb-0.5" />
            <span>Beranda</span>
          </Link>

          {/* 2. Cari / Spotlight Search */}
          <button
            onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
            className="flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-100 transition-colors cursor-pointer"
            aria-label="Buka pencarian kilat"
          >
            <Search className="h-5 w-5 mb-0.5" />
            <span>Cari</span>
          </button>

          {/* 3. Baca Nanti / Bookmark Drawer Trigger */}
          <button
            onClick={() => setIsBookmarkOpen(true)}
            className="relative flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            aria-label={`Daftar baca nanti (${totalBookmarks} tersimpan)`}
          >
            <div className="relative">
              <Bookmark className="h-5 w-5 mb-0.5" />
              {totalBookmarks > 0 && (
                <span className="absolute -top-1 -right-2 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-blue-600 text-[9px] font-black text-white shadow-xs">
                  {totalBookmarks}
                </span>
              )}
            </div>
            <span>Tersimpan</span>
          </button>

          {/* 4. Rubrik */}
          <button
            onClick={() => setIsCategorySheetOpen(true)}
            className={cn(
              "flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-semibold transition-colors cursor-pointer",
              pathname.startsWith("/kategori")
                ? "text-blue-600 dark:text-blue-400 font-bold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-100",
            )}
          >
            <Layers className="h-5 w-5 mb-0.5" />
            <span>Rubrik</span>
          </button>

          {/* 5. Ganti Tema */}
          <button
            onClick={toggleTheme}
            className="flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-100 transition-colors cursor-pointer"
            aria-label="Ganti mode tema (Terang / Gelap / Solar Cosmos)"
          >
            {mounted && theme === "solar" ? (
              <Orbit className="h-5 w-5 mb-0.5 text-amber-400" />
            ) : mounted && theme === "dark" ? (
              <Moon className="h-5 w-5 mb-0.5 text-blue-400" />
            ) : (
              <Sun className="h-5 w-5 mb-0.5 text-amber-500" />
            )}
            <span>{mounted && theme === "solar" ? "Solar" : "Tema"}</span>
          </button>
        </div>
      </nav>

      {/* Shared Bookmark Drawer */}
      <BookmarkDrawer isOpen={isBookmarkOpen} onClose={() => setIsBookmarkOpen(false)} />
    </>
  );
}
