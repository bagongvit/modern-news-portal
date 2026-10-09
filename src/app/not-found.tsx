import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-[60vh] place-items-center px-4 text-center">
      <div>
        <p className="text-sm font-bold uppercase tracking-widest text-blue-600">404</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-950 dark:text-white">
          Halaman tidak ditemukan
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Alamat yang Anda buka mungkin sudah berubah atau tidak tersedia.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </main>
  );
}
