"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Bell, Flame, X, ArrowRight, Volume2, VolumeX } from "lucide-react";

const STORAGE_DISMISS_KEY = "modern_news_breaking_alert_dismissed";

export function BreakingNewsNotification() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Show after 4 seconds of reading, unless dismissed recently in session
    const isDismissed = sessionStorage.getItem(STORAGE_DISMISS_KEY);
    if (!isDismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem(STORAGE_DISMISS_KEY, "true");
  };

  const handleEnablePush = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        new Notification("Modern News Portal", {
          body: "Anda akan menerima notifikasi prioritas untuk setiap Berita Kilat!",
          icon: "/favicon.ico",
        });
      }
    }
    handleDismiss();
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Pemberitahuan Berita Kilat"
      className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 max-w-sm w-full animate-in slide-in-from-bottom-5 duration-300"
    >
      <div className="relative overflow-hidden rounded-3xl border border-red-500/30 bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 text-white p-4 sm:p-5 shadow-2xl backdrop-blur-md">
        {/* Ambient Glow */}
        <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-red-600/20 blur-2xl pointer-events-none" />

        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider text-red-400">
              Peringatan Redaksi
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              title={isMuted ? "Bunyikan notifikasi" : "Heningkan suara"}
            >
              {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
            </button>
            <button
              onClick={handleDismiss}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              aria-label="Tutup notifikasi"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <h4 className="text-xs sm:text-sm font-bold text-white leading-snug mb-1.5">
          Aktifkan Notifikasi Berita Kilat (Breaking News)
        </h4>
        <p className="text-[11px] text-slate-300 leading-relaxed mb-3.5">
          Dapatkan pembaruan langsung dari ruang redaksi sebelum berita beredar luas di media sosial.
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={handleEnablePush}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold transition-all shadow-md cursor-pointer"
          >
            <Bell className="h-3.5 w-3.5" />
            <span>Nyalakan Peringatan</span>
          </button>

          <button
            onClick={handleDismiss}
            className="py-2 px-3 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold transition-colors cursor-pointer"
          >
            Nanti Saja
          </button>
        </div>
      </div>
    </aside>
  );
}
