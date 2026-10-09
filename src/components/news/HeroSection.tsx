import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types/news";
import { formatRelativeTime, formatReadingTime } from "@/lib/utils";
import { Sparkles, Clock, CheckCircle2, ChevronRight } from "lucide-react";
import { BookmarkButton } from "@/components/shared/BookmarkButton";

interface HeroSectionProps {
  featuredArticles: Article[];
}

export function HeroSection({ featuredArticles }: HeroSectionProps) {
  if (!featuredArticles || featuredArticles.length === 0) return null;

  const mainStory = featuredArticles[0];
  const secondaryStories = featuredArticles.slice(1, 4);

  return (
    <section className="py-4 lg:py-6" aria-label="Berita Utama Pilihan">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Main Cover Story (8 columns) */}
        <div className="lg:col-span-8 group flex flex-col">
          <article className="relative flex-1 overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-slate-900 shadow-xl transition-all duration-300">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] w-full h-full min-h-[420px] sm:min-h-[480px] overflow-hidden">
              <Image
                src={mainStory.featuredImageUrl}
                alt={mainStory.title}
                fill
                preload
                sizes="(max-width: 1024px) 100vw, 68vw"
                className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
              />

              {/* Multi-layered Dark Vignette Gradient for Perfect Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-transparent hidden sm:block" />

              {/* Floating Top Badges */}
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 flex flex-wrap items-center gap-2 z-10">
                <span className="flex items-center gap-1.5 rounded-full bg-blue-600/90 backdrop-blur-md px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-lg border border-white/20">
                  <Sparkles className="h-3.5 w-3.5 fill-white" />
                  <span>Liputan Utama</span>
                </span>
                <Link
                  href={`/kategori/${mainStory.category.slug}`}
                  className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md shadow-md hover:brightness-110 transition-all border border-white/10"
                  style={{ backgroundColor: `${mainStory.category.color}ee` || "#2563eb" }}
                >
                  {mainStory.category.name}
                </Link>
              </div>

              {/* Bookmark Button Top-Right Overlay */}
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-10">
                <BookmarkButton
                  article={{
                    id: mainStory.id,
                    title: mainStory.title,
                    slug: mainStory.slug,
                    lead: mainStory.lead,
                    featuredImageUrl: mainStory.featuredImageUrl,
                    categoryName: mainStory.category.name,
                    categorySlug: mainStory.category.slug,
                    categoryColor: mainStory.category.color,
                    publishedAt: mainStory.publishedAt,
                    readingTimeMinutes: mainStory.readingTimeMinutes,
                    authorName: mainStory.author.name,
                  }}
                />
              </div>

              {/* Bottom Editorial Content */}
              <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 md:p-10 text-white z-10">
                <div className="flex items-center gap-3 text-xs font-medium text-slate-300 mb-3">
                  <div className="flex items-center gap-1 text-blue-300 font-semibold">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{formatRelativeTime(mainStory.publishedAt)}</span>
                  </div>
                  <span>•</span>
                  <span>{formatReadingTime(mainStory.readingTimeMinutes)}</span>
                </div>

                <h1 className="font-editorial-headline text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.12] text-white group-hover:text-blue-200 transition-colors drop-shadow-sm">
                  <Link href={`/berita/${mainStory.slug}`}>{mainStory.title}</Link>
                </h1>

                <p className="mt-3.5 text-sm sm:text-base text-slate-200 line-clamp-2 sm:line-clamp-3 leading-relaxed max-w-3xl font-light">
                  {mainStory.lead}
                </p>

                {/* Byline Row */}
                <div className="flex items-center justify-between mt-6 pt-5 border-t border-white/15">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-white/40 shadow-sm bg-slate-800">
                      <Image
                        src={
                          mainStory.author.avatar ||
                          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                        }
                        alt={mainStory.author.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-white text-sm">
                        <span>{mainStory.author.name}</span>
                        <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" />
                      </div>
                      <p className="text-[11px] text-slate-300 font-medium">
                        {mainStory.author.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <BookmarkButton
                      article={{
                        id: mainStory.id,
                        title: mainStory.title,
                        slug: mainStory.slug,
                        lead: mainStory.lead,
                        featuredImageUrl: mainStory.featuredImageUrl,
                        categoryName: mainStory.category.name,
                        categorySlug: mainStory.category.slug,
                        categoryColor: mainStory.category.color,
                        publishedAt: mainStory.publishedAt,
                        readingTimeMinutes: mainStory.readingTimeMinutes,
                        authorName: mainStory.author.name,
                      }}
                      variant="pill"
                      className="bg-white/15 text-white border-white/20 hover:bg-white/25"
                    />
                    <Link
                      href={`/berita/${mainStory.slug}`}
                      className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md px-4 py-2 text-xs font-bold text-white transition-all border border-white/20"
                    >
                      <span>Baca Laporan Penuh</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* Right Column: Editorial Highlights (4 columns) */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-3 border-b-2 border-slate-900 dark:border-slate-100">
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-950 dark:text-white flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-600 animate-pulse" />
              Sorotan Pilihan Redaksi
            </h2>
            <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Edisi Khusus
            </span>
          </div>

          <div className="flex flex-col divide-y divide-slate-200/80 dark:divide-slate-800/80 flex-1 justify-between">
            {secondaryStories.map((story, idx) => (
              <article
                key={story.id}
                className="group flex gap-4 py-4 first:pt-2 last:pb-2 items-start transition-all"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-black text-slate-800 dark:text-slate-200 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-2xs">
                  0{idx + 1}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Link
                      href={`/kategori/${story.category.slug}`}
                      className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {story.category.name}
                    </Link>
                    <span className="text-[10px] text-slate-400">•</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">
                      {formatReadingTime(story.readingTimeMinutes)}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    <Link href={`/berita/${story.slug}`}>{story.title}</Link>
                  </h3>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {story.lead}
                  </p>
                </div>

                <div className="relative h-18 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/70 dark:border-slate-800">
                  <Image
                    src={story.featuredImageUrl}
                    alt={story.title}
                    fill
                    sizes="80px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-1 right-1 z-10">
                    <BookmarkButton
                      article={{
                        id: story.id,
                        title: story.title,
                        slug: story.slug,
                        lead: story.lead,
                        featuredImageUrl: story.featuredImageUrl,
                        categoryName: story.category.name,
                        categorySlug: story.category.slug,
                        categoryColor: story.category.color,
                        publishedAt: story.publishedAt,
                        readingTimeMinutes: story.readingTimeMinutes,
                        authorName: story.author.name,
                      }}
                      className="h-6 w-6 rounded-lg text-slate-700 bg-white/90 shadow-xs"
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Quick Newsletter / Briefing Pill Banner */}
          <div className="rounded-xl border border-blue-200/80 dark:border-blue-900/50 bg-gradient-to-r from-blue-50 to-indigo-50/50 dark:from-blue-950/40 dark:to-slate-900 p-3.5 flex items-center justify-between gap-3 shadow-2xs">
            <div className="text-xs">
              <span className="font-extrabold text-blue-900 dark:text-blue-200 block">
                Ringkasan Pagi Hari
              </span>
              <span className="text-slate-600 dark:text-slate-400 text-[11px]">
                Dapatkan 5 berita utama langsung di email Anda.
              </span>
            </div>
            <Link
              href="/#buletin"
              className="shrink-0 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-700 transition-colors shadow-xs"
            >
              Daftar
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
