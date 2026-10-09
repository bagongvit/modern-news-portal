"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, ZoomIn, Download, ExternalLink, Camera } from "lucide-react";

interface ImageLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
}

export function ImageLightboxModal({
  isOpen,
  onClose,
  src,
  alt,
  caption,
  credit,
}: ImageLightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
      {/* Top Action Bar */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 flex items-center gap-2">
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 transition-colors shadow-lg cursor-pointer"
          title="Buka gambar asli di tab baru"
        >
          <ExternalLink className="h-4 w-4" />
        </a>

        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 transition-colors shadow-lg cursor-pointer"
          aria-label="Tutup penampil gambar"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Main Image View */}
      <div className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center">
        <div className="relative w-full h-[60vh] sm:h-[72vh] rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-contain"
            priority
          />
        </div>

        {/* Caption & Credit Bar */}
        {(caption || alt) && (
          <div className="mt-4 p-3.5 sm:p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center max-w-2xl w-full backdrop-blur-sm">
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              {caption || alt}
            </p>
            <div className="flex items-center justify-center gap-1.5 mt-1.5 text-[11px] text-slate-400">
              <Camera className="h-3 w-3 text-blue-400" />
              <span>{credit || "Dokumentasi & Arsip Liputan Modern News"}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
