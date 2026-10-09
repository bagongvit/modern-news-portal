import React from "react";
import Link from "next/link";
import { AlertCircle, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <div className="mx-auto max-w-md space-y-6">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
          404 — Halaman Tidak Ditemukan
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Artikel atau halaman yang Anda cari mungkin telah dipindahkan, diarsipkan, atau tautan
          yang Anda tuju kurang tepat.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            <Home className="h-4 w-4" />
            <span>Kembali ke Beranda</span>
          </Link>
          <Link
            href="/search"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Search className="h-4 w-4" />
            <span>Cari Berita</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
