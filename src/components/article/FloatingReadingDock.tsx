"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { MessageSquare, Share2, Check, ArrowUp, Eye, EyeOff } from "lucide-react";
import { useReadingProgress } from "@/hooks/useReadingProgress";
import { BookmarkButton } from "@/components/shared/BookmarkButton";
import { BookmarkedArticle } from "@/hooks/useBookmarks";
import { cn } from "@/lib/utils";

interface FloatingReadingDockProps {
  article: BookmarkedArticle;
  commentCount?: number;
}

const STORAGE_KEY = "modern_news_reader_font_size";

function subscribeToFontSize(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("reader-font-size-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("reader-font-size-change", callback);
  };
}

function getFontSizeSnapshot(): "base" | "lg" | "xl" {
  if (typeof window === "undefined") return "base";
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "lg" || saved === "xl" || saved === "base") return saved;
  } catch {}
  return "base";
}

function getFontSizeServerSnapshot(): "base" | "lg" | "xl" {
  return "base";
}

export function FloatingReadingDock({ article, commentCount = 0 }: FloatingReadingDockProps) {
  const progress = useReadingProgress();
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const savedFontSize = useSyncExternalStore(
    subscribeToFontSize,
    getFontSizeSnapshot,
    getFontSizeServerSnapshot,
  );
  const [localFontSize, setLocalFontSize] = useState<"base" | "lg" | "xl" | null>(null);
  const fontSize = localFontSize ?? savedFontSize;

  const [isFocusMode, setIsFocusMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 350);
    };

    const handleFocusChange = () => {
      setIsFocusMode(document.body.classList.contains("editorial-focus-mode"));
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && document.body.classList.contains("editorial-focus-mode")) {
        document.body.classList.remove("editorial-focus-mode");
        window.dispatchEvent(new Event("editorial-focus-mode-change"));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("editorial-focus-mode-change", handleFocusChange);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("editorial-focus-mode-change", handleFocusChange);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const toggleFocusMode = () => {
    const nextState = !document.body.classList.contains("editorial-focus-mode");
    if (nextState) {
      document.body.classList.add("editorial-focus-mode");
    } else {
      document.body.classList.remove("editorial-focus-mode");
    }
    setIsFocusMode(nextState);
    window.dispatchEvent(new Event("editorial-focus-mode-change"));
  };

  const handleSizeChange = (size: "base" | "lg" | "xl") => {
    setLocalFontSize(size);
    try {
      localStorage.setItem(STORAGE_KEY, size);
      window.dispatchEvent(new Event("reader-font-size-change"));
    } catch {}

    const contentEl = document.getElementById("main-article-content");
    if (contentEl) {
      contentEl.classList.remove("font-size-base", "font-size-lg", "font-size-xl");
      contentEl.classList.add(`font-size-${size}`);
    }
  };

  const scrollToComments = () => {
    const el = document.getElementById("komentar");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCopy = async () => {
    if (typeof window !== "undefined") {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {}
    }
  };

  return (
    <aside
      aria-label="Toolbar Membaca Melayang"
      className={cn(
        "fixed z-40 transition-all duration-300 ease-out left-1/2 -translate-x-1/2",
        "bottom-18 md:bottom-7",
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-8 pointer-events-none",
      )}
    >
      <div className="flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-4 py-2 rounded-full border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-xl text-slate-800 dark:text-slate-100">
        {/* 1. Progress Indicator */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-[11px] font-mono font-bold transition-colors cursor-pointer group"
          title="Klik untuk kembali ke atas artikel"
        >
          <ArrowUp className="h-3 w-3 group-hover:-translate-y-0.5 transition-transform" />
          <span>{Math.min(100, Math.round(progress))}%</span>
        </button>

        <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />

        {/* 2. Quick Font Size Selector */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-full text-xs font-bold">
          <button
            onClick={() => handleSizeChange("base")}
            className={cn(
              "px-2 py-0.5 rounded-full transition-all cursor-pointer text-[11px]",
              fontSize === "base"
                ? "bg-blue-600 text-white font-black shadow-2xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white",
            )}
            title="Ukuran teks normal (100%)"
          >
            A
          </button>
          <button
            onClick={() => handleSizeChange("lg")}
            className={cn(
              "px-2 py-0.5 rounded-full transition-all cursor-pointer text-xs",
              fontSize === "lg"
                ? "bg-blue-600 text-white font-black shadow-2xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white",
            )}
            title="Ukuran teks sedang (125%)"
          >
            A+
          </button>
          <button
            onClick={() => handleSizeChange("xl")}
            className={cn(
              "px-2 py-0.5 rounded-full transition-all cursor-pointer text-xs",
              fontSize === "xl"
                ? "bg-blue-600 text-white font-black shadow-2xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white",
            )}
            title="Ukuran teks besar (150%)"
          >
            A++
          </button>
        </div>

        <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />

        {/* 3. Focus / Zen Mode */}
        <button
          onClick={toggleFocusMode}
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-full transition-colors cursor-pointer",
            isFocusMode
              ? "bg-indigo-600 text-white shadow-xs"
              : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800",
          )}
          title={isFocusMode ? "Keluar Mode Zen (Fokus)" : "Aktifkan Mode Zen (Fokus Baca Bebas Gangguan)"}
          aria-label="Mode Fokus Zen"
        >
          {isFocusMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>

        {/* 4. Bookmark Button */}
        <BookmarkButton
          article={article}
          variant="icon"
          className="h-7 w-7 rounded-full border-0 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 shadow-none text-slate-700 dark:text-slate-200"
        />

        {/* 4. Jump to Comments */}
        <button
          onClick={scrollToComments}
          className="relative flex h-7 w-7 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
          title="Lompat ke kolom diskusi & komentar"
          aria-label="Lompat ke komentar"
        >
          <MessageSquare className="h-4 w-4" />
          {commentCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-3.5 min-w-3.5 px-0.5 items-center justify-center rounded-full bg-blue-600 text-[9px] font-bold text-white">
              {commentCount}
            </span>
          )}
        </button>

        {/* 5. Quick Copy / Share Link */}
        <button
          onClick={handleCopy}
          className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
          title={copied ? "Tautan Berita Tersalin!" : "Salin tautan artikel"}
          aria-label="Salin tautan artikel"
        >
          {copied ? (
            <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <Share2 className="h-4 w-4" />
          )}
        </button>
      </div>
    </aside>
  );
}
