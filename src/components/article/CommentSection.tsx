"use client";

import React, { useState, useActionState } from "react";
import { submitCommentAction, CommentState } from "@/features/comments/actions";
import { Comment } from "@/types/news";
import { formatRelativeTime } from "@/lib/utils";
import {
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Send,
  User,
  MessagesSquare,
  ThumbsUp,
  Sparkles,
} from "lucide-react";

interface CommentSectionProps {
  articleId: string;
  articleSlug: string;
  authorName?: string;
  initialComments?: Comment[];
}

export function CommentSection({
  articleId,
  articleSlug,
  authorName,
  initialComments = [],
}: CommentSectionProps) {
  const [state, formAction, isPending] = useActionState<CommentState | null, FormData>(
    submitCommentAction,
    null,
  );

  return (
    <section
      id="komentar"
      className="mt-14 pt-10 border-t border-slate-200 dark:border-slate-800 scroll-mt-24"
      aria-label="Kolom Komentar dan Diskusi"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs">
            <MessageSquare className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-950 dark:text-white">
              Ruang Diskusi & Tanggapan Pembaca
              {initialComments.length > 0 && (
                <span className="ml-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
                  ({initialComments.length})
                </span>
              )}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Sampaikan pandangan Anda untuk memperkaya dialektika publik
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-full self-start sm:self-auto">
          <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
          <span>Dimoderasi Redaksi</span>
        </div>
      </div>

      {/* Form Submission Box */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-6 sm:p-7 shadow-xs mb-8">
        {state?.success ? (
          <div className="flex items-start gap-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 p-5 text-sm text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-base">{state.message}</p>
              <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-1 leading-relaxed">
                Terima kasih atas partisipasi Anda. Komentar akan ditinjau secara etis oleh tim
                redaksi sebelum ditampilkan kepada publik.
              </p>
            </div>
          </div>
        ) : (
          <form action={formAction} className="space-y-4">
            <input type="hidden" name="articleId" value={articleId} />
            <input type="hidden" name="articleSlug" value={articleSlug} />
            <input
              type="text"
              name="honeypot"
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Misal: Budi Santoso"
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Email (Tidak akan dipublikasikan) *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="budi@domain.com"
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Komentar atau Tanggapan Konstruktif *
              </label>
              <textarea
                name="content"
                required
                rows={4}
                placeholder="Tuliskan argumen atau perspektif Anda dengan bahasa yang santun, faktual, dan bermartabat..."
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs transition-all"
              />
            </div>

            {state?.error && (
              <div className="flex items-center gap-2 rounded-xl bg-red-50 dark:bg-red-950/40 p-3 text-xs text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{state.error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-all cursor-pointer shadow-xs"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Mengirim Tanggapan...</span>
                </>
              ) : (
                <>
                  <span>Kirim Tanggapan</span>
                  <Send className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </form>
        )}
      </div>

      {/* List of Approved Comments */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
          <span>Tanggapan Terverifikasi</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {initialComments.length}
          </span>
        </h4>

        {initialComments.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-8 text-center bg-slate-50/50 dark:bg-slate-900/30">
            <MessagesSquare className="h-8 w-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Belum ada tanggapan terverifikasi.
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Jadilah pembaca pertama yang memberikan gagasan atau perspektif Anda di atas.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {initialComments.map((comment) => {
              const isAuthor =
                authorName &&
                comment.name?.toLowerCase().trim() === authorName.toLowerCase().trim();
              const isEditorial =
                comment.name?.toLowerCase().includes("redaksi") ||
                comment.name?.toLowerCase().includes("editor");

              return (
                <div
                  key={comment.id}
                  className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 shadow-2xs hover:border-blue-500/30 transition-all"
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs uppercase shadow-2xs ${
                          isAuthor
                            ? "bg-gradient-to-tr from-amber-500 to-orange-600 text-white"
                            : isEditorial
                            ? "bg-gradient-to-tr from-purple-600 to-indigo-600 text-white"
                            : "bg-gradient-to-tr from-blue-600 to-indigo-600 text-white"
                        }`}
                      >
                        {comment.name ? comment.name.charAt(0) : <User className="h-4 w-4" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h5 className="text-xs font-bold text-slate-950 dark:text-white leading-none">
                            {comment.name}
                          </h5>
                          {isAuthor && (
                            <span className="text-[10px] font-black text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 px-1.5 py-0.5 rounded-full border border-amber-300 dark:border-amber-800 flex items-center gap-0.5">
                              <Sparkles className="h-2.5 w-2.5 text-amber-500" />
                              Penulis Artikel
                            </span>
                          )}
                          {isEditorial && (
                            <span className="text-[10px] font-black text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-950/60 px-1.5 py-0.5 rounded-full border border-purple-300 dark:border-purple-800">
                              Tim Redaksi
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 inline-block">
                          {formatRelativeTime(comment.createdAt)}
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200/60 dark:border-emerald-900/60">
                      Terverifikasi
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed pl-10 whitespace-pre-line">
                    {comment.content}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
