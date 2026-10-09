"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Article } from "@/types/news";
import { Check, Sparkles, Quote, Tag, ZoomIn } from "lucide-react";
import { ImageLightboxModal } from "./ImageLightboxModal";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { InlineQuoteShare } from "./InlineQuoteShare";

interface ArticleContentProps {
  article: Article;
}

export function ArticleContent({ article }: ArticleContentProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  // Simple markdown-to-HTML parser for mock / raw content strings
  const renderFormattedParagraphs = (raw: string) => {
    const lines = raw.trim().split("\n\n");
    return lines.map((block, idx) => {
      const trimmed = block.trim();
      if (trimmed.startsWith("### ")) {
        return (
          <h2
            key={idx}
            className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-950 dark:text-white mt-10 mb-4 font-sans border-l-4 border-blue-600 pl-3.5"
          >
            {trimmed.replace("### ", "")}
          </h2>
        );
      }
      if (trimmed.startsWith("#### ")) {
        return (
          <h3
            key={idx}
            className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-8 mb-3 font-sans"
          >
            {trimmed.replace("#### ", "")}
          </h3>
        );
      }
      if (trimmed.startsWith("> ")) {
        return (
          <div
            key={idx}
            className="my-8 rounded-2xl border-l-4 border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 p-6 sm:p-7 text-slate-800 dark:text-slate-200"
          >
            <Quote className="h-8 w-8 text-blue-600/40 mb-2" />
            <blockquote className="italic font-editorial-headline text-lg sm:text-xl leading-relaxed text-slate-900 dark:text-slate-100">
              {trimmed.replace("> ", "")}
            </blockquote>
          </div>
        );
      }
      if (trimmed.startsWith("1. ") || trimmed.startsWith("- ")) {
        const items = trimmed.split("\n").map((item) => item.replace(/^[0-9]+\.\s+|^-\s+/, ""));
        return (
          <ul key={idx} className="space-y-2.5 my-6 text-slate-800 dark:text-slate-200 pl-2">
            {items.map((it, i) => (
              <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 mt-0.5">
                  <Check className="h-3 w-3 stroke-[3]" />
                </span>
                <span>{it}</span>
              </li>
            ))}
          </ul>
        );
      }

      if (trimmed.startsWith("[compare-visual") && trimmed.endsWith("]")) {
        const getAttr = (name: string, fallback = "") => {
          const match = trimmed.match(new RegExp(`${name}="([^"]*)"`));
          return match ? match[1] : fallback;
        };
        const before = getAttr("before", article.featuredImageUrl);
        const after = getAttr("after", article.featuredImageUrl);
        const beforeLabel = getAttr("beforeLabel", "Sebelum");
        const afterLabel = getAttr("afterLabel", "Sesudah");
        const caption = getAttr("caption", "Perbandingan Visual Interaktif Redaksi");
        const credit = getAttr("credit", "Arsip Dokumentasi Modern News Portal");

        return (
          <BeforeAfterSlider
            key={idx}
            beforeImage={before}
            afterImage={after}
            beforeLabel={beforeLabel}
            afterLabel={afterLabel}
            caption={caption}
            credit={credit}
          />
        );
      }

      return (
        <p key={idx} className="leading-relaxed mb-6 text-slate-800 dark:text-slate-200">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div id="main-article-content" className="font-size-base transition-all duration-200">
      {/* Featured Lead Image with Lightbox */}
      <figure
        onClick={() => setIsLightboxOpen(true)}
        className="group relative my-8 overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 shadow-md cursor-pointer"
        title="Klik untuk melihat foto dalam layar penuh"
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={article.featuredImageUrl}
            alt={article.title}
            fill
            preload
            sizes="(max-width: 1024px) 100vw, 840px"
            className="object-cover group-hover:scale-102 transition-transform duration-300"
          />

          {/* Hover Zoom Badge */}
          <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-sm text-white text-xs font-bold shadow-lg">
              <ZoomIn className="h-3.5 w-3.5" />
              <span>Perbesar Layar Penuh</span>
            </span>
          </div>
        </div>
        {article.imageCaption && (
          <figcaption className="p-3.5 sm:p-4 text-xs text-slate-500 dark:text-slate-400 italic bg-white dark:bg-slate-950/80 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
            <span>{article.imageCaption}</span>
            <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider hidden sm:inline">
              Arsip Visual Modern News
            </span>
          </figcaption>
        )}
      </figure>

      {/* Lightbox Modal */}
      <ImageLightboxModal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        src={article.featuredImageUrl}
        alt={article.title}
        caption={article.imageCaption}
        credit="Arsip Dokumentasi Liputan Modern News Portal"
      />

      {/* Executive Summary / Key Takeaways Box (Bloomberg / FT style) */}
      <div className="rounded-2xl border border-blue-200/90 dark:border-blue-900/60 bg-gradient-to-br from-blue-50/70 via-slate-50 to-indigo-50/40 dark:from-blue-950/30 dark:via-slate-900 dark:to-indigo-950/20 p-5 sm:p-6 mb-8 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <h3 className="text-xs font-black uppercase tracking-wider text-blue-900 dark:text-blue-300">
            Intisari Liputan (Key Takeaways)
          </h3>
        </div>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <li className="flex items-start gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0 mt-2" />
            <span>
              Fokus liputan mendalam berbasis wawancara narasumber dan data terverifikasi.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0 mt-2" />
            <span>
              Memberikan perspektif komprehensif bagi pemangku kepentingan dan pembaca profesional.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0 mt-2" />
            <span>Disusun sesuai pedoman Kode Etik Jurnalistik Dewan Pers.</span>
          </li>
        </ul>
      </div>

      {/* Main Reading Typography Container with Editorial Dropcap */}
      <div
        id="article-content-body"
        className="font-article editorial-dropcap prose prose-slate dark:prose-invert lg:prose-lg max-w-none text-slate-800 dark:text-slate-200 leading-[1.85]"
      >
        {renderFormattedParagraphs(
          article.slug === "transisi-energi-hijau-investasi-infrastruktur-bersih" &&
            !article.content.includes("[compare-visual")
            ? `${article.content}\n\n### Transformasi Lanskap Kawasan: Sebelum dan Sesudah\n\n[compare-visual before="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80" after="https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80" beforeLabel="2021: Lahan Terbuka Pra-Proyek" afterLabel="2026: Sentra Pembangkit Hibrida Surya-Angin" caption="Transformasi Lanskap Energi Terbarukan Nasional (Geser slider untuk melihat perbandingan visual)" credit="Citra Satelit & Visualisasi Redaksi Modern News Portal"]\n\nKeberhasilan proyek percontohan ini akan dijadikan cetak biru (*blueprint*) bagi percepatan elektrifikasi hijau di 10 koridor kepulauan lainnya.`
            : article.content,
        )}
      </div>

      {/* Floating Selection Quote & Share Toolbar (Medium/NYT style) */}
      <InlineQuoteShare articleTitle={article.title} />

      {/* Tags Cloud */}
      {article.tags && article.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mt-10 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 mr-2">
            <Tag className="h-3.5 w-3.5" />
            <span>Topik Berita Terkait:</span>
          </div>
          {article.tags.map((tag) => (
            <span
              key={tag.id}
              className="inline-block rounded-xl bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-colors shadow-2xs cursor-pointer"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
