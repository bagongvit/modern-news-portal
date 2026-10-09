"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types/news";
import { formatDate, formatReadingTime } from "@/lib/utils";
import { User, CheckCircle2, Headphones, Play, Pause, ChevronRight } from "lucide-react";
import { ShareButtons } from "./ShareButtons";
import { BookmarkButton } from "@/components/shared/BookmarkButton";
import { getSiteUrl } from "@/lib/seo/site-url";
import { FactCheckBadge } from "./FactCheckBadge";
import { StickyAudioPlayer } from "./StickyAudioPlayer";

interface ArticleHeaderProps {
  article: Article;
}

const SPEED_OPTIONS = [1.0, 1.25, 1.5];

export function ArticleHeader({ article }: ArticleHeaderProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [speedIndex, setSpeedIndex] = useState(0);
  const [voiceStyle, setVoiceStyle] = useState<"formal" | "narrative">("formal");
  const currentSpeed = SPEED_OPTIONS[speedIndex] ?? 1.0;
  const currentUrl = new URL(`/berita/${article.slug}`, getSiteUrl()).toString();

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleAudio = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Browser Anda belum mendukung sintesis audio narasi.");
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel();
    const textToRead = `${article.title}. ${article.lead}.`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = "id-ID";
    utterance.rate = currentSpeed;
    utterance.pitch = voiceStyle === "formal" ? 0.95 : 1.15;

    // Pick Indonesian voice if available
    const voices = window.speechSynthesis.getVoices();
    const idVoice = voices.find((v) => v.lang.toLowerCase().includes("id"));
    if (idVoice) {
      utterance.voice = idVoice;
    }

    utterance.onend = () => {
      setIsPlayingAudio(false);
    };

    utterance.onerror = () => {
      setIsPlayingAudio(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  const cycleSpeed = () => {
    const nextIdx = (speedIndex + 1) % SPEED_OPTIONS.length;
    setSpeedIndex(nextIdx);
    const nextSpeed = SPEED_OPTIONS[nextIdx] ?? 1.0;

    // If currently playing, restart with new speed
    if (isPlayingAudio && typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const textToRead = `${article.title}. ${article.lead}.`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = "id-ID";
      utterance.rate = nextSpeed;

      const voices = window.speechSynthesis.getVoices();
      const idVoice = voices.find((v) => v.lang.toLowerCase().includes("id"));
      if (idVoice) utterance.voice = idVoice;

      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  const stopAudio = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
  };

  return (
    <header className="mb-8 sm:mb-10">
      {/* Editorial Breadcrumbs & Trust Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs">
          <Link
            href="/"
            className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors font-medium"
          >
            Beranda
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <Link
            href={`/kategori/${article.category.slug}`}
            className="font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 hover:underline"
          >
            {article.category.name}
          </Link>
        </nav>

        <FactCheckBadge publishedDate={article.publishedAt} />
      </div>

      {/* Main Headline */}
      <h1 className="font-editorial-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 dark:text-white leading-[1.12]">
        {article.title}
      </h1>

      {/* Standfirst / Nut-graf Lead */}
      <p className="mt-5 text-lg sm:text-xl md:text-2xl text-slate-700 dark:text-slate-300 font-light leading-relaxed">
        {article.lead}
      </p>

      {/* Audio Narration Bar */}
      <div className="mt-6 flex items-center justify-between p-3.5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleAudio}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
            aria-label={isPlayingAudio ? "Jeda Narasi Audio" : "Dengarkan Berita"}
          >
            {isPlayingAudio ? (
              <Pause className="h-4 w-4 fill-white" />
            ) : (
              <Play className="h-4 w-4 fill-white ml-0.5" />
            )}
          </button>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-slate-100">
              <Headphones className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
              <span>Dengarkan Narasi Berita</span>
              {isPlayingAudio && (
                <div className="flex items-center gap-1.5 ml-2">
                  <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 animate-pulse">
                    (Memutar...)
                  </span>
                  <div className="flex items-end gap-0.5 h-3">
                    <span className="w-0.5 h-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                    <span className="w-0.5 h-2/3 bg-blue-600 dark:bg-blue-400 animate-pulse delay-75" />
                    <span className="w-0.5 h-4/5 bg-blue-600 dark:bg-blue-400 animate-pulse delay-150" />
                    <span className="w-0.5 h-1/2 bg-blue-600 dark:bg-blue-400 animate-pulse delay-100" />
                  </div>
                </div>
              )}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Durasi: ±{article.readingTimeMinutes} menit • Mode: {voiceStyle === "formal" ? "Penyiar Berita" : "Naratif"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Voice Tone Button */}
          <button
            onClick={() => setVoiceStyle(voiceStyle === "formal" ? "narrative" : "formal")}
            className="flex items-center gap-1 text-[11px] text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors cursor-pointer"
            title="Klik untuk beralih karakter suara"
          >
            <span>{voiceStyle === "formal" ? "🎙️ Formal" : "🎧 Naratif"}</span>
          </button>

          {/* Speed Button */}
          <button
            onClick={cycleSpeed}
            className="flex items-center gap-1 text-[11px] text-slate-600 dark:text-slate-300 font-mono bg-white dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors cursor-pointer"
            title="Klik untuk mengubah kecepatan putar"
          >
            <span>{currentSpeed.toFixed(2).replace(".00", ".0")}x</span>
          </button>
        </div>
      </div>

      {/* Byline & Sharing Metadata Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mt-6 pt-6 border-t border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3.5">
          <div className="relative h-12 w-12 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-xs">
            {article.author.avatar ? (
              <Image
                src={article.author.avatar}
                alt={article.author.name}
                fill
                sizes="48px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-slate-400">
                <User className="h-6 w-6" />
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-bold text-base text-slate-950 dark:text-slate-50">
              {article.author.slug ? (
                <Link
                  href={`/penulis/${article.author.slug}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {article.author.name}
                </Link>
              ) : (
                <span>{article.author.name}</span>
              )}
              <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span>{formatDate(article.publishedAt)}</span>
              <span>•</span>
              <span>Waktu baca: {formatReadingTime(article.readingTimeMinutes)}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <BookmarkButton
            article={{
              id: article.id,
              title: article.title,
              slug: article.slug,
              lead: article.lead,
              featuredImageUrl: article.featuredImageUrl,
              categoryName: article.category.name,
              categorySlug: article.category.slug,
              categoryColor: article.category.color,
              publishedAt: article.publishedAt,
              readingTimeMinutes: article.readingTimeMinutes,
              authorName: article.author.name,
            }}
            variant="pill"
          />
          <ShareButtons title={article.title} url={currentUrl} />
        </div>
      </div>

      {/* Persistent Floating Mini Audio Bar */}
      <StickyAudioPlayer
        title={article.title}
        authorName={article.author.name}
        avatarUrl={article.author.avatar}
        isPlaying={isPlayingAudio}
        currentSpeed={currentSpeed}
        onTogglePlay={toggleAudio}
        onCycleSpeed={cycleSpeed}
        onStop={stopAudio}
      />
    </header>
  );
}
