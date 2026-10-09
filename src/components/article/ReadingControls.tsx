"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { Type, Eye, EyeOff, Printer, CloudRain } from "lucide-react";
import { cn } from "@/lib/utils";
import { BookmarkButton } from "@/components/shared/BookmarkButton";
import { BookmarkedArticle } from "@/hooks/useBookmarks";
import { toast } from "@/lib/toast";
import { playAmbientSound, stopAmbientSound } from "@/lib/audio/ambientAudio";

interface ReadingControlsProps {
  article: BookmarkedArticle;
  onFontSizeChange?: (size: "base" | "lg" | "xl") => void;
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

export function ReadingControls({ article, onFontSizeChange }: ReadingControlsProps) {
  const savedFontSize = useSyncExternalStore(
    subscribeToFontSize,
    getFontSizeSnapshot,
    getFontSizeServerSnapshot,
  );
  const [localFontSize, setLocalFontSize] = useState<"base" | "lg" | "xl" | null>(null);
  const fontSize = localFontSize ?? savedFontSize;
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);

  useEffect(() => {
    return () => {
      stopAmbientSound();
    };
  }, []);

  const handleToggleAmbient = () => {
    if (isAmbientPlaying) {
      stopAmbientSound();
      setIsAmbientPlaying(false);
      toast.info("Suara ambien fokus dimatikan.", "Ambien Baca");
    } else {
      const ok = playAmbientSound("rain", 0.18);
      if (ok) {
        setIsAmbientPlaying(true);
        toast.info("🎧 Suara ambien hujan santai aktif untuk membaca mendalam.", "Ambien Baca");
      }
    }
  };

  useEffect(() => {
    const handleFocusChange = () => {
      setIsFocusMode(document.body.classList.contains("editorial-focus-mode"));
    };
    window.addEventListener("editorial-focus-mode-change", handleFocusChange);
    return () => {
      window.removeEventListener("editorial-focus-mode-change", handleFocusChange);
    };
  }, []);

  const handleToggleFocus = () => {
    const nextState = !isFocusMode;
    setIsFocusMode(nextState);
    if (nextState) {
      document.body.classList.add("editorial-focus-mode");
      toast.info("Mode Fokus Aktif: Elemen samping disembunyikan untuk membaca tenang.", "Mode Fokus");
    } else {
      document.body.classList.remove("editorial-focus-mode");
      toast.info("Mode Fokus Dinonaktifkan.", "Mode Fokus");
    }
    window.dispatchEvent(new Event("editorial-focus-mode-change"));
  };

  // Apply font size class to article content whenever fontSize changes
  useEffect(() => {
    const contentEl = document.getElementById("main-article-content");
    if (contentEl) {
      contentEl.classList.remove("font-size-base", "font-size-lg", "font-size-xl");
      contentEl.classList.add(`font-size-${fontSize}`);
    }
  }, [fontSize]);

  const handleSizeChange = (size: "base" | "lg" | "xl") => {
    setLocalFontSize(size);
    try {
      localStorage.setItem(STORAGE_KEY, size);
      window.dispatchEvent(new Event("reader-font-size-change"));
    } catch {}
    onFontSizeChange?.(size);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-2xs my-6">
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mr-1">
          <Type className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
          <span className="hidden sm:inline">Ukuran Huruf:</span>
        </span>

        <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-0.5 text-xs font-bold">
          <button
            onClick={() => handleSizeChange("base")}
            className={cn(
              "px-3 py-1 rounded-lg text-xs transition-all cursor-pointer",
              fontSize === "base"
                ? "bg-blue-600 text-white font-black shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white",
            )}
            title="Ukuran teks normal (100%)"
          >
            A
          </button>
          <button
            onClick={() => handleSizeChange("lg")}
            className={cn(
              "px-3 py-1 rounded-lg text-sm transition-all cursor-pointer",
              fontSize === "lg"
                ? "bg-blue-600 text-white font-black shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white",
            )}
            title="Ukuran teks sedang (125%)"
          >
            A+
          </button>
          <button
            onClick={() => handleSizeChange("xl")}
            className={cn(
              "px-3 py-1 rounded-lg text-base transition-all cursor-pointer",
              fontSize === "xl"
                ? "bg-blue-600 text-white font-black shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white",
            )}
            title="Ukuran teks besar (150%)"
          >
            A++
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Ambient Sound Focus Toggle */}
        <button
          onClick={handleToggleAmbient}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border",
            isAmbientPlaying
              ? "bg-cyan-600 text-white border-cyan-600 shadow-xs shadow-cyan-500/20"
              : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-cyan-500",
          )}
          title="Suara Ambien Hujan Tenang untuk Fokus Membaca"
        >
          <CloudRain className={cn("h-3.5 w-3.5", isAmbientPlaying && "animate-bounce")} />
          <span className="hidden sm:inline">
            {isAmbientPlaying ? "Ambien Aktif" : "Suara Hujan"}
          </span>
        </button>

        {/* Focus Reading Mode Toggle */}
        <button
          onClick={handleToggleFocus}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border",
            isFocusMode
              ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
              : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-indigo-500",
          )}
          title="Mode Fokus Baca (meredupkan header dan footer)"
        >
          {isFocusMode ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          <span>{isFocusMode ? "Keluar Mode Fokus" : "Mode Fokus"}</span>
        </button>

        {/* Clean Newspaper Print Button */}
        <button
          onClick={() => window.print()}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all cursor-pointer"
          title="Cetak artikel atau simpan sebagai PDF ramah arsip"
        >
          <Printer className="h-3.5 w-3.5" />
          <span>Cetak / PDF</span>
        </button>

        {/* Quick Bookmark Pill */}
        <BookmarkButton article={article} variant="pill" />
      </div>
    </div>
  );
}
