"use client";

import React, { useState } from "react";
import { Bookmark } from "lucide-react";
import { useBookmarks, BookmarkedArticle } from "@/hooks/useBookmarks";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";

interface BookmarkButtonProps {
  article: BookmarkedArticle;
  variant?: "icon" | "pill" | "minimal";
  className?: string;
}

export function BookmarkButton({ article, variant = "icon", className }: BookmarkButtonProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(article.id);
  const [animating, setAnimating] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAnimating(true);
    toggleBookmark(article);
    if (!bookmarked) {
      toast.bookmark(`"${article.title.slice(0, 48)}..." disimpan ke Daftar Baca Nanti.`, "Tersimpan");
    } else {
      toast.info("Artikel dihapus dari daftar simpanan.", "Dihapus");
    }
    setTimeout(() => setAnimating(false), 500);
  };

  if (variant === "pill") {
    return (
      <button
        onClick={handleClick}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs border",
          bookmarked
            ? "bg-blue-600 text-white border-blue-600 shadow-blue-500/20"
            : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-blue-500",
          animating && "scale-110",
          className,
        )}
        title={bookmarked ? "Hapus dari daftar baca nanti" : "Simpan untuk dibaca nanti"}
        aria-label={bookmarked ? "Hapus dari simpanan" : "Simpan artikel"}
      >
        <Bookmark className={cn("h-3.5 w-3.5 transition-transform", bookmarked && "fill-white")} />
        <span>{bookmarked ? "Tersimpan" : "Baca Nanti"}</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-xl transition-all cursor-pointer",
        bookmarked
          ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 scale-105"
          : "bg-white/90 dark:bg-slate-900/90 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs",
        animating && "animate-bounce",
        className,
      )}
      title={bookmarked ? "Hapus dari simpanan" : "Simpan untuk dibaca nanti"}
      aria-label={bookmarked ? "Hapus dari simpanan" : "Simpan artikel"}
    >
      <Bookmark
        className={cn(
          "h-4 w-4 transition-all",
          bookmarked ? "fill-white text-white" : "text-slate-600 dark:text-slate-300",
        )}
      />
    </button>
  );
}
