import Link from "next/link";
import type { ReactNode } from "react";

type InfoPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
};

export function InfoPage({ eyebrow, title, intro, children }: InfoPageProps) {
  return (
    <article className="container mx-auto max-w-4xl px-4 py-12 sm:py-16">
      <Link
        href="/"
        className="text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
      >
        ← Kembali ke Beranda
      </Link>
      <header className="mt-8 border-b border-slate-200 pb-8 dark:border-slate-800">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
          {intro}
        </p>
      </header>
      <div className="prose prose-slate dark:prose-invert mt-8 max-w-none">{children}</div>
    </article>
  );
}
