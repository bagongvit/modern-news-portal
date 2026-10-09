"use client";

import React, { useState, useEffect } from "react";
import { Bell, BellRing, X, CheckCircle2 } from "lucide-react";
import { toast } from "@/lib/toast";

const STORAGE_KEY = "modern_news_push_dismissed";

export function WebNotificationPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission | "unsupported">("default");

  useEffect(() => {
    // 1. Register service worker if supported
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    // 2. Check notification support and permission
    if (typeof window === "undefined" || !("Notification" in window)) {
      setPermission("unsupported");
      return;
    }

    setPermission(Notification.permission);

    // If already granted or previously dismissed, don't show
    if (Notification.permission === "granted" || Notification.permission === "denied") {
      return;
    }

    try {
      const isDismissed = localStorage.getItem(STORAGE_KEY);
      if (isDismissed) return;
    } catch {}

    // Delay showing prompt slightly (5 seconds after page load) for great UX
    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setShowPrompt(false);
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {}
  };

  const handleRequestPermission = async () => {
    if (typeof window === "undefined" || !("Notification" in window)) return;

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      setShowPrompt(false);

      if (result === "granted") {
        toast.success("Notifikasi breaking news aktif di peramban Anda!", "Notifikasi Aktif");

        // Send a native welcome push notification
        try {
          if ("serviceWorker" in navigator) {
            const reg = await navigator.serviceWorker.ready;
            reg.showNotification("Modern News Portal", {
              body: "Notifikasi breaking news aktif! Anda akan mendapatkan laporan kilat terverifikasi.",
              icon: "/icon",
              badge: "/icon",
            });
          } else {
            new Notification("Modern News Portal", {
              body: "Notifikasi breaking news aktif! Anda akan mendapatkan laporan kilat terverifikasi.",
              icon: "/icon",
            });
          }
        } catch {}
      } else if (result === "denied") {
        toast.info("Izin notifikasi ditolak. Anda dapat mengaktifkannya di pengaturan peramban.", "Info");
      }
    } catch {
      setShowPrompt(false);
    }
  };

  if (!showPrompt || permission !== "default") return null;

  return (
    <aside
      aria-label="Pemberitahuan Langganan Notifikasi"
      className="fixed z-40 bottom-20 md:bottom-6 left-4 right-4 sm:right-auto sm:left-6 sm:w-96 rounded-3xl border border-blue-200/90 dark:border-blue-900/60 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 sm:p-5 shadow-2xl animate-in slide-in-from-bottom-5 duration-300"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md">
            <BellRing className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-950 dark:text-white leading-snug">
              Aktifkan Peringatan Breaking News
            </h4>
            <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider block">
              Laporan Kilat Dewan Redaksi
            </span>
          </div>
        </div>

        <button
          onClick={handleDismiss}
          className="p-1 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
          aria-label="Tutup prompt"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <p className="mt-2.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        Dapatkan pemberitahuan langsung di layar perangkat saat peristiwa penting, bursa finansial,
        atau kabar darurat nasional dirilis secara resmi.
      </p>

      <div className="mt-3.5 flex items-center gap-2">
        <button
          onClick={handleRequestPermission}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
        >
          <Bell className="h-3.5 w-3.5" />
          <span>Aktifkan Sekarang</span>
        </button>
        <button
          onClick={handleDismiss}
          className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
        >
          Nanti Saja
        </button>
      </div>
    </aside>
  );
}
