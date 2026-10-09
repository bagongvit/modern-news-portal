"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Play, Pause, X, Headphones, Volume2, FastForward } from "lucide-react";
import { cn } from "@/lib/utils";

interface StickyAudioPlayerProps {
  title: string;
  authorName: string;
  avatarUrl?: string | null;
  isPlaying: boolean;
  currentSpeed: number;
  onTogglePlay: () => void;
  onCycleSpeed: () => void;
  onStop: () => void;
}

export function StickyAudioPlayer({
  title,
  authorName,
  avatarUrl,
  isPlaying,
  currentSpeed,
  onTogglePlay,
  onCycleSpeed,
  onStop,
}: StickyAudioPlayerProps) {
  const [isScrolledPast, setIsScrolledPast] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down past 420px
      setIsScrolledPast(window.scrollY > 420);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Show player when playing OR when user paused but was playing and scrolled past
  if (!isScrolledPast && !isPlaying) return null;
  if (!isPlaying && !isScrolledPast) return null;

  return (
    <aside
      aria-label="Pemutar Audio Mengambang"
      className={cn(
        "fixed z-40 transition-all duration-300 ease-out left-4 right-4 sm:left-auto sm:right-6 sm:w-96",
        "bottom-20 md:bottom-8",
        isPlaying || isScrolledPast
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-8 pointer-events-none",
      )}
    >
      <div className="flex items-center justify-between gap-3 p-3 sm:p-3.5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-2xl text-slate-800 dark:text-slate-100">
        {/* Left: Thumbnail & Animated Equalizer */}
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            onClick={onTogglePlay}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
            aria-label={isPlaying ? "Jeda Audio" : "Lanjutkan Audio"}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4 fill-white" />
            ) : (
              <Play className="h-4 w-4 fill-white ml-0.5" />
            )}
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <Headphones className="h-3 w-3 text-blue-600 dark:text-blue-400 shrink-0" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                {isPlaying ? "Narasi Sedang Diputar" : "Narasi Dijeda"}
              </span>
              {isPlaying && (
                <div className="flex items-end gap-0.5 h-2.5">
                  <span className="w-0.5 h-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                  <span className="w-0.5 h-2/3 bg-blue-600 dark:bg-blue-400 animate-pulse delay-75" />
                  <span className="w-0.5 h-4/5 bg-blue-600 dark:bg-blue-400 animate-pulse delay-150" />
                </div>
              )}
            </div>
            <h5 className="text-xs font-bold text-slate-950 dark:text-slate-100 truncate leading-snug">
              {title}
            </h5>
            <span className="text-[10px] text-slate-400 truncate block">
              Suara Digital Redaksi • {authorName}
            </span>
          </div>
        </div>

        {/* Right Controls: Speed and Close */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={onCycleSpeed}
            className="flex items-center gap-0.5 text-[11px] font-mono font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors cursor-pointer"
            title="Ubah kecepatan putar"
          >
            <span>{currentSpeed.toFixed(1)}x</span>
          </button>

          <button
            onClick={onStop}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Hentikan dan tutup pemutar audio"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
