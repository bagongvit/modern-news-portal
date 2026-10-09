import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getCategoryBySlug, getArticles, getCategories } from "@/lib/cms/payload";
import { generatePortalMetadata, generateBreadcrumbJsonLd } from "@/lib/seo";
import { NewsCard } from "@/components/news/NewsCard";
import { TrendingWidget } from "@/components/news/TrendingWidget";
import { EditorialPollWidget } from "@/components/news/EditorialPollWidget";
import Link from "next/link";
import { Layers, ChevronRight, Newspaper } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Kategori Tidak Ditemukan",
    };
  }

  return generatePortalMetadata({
    title: `Berita ${category.name} Terkini`,
    description:
      category.description ||
      `Kumpulan berita, analisis, dan liputan mendalam seputar ${category.name}.`,
    path: `/kategori/${category.slug}`,
  });
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const [articles, allArticles, allCategories] = await Promise.all([
    getArticles({ categorySlug: category.slug, limit: 12 }),
    getArticles({ limit: 10 }),
    getCategories(),
  ]);

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Beranda", path: "/" },
    { name: `Kategori ${category.name}`, path: `/kategori/${category.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Category Header Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-900 dark:via-blue-950/30 dark:to-slate-950 p-8 sm:p-12 mb-10 shadow-sm">
          {/* Subtle Ambient Decorative Circles */}
          <div
            className="absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-10 blur-3xl pointer-events-none"
            style={{ backgroundColor: category.color || "#2563eb" }}
          />

          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs mb-4">
            <Link
              href="/"
              className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors font-medium"
            >
              Beranda
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <span className="font-bold text-slate-900 dark:text-slate-100">Kanal Rubrik</span>
          </nav>

          <div className="flex items-center gap-3.5">
            <span
              className="h-5 w-5 rounded-full shadow-xs"
              style={{ backgroundColor: category.color || "#2563eb" }}
            />
            <h1 className="font-editorial-headline text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
              {category.name}
            </h1>
          </div>

          {category.description && (
            <p className="mt-3.5 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed font-light">
              {category.description}
            </p>
          )}

          <div className="mt-6 flex items-center gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span className="rounded-full bg-white/80 dark:bg-slate-800/80 px-3 py-1 border border-slate-200/80 dark:border-slate-700">
              Menampilkan {articles.length} berita terkurasi
            </span>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Articles Grid */}
          <div className="lg:col-span-8">
            {articles.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 p-16 text-center bg-slate-50/50 dark:bg-slate-900/40">
                <Newspaper className="h-10 w-10 text-slate-400 mx-auto mb-3" />
                <p className="text-lg font-bold text-slate-800 dark:text-slate-200">
                  Belum ada artikel pada rubrik ini.
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Redaksi kami sedang mempersiapkan liputan mendalam untuk topik ini.
                </p>
                <Link
                  href="/"
                  className="mt-6 inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition-colors shadow-xs"
                >
                  Kembali ke Beranda
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {articles.map((art) => (
                  <NewsCard key={art.id} article={art} />
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            <TrendingWidget articles={allArticles} />

            {/* Weekly Interactive Editorial Poll */}
            <EditorialPollWidget />

            {/* Other Categories */}
            <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-6 shadow-xs">
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
                <Layers className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                  Kanal Rubrik Lainnya
                </h3>
              </div>
              <div className="flex flex-col space-y-2">
                {allCategories
                  .filter((c) => c.slug !== category.slug)
                  .map((c) => (
                    <Link
                      key={c.id}
                      href={`/kategori/${c.slug}`}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: c.color || "#2563eb" }}
                        />
                        <span>{c.name}</span>
                      </div>
                      <span className="text-xs text-slate-400">&rsaquo;</span>
                    </Link>
                  ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
