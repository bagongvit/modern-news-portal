"use client";

import React, { useState, useMemo, useSyncExternalStore } from "react";
import { Vote, CheckCircle2, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

const POLL_DATA = {
  id: "poll_ai_governance_2026",
  question:
    "Menurut Anda, apakah regulasi tata kelola kecerdasan buatan (AI) di Indonesia saat ini sudah mendesak untuk disahkan?",
  options: [
    { id: "opt_1", text: "Sangat mendesak demi perlindungan data & etika", votes: 645 },
    { id: "opt_2", text: "Cukup penting, namun jangan menghambat inovasi", votes: 472 },
    { id: "opt_3", text: "Belum perlu, ikuti perkembangan pasar global", votes: 123 },
  ],
};

function subscribeToPoll(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("editorial-poll-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("editorial-poll-change", callback);
  };
}

function getPollSnapshot(): string | null {
  try {
    return localStorage.getItem(POLL_DATA.id);
  } catch {
    return null;
  }
}

function getPollServerSnapshot(): string | null {
  return null;
}

export function EditorialPollWidget() {
  const savedVote = useSyncExternalStore(subscribeToPoll, getPollSnapshot, getPollServerSnapshot);
  const [localVote, setLocalVote] = useState<string | null>(null);

  const activeVote = localVote || savedVote;
  const hasVoted = Boolean(activeVote);

  const options: PollOption[] = useMemo(() => {
    return POLL_DATA.options.map((opt) => ({
      ...opt,
      votes: opt.votes + (activeVote === opt.id ? 1 : 0),
    }));
  }, [activeVote]);

  const totalVotes = useMemo(() => {
    return options.reduce((sum, opt) => sum + opt.votes, 0);
  }, [options]);

  const handleVote = (optionId: string) => {
    if (hasVoted) return;

    setLocalVote(optionId);
    try {
      localStorage.setItem(POLL_DATA.id, optionId);
      window.dispatchEvent(new Event("editorial-poll-change"));
    } catch {}
  };

  return (
    <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-5 sm:p-6 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <Vote className="h-4 w-4" />
          </div>
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
            Jajak Pendapat Publik
          </h3>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-full flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
          Aktif
        </span>
      </div>

      {/* Question */}
      <h4 className="text-xs sm:text-sm font-bold text-slate-950 dark:text-white leading-snug mb-4">
        {POLL_DATA.question}
      </h4>

      {/* Options List */}
      <div className="space-y-2.5">
        {options.map((opt) => {
          const percentage = Math.round((opt.votes / totalVotes) * 100) || 0;
          const isSelected = activeVote === opt.id;

          return (
            <button
              key={opt.id}
              onClick={() => handleVote(opt.id)}
              disabled={hasVoted}
              className={cn(
                "relative w-full text-left p-3 rounded-xl border transition-all overflow-hidden",
                hasVoted ? "cursor-default" : "cursor-pointer hover:border-indigo-400",
                isSelected
                  ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30"
                  : "border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40",
              )}
            >
              {/* Background Progress Fill (when voted) */}
              {hasVoted && (
                <div
                  className="absolute inset-y-0 left-0 bg-indigo-100 dark:bg-indigo-900/30 transition-all duration-700 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              )}

              <div className="relative flex items-center justify-between text-xs gap-3">
                <div className="flex items-center gap-2">
                  {isSelected && (
                    <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  )}
                  <span
                    className={cn(
                      "font-semibold",
                      isSelected
                        ? "text-indigo-950 dark:text-indigo-200"
                        : "text-slate-800 dark:text-slate-200",
                    )}
                  >
                    {opt.text}
                  </span>
                </div>

                {hasVoted && (
                  <span className="font-bold text-xs font-mono text-indigo-600 dark:text-indigo-400 shrink-0">
                    {percentage}%
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5" />
          <span>{totalVotes.toLocaleString("id-ID")} suara terhimpun</span>
        </div>
        <span className="italic text-[10px]">Pembaruan real-time</span>
      </div>
    </div>
  );
}
