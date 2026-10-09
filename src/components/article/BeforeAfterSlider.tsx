"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { MoveHorizontal, Eye, Sparkles } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  caption?: string;
  credit?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Sebelum",
  afterLabel = "Sesudah",
  caption,
  credit,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    const newPos = Math.max(0, Math.min(100, (x / width) * 100));
    setSliderPosition(newPos);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging || !e.touches[0]) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove],
  );

  return (
    <figure className="my-8 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md overflow-hidden">
      {/* Slider Visual Container */}
      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
        className="relative aspect-[16/9] w-full select-none cursor-ew-resize overflow-hidden"
      >
        {/* AFTER (Background Image) */}
        <div className="absolute inset-0">
          <Image
            src={afterImage}
            alt={afterLabel}
            fill
            sizes="(max-width: 1024px) 100vw, 840px"
            className="object-cover"
            priority
          />
          <span className="absolute bottom-4 right-4 z-10 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-sm text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
            {afterLabel}
          </span>
        </div>

        {/* BEFORE (Foreground Image with Clip Path) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image
            src={beforeImage}
            alt={beforeLabel}
            fill
            sizes="(max-width: 1024px) 100vw, 840px"
            className="object-cover"
            priority
          />
          <span className="absolute bottom-4 left-4 z-10 px-3 py-1 rounded-full bg-blue-600/90 backdrop-blur-sm text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
            {beforeLabel}
          </span>
        </div>

        {/* Central Divider Line & Draggable Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white dark:bg-slate-900 border-2 border-blue-600 text-blue-600 dark:text-blue-400 shadow-xl">
            <MoveHorizontal className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Caption & Instructions */}
      <figcaption className="p-4 text-xs text-slate-500 dark:text-slate-400 bg-slate-50/80 dark:bg-slate-950/80 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          {caption ? (
            <p className="font-semibold text-slate-800 dark:text-slate-200">{caption}</p>
          ) : (
            <p className="font-semibold text-slate-800 dark:text-slate-200">
              Perbandingan Visual Investigasi Redaksi: Geser bilah tengah untuk membandingkan.
            </p>
          )}
          {credit && <span className="text-[10px] text-slate-400">{credit}</span>}
        </div>

        <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 tracking-wider shrink-0 flex items-center gap-1">
          <Eye className="h-3 w-3" />
          <span>Interaktif 360°</span>
        </span>
      </figcaption>
    </figure>
  );
}
