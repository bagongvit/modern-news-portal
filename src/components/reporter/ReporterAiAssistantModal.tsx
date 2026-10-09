"use client";

import React, { useState } from "react";
import {
  Sparkles,
  X,
  Copy,
  Check,
  CheckCircle2,
  Wand2,
  Type,
  Tag,
  BookOpen,
  ArrowRight,
  Lightbulb,
} from "lucide-react";

interface ReporterAiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReporterAiAssistantModal({ isOpen, onClose }: ReporterAiAssistantModalProps) {
  const [draftTitle, setDraftTitle] = useState("");
  const [draftLead, setDraftLead] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResults, setGeneratedResults] = useState<{
    headlines: { type: string; title: string }[];
    tags: string[];
    eydTips: string[];
    readabilityScore: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleGenerate = () => {
    if (!draftTitle.trim()) return;
    setIsGenerating(true);

    setTimeout(() => {
      const topic = draftTitle.trim();
      const cleanTopic = topic.replace(/[?.!]+$/, "");

      setGeneratedResults({
        headlines: [
          {
            type: "Click-Worthy & Menarik",
            title: `Terungkap! Fakta Terbaru di Balik ${cleanTopic}`,
          },
          {
            type: "Standar Formal Redaksi",
            title: `Dinamika Kebijakan Terkini: Analisis Mendalam Mengenai ${cleanTopic}`,
          },
          {
            type: "SEO Google News Friendly",
            title: `${cleanTopic}: Kronologi, Penyebab, dan Sikap Pemerintah Hari Ini`,
          },
          {
            type: "Singkat untuk Media Sosial (X / IG)",
            title: `Sorotan Utama: Mengapa ${cleanTopic} Jadi Perbincangan Publik?`,
          },
          {
            type: "Gaya Investigasi",
            title: `Menelusuri Jejak Persoalan: Fakta Lapangan Seputar ${cleanTopic}`,
          },
        ],
        tags: [
          cleanTopic.split(" ")[0] || "Berita",
          "Kebijakan Publik",
          "Sorotan Nasional",
          "Liputan Khusus",
          "Analisis Redaksi",
        ],
        eydTips: [
          "Gunakan 'risiko' bukan 'resiko'.",
          "Gunakan 'analisis' bukan 'analisa'.",
          "Gunakan 'praktik' bukan 'praktek'.",
          "Gunakan 'mengubah' bukan 'merubah'.",
          "Pastikan kutipan narasumber diapit tanda petik ganda (\"...\") dan diakhiri tanda titik sebelum tanda petik tutup.",
        ],
        readabilityScore: "88/100 (Sangat Mudah Dipahami Publik)",
      });

      setIsGenerating(false);
    }, 500);
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(id);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-600 text-white shadow-md">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white flex items-center gap-2">
                <span>Asisten Redaksi AI Jurnalis</span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                  Editor Copilot
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Optimasi variasi headline, periksa kata baku EYD, dan rekomendasikan tag berita
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Input Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Gagasan / Draf Judul Berita Anda *
            </label>
            <input
              type="text"
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              placeholder="Misal: Penataan Kawasan Kota Tua dan Transportasi Ramah Lingkungan"
              className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-2xs"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={!draftTitle.trim() || isGenerating}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 hover:opacity-95 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <Wand2 className="h-4 w-4" />
            <span>{isGenerating ? "Menganalisis & Menghasilkan..." : "Generate Saran Redaksi AI"}</span>
          </button>
        </div>

        {/* Results Area */}
        {generatedResults && (
          <div className="space-y-6 pt-2 animate-in fade-in duration-300">
            {/* 1. Headline Suggestions */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Type className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <span>5 Rekomendasi Variasi Headline</span>
              </h4>

              <div className="space-y-2">
                {generatedResults.headlines.map((item, idx) => (
                  <div
                    key={idx}
                    className="group flex items-start justify-between gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 hover:border-indigo-400 transition-all"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-0.5">
                        {item.type}
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-slate-950 dark:text-white leading-snug">
                        {item.title}
                      </p>
                    </div>

                    <button
                      onClick={() => copyToClipboard(item.title, `headline-${idx}`)}
                      className="shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-indigo-600 text-xs font-medium transition-colors cursor-pointer"
                      title="Salin judul ini"
                    >
                      {copiedIndex === `headline-${idx}` ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-600" />
                          <span className="text-[10px] text-emerald-600 font-bold">Tersalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3 text-slate-400" />
                          <span className="text-[10px]">Salin</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Recommended Tags */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Tag className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <span>Rekomendasi Tag & Kata Kunci SEO</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {generatedResults.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-700 dark:text-indigo-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 3. EYD Guidelines */}
            <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 space-y-2">
              <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5 uppercase tracking-wider">
                <BookOpen className="h-4 w-4 text-amber-600" />
                <span>Pengingat Pedoman EYD & Kata Baku</span>
              </h4>
              <ul className="space-y-1 text-xs text-amber-900/90 dark:text-amber-300/90 list-disc pl-4 leading-relaxed">
                {generatedResults.eydTips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer"
          >
            Tutup Asisten
          </button>
        </div>
      </div>
    </div>
  );
}
