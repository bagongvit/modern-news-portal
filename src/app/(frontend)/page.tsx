import React from "react";
import Link from "next/link";
import { getArticles, getCategories } from "@/lib/cms/payload";
import { HeroSection } from "@/components/news/HeroSection";
import { NewsCard } from "@/components/news/NewsCard";
import { LatestNewsFeed } from "@/components/news/LatestNewsFeed";
import { TopicOrbitRadar } from "@/components/news/TopicOrbitRadar";
import { TrendingWidget } from "@/components/news/TrendingWidget";
import { EditorialPollWidget } from "@/components/news/EditorialPollWidget";
import { DailyNewsQuiz } from "@/components/news/DailyNewsQuiz";
import { NewsletterForm } from "@/components/shared/NewsletterForm";
import {
  ArrowRight,
  Layers,
  Newspaper,
  Cpu,
  BarChart3,
  Quote,
  CheckCircle,
  Zap,
} from "lucide-react";

export const revalidate = 60; // ISR revalidation every 60 seconds

export default async function HomePage() {
  const [allArticles, categories] = await Promise.all([
    getArticles({ limit: 25 }),
    getCategories(),
  ]);

  const featuredArticles = allArticles.filter((a) => a.isFeatured);
  const techArticles = allArticles.filter((a) => a.category.slug === "teknologi").slice(0, 3);
  const businessArticles = allArticles.filter((a) => a.category.slug === "bisnis").slice(0, 3);
  const opinionArticles = allArticles.filter((a) => a.category.slug === "opini").slice(0, 2);

  // Fast facts / 60-second summary from latest news
  const fastFacts = allArticles.slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-4 space-y-12">
      {/* 1. Editorial Hero Cover Showcase */}
      <HeroSection
        featuredArticles={featuredArticles.length > 0 ? featuredArticles : allArticles}
      />

      {/* 2. Kilas 60 Detik: Rangkuman Cepat (Fast Briefing Bar) */}
      {fastFacts.length > 0 && (
        <section
          className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-gradient-to-r from-slate-50 via-blue-50/20 to-slate-50 dark:from-slate-900/80 dark:via-blue-950/20 dark:to-slate-900/80 p-4 sm:p-5 shadow-xs"
          aria-label="Kilas 60 Detik"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs">
                <Zap className="h-4 w-4 fill-white" />
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-950 dark:text-white">
                  Kilas 60 Detik
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Pokok peristiwa terpenting hari ini
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
              {fastFacts.map((fact, i) => (
                <Link
                  key={fact.id}
                  href={`/berita/${fact.slug}`}
                  className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-white dark:hover:bg-slate-800/60 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-blue-100 dark:bg-blue-950 text-[10px] font-black text-blue-700 dark:text-blue-300">
                    {i + 1}
                  </span>
                  <p className="text-xs font-medium text-slate-800 dark:text-slate-200 line-clamp-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {fact.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. Radar Orbit Isu Hangat (Cosmic Orbit Topic Radar) */}
      <TopicOrbitRadar />

      {/* 4. Main Content Split: Latest Feed (8 cols) + Trending & Sidebar (4 cols) */}
      <section id="terbaru" className="pt-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Feed Column with Interactive Category Tabs */}
          <div className="lg:col-span-8">
            <LatestNewsFeed articles={allArticles} categories={categories} />
          </div>

          {/* Right Sidebar */}
          <aside className="lg:col-span-4 space-y-8" aria-label="Widget Populer dan Buletin">
            {/* Trending Articles Widget */}
            <div id="populer">
              <TrendingWidget articles={allArticles} />
            </div>

            {/* Daily News Quiz (NYT style) */}
            <DailyNewsQuiz />

            {/* Weekly Interactive Editorial Poll */}
            <EditorialPollWidget />

            {/* Newsletter Card: Luxury Editorial Invitation */}
            <div
              id="buletin"
              className="scroll-mt-24 rounded-2xl border border-blue-200/90 dark:border-blue-900/60 bg-gradient-to-br from-blue-50/90 via-indigo-50/40 to-slate-50 dark:from-slate-900 dark:via-blue-950/40 dark:to-slate-950 p-6 shadow-sm"
            >
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white shadow-xs">
                  <Newspaper className="h-4 w-4" />
                </div>
                <h3 className="text-xs font-black uppercase tracking-wider text-blue-900 dark:text-blue-200">
                  Buletin Pagi Redaksi
                </h3>
              </div>
              <h4 className="text-lg font-black text-slate-950 dark:text-white leading-snug">
                Awali Hari dengan Informasi Terpercaya
              </h4>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
                Kurasi 5 peristiwa terpenting dan analisis geopolitik ekonomi langsung di kotak
                masuk Anda setiap pukul 06.00 WIB. Bebas spam.
              </p>
              <NewsletterForm />
              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-blue-200/60 dark:border-blue-900/40 text-[10px] text-slate-500 dark:text-slate-400">
                <CheckCircle className="h-3 w-3 text-emerald-500" />
                <span>Bergabung bersama 45.000+ eksekutif dan profesional</span>
              </div>
            </div>

            {/* Opini & Kolom Redaksi Mini Widget */}
            {opinionArticles.length > 0 && (
              <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-5 shadow-xs">
                <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-200 dark:border-slate-800">
                  <Quote className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                    Kolom Opini & Analisis
                  </h3>
                </div>
                <div className="space-y-4">
                  {opinionArticles.map((op) => (
                    <article key={op.id} className="group">
                      <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-1">
                        Opini Pakar
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                        <Link href={`/berita/${op.slug}`}>{op.title}</Link>
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        Oleh <span className="font-semibold">{op.author.name}</span>
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* Explore Categories Pills */}
            <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-5 shadow-xs">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-200 dark:border-slate-800">
                <Layers className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                  Jelajahi Rubrik Redaksi
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/kategori/${cat.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-500 dark:hover:text-blue-400 transition-all shadow-2xs"
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: cat.color || "#2563eb" }}
                    />
                    <span>{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* 4. Deep-Dive Rubrik: Teknologi & Transformasi Digital */}
      {techArticles.length > 0 && (
        <section className="pt-8 border-t-2 border-slate-950 dark:border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 gap-2">
            <div>
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                <Cpu className="h-3.5 w-3.5" />
                <span>Rubrik Khusus</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
                Teknologi & Transformasi Digital
              </h2>
            </div>
            <Link
              href="/kategori/teknologi"
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>Semua Berita Teknologi</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {techArticles.map((art) => (
              <NewsCard key={art.id} article={art} />
            ))}
          </div>
        </section>
      )}

      {/* 5. Deep-Dive Rubrik: Bisnis & Pasar Finansial */}
      {businessArticles.length > 0 && (
        <section className="pt-8 pb-10 border-t-2 border-slate-950 dark:border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 gap-2">
            <div>
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
                <BarChart3 className="h-3.5 w-3.5" />
                <span>Pasar Modal & Makroekonomi</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
                Bisnis, Industri & Kebijakan Fiskal
              </h2>
            </div>
            <Link
              href="/kategori/bisnis"
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>Semua Berita Bisnis</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {businessArticles.map((art) => (
              <NewsCard key={art.id} article={art} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
