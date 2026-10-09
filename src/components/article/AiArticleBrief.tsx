"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Zap,
  CheckCircle2,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Lightbulb,
  Share2,
} from "lucide-react";
import { Article } from "@/types/news";
import { cn } from "@/lib/utils";
import { toast } from "@/lib/toast";

interface AiArticleBriefProps {
  article: Article;
}

export function AiArticleBrief({ article }: AiArticleBriefProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<"tldr" | "impact" | "faq">("tldr");
  const [copied, setCopied] = useState(false);

  // Extract structured insights algorithmically from the article
  const insights = React.useMemo(() => {
    // 1. TL;DR 3 Bullet points
    const points: string[] = [];
    if (article.lead) {
      points.push(article.lead);
    }
    const paragraphs = article.content
      .split("\n\n")
      .map((p) => p.trim())
      .filter((p) => !p.startsWith("#") && !p.startsWith(">") && p.length > 60);

    if (paragraphs[0]) {
      points.push(paragraphs[0].slice(0, 180).trim() + "...");
    }
    if (paragraphs[1]) {
      points.push(paragraphs[1].slice(0, 180).trim() + "...");
    }

    // 2. Why It Matters
    const whyItMatters =
      paragraphs[2]?.slice(0, 240).trim() ||
      `Perkembangan isu "${article.title}" menjadi sorotan penting karena berdampak langsung pada dinamika terkini di kategori ${article.category.name} serta kepentingan publik luas.`;

    // 3. Mini FAQ
    const faqList = [
      {
        q: "Apa inti dari peristiwa ini?",
        a: article.lead || article.title,
      },
      {
        q: "Siapa pihak utama yang terlibat?",
        a: `Liputan mendalam oleh ${article.author.name} (${article.author.role}) menyoroti para pemangku kepentingan kunci di sektor ${article.category.name}.`,
      },
      {
        q: "Apa dampak selanjutnya bagi masyarakat?",
        a: "Kebijakan dan tindak lanjut pasca-peristiwa ini diperkirakan akan menentukan tren kebijakan dan respon publik dalam beberapa pekan ke depan.",
      },
    ];

    return {
      tldr: points.slice(0, 3),
      whyItMatters,
      faqList,
    };
  }, [article]);

  const handleCopySummary = async () => {
    const textToCopy = `[Ringkasan AI: ${article.title}]\n\n• ${insights.tldr.join("\n• ")}\n\nSumber: Modern News Portal`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      toast.success("Ringkasan artikel berhasil disalin!", "Ringkasan AI");
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <section
      aria-label="Ringkasan AI Cerdas & Poin Kunci"
      className="my-8 rounded-3xl border border-indigo-200/80 dark:border-indigo-900/50 bg-gradient-to-br from-indigo-50/70 via-white to-blue-50/40 dark:from-slate-900 dark:via-indigo-950/20 dark:to-slate-950 p-5 sm:p-7 shadow-xs overflow-hidden transition-all"
    >
      {/* Top Banner Bar */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-amber-500 text-white shadow-md">
            <Sparkles className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-black tracking-tight text-slate-950 dark:text-white uppercase">
                AI Editorial Quick Brief
              </h3>
              <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-indigo-500/10 to-blue-500/10 dark:from-indigo-950/70 dark:to-blue-950/70 border border-indigo-200 dark:border-indigo-800 px-2 py-0.5 text-[10px] font-black text-indigo-700 dark:text-indigo-300">
                <Zap className="h-2.5 w-2.5 text-amber-500 fill-amber-500" />
                TL;DR Kilat
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Intisari cerdas & sintesis 30 detik untuk pembaca yang mengutamakan kecepatan
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Copy Button */}
          <button
            onClick={handleCopySummary}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
            title="Salin ringkasan ini"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-600 dark:text-emerald-400 text-[11px]">Tersalin</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-slate-500" />
                <span className="text-[11px]">Salin</span>
              </>
            )}
          </button>

          {/* Expand/Collapse Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-900 transition-colors cursor-pointer"
            title={isOpen ? "Tutup ringkasan" : "Buka ringkasan"}
            aria-expanded={isOpen}
          >
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mt-5 pt-4 border-t border-indigo-100 dark:border-indigo-900/40 animate-in fade-in duration-200 space-y-4">
          {/* Segmented Tab Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs font-bold">
            <button
              onClick={() => setActiveTab("tldr")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap",
                activeTab === "tldr"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800",
              )}
            >
              <Zap className="h-3.5 w-3.5" />
              <span>3 Intisari Kunci</span>
            </button>

            <button
              onClick={() => setActiveTab("impact")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap",
                activeTab === "impact"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800",
              )}
            >
              <Lightbulb className="h-3.5 w-3.5" />
              <span>Mengapa Penting?</span>
            </button>

            <button
              onClick={() => setActiveTab("faq")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap",
                activeTab === "faq"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800",
              )}
            >
              <HelpCircle className="h-3.5 w-3.5" />
              <span>Tanya Jawab Kilat</span>
            </button>
          </div>

          {/* TAB 1: TL;DR 3 Points */}
          {activeTab === "tldr" && (
            <ul className="space-y-2.5">
              {insights.tldr.map((point, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/80 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-normal shadow-2xs"
                >
                  <CheckCircle2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}

          {/* TAB 2: Why It Matters */}
          {activeTab === "impact" && (
            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/80 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed shadow-2xs space-y-2">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
                <Lightbulb className="h-4 w-4" />
                <span>Analisis Dampak Redaksi</span>
              </div>
              <p>{insights.whyItMatters}</p>
            </div>
          )}

          {/* TAB 3: FAQ */}
          {activeTab === "faq" && (
            <div className="space-y-2.5">
              {insights.faqList.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/80 space-y-1 shadow-2xs"
                >
                  <h4 className="text-xs font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-950 text-[10px] text-indigo-600 dark:text-indigo-400 font-black">
                      Q
                    </span>
                    {item.q}
                  </h4>
                  <p className="text-xs text-slate-700 dark:text-slate-300 pl-5 leading-relaxed">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
