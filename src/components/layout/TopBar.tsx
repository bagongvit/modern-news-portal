"use client";

import React, { useSyncExternalStore } from "react";
import { Clock, TrendingUp, ShieldCheck } from "lucide-react";
import Link from "next/link";

function subscribeDate(callback: () => void) {
  const interval = setInterval(callback, 60000);
  return () => clearInterval(interval);
}

function getSnapshot() {
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(new Date());
}

function getServerSnapshot() {
  return "Senin, 28 September 2026";
}

export function TopBar() {
  const currentDateStr = useSyncExternalStore(subscribeDate, getSnapshot, getServerSnapshot);

  return (
    <div
      data-component="topbar"
      className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xs text-[11px] text-slate-600 dark:text-slate-400 py-1.5 px-4 transition-colors"
    >
      <div className="container mx-auto flex items-center justify-between gap-4">
        {/* Left: Date & Live Editorial Pulse */}
        <div className="flex items-center space-x-3 overflow-x-auto no-scrollbar py-0.5">
          <div className="flex items-center space-x-1.5 font-medium whitespace-nowrap">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">LIVE</span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-blue-600 dark:text-blue-400" />
              <span>{currentDateStr} (WIB)</span>
            </div>
          </div>

          <span className="hidden md:inline text-slate-300 dark:text-slate-700">|</span>

          {/* Quick Financial Snapshot / Market Sentiment */}
          <div className="hidden lg:flex items-center space-x-3 text-slate-500 dark:text-slate-400">
            <div className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 font-semibold">
              <TrendingUp className="h-3 w-3" />
              <span>IHSG: 7,428.10 (+0.42%)</span>
            </div>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-slate-700 dark:text-slate-300 font-medium">
              USD/IDR: Rp15.620
            </span>
          </div>
        </div>

        {/* Right: Trust Badges, Quick Links */}
        <div className="flex items-center space-x-3 shrink-0">
          <Link
            href="/pedoman-media-siber"
            className="hidden sm:flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 font-medium hover:underline"
            title="Sertifikasi Pedoman Pemberitaan Media Siber"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Faktual & Terverifikasi Dewan Pers</span>
          </Link>

          <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>

          <Link
            href="/feed.xml"
            className="hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            RSS Feed
          </Link>

          <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>

          <Link
            href="/kontak"
            className="hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            Kontak Redaksi
          </Link>
        </div>
      </div>
    </div>
  );
}
