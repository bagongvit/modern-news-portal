"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Orbit, Sparkles, ArrowRight, Zap, Radio, Globe2, SunMedium } from "lucide-react";
import { cn } from "@/lib/utils";

interface TopicNode {
  id: string;
  name: string;
  categorySlug: string;
  headline: string;
  articleSlug: string;
  orbitIndex: number;
  angle: number; // Angle in degrees for orbit placement
  color: string;
  size: number;
  planetName: string;
}

const ORBIT_TOPICS: TopicNode[] = [
  {
    id: "ai",
    name: "Kecerdasan Buatan (AI)",
    categorySlug: "teknologi",
    headline: "Peta Jalan Tata Kelola AI Nasional dan Perlindungan Hak Cipta Kreator",
    articleSlug: "masa-depan-kecerdasan-buatan-indonesia-2026",
    orbitIndex: 1,
    angle: 35,
    color: "#f59e0b", // Gold
    size: 26,
    planetName: "Merkurius AI",
  },
  {
    id: "fintech",
    name: "Finansial & Fintech",
    categorySlug: "bisnis",
    headline: "Transformasi Pasar Modal & Pembayaran Digital Lintas Batas ASEAN",
    articleSlug: "transformasi-perbankan-digital-era-open-finance",
    orbitIndex: 1,
    angle: 215,
    color: "#3b82f6", // Blue
    size: 30,
    planetName: "Terra Finance",
  },
  {
    id: "energy",
    name: "Transisi Energi Hijau",
    categorySlug: "bisnis",
    headline: "Akselerasi Bauran Energi Terbarukan & Ekosistem Baterai Kendaraan Listrik",
    articleSlug: "revolusi-kendaraan-listrik-dan-hilirisasi-nikel",
    orbitIndex: 2,
    angle: 110,
    color: "#10b981", // Emerald
    size: 32,
    planetName: "Verdant Energy",
  },
  {
    id: "privacy",
    name: "Kedaulatan & Privasi Data",
    categorySlug: "teknologi",
    headline: "Penegakan Kepatuhan UU Perlindungan Data Pribadi di Sektor Publik",
    articleSlug: "keamanan-data-pribadi-era-cloud-sovereignty",
    orbitIndex: 2,
    angle: 305,
    color: "#8b5cf6", // Purple
    size: 28,
    planetName: "Aura Privacy",
  },
  {
    id: "cyber",
    name: "Ketahanan Siber",
    categorySlug: "teknologi",
    headline: "Strategi Ketahanan Infrastruktur Kritis Nasional Melawan Ancaman Ransomware",
    articleSlug: "urgensi-ketahanan-keamanan-siber-infrastruktur-kritis",
    orbitIndex: 3,
    angle: 175,
    color: "#ec4899", // Rose
    size: 34,
    planetName: "Cyber Shield",
  },
];

export function TopicOrbitRadar() {
  const [activeTopic, setActiveTopic] = useState<TopicNode>(ORBIT_TOPICS[0]!);
  const [showVisualOrbit, setShowVisualOrbit] = useState<boolean>(true);

  return (
    <section
      aria-label="Radar Orbit Tata Surya Berita"
      className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-7 shadow-xs relative overflow-hidden transition-all"
    >
      {/* Subtle Cosmic Ambient Dust */}
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-500/10 dark:bg-amber-400/15 blur-3xl pointer-events-none" />
      <div className="absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-blue-500/10 dark:bg-blue-400/15 blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-200 dark:border-slate-800 gap-3 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 shadow-xs">
            <Orbit className="h-4.5 w-4.5" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <span>Radar Orbit Tata Surya Berita</span>
              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold bg-amber-500/15 px-2 py-0.5 rounded-full border border-amber-500/25">
                Live Cosmos 🪐
              </span>
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Visualisasi gravitasi topik & satelit berita yang mengitari isu terpanas hari ini
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowVisualOrbit(!showVisualOrbit)}
            className="text-[11px] font-bold text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 cursor-pointer transition-colors"
          >
            <Globe2 className="h-3.5 w-3.5" />
            <span>{showVisualOrbit ? "Mode Sederhana" : "Visualisasi Orbit 🪐"}</span>
          </button>
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
            <Radio className="h-3 w-3 text-emerald-500 animate-pulse" />
            <span>Real-time</span>
          </div>
        </div>
      </div>

      {/* Visual Interactive Planetarium Orbit (SVG / CSS Celestial Canvas) */}
      {showVisualOrbit && (
        <div className="relative w-full h-[300px] sm:h-[340px] my-3 rounded-2xl bg-slate-950/90 dark:bg-slate-950 border border-slate-800/80 overflow-hidden flex items-center justify-center">
          {/* Background Stars Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {/* Orbit Track 1 (Inner) */}
          <div className="absolute h-[140px] w-[140px] sm:h-[160px] sm:w-[160px] rounded-full border border-dashed border-amber-500/25 pointer-events-none" />

          {/* Orbit Track 2 (Mid) */}
          <div className="absolute h-[210px] w-[210px] sm:h-[240px] sm:w-[240px] rounded-full border border-dashed border-blue-500/20 pointer-events-none" />

          {/* Orbit Track 3 (Outer) */}
          <div className="absolute h-[270px] w-[270px] sm:h-[300px] sm:w-[300px] rounded-full border border-dashed border-purple-500/15 pointer-events-none" />

          {/* The Central Radiant Sun (The Gravitational Core) */}
          <div className="relative z-20 flex flex-col items-center justify-center">
            <div className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 shadow-[0_0_40px_rgba(245,158,11,0.6)] animate-pulse border border-yellow-200/60 cursor-pointer">
              <SunMedium className="h-7 w-7 text-amber-950 animate-spin-slow" />
            </div>
            <span className="mt-2 text-[10px] font-black uppercase tracking-wider text-amber-400 bg-slate-900/90 px-2 py-0.5 rounded-full border border-amber-500/30">
              Pusat Isu Utama
            </span>
          </div>

          {/* Orbiting Planet Spheres */}
          {ORBIT_TOPICS.map((node) => {
            const isActive = activeTopic.id === node.id;
            const radius =
              node.orbitIndex === 1
                ? 75 // Mobile/desktop scale
                : node.orbitIndex === 2
                  ? 115
                  : 145;

            // Compute polar to cartesian coordinates
            const rad = (node.angle * Math.PI) / 180;
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;

            return (
              <button
                key={node.id}
                onClick={() => setActiveTopic(node)}
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
                className={cn(
                  "absolute z-30 flex items-center gap-1.5 p-1 rounded-full transition-all duration-300 cursor-pointer group",
                  isActive ? "scale-125 z-40" : "hover:scale-115",
                )}
                title={`Klik planet: ${node.name}`}
              >
                {/* Planet Sphere */}
                <div
                  className={cn(
                    "relative flex items-center justify-center rounded-full transition-all shadow-md",
                    isActive
                      ? "ring-4 ring-white/60 shadow-[0_0_20px_rgba(255,255,255,0.7)]"
                      : "opacity-85 group-hover:opacity-100",
                  )}
                  style={{
                    width: `${node.size}px`,
                    height: `${node.size}px`,
                    backgroundColor: node.color,
                  }}
                >
                  <span className="h-2 w-2 rounded-full bg-white/70" />
                </div>

                {/* Floating Tag */}
                <span
                  className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap backdrop-blur-md transition-all",
                    isActive
                      ? "bg-white text-slate-950 font-black shadow-md"
                      : "bg-slate-900/80 text-slate-300 border border-slate-700/80 group-hover:text-white",
                  )}
                >
                  {node.name}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Orbit Topic Selector Pills */}
      <div className="relative z-10">
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-amber-500" />
            <span>Satelit Orbit:</span>
          </span>
          {ORBIT_TOPICS.map((node) => {
            const isActive = activeTopic.id === node.id;
            return (
              <button
                key={node.id}
                onClick={() => setActiveTopic(node)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border",
                  isActive
                    ? "bg-amber-500 text-slate-950 border-amber-500 shadow-md font-black scale-105"
                    : "bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-800 hover:border-amber-400",
                )}
              >
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: node.color }} />
                <span>{node.name}</span>
              </button>
            );
          })}
        </div>

        {/* Focused Topic Gravity Card */}
        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-gradient-to-r from-slate-50 via-amber-50/20 to-slate-50 dark:from-slate-900 dark:via-amber-950/20 dark:to-slate-900 p-5 sm:p-6 transition-all duration-300 shadow-2xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                  <Zap className="h-3 w-3 fill-amber-500" />
                  Orbit Aktif: {activeTopic.planetName}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                  Rubrik {activeTopic.categorySlug}
                </span>
              </div>

              <h4 className="text-base sm:text-lg font-black text-slate-950 dark:text-white leading-snug">
                {activeTopic.headline}
              </h4>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                Liputan khusus menyoroti dinamika terpenting dari isu {activeTopic.name} dengan data
                tervalidasi dan analisis mendalam para pakar.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <Link
                href={`/berita/${activeTopic.articleSlug}`}
                className="inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs px-4 py-2.5 transition-all shadow-xs cursor-pointer"
              >
                <span>Baca Laporan Terkait</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
