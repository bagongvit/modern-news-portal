"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BreakingNewsItem } from "@/types/news";
import { Flame, Pause, Play, ChevronRight, ChevronLeft } from "lucide-react";

interface BreakingNewsTickerProps {
  items: BreakingNewsItem[];
}

export function BreakingNewsTicker({ items }: BreakingNewsTickerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  React.useEffect(() => {
    if (isPaused || items.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused, items.length]);

  if (!items || items.length === 0) return null;

  const currentItem = items[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  return (
    <div
      data-component="breaking-news-ticker"
      className="bg-gradient-to-r from-red-500/10 via-amber-500/5 to-transparent dark:from-red-950/40 dark:via-amber-950/20 dark:to-transparent border-y border-red-500/20 px-4 py-2 text-sm transition-colors"
      role="region"
      aria-label="Breaking News Ticker"
    >
      <div className="container mx-auto flex items-center justify-between gap-3">
        {/* Left: Badge & Headline */}
        <div className="flex items-center gap-3 overflow-hidden min-w-0">
          <div className="flex items-center gap-1.5 rounded-md bg-red-600 px-2.5 py-1 text-[11px] font-black tracking-wider text-white uppercase shadow-xs shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-90" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </span>
            <Flame className="h-3.5 w-3.5 fill-white text-white" />
            <span>{currentItem.badgeText || "BREAKING"}</span>
          </div>

          <div className="flex items-center gap-2 truncate">
            <Link
              href={currentItem.url}
              className="truncate font-semibold text-slate-900 dark:text-slate-100 hover:text-red-600 dark:hover:text-red-400 text-xs sm:text-sm transition-colors"
            >
              {currentItem.headline}
            </Link>
          </div>
        </div>

        {/* Right: Controls & Index Counter */}
        <div className="flex items-center gap-2 shrink-0">
          {items.length > 1 && (
            <span className="hidden sm:inline-block text-[11px] font-mono text-slate-500 dark:text-slate-400 mr-1">
              {currentIndex + 1} / {items.length}
            </span>
          )}

          <button
            onClick={() => setIsPaused(!isPaused)}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
            aria-label={isPaused ? "Lanjutkan ticker" : "Jeda ticker"}
            title={isPaused ? "Play ticker" : "Pause ticker"}
          >
            {isPaused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
          </button>

          {items.length > 1 && (
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Berita sebelumnya"
                title="Sebelumnya"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={handleNext}
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Berita selanjutnya"
                title="Berikutnya"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
