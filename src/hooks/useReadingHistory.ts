"use client";

import { useSyncExternalStore, useMemo, useCallback } from "react";
import { BookmarkedArticle } from "./useBookmarks";

export interface HistoryArticle extends BookmarkedArticle {
  viewedAt: string;
}

const STORAGE_KEY = "modern_news_reading_history";
const MAX_HISTORY = 30;

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("reading_history_updated", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("reading_history_updated", callback);
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

export function useReadingHistory() {
  const rawHistory = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const history: HistoryArticle[] = useMemo(() => {
    try {
      return JSON.parse(rawHistory);
    } catch {
      return [];
    }
  }, [rawHistory]);

  const recordArticleView = useCallback((article: BookmarkedArticle) => {
    if (typeof window === "undefined") return;
    try {
      const currentRaw = localStorage.getItem(STORAGE_KEY) || "[]";
      let list: HistoryArticle[] = [];
      try {
        list = JSON.parse(currentRaw);
      } catch {
        list = [];
      }

      // Remove previous entry of this article if exists
      const filtered = list.filter((item) => item.id !== article.id);

      // Add as newest at the front
      const updated: HistoryArticle[] = [
        {
          ...article,
          viewedAt: new Date().toISOString(),
        },
        ...filtered,
      ].slice(0, MAX_HISTORY);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event("reading_history_updated"));
    } catch (e) {
      console.error("Failed to record reading history:", e);
    }
  }, []);

  const removeFromHistory = useCallback((id: string) => {
    if (typeof window === "undefined") return;
    try {
      const currentRaw = localStorage.getItem(STORAGE_KEY) || "[]";
      const list: HistoryArticle[] = JSON.parse(currentRaw);
      const filtered = list.filter((item) => item.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      window.dispatchEvent(new Event("reading_history_updated"));
    } catch (e) {
      console.error("Failed to remove item from history:", e);
    }
  }, []);

  const clearHistory = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, "[]");
      window.dispatchEvent(new Event("reading_history_updated"));
    } catch (e) {
      console.error("Failed to clear history:", e);
    }
  }, []);

  return {
    history,
    recordArticleView,
    removeFromHistory,
    clearHistory,
    totalHistory: history.length,
  };
}
