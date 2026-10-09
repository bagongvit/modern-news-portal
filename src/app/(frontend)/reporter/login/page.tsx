import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getPayloadClient } from "@/lib/cms/payload";
import { loginReporter } from "../actions";
import { Newspaper, ShieldCheck, ArrowLeft, KeyRound, Mail, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Login Ruang Redaksi Reporter | Modern News Portal",
  description: "Akses workstation digital wartawan dan koresponden redaksi Modern News Portal.",
  robots: { index: false, follow: false },
};

type ReporterLoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function ReporterLoginPage({ searchParams }: ReporterLoginPageProps) {
  const [payload, params] = await Promise.all([getPayloadClient(), searchParams]);
  if (payload) {
    const auth = await payload.auth({ headers: await headers() });
    if (auth.user?.role === "author") redirect("/reporter");
    if (auth.user) redirect("/admin");
  }

  const loginError = params.error === "invalid";
  const serviceError = !payload;

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-12 px-4 bg-gradient-to-b from-slate-50 via-slate-100/50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="w-full max-w-md space-y-6">
        {/* Back Link */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Kembali ke Beranda</span>
          </Link>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            Meja Kerja Jurnalis
          </span>
        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-8 shadow-xl shadow-slate-200/50 dark:shadow-none backdrop-blur-sm">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
              <Newspaper className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Ruang Redaksi</span>
              </div>
              <h1 className="text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                Login Wartawan
              </h1>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            Masuk ke workstation digital untuk mengelola draf investigasi, meninjau status
            editorial, dan mengajukan liputan berita.
          </p>

          {/* Error Notice */}
          {(loginError || serviceError) && (
            <div
              role="alert"
              className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-xs sm:text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200"
            >
              {serviceError
                ? "Layanan database CMS sedang tidak dapat dijangkau. Pastikan PostgreSQL aktif."
                : "Kombinasi email atau password salah, atau akun ini tidak memiliki peran Reporter (Author)."}
            </div>
          )}

          {/* Login Form */}
          <form action={loginReporter} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Alamat Email Redaksi
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue="reporter@modernnews.id"
                  autoComplete="username"
                  required
                  placeholder="wartawan@modernnews.id"
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 pl-10 pr-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 outline-none transition focus:border-blue-600 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-600/20"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                >
                  Kata Sandi
                </label>
                <span className="text-[11px] text-slate-400">Terkoneksi aman</span>
              </div>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  defaultValue="reporter12345"
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 pl-10 pr-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 outline-none transition focus:border-blue-600 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-600/20"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={serviceError}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 py-3 px-4 text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all cursor-pointer transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Masuk ke Ruang Redaksi</span>
              <Sparkles className="h-4 w-4" />
            </button>
          </form>

          {/* Quick Demo Credentials Info */}
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 p-3.5 text-xs text-slate-600 dark:text-slate-400">
            <p className="font-bold text-slate-800 dark:text-slate-200 mb-1 flex items-center gap-1.5">
              <span>💡 Kredensial Reporter Uji Coba:</span>
            </p>
            <p className="font-mono text-[11px] text-blue-700 dark:text-blue-400">
              Email: reporter@modernnews.id
            </p>
            <p className="font-mono text-[11px] text-blue-700 dark:text-blue-400">
              Password: reporter12345
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-slate-400 dark:text-slate-500">
          Khusus staf redaksi dan koresponden resmi Modern News Portal.
        </p>
      </div>
    </div>
  );
}
