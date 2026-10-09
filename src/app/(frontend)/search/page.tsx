import React from "react";
import { Metadata } from "next";
import { getCategories } from "@/lib/cms/payload";
import { generatePortalMetadata } from "@/lib/seo";
import { LiveSearchBox } from "@/components/search/LiveSearchBox";
import { Search } from "lucide-react";

export const metadata: Metadata = generatePortalMetadata({
  title: "Pusat Pencarian Berita & Arsip",
  description:
    "Cari liputan mendalam, breaking news, dan arsip berita terlengkap seputar teknologi, bisnis, sains, dan dunia.",
  path: "/search",
});

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    kategori?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q, kategori } = await searchParams;
  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 mb-2">
            <Search className="h-6 w-6" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Pusat Pencarian Berita
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Temukan berita terverifikasi, artikel investigasi, dan analisis mendalam dari seluruh
            arsip redaksi.
          </p>
        </div>

        {/* Live Search Component */}
        <LiveSearchBox
          categories={categories}
          initialQuery={q || ""}
          initialCategory={kategori || ""}
        />
      </div>
    </div>
  );
}
