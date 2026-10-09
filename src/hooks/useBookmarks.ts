"use client";

import { useSyncExternalStore, useMemo, useCallback } from "react";

export interface BookmarkedArticle {
  id: string;
  title: string;
  slug: string;
  lead: string;
  featuredImageUrl: string;
  categoryName: string;
  categorySlug: string;
  categoryColor?: string;
  publishedAt: string;
  readingTimeMinutes: number;
  authorName: string;
}

const STORAGE_KEY = "modern_news_saved_articles";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("bookmarks_updated", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("bookmarks_updated", callback);
  };
}

function getSnapshot(): string {
  if (typeof window === "undefined") return "[]";
  try {
    return localStorage.getItem(STORAGE_KEY) || "[]";
  } catch {
    return "[]";
  }
}

function getServerSnapshot(): string {
  return "[]";
}

export function useBookmarks() {
  const rawBookmarks = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const bookmarks: BookmarkedArticle[] = useMemo(() => {
    try {
      return JSON.parse(rawBookmarks);
    } catch {
      return [];
    }
  }, [rawBookmarks]);

  const saveBookmarks = useCallback((items: BookmarkedArticle[]) => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      window.dispatchEvent(new Event("bookmarks_updated"));
    } catch (e) {
      console.error("Failed to save bookmarks:", e);
    }
  }, []);

  const isBookmarked = useCallback(
    (id: string) => {
      return bookmarks.some((b) => b.id === id);
    },
    [bookmarks],
  );

  const toggleBookmark = useCallback(
    (article: BookmarkedArticle) => {
      const exists = bookmarks.some((b) => b.id === article.id);
      let updated: BookmarkedArticle[];
      if (exists) {
        updated = bookmarks.filter((b) => b.id !== article.id);
      } else {
        updated = [article, ...bookmarks];
      }
      saveBookmarks(updated);
      return !exists;
    },
    [bookmarks, saveBookmarks],
  );

  const removeBookmark = useCallback(
    (id: string) => {
      const updated = bookmarks.filter((b) => b.id !== id);
      saveBookmarks(updated);
    },
    [bookmarks, saveBookmarks],
  );

  const clearBookmarks = useCallback(() => {
    saveBookmarks([]);
  }, [saveBookmarks]);

  return {
    bookmarks,
    isBookmarked,
    toggleBookmark,
    removeBookmark,
    clearBookmarks,
    totalBookmarks: bookmarks.length,
  };
}
