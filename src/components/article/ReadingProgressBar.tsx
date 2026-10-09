"use client";

import React from "react";
import { useReadingProgress } from "@/hooks/useReadingProgress";

export function ReadingProgressBar() {
  const completion = useReadingProgress();

  return (
    <div
      className="fixed top-0 left-0 z-50 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 transition-all duration-150"
      style={{ width: `${completion}%` }}
      role="progressbar"
      aria-valuenow={completion}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}
