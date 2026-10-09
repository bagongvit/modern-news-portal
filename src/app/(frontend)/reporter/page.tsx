import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getPayloadClient } from "@/lib/cms/payload";
import { ReporterLogoutButton } from "./ReporterLogoutButton";
import { ReporterArticleDesk, ReporterArticle } from "@/components/reporter/ReporterArticleDesk";
import {
  PlusCircle,
  FileText,
  CheckCircle2,
  FileEdit,
  Eye,
  ShieldCheck,
  Calendar,
  Sparkles,
} from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ruang Redaksi Wartawan | Modern News Portal",
  description:
    "Pusat kerja editorial jurnalis untuk mengelola draf, memantau status liputan, dan menerbitkan artikel berita.",
  robots: { index: false, follow: false },
};

export default async function ReporterDashboardPage() {
  const payload = await getPayloadClient();
  if (!payload) {
    return (
      <DashboardNotice message="Layanan redaksi sedang tidak tersedia. Coba lagi beberapa saat." />
    );
  }

  const auth = await payload.auth({ headers: await headers() });
  if (!auth.user) redirect("/reporter/login");

  const isSupervisor = auth.user.role === "admin" || auth.user.role === "editor";

  const [profiles, articlesResult, breakingNewsGlobal] = await Promise.all([
    payload.find({
      collection: "authors",
      where: { user: { equals: auth.user.id } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
      user: auth.user,
    }),
    payload.find({
      collection: "articles",
      where: isSupervisor ? {} : { reporter: { equals: auth.user.id } },
      sort: "-updatedAt",
      limit: 100,
      depth: 1,
      overrideAccess: true,
      user: auth.user,
    }),
    payload.findGlobal({ slug: "breaking-news" }).catch(() => null),
  ]);

  if (profiles.docs.length === 0 && !isSupervisor) {
    return (
      <DashboardNotice
        message="Akun reporter belum terhubung ke profil penulis. Minta editor mengaitkan akun Anda di koleksi Authors."
        showLogout
      />
    );
  }

  const authorProfile = profiles.docs[0] || {
    id: auth.user.id,
    name: auth.user.name || (auth.user.role === "admin" ? "Pemimpin Redaksi" : "Editor Redaksi"),
    role:
      auth.user.role === "admin"
        ? "Pemimpin Redaksi & Super Administrator"
        : "Editor Pelaksana Redaksi",
    avatar: null,
  };

  const articles = articlesResult.docs as unknown as ReporterArticle[];

  // KPI Calculations
  const totalArticles = articles.length;
  const publishedCount = articles.filter((a) => a.status === "published").length;
  const draftCount = articles.filter((a) => a.status === "draft").length;
  const totalViews = articles.reduce((sum, a) => sum + (a.viewCount || 0), 0);

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 py-8 lg:py-12 transition-colors">
      <div className="container mx-auto max-w-7xl px-4 space-y-8">
        {/* Breaking News Broadcast Alert (if active) */}
        {breakingNewsGlobal?.isActive && (
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 to-rose-700 p-4 text-white shadow-lg shadow-rose-900/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
              </span>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-red-200">
                  ⚡ SIARAN BREAKING NEWS SEDANG AKTIF
                </span>
                <p className="text-sm font-bold text-white leading-tight">
                  {breakingNewsGlobal.headline}
                </p>
              </div>
            </div>
            <Link
              href="/admin/globals/breaking-news"
              className="inline-flex items-center justify-center shrink-0 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3.5 py-1.5 text-xs font-bold text-white transition-colors"
            >
              Kelola Siaran →
            </Link>
          </div>
        )}
        {/* ========================================================
            1. EXECUTIVE NEWSROOM BANNER & JOURNALIST IDENTITY
            ======================================================== */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white p-6 sm:p-8 lg:p-10 shadow-xl border border-slate-800">
          {/* Subtle Ambient Glow Elements */}
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />
          <div className="absolute right-1/3 -bottom-20 h-60 w-60 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Reporter Profile Block */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-2xl overflow-hidden border-2 border-blue-500/40 shadow-lg bg-slate-800">
                {authorProfile.avatar ? (
                  <Image
                    src={authorProfile.avatar}
                    alt={authorProfile.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-2xl font-bold bg-blue-600 text-white">
                    {authorProfile.name.charAt(0)}
                  </div>
                )}
                {/* Active Duty Indicator */}
                <div
                  className="absolute bottom-1.5 right-1.5 h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-slate-950"
                  title="Status: Bertugas Aktif"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/20 border border-blue-400/30 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-blue-300">
                    <ShieldCheck className="h-3 w-3" />
                    <span>ID Pers: #MN-2026-084</span>
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-2.5 py-0.5 text-[11px] font-bold text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Meja Redaksi Aktif</span>
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
                  <span>{authorProfile.name}</span>
                </h1>

                <p className="text-xs sm:text-sm text-slate-300 font-medium">
                  {authorProfile.role || "Jurnalis & Reporter Redaksi"} • {auth.user.email}
                </p>

                <p className="text-xs text-slate-400 pt-1 flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-blue-400" />
                  <span>
                    Biro Pusat Jakarta • Shift Redaksi{" "}
                    {new Intl.DateTimeFormat("id-ID", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }).format(new Date())}
                  </span>
                </p>
              </div>
            </div>

            {/* Quick Actions in Header */}
            <div className="flex flex-wrap items-center gap-3 pt-2 lg:pt-0">
              <Link
                href="/admin"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all cursor-pointer transform hover:-translate-y-0.5 border border-white/20"
                title="Buka Pusat Komando & Dashboard Admin CMS"
              >
                <span>📊</span>
                <span>Dashboard Admin</span>
              </Link>

              <Link
                href="/admin/collections/articles/create"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700/80 px-4 py-3 text-sm font-semibold text-slate-200 transition-colors"
                title="Tulis Berita Baru di Editor"
              >
                <PlusCircle className="h-4 w-4 text-emerald-400" />
                <span>+ Tulis Berita</span>
              </Link>

              <Link
                href="/admin/collections/media"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700/80 px-4 py-3 text-sm font-semibold text-slate-200 transition-colors"
                title="Buka Galeri Foto & Media"
              >
                <span>📸 Media</span>
              </Link>

              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700/80 px-4 py-3 text-sm font-semibold text-slate-200 transition-colors"
                title="Pratinjau Portal Web"
              >
                <span>🌐 Web ↗</span>
              </a>

              <ReporterLogoutButton />
            </div>
          </div>
        </section>

        {/* ========================================================
            2. JOURNALIST KPI & DESK STATS (4 METRICS)
            ======================================================== */}
        <section
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          aria-label="Statistik Reporter"
        >
          {/* Metric 1: Total Tulisan */}
          <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Total Naskah
              </p>
              <h3 className="text-2xl font-extrabold text-slate-950 dark:text-white mt-0.5">
                {totalArticles}
              </h3>
              <p className="text-[11px] text-slate-400 dark:text-slate-500">
                Seluruh arsip liputan
              </p>
            </div>
          </div>

          {/* Metric 2: Artikel Terbit */}
          <div className="rounded-2xl border border-emerald-200/80 dark:border-emerald-900/50 bg-gradient-to-br from-emerald-50/50 to-white dark:from-slate-900 dark:to-emerald-950/20 p-5 shadow-xs flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                Artikel Terbit
              </p>
              <h3 className="text-2xl font-extrabold text-slate-950 dark:text-white mt-0.5">
                {publishedCount}
              </h3>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                Tayang di portal berita
              </p>
            </div>
          </div>

          {/* Metric 3: Draf Berita */}
          <div className="rounded-2xl border border-amber-200/80 dark:border-amber-900/50 bg-gradient-to-br from-amber-50/50 to-white dark:from-slate-900 dark:to-amber-950/20 p-5 shadow-xs flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400">
              <FileEdit className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                Draf Berjalan
              </p>
              <h3 className="text-2xl font-extrabold text-slate-950 dark:text-white mt-0.5">
                {draftCount}
              </h3>
              <p className="text-[11px] text-amber-700 dark:text-amber-400 font-medium">
                Dalam riset & edit
              </p>
            </div>
          </div>

          {/* Metric 4: Total Pembaca */}
          <div className="rounded-2xl border border-purple-200/80 dark:border-purple-900/50 bg-gradient-to-br from-purple-50/50 to-white dark:from-slate-900 dark:to-purple-950/20 p-5 shadow-xs flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400">
              <Eye className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-purple-800 dark:text-purple-300 uppercase tracking-wider">
                Total Pembaca
              </p>
              <h3 className="text-2xl font-extrabold text-slate-950 dark:text-white mt-0.5">
                {totalViews > 1000 ? `${(totalViews / 1000).toFixed(1)}k` : totalViews}
              </h3>
              <p className="text-[11px] text-purple-700 dark:text-purple-400 font-medium">
                Jangkauan pembaca aktif
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================
            3. MAIN WORKSTATION: ARTICLE DESK (8) + SIDEBAR (4)
            ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Article Desk (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-bold text-slate-950 dark:text-white tracking-tight">
                  Meja Kerja Naskah
                </h2>
              </div>
              <span className="text-xs text-slate-500">
                Penyuntingan & Manajemen Status Tulisan
              </span>
            </div>

            {/* Interactive Article Desk (Tabs, Live Search, Sort, Rich Cards) */}
            <ReporterArticleDesk articles={articles} />
          </div>

          {/* Right Editorial Sidebar (4 Cols) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Card: Standar Jurnalisme Redaksi */}
            <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 shadow-xs">
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white">
                <ShieldCheck className="h-5 w-5 text-blue-600" />
                <h3 className="text-sm font-bold uppercase tracking-wider">
                  Pedoman Kerja Wartawan
                </h3>
              </div>

              <ul className="space-y-3.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold text-[10px]">
                    1
                  </span>
                  <span>
                    <strong>Verifikasi Dua Sumber:</strong> Setiap rilis berita wajib diverifikasi
                    silang minimal dua sumber tepercaya sebelum diajukan ke editor.
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold text-[10px]">
                    2
                  </span>
                  <span>
                    <strong>Keberimbangan & Hak Jawab:</strong> Liputan investigasi sensitif harus
                    memberikan ruang konfirmasi setara bagi pihak terkait.
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold text-[10px]">
                    3
                  </span>
                  <span>
                    <strong>Akurasi Judul:</strong> Hindari umpan klik (clickbait). Judul harus
                    mencerminkan fakta esensial di paragraf pembuka.
                  </span>
                </li>
              </ul>
            </div>

            {/* Card: Jadwal Agenda Redaksi */}
            <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 shadow-xs">
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white">
                <Calendar className="h-5 w-5 text-indigo-600" />
                <h3 className="text-sm font-bold uppercase tracking-wider">
                  Agenda Redaksi Hari Ini
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      Rapat Proyeksi Berita
                    </span>
                  </div>
                  <span className="font-bold text-slate-500">09:00 WIB</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      Deadline Draf Pertama
                    </span>
                  </div>
                  <span className="font-bold text-slate-500">14:00 WIB</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-purple-500" />
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      Kurasi Buletin Sore
                    </span>
                  </div>
                  <span className="font-bold text-slate-500">17:00 WIB</span>
                </div>
              </div>
            </div>

            {/* Card: Hotline Bantuan Redaksi */}
            <div className="rounded-2xl border border-blue-200 dark:border-blue-900/50 bg-gradient-to-br from-blue-50/70 to-indigo-50/50 dark:from-slate-900 dark:to-blue-950/40 p-6 shadow-xs">
              <h4 className="text-sm font-bold text-slate-950 dark:text-white">
                Butuh Bantuan Penerbitan Cepat?
              </h4>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Untuk liputan peristiwa besar (*Breaking News*) yang membutuhkan verifikasi cepat
                sebelum terbit, hubungi tim Managing Editor.
              </p>
              <div className="mt-4 pt-3 border-t border-blue-200/60 dark:border-blue-900/60 flex items-center justify-between text-xs">
                <span className="font-bold text-blue-700 dark:text-blue-300">
                  redaksi@modernnews.id
                </span>
                <span className="rounded-md bg-blue-600 px-2 py-0.5 text-[10px] font-bold text-white uppercase">
                  Siaga 24 Jam
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function DashboardNotice({
  message,
  showLogout = false,
}: {
  message: string;
  showLogout?: boolean;
}) {
  return (
    <section className="container mx-auto max-w-3xl px-4 py-16">
      {showLogout && (
        <div className="mb-6 flex justify-end">
          <ReporterLogoutButton />
        </div>
      )}
      <div
        role="status"
        className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-950 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100 shadow-sm"
      >
        {message}
      </div>
    </section>
  );
}
