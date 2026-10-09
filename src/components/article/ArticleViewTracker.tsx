"use client";

import { useEffect } from "react";
import { useReadingHistory } from "@/hooks/useReadingHistory";
import { BookmarkedArticle } from "@/hooks/useBookmarks";

interface ArticleViewTrackerProps {
  article: BookmarkedArticle;
}

export function ArticleViewTracker({ article }: ArticleViewTrackerProps) {
  const { recordArticleView } = useReadingHistory();

  useEffect(() => {
    // 1. Record to client-side reading history
    recordArticleView(article);

    // 2. Increment view count in database with session deduplication
    if (typeof window !== "undefined" && article.id) {
      const sessionKey = `view_recorded_${article.id}`;
      const alreadyCountedInSession = sessionStorage.getItem(sessionKey);

      if (!alreadyCountedInSession) {
        fetch(`/api/articles/${article.id}/views`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => {
            if (res.ok) {
              sessionStorage.setItem(sessionKey, "true");
            }
          })
          .catch((err) => {
            console.error("View count increment failed silently:", err);
          });
      }
    }
  }, [article, recordArticleView]);

  return null;
}
