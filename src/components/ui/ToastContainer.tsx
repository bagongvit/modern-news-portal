"use client";

import React, { useState, useEffect, useCallback } from "react";
import { CheckCircle2, Info, Bookmark, AlertCircle, Quote, X } from "lucide-react";
import { ToastItem } from "@/lib/toast";
import { cn } from "@/lib/utils";

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    const handleToastEvent = (e: Event) => {
      const customEvent = e as CustomEvent<ToastItem>;
      if (!customEvent.detail) return;

      const newToast = customEvent.detail;
      setToasts((prev) => [...prev.slice(-3), newToast]); // keep max 4 toasts

      if (newToast.duration && newToast.duration > 0) {
        setTimeout(() => {
          removeToast(newToast.id);
        }, newToast.duration);
      }
    };

    window.addEventListener("modern-news-toast", handleToastEvent);
    return () => {
      window.removeEventListener("modern-news-toast", handleToastEvent);
    };
  }, [removeToast]);

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-label="Notifikasi Portal"
      className="fixed z-50 bottom-20 md:bottom-6 right-4 left-4 sm:left-auto sm:right-6 sm:w-96 flex flex-col gap-2.5 pointer-events-none"
    >
      {toasts.map((toast) => {
        const isSuccess = toast.type === "success";
        const isBookmark = toast.type === "bookmark";
        const isQuote = toast.type === "quote";
        const isError = toast.type === "error";

        return (
          <div
            key={toast.id}
            role="status"
            className={cn(
              "pointer-events-auto flex items-start gap-3 p-3.5 rounded-2xl border shadow-xl backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-3 fade-in",
              "bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-slate-100",
              isSuccess && "border-emerald-200 dark:border-emerald-800/80 shadow-emerald-500/5",
              isBookmark && "border-indigo-200 dark:border-indigo-800/80 shadow-indigo-500/5",
              isQuote && "border-blue-200 dark:border-blue-800/80 shadow-blue-500/5",
              isError && "border-rose-200 dark:border-rose-800/80 shadow-rose-500/5",
              !isSuccess && !isBookmark && !isQuote && !isError && "border-slate-200 dark:border-slate-800",
            )}
          >
            {/* Icon */}
            <div className="shrink-0 mt-0.5">
              {isSuccess && (
                <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
              )}
              {isBookmark && (
                <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                  <Bookmark className="h-4 w-4 fill-current" />
                </div>
              )}
              {isQuote && (
                <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                  <Quote className="h-4 w-4" />
                </div>
              )}
              {isError && (
                <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400">
                  <AlertCircle className="h-4 w-4" />
                </div>
              )}
              {!isSuccess && !isBookmark && !isQuote && !isError && (
                <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400">
                  <Info className="h-4 w-4" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pr-1">
              {toast.title && (
                <h5 className="text-xs font-bold text-slate-950 dark:text-white leading-snug mb-0.5">
                  {toast.title}
                </h5>
              )}
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {toast.message}
              </p>
            </div>

            {/* Dismiss Button */}
            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Tutup notifikasi"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
