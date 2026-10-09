"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Radio,
  Clock,
  Pin,
  RefreshCw,
  Share2,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

interface LivePost {
  id: string;
  time: string;
  title: string;
  content: string;
  authorName: string;
  tag: string;
  isPinned?: boolean;
}

const SAMPLE_LIVE_POSTS: LivePost[] = [
  {
    id: "live-1",
    time: "14:20 WIB",
    title: "Konferensi Pers Resmi Dimulai: Otoritas Sampaikan Arahan Strategis",
    content:
      "Dalam pernyataan pembuka, juru bicara menegaskan komitmen penuh untuk menjaga stabilitas layanan publik serta menjamin transparansi data bagi seluruh masyarakat.",
    authorName: "Budi Santoso",
    tag: "Pernyataan Resmi",
    isPinned: true,
  },
  {
    id: "live-2",
    time: "13:45 WIB",
    title: "Situasi Terkini di Lapangan: Tim Investigasi Kumpulkan Bukti Primer",
    content:
      "Laporan reporter dari lokasi kejadian mencatat koordinasi lintas lembaga berjalan intensif. Seluruh akses pendukung kini telah disiagakan untuk penanganan cepat.",
    authorName: "Siti Rahmawati",
    tag: "Fakta Lapangan",
  },
  {
    id: "live-3",
    time: "13:10 WIB",
    title: "Analisis Redaksi: Implikasi terhadap Regulasi dan Kebijakan Publik",
    content:
      "Pengamat kebijakan menilai langkah cepat yang diambil hari ini berpotensi menjadi tolok ukur standar operasional baru bagi industri dalam merespons dinamika pasar.",
    authorName: "Ahmad Fauzi",
    tag: "Analisis Redaksi",
  },
];

interface LiveBlogTimelineProps {
  articleTitle: string;
}

export function LiveBlogTimeline({ articleTitle }: LiveBlogTimelineProps) {
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdatedTime, setLastUpdatedTime] = useState("Baru saja");
  const [posts, setPosts] = useState(SAMPLE_LIVE_POSTS);

  // Simulated live pulse timer
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      setLastUpdatedTime("1 menit lalu");
    }, 60000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const handleManualRefresh = () => {
    setLastUpdatedTime("Baru saja");
  };

  return (
    <section
      aria-label="Liputan Langsung / Live Updates"
      className="my-10 rounded-3xl border border-red-500/30 bg-gradient-to-b from-red-50/40 via-white to-slate-50/60 dark:from-red-950/20 dark:via-slate-900 dark:to-slate-950 p-5 sm:p-7 shadow-sm overflow-hidden"
    >
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-red-500/20 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-600 text-white shadow-md shadow-red-600/30">
            <Radio className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
              </span>
              <h3 className="text-sm sm:text-base font-black tracking-tight text-slate-950 dark:text-white uppercase">
                Liputan Langsung • Live Updates
              </h3>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Pembaruan kronologis detik-ke-detik langsung dari meja redaksi
            </p>
          </div>
        </div>

        {/* Live Controls */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[11px] font-bold transition-all cursor-pointer ${
              autoRefresh
                ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300"
                : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                autoRefresh ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
              }`}
            />
            <span>{autoRefresh ? "Pembaruan Otomatis: Aktif" : "Auto-Refresh: Mati"}</span>
          </button>

          <button
            onClick={handleManualRefresh}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-red-600 transition-colors cursor-pointer"
            title="Muat ulang pembaruan sekarang"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Pinned Key Developments Highlight */}
      <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-red-500/10 via-amber-500/10 to-transparent border border-red-500/20 space-y-1.5">
        <div className="flex items-center gap-1.5 text-red-600 dark:text-red-400 text-xs font-black uppercase tracking-wider">
          <Pin className="h-3.5 w-3.5" />
          <span>Sorotan Perkembangan Terkini</span>
        </div>
        <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 leading-snug">
          Otoritas telah merilis arahan strategi awal; tim investigasi berada di lokasi mengumpulkan konfirmasi lintas pihak.
        </p>
      </div>

      {/* Sequential Timeline Updates */}
      <div className="mt-6 space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
        {posts.map((post) => (
          <article
            key={post.id}
            className="relative pl-10 group"
          >
            {/* Timeline Dot */}
            <div className="absolute left-2 top-1 -translate-x-1/2 flex h-4 w-4 items-center justify-center rounded-full bg-white dark:bg-slate-950 border-2 border-red-600 shadow-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
            </div>

            {/* Post Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-2 group-hover:border-red-500/40 transition-all">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-xs font-mono font-extrabold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/60 px-2 py-0.5 rounded-md">
                    <Clock className="h-3 w-3" />
                    <span>{post.time}</span>
                  </span>

                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {post.tag}
                  </span>
                </div>

                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  Dilaporkan oleh <strong>{post.authorName}</strong>
                </span>
              </div>

              <h4 className="text-sm sm:text-base font-bold text-slate-950 dark:text-white leading-snug">
                {post.title}
              </h4>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {post.content}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
