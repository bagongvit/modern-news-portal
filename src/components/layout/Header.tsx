"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import {
  Search,
  Menu,
  X,
  Newspaper,
  TrendingUp,
  Sparkles,
  Command,
  User,
  Bookmark,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { HeaderUserMenu } from "./HeaderUserMenu";
import { BookmarkDrawer } from "@/components/shared/BookmarkDrawer";
import { useBookmarks } from "@/hooks/useBookmarks";

export interface HeaderUser {
  name?: string | null;
  email?: string | null;
  role?: string | null;
}

interface HeaderProps {
  currentUser?: HeaderUser | null;
}

const TRENDING_TAGS = [
  { label: "AI Generatif", href: "/search?q=AI" },
  { label: "Transisi Energi", href: "/search?q=Energi" },
  { label: "Pasar Saham", href: "/search?q=Saham" },
  { label: "Semikonduktor", href: "/search?q=Semikonduktor" },
  { label: "Eksoplanet", href: "/search?q=Antariksa" },
  { label: "Kereta Cepat", href: "/search?q=Kereta" },
  { label: "Deep Work", href: "/search?q=Deep+Work" },
];

export function Header({ currentUser }: HeaderProps = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookmarkDrawerOpen, setBookmarkDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { totalBookmarks } = useBookmarks();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut listener for Ctrl+K handled globally by CommandPalette


  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "border-b border-slate-200/90 dark:border-slate-800/90 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-xs"
          : "border-b border-slate-200/70 dark:border-slate-800/70 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md",
      )}
    >
      <div className="container mx-auto px-4">
        {/* Main Header Bar */}
        <div className="flex h-16 sm:h-18 items-center justify-between gap-4">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-3 font-bold tracking-tight text-slate-950 dark:text-white group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-0.5"
            >
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/25 group-hover:scale-105 transition-transform duration-200">
                <Newspaper className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500 border border-white dark:border-slate-950" />
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl sm:text-2xl font-black tracking-tight leading-none text-slate-950 dark:text-white">
                    MODERN<span className="text-blue-600 dark:text-blue-400">NEWS</span>
                  </span>
                  <span className="hidden sm:inline-block rounded-xs bg-blue-100 dark:bg-blue-950/70 px-1.5 py-0.5 text-[9px] font-black tracking-wider text-blue-700 dark:text-blue-300 uppercase">
                    ID
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold mt-0.5">
                  Jurnalisme Terpercaya & Independen
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1" aria-label="Navigasi Utama">
              {siteConfig.mainNav.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-3 py-1.5 text-sm font-semibold rounded-lg transition-all",
                      isActive
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 shadow-2xs"
                        : "text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-2.5">
            {/* Search Pill with Keyboard Hint */}
            <button
              onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
              className="flex h-9 sm:h-10 items-center gap-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 px-3 sm:px-3.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 hover:border-blue-400 dark:hover:border-blue-600 hover:text-slate-900 dark:hover:text-white transition-all shadow-2xs group cursor-pointer"
              aria-label="Cari artikel berita (Ctrl + K)"
            >
              <Search className="h-4 w-4 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              <span className="hidden sm:inline">Cari Berita...</span>
              <span className="hidden md:inline-flex items-center gap-0.5 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-400">
                <Command className="h-2.5 w-2.5" /> K
              </span>
            </button>

            {/* Dynamic Interactive User / Dashboard Menu */}
            {currentUser ? (
              <HeaderUserMenu user={currentUser} />
            ) : (
              <Link
                href="/reporter"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-2xs"
                title="Masuk ke Ruang Wartawan & Redaksi"
              >
                <User className="h-3.5 w-3.5 text-slate-500" />
                <span>Masuk</span>
              </Link>
            )}

            {/* Saved Articles / Bookmarks Trigger */}
            <button
              onClick={() => setBookmarkDrawerOpen(true)}
              className="relative flex h-9 sm:h-10 w-9 sm:w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500 transition-all shadow-2xs cursor-pointer"
              title="Buka Daftar Baca Nanti"
              aria-label={`Daftar baca nanti (${totalBookmarks} tersimpan)`}
            >
              <Bookmark className="h-4 w-4" />
              {totalBookmarks > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-black text-white shadow-xs animate-in zoom-in">
                  {totalBookmarks}
                </span>
              )}
            </button>

            <ThemeToggle />

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-label="Menu navigasi mobile"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Sub-Header: Categories & Trending Strip */}
        <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 py-2 overflow-x-auto no-scrollbar gap-6 text-xs">
          {/* Main Categories Navigation */}
          <div className="flex items-center space-x-6 shrink-0">
            {siteConfig.categoriesNav.map((cat) => {
              const isActive = pathname === cat.href;
              return (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className={cn(
                    "font-bold uppercase tracking-wider whitespace-nowrap transition-colors py-1",
                    isActive
                      ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                      : "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400",
                  )}
                >
                  {cat.label}
                </Link>
              );
            })}
          </div>

          {/* Quick Trending Tags Pills (Desktop) */}
          <div className="hidden xl:flex items-center space-x-2 shrink-0 border-l border-slate-200 dark:border-slate-800 pl-4">
            <span className="flex items-center gap-1 font-bold uppercase tracking-wider text-[10px] text-red-600 dark:text-red-400">
              <TrendingUp className="h-3 w-3" />
              <span>Trending:</span>
            </span>
            {TRENDING_TAGS.slice(0, 4).map((tag) => (
              <Link
                key={tag.label}
                href={tag.href}
                className="rounded-full bg-slate-100 dark:bg-slate-800/80 px-2.5 py-0.5 text-[11px] font-medium text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
              >
                #{tag.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl px-4 py-6 shadow-2xl animate-in slide-in-from-top duration-200 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-5">
            {/* Quick Mobile Search */}
            <Link
              href="/search"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-3 text-sm text-slate-500"
            >
              <Search className="h-4 w-4 text-blue-600" />
              <span>Cari berita, topik, jurnalis...</span>
            </Link>

            {/* Mobile Auth Button */}
            {currentUser ? (
              <div className="space-y-1.5">
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl bg-blue-600 p-3 text-sm font-bold text-white shadow-md"
                >
                  <div className="flex items-center gap-2">
                    <span>📊</span>
                    <span>Dashboard Admin (Panel CMS)</span>
                  </div>
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-md font-semibold">
                    Buka →
                  </span>
                </Link>
                <Link
                  href="/reporter"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl bg-slate-100 dark:bg-slate-800 p-3 text-sm font-semibold text-slate-800 dark:text-slate-200"
                >
                  <div className="flex items-center gap-2">
                    <span>📰</span>
                    <span>Meja Redaksi Wartawan</span>
                  </div>
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-bold">Buka →</span>
                </Link>
              </div>
            ) : (
              <Link
                href="/reporter"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-blue-600" />
                  <span>Masuk ke Ruang Wartawan</span>
                </div>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-bold">Masuk →</span>
              </Link>
            )}

            {/* Mobile Bookmark Item */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setBookmarkDrawerOpen(true);
              }}
              className="flex items-center justify-between rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/60 p-3 text-sm font-semibold text-blue-900 dark:text-blue-200 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Bookmark className="h-4 w-4 text-blue-600 fill-blue-600" />
                <span>Daftar Baca Nanti</span>
              </div>
              <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold">
                {totalBookmarks}
              </span>
            </button>

            {/* Rubrik Berita */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Kategori Berita
              </div>
              <div className="grid grid-cols-2 gap-2">
                {siteConfig.categoriesNav.map((cat) => (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                    <span>{cat.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Navigasi Utama */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Menu Portal
              </div>
              <div className="flex flex-col space-y-1">
                {siteConfig.mainNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 py-1.5"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Trending Tags on Mobile */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 mb-2">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Topik Hangat Hari Ini</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {TRENDING_TAGS.map((tag) => (
                  <Link
                    key={tag.label}
                    href={tag.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white"
                  >
                    #{tag.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Slide-in Saved Articles / Bookmarks Drawer */}
      <BookmarkDrawer isOpen={bookmarkDrawerOpen} onClose={() => setBookmarkDrawerOpen(false)} />
    </header>
  );
}
