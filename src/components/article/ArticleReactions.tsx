"use client";

import React, { useState, useSyncExternalStore, useMemo } from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/lib/toast";

interface ArticleReactionsProps {
  articleId: string;
}

interface ReactionItem {
  id: string;
  emoji: string;
  label: string;
  baseCount: number;
}

const INITIAL_REACTIONS: ReactionItem[] = [
  { id: "insightful", emoji: "💡", label: "Membuka Wawasan", baseCount: 42 },
  { id: "sharp", emoji: "🔍", label: "Analisis Tajam", baseCount: 28 },
  { id: "impact", emoji: "📈", label: "Berdampak Nyata", baseCount: 19 },
  { id: "essential", emoji: "⚡", label: "Penting Disimak", baseCount: 35 },
];

function subscribeReactions(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("reaction_updated", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("reaction_updated", callback);
  };
}

export function ArticleReactions({ articleId }: ArticleReactionsProps) {
  const [feedback, setFeedback] = useState<string | null>(null);

  const defaultCounts = useMemo(() => {
    const initial: { [key: string]: number } = {};
    INITIAL_REACTIONS.forEach((r) => {
      initial[r.id] = r.baseCount;
    });
    return initial;
  }, []);

  const selectedReaction = useSyncExternalStore(
    subscribeReactions,
    () => (typeof window !== "undefined" ? localStorage.getItem(`reaction_${articleId}`) : null),
    () => null,
  );

  const savedCountsRaw = useSyncExternalStore(
    subscribeReactions,
    () =>
      typeof window !== "undefined" ? localStorage.getItem(`reaction_counts_${articleId}`) : null,
    () => null,
  );

  const counts = useMemo(() => {
    if (!savedCountsRaw) return defaultCounts;
    try {
      return JSON.parse(savedCountsRaw);
    } catch {
      return defaultCounts;
    }
  }, [savedCountsRaw, defaultCounts]);

  const handleVote = (reactionId: string) => {
    if (typeof window === "undefined") return;
    const isSame = selectedReaction === reactionId;
    const newCounts = { ...counts };

    if (isSame) {
      newCounts[reactionId] = Math.max(0, (newCounts[reactionId] || 1) - 1);
      localStorage.removeItem(`reaction_${articleId}`);
      setFeedback(null);
    } else {
      if (selectedReaction && newCounts[selectedReaction]) {
        newCounts[selectedReaction] = Math.max(0, newCounts[selectedReaction] - 1);
      }
      newCounts[reactionId] = (newCounts[reactionId] || 0) + 1;
      localStorage.setItem(`reaction_${articleId}`, reactionId);
      const chosen = INITIAL_REACTIONS.find((r) => r.id === reactionId);
      const label = chosen ? `${chosen.emoji} ${chosen.label}` : "Reaksi";
      toast.success(`Tanggapan "${label}" berhasil dicatat dalam barometer pembaca!`, "Barometer Pembaca");
      setFeedback("Terima kasih! Reaksi Anda tercatat dalam barometer pembaca.");
      setTimeout(() => setFeedback(null), 4000);
    }

    localStorage.setItem(`reaction_counts_${articleId}`, JSON.stringify(newCounts));
    window.dispatchEvent(new Event("reaction_updated"));
  };

  const totalReactions = Object.values(counts as Record<string, number>).reduce((a, b) => a + b, 0);

  return (
    <div className="my-12 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900/90 dark:via-slate-950 dark:to-slate-900/90 p-6 sm:p-8 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
              <Sparkles className="h-4 w-4" />
            </span>
            <h3 className="text-base sm:text-lg font-black tracking-tight text-slate-950 dark:text-white">
              Resonansi & Barometer Pembaca
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Bagaimana perspektif atau kesan Anda setelah menuntaskan artikel liputan ini?
          </p>
        </div>

        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 self-start sm:self-auto shadow-2xs">
          {totalReactions} Pembaca Merespons
        </span>
      </div>

      {/* 4 Reaction Buttons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {INITIAL_REACTIONS.map((item) => {
          const isSelected = selectedReaction === item.id;
          const currentCount = counts[item.id] ?? item.baseCount;

          return (
            <button
              key={item.id}
              onClick={() => handleVote(item.id)}
              className={cn(
                "group flex flex-col items-center justify-center p-4 rounded-2xl border transition-all cursor-pointer transform hover:-translate-y-0.5",
                isSelected
                  ? "bg-blue-50 dark:bg-blue-950/60 border-blue-500 text-blue-900 dark:text-blue-200 shadow-md shadow-blue-500/10 scale-102"
                  : "bg-white dark:bg-slate-900/90 border-slate-200/90 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-400 hover:shadow-sm",
              )}
            >
              <span className="text-2xl sm:text-3xl mb-1.5 transition-transform group-hover:scale-120">
                {item.emoji}
              </span>
              <span className="text-xs font-bold leading-tight text-center">{item.label}</span>
              <span
                className={cn(
                  "text-[11px] font-semibold mt-1 px-2 py-0.5 rounded-full transition-colors",
                  isSelected
                    ? "bg-blue-600 text-white font-bold"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400",
                )}
              >
                {currentCount}
              </span>
            </button>
          );
        })}
      </div>

      {feedback && (
        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold animate-in fade-in">
          <CheckCircle2 className="h-4 w-4" />
          <span>{feedback}</span>
        </div>
      )}
    </div>
  );
}
