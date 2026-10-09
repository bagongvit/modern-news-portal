"use client";

import React, { useState } from "react";
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Award,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Share2,
  Check,
} from "lucide-react";

interface QuizQuestion {
  id: number;
  question: string;
  category: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const DAILY_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: "Teknologi & Sains",
    question: "Apa teknologi utama yang kini gencar diimplementasikan untuk verifikasi orisinalitas naskah berita?",
    options: [
      "Watermarking Kriptografis & AI Authenticator",
      "Format PDF Standar",
      "Pengurangan Resolusi Foto",
      "Penyimpanan di Hardisk Eksternal",
    ],
    correctIndex: 0,
    explanation:
      "Media internasional kini memanfaatkan standar kriptografis (seperti C2PA) untuk membuktikan keaslian foto dan naskah jurnalistik.",
  },
  {
    id: 2,
    category: "Standar Jurnalistik",
    question: "Prinsip 'Cover Both Sides' dalam Kode Etik Jurnalistik mewajibkan reporter untuk...",
    options: [
      "Menulis artikel sebanyak dua halaman",
      "Memberikan porsi dan kesempatan berimbang pada pihak yang diberitakan",
      "Mengunggah foto sebelum dan sesudah kejadian",
      "Membuat dua akun media sosial resmi",
    ],
    correctIndex: 1,
    explanation:
      "Keberimbangan (Cover Both Sides) menjamin hak jawab dan proporsi seimbang bagi seluruh pihak agar terhindar dari bias pemberitaan.",
  },
  {
    id: 3,
    category: "Ekonomi & Regulasi",
    question: "Indikator utama yang digunakan bank sentral untuk memantau laju stabilitas harga pasar adalah...",
    options: [
      "Indeks Harga Konsumen (IHK) / Inflasi",
      "Jumlah pengikut di akun resmi",
      "Volume transaksi belanja online bulanan",
      "Jumlah cabang kantor pos",
    ],
    correctIndex: 0,
    explanation:
      "Indeks Harga Konsumen (IHK) mengukur perubahan harga sekeranjang barang dan jasa yang dikonsumsi masyarakat.",
  },
];

export function DailyNewsQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentQ = DAILY_QUESTIONS[currentIndex];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < DAILY_QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  const handleShare = async () => {
    const text = `🧠 Skor Kuis Berita Harian Modern News: ${score}/${DAILY_QUESTIONS.length}! Uji wawasan berita Anda hari ini.`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="rounded-3xl border border-indigo-200/90 dark:border-indigo-900/60 bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/40 dark:from-slate-900 dark:via-indigo-950/20 dark:to-slate-950 p-6 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-xs">
            <Award className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-950 dark:text-white uppercase tracking-tight">
                Kuis Berita Harian
              </h3>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                Edisi Hari Ini
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Uji ketajaman wawasan Anda seputar peristiwa terkini
            </p>
          </div>
        </div>

        {!isFinished && (
          <span className="text-xs font-mono font-bold text-slate-400">
            {currentIndex + 1}/{DAILY_QUESTIONS.length}
          </span>
        )}
      </div>

      {!isFinished ? (
        // ACTIVE QUIZ QUESTION
        <div className="space-y-4">
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              {currentQ.category}
            </span>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
              {currentQ.question}
            </h4>
          </div>

          {/* Options */}
          <div className="space-y-2">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let btnStyle =
                "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-400 text-slate-800 dark:text-slate-200";

              if (isAnswered) {
                if (isCorrect) {
                  btnStyle =
                    "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 font-bold";
                } else if (isSelected) {
                  btnStyle =
                    "border-red-400 bg-red-50 dark:bg-red-950/50 text-red-900 dark:text-red-200";
                } else {
                  btnStyle = "border-slate-200 dark:border-slate-800 opacity-50";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-3 rounded-2xl border text-xs leading-relaxed transition-all flex items-start justify-between gap-3 cursor-pointer ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {isAnswered && isCorrect && (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {isAnswered && (
            <div className="p-3.5 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/80 text-xs text-indigo-900 dark:text-indigo-200 leading-relaxed animate-in fade-in duration-200 space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-[11px] uppercase">
                <Sparkles className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />
                Fakta Redaksi:
              </span>
              <p>{currentQ.explanation}</p>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <span>
                  {currentIndex + 1 < DAILY_QUESTIONS.length ? "Pertanyaan Berikutnya" : "Lihat Hasil Akhir"}
                </span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      ) : (
        // QUIZ COMPLETED VIEW
        <div className="text-center py-4 space-y-4 animate-in zoom-in-95 duration-200">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md">
            <Award className="h-7 w-7" />
          </div>

          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              {score === 3
                ? "🎉 Sempurna! Pembaca Teliti"
                : score >= 2
                ? "👍 Hebat! Wawasan Cukup Luas"
                : "📚 Terus Ikuti Berita Hari Ini"}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Anda menjawab benar <strong>{score}</strong> dari <strong>{DAILY_QUESTIONS.length}</strong> pertanyaan.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
              <span>{copied ? "Tersalin!" : "Salin Skor"}</span>
            </button>

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Coba Lagi</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
