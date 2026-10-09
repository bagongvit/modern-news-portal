"use client";

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="id">
      <body className="grid min-h-screen place-items-center bg-white px-4 text-center font-sans text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <main className="max-w-lg">
          <h1 className="text-2xl font-bold">Aplikasi mengalami kendala</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            Terjadi kesalahan saat menyiapkan halaman. Silakan coba lagi.
          </p>
          {error.digest ? (
            <p className="mt-2 text-xs text-slate-500">Kode: {error.digest}</p>
          ) : null}
          <button
            onClick={() => retry()}
            className="mt-6 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
          >
            Coba lagi
          </button>
        </main>
      </body>
    </html>
  );
}
