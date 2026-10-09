"use client";

import React, { useState } from "react";
import { Share2, Link as LinkIcon, Check } from "lucide-react";
import { toast } from "@/lib/toast";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(url || window.location.href);
      setCopied(true);
      toast.success("Tautan artikel berhasil disalin ke clipboard!", "Tautan Tersalin");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareToTwitter = () => {
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      title,
    )}&url=${encodeURIComponent(url)}`;
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  const shareToFacebook = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  const shareToWhatsApp = () => {
    const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `${title} - ${url}`,
    )}`;
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  const shareToLinkedIn = () => {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url,
    )}`;
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2" aria-label="Bagikan artikel">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1 flex items-center gap-1.5">
        <Share2 className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
        <span className="hidden sm:inline">Bagikan:</span>
      </span>

      <button
        onClick={shareToWhatsApp}
        className="flex h-8 px-3 items-center justify-center gap-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-600 hover:text-white text-xs font-bold border border-emerald-200/80 dark:border-emerald-800 transition-all cursor-pointer shadow-2xs"
        aria-label="Bagikan ke WhatsApp"
        title="Bagikan ke WhatsApp"
      >
        <span>WA</span>
      </button>

      <button
        onClick={shareToTwitter}
        className="flex h-8 px-3 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-950 hover:text-white dark:hover:bg-slate-700 text-xs font-black transition-all cursor-pointer shadow-2xs"
        aria-label="Bagikan ke X"
        title="Bagikan ke X"
      >
        <span>𝕏</span>
      </button>

      <button
        onClick={shareToLinkedIn}
        className="flex h-8 px-3 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-600 hover:text-white text-xs font-bold border border-blue-200/80 dark:border-blue-900 transition-all cursor-pointer shadow-2xs"
        aria-label="Bagikan ke LinkedIn"
        title="Bagikan ke LinkedIn"
      >
        <span>in</span>
      </button>

      <button
        onClick={shareToFacebook}
        className="flex h-8 px-3 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white text-xs font-bold transition-all cursor-pointer shadow-2xs"
        aria-label="Bagikan ke Facebook"
        title="Bagikan ke Facebook"
      >
        <span>FB</span>
      </button>

      <button
        onClick={handleCopyLink}
        className="flex h-8 items-center gap-1.5 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition-all cursor-pointer shadow-2xs"
        aria-label="Salin tautan artikel"
        title="Salin Link"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">Tersalin!</span>
          </>
        ) : (
          <>
            <LinkIcon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Salin Link</span>
          </>
        )}
      </button>
    </div>
  );
}
