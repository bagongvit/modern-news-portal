"use client";

import React, { useState } from "react";
import { Zap, ChevronDown, ChevronUp, CheckCircle2, Sparkles } from "lucide-react";
import { Article } from "@/types/news";

interface KeyTakeawaysProps {
  article: Article;
}

export function KeyTakeaways({ article }: KeyTakeawaysProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  // Generate 3 structured key takeaways from the article's lead and content
  const takeaways: string[] = React.useMemo(() => {
    const points: string[] = [];
    if (article.lead) {
      points.push(article.lead);
    }

    // Try extracting key sentences from markdown paragraphs
    const paragraphs = article.content
      .split("\n\n")
      .map((p) => p.trim())
      .filter((p) => !p.startsWith("#") && !p.startsWith(">") && p.length > 50);

    if (paragraphs[0]) {
      points.push(paragraphs[0].slice(0, 180).trim() + "...");
    }
    if (paragraphs[1]) {
      points.push(paragraphs[1].slice(0, 180).trim() + "...");
    }

    return points.slice(0, 3);
  }, [article]);

  if (takeaways.length === 0) return null;

  return (
    <section
      aria-label="Rangkuman Eksekutif Berita"
      className="my-8 rounded-3xl border border-blue-200/90 dark:border-blue-900/60 bg-gradient-to-br from-blue-50/80 via-indigo-50/30 to-white dark:from-slate-900/90 dark:via-blue-950/40 dark:to-slate-950 p-6 sm:p-7 shadow-xs overflow-hidden"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-xs">
            <Zap className="h-4 w-4 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-black tracking-tight text-slate-950 dark:text-white uppercase">
                Poin Kunci Redaksi
              </h3>
              <span className="flex items-center gap-1 rounded-full bg-blue-100 dark:bg-blue-950 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:text-blue-300">
                <Sparkles className="h-2.5 w-2.5" />
                30 Detik Baca
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Intisari esensial liputan mendalam ini bagi pembaca yang beraktivitas cepat
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-900 transition-colors cursor-pointer"
          title={isExpanded ? "Tutup rangkuman" : "Buka rangkuman"}
          aria-expanded={isExpanded}
        >
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      {isExpanded && (
        <ul className="mt-5 space-y-3 pt-4 border-t border-blue-100 dark:border-blue-900/40 animate-in fade-in duration-200">
          {takeaways.map((point, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-normal"
            >
              <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
