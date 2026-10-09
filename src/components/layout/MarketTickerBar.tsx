"use client";

import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  Coins,
  CloudSun,
  Wind,
  DollarSign,
  ChevronRight,
  X,
  Sparkles,
} from "lucide-react";

interface MarketItem {
  id: string;
  name: string;
  value: string;
  change: string;
  isUp: boolean;
  type: "market" | "crypto" | "weather" | "commodity";
}

const MARKET_DATA: MarketItem[] = [
  { id: "ihsg", name: "IHSG", value: "7.342,15", change: "+0,54%", isUp: true, type: "market" },
  { id: "usdidr", name: "USD/IDR", value: "Rp 15.820", change: "-0,12%", isUp: true, type: "market" },
  { id: "emas", name: "Emas Antam", value: "Rp 1.488.000/g", change: "+0,41%", isUp: true, type: "commodity" },
  { id: "brent", name: "Minyak Brent", value: "$78,50/bl", change: "+0,68%", isUp: true, type: "commodity" },
  { id: "btc", name: "Bitcoin", value: "Rp 1,06 M", change: "+2,15%", isUp: true, type: "crypto" },
  { id: "aqi", name: "AQI Jakarta", value: "65 (Sedang)", change: "Normal", isUp: true, type: "weather" },
  { id: "cuaca", name: "Cuaca Jkt", value: "29°C", change: "Cerah Berawan", isUp: true, type: "weather" },
];

export function MarketTickerBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      data-component="market-ticker"
      className="border-b border-slate-200/70 dark:border-slate-800/80 bg-slate-50/90 dark:bg-slate-950/90 text-xs py-1.5 px-3 transition-colors overflow-hidden"
    >
      <div className="container mx-auto flex items-center justify-between gap-3">
        {/* Left Badge */}
        <div className="flex items-center gap-2 shrink-0 border-r border-slate-200 dark:border-slate-800 pr-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-extrabold text-[10px] tracking-wider text-slate-800 dark:text-slate-200 uppercase flex items-center gap-1">
            <span>PASAR & DATA</span>
          </span>
        </div>

        {/* Scrolling / Flex Ticker Strip */}
        <div className="flex items-center gap-5 overflow-x-auto no-scrollbar py-0.5 flex-1 min-w-0">
          {MARKET_DATA.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-1.5 shrink-0 text-[11px] font-medium"
            >
              <span className="text-slate-500 dark:text-slate-400 font-semibold">{item.name}:</span>
              <span className="font-bold text-slate-900 dark:text-slate-100">{item.value}</span>
              {item.type === "weather" ? (
                <span className="text-amber-600 dark:text-amber-400 text-[10px] flex items-center gap-0.5 font-semibold">
                  <CloudSun className="h-3 w-3" />
                  <span>{item.change}</span>
                </span>
              ) : (
                <span
                  className={`text-[10px] font-bold flex items-center gap-0.5 ${
                    item.isUp
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-rose-600 dark:text-rose-400"
                  }`}
                >
                  {item.isUp ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  <span>{item.change}</span>
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded shrink-0 cursor-pointer"
          title="Sembunyikan bar pasar"
          aria-label="Sembunyikan bar pasar"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
