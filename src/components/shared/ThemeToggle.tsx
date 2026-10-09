"use client";

import * as React from "react";
import { Moon, Sun, Orbit } from "lucide-react";
import { useTheme } from "next-themes";

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent flex items-center justify-center">
        <span className="sr-only">Toggle theme</span>
      </div>
    );
  }

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("solar");
    else setTheme("light");
  };

  const getThemeLabel = () => {
    if (theme === "solar") return "Solar Cosmos (Tata Surya) 🪐";
    if (theme === "dark") return "Mode Gelap 🌙";
    return "Mode Terang ☀️";
  };

  return (
    <button
      onClick={cycleTheme}
      className="relative flex h-9 sm:h-10 w-9 sm:w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all cursor-pointer shadow-2xs"
      aria-label={`Ganti tema (${getThemeLabel()})`}
      title={`Tema: ${getThemeLabel()}. Klik untuk beralih mode.`}
    >
      {theme === "solar" ? (
        <Orbit className="h-4 w-4 text-amber-400 transition-all" />
      ) : theme === "dark" ? (
        <Moon className="h-4 w-4 text-blue-400 transition-all" />
      ) : (
        <Sun className="h-4 w-4 text-amber-500 transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
