"use client";

import React, { useActionState, useEffect } from "react";
import { subscribeNewsletterAction, NewsletterState } from "@/features/newsletter/actions";
import { Mail, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "@/lib/toast";

export function NewsletterForm() {
  const [state, formAction, isPending] = useActionState<NewsletterState | null, FormData>(
    subscribeNewsletterAction,
    null,
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "Terima kasih telah berlangganan Buletin Redaksi!", "Buletin Terdaftar");
    } else if (state?.error) {
      toast.error(state.error, "Pendaftaran Gagal");
    }
  }, [state]);

  return (
    <div className="w-full">
      {state?.success ? (
        <div className="flex items-start gap-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 p-3 text-xs text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 animate-in fade-in duration-200">
          <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
          <span>{state.message}</span>
        </div>
      ) : (
        <form action={formAction} className="space-y-2">
          {/* Honeypot field for bot protection */}
          <input
            type="text"
            name="honeypot"
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <input
              type="email"
              name="email"
              required
              placeholder="nama@email.com"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          </div>

          {state?.error && (
            <div className="flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{state.error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isPending ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Memproses...</span>
              </>
            ) : (
              <span>Langganan Sekarang</span>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
