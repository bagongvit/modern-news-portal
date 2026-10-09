"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error("Root route error:", error);
  }, [error]);
  return (
    <main className="grid min-h-[60vh] place-items-center px-4 text-center">
      <div className="max-w-lg">
        <h1 className="text-2xl font-bold text-slate-950 dark:text-white">
          Halaman mengalami kendala
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">Silakan coba muat ulang halaman.</p>
        <button
          onClick={() => retry()}
          className="mt-6 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
        >
          Coba lagi
        </button>
      </div>
    </main>
  );
}
