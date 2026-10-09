export default function Loading() {
  return (
    <main
      aria-label="Memuat halaman"
      className="container mx-auto min-h-[60vh] animate-pulse px-4 py-12"
    >
      <div className="h-8 w-48 rounded bg-slate-200 dark:bg-slate-800" />
      <div className="mt-6 h-4 max-w-2xl rounded bg-slate-200 dark:bg-slate-800" />
      <div className="mt-3 h-4 max-w-xl rounded bg-slate-200 dark:bg-slate-800" />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <div key={item} className="h-48 rounded-xl bg-slate-200 dark:bg-slate-800" />
        ))}
      </div>
    </main>
  );
}
