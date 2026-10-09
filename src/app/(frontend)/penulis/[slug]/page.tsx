import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAuthorBySlug, getArticlesByAuthorSlug } from "@/lib/cms/payload";
import { generatePortalMetadata } from "@/lib/seo";
import { NewsCard } from "@/components/news/NewsCard";
import { User, CheckCircle2, ChevronRight, Newspaper, Mail, ExternalLink } from "lucide-react";

interface AuthorPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);

  if (!author) {
    return {
      title: "Penulis Tidak Ditemukan",
    };
  }

  return generatePortalMetadata({
    title: `${author.name} - Profil Jurnalis & Arsip Liputan`,
    description:
      author.bio ||
      `Kumpulan artikel berita, investigasi, dan opini karya jurnalis ${author.name} di Modern News Portal.`,
    path: `/penulis/${author.slug}`,
    image: author.avatar,
  });
}

export default async function AuthorProfilePage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  const articles = await getArticlesByAuthorSlug(author.slug, 30);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs mb-6">
        <Link
          href="/"
          className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors font-medium"
        >
          Beranda
        </Link>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <Link
          href="/redaksi"
          className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors font-medium"
        >
          Redaksi
        </Link>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <span className="font-bold text-slate-900 dark:text-slate-100">{author.name}</span>
      </nav>

      {/* Author Profile Hero Card */}
      <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/20 dark:from-slate-900 dark:via-blue-950/20 dark:to-slate-950 p-6 sm:p-10 mb-12 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 rounded-2xl overflow-hidden border-2 border-blue-500 shadow-md bg-slate-200 dark:bg-slate-800">
            {author.avatar ? (
              <Image
                src={author.avatar}
                alt={author.name}
                fill
                sizes="112px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-slate-400">
                <User className="h-10 w-10" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                    {author.name}
                  </h1>
                  <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mt-1">
                  {author.role}
                </p>
              </div>

              {/* Social / Contact Links */}
              <div className="flex items-center space-x-2">
                {author.twitter && (
                  <a
                    href={`https://twitter.com/${author.twitter.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-950 hover:text-white dark:hover:bg-slate-700 transition-all font-semibold border border-slate-200 dark:border-slate-700 shadow-2xs"
                    aria-label={`Twitter ${author.name}`}
                  >
                    <span className="font-bold">𝕏</span>
                    <span>{author.twitter}</span>
                  </a>
                )}
                {author.linkedin && (
                  <a
                    href={`https://linkedin.com/in/${author.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-600 hover:text-white transition-all font-semibold border border-blue-200/80 dark:border-blue-900 shadow-2xs"
                    aria-label={`LinkedIn ${author.name}`}
                  >
                    <ExternalLink className="h-3 w-3" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {author.email && (
                  <a
                    href={`mailto:${author.email}`}
                    className="p-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-400 transition-all border border-slate-200 dark:border-slate-700 shadow-2xs"
                    aria-label={`Email ${author.name}`}
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>

            {author.bio && (
              <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                {author.bio}
              </p>
            )}

            <div className="mt-5 flex items-center gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span className="rounded-full bg-white/80 dark:bg-slate-800/80 px-3 py-1 border border-slate-200/80 dark:border-slate-700">
                {articles.length} Artikel Diterbitkan
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Articles Archive by Author */}
      <section aria-label="Arsip Tulisan Penulis">
        <div className="mb-6 pb-3 border-b-2 border-slate-950 dark:border-slate-100 flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 dark:text-white">
            Liputan & Artikel oleh {author.name}
          </h2>
          <span className="text-xs text-slate-500 font-medium">Terbaru ke Terlama</span>
        </div>

        {articles.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 p-16 text-center bg-slate-50/50 dark:bg-slate-900/40">
            <Newspaper className="h-10 w-10 text-slate-400 mx-auto mb-3" />
            <p className="text-lg font-bold text-slate-800 dark:text-slate-200">
              Belum ada artikel yang diterbitkan oleh penulis ini.
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Tulisan sedang dalam proses penyuntingan dan verifikasi redaksi.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
