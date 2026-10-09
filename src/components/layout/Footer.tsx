"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Newspaper, ShieldCheck, Lock, ArrowUp, Award, CheckCircle } from "lucide-react";
import { NewsletterForm } from "@/components/shared/NewsletterForm";

export function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 transition-colors">
      {/* Top Value Banner */}
      <div className="border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/40 py-10 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-950 dark:text-white">
                  Jurnalisme Terverifikasi
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Mematuhi Kode Etik Jurnalistik & Pedoman Media Siber Dewan Pers
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 shrink-0">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-950 dark:text-white">
                  Riset & Investigasi Independen
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Bebas intervensi dan memprioritaskan kepentingan publik luas
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 shrink-0">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-950 dark:text-white">
                  Koreksi & Hak Jawab
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Melayani ralat dan klarifikasi secara transparan dan akuntabel
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 font-bold tracking-tight">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white shadow-md shadow-blue-500/20">
                <Newspaper className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-slate-950 dark:text-white">
                  MODERN<span className="text-blue-600 dark:text-blue-400">NEWS</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                  Veritas &bull; Integritas &bull; Independensi
                </span>
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-light">
              {siteConfig.description}
            </p>
            <div className="pt-2 text-xs text-slate-500 dark:text-slate-400 space-y-1">
              <p>📍 Gedung Graha Pers Modern Lt. 8, Jakarta Pusat</p>
              <p>✉️ redaksi@modernnews.id | Call Center: (021) 500-6397</p>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-950 dark:text-white mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              Kanal Berita
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
              {siteConfig.categoriesNav.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-slate-400">&rsaquo;</span>
                    <span>{cat.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Editorial Guidelines */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-950 dark:text-white mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              Etika & Pedoman
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
              <li>
                <Link href="/pedoman-media-siber" className="hover:text-blue-600 transition-colors">
                  Pedoman Pemberitaan Media Siber
                </Link>
              </li>
              <li>
                <Link href="/kebijakan-privasi" className="hover:text-blue-600 transition-colors">
                  Kebijakan Privasi Data
                </Link>
              </li>
              <li>
                <Link href="/standar-editorial" className="hover:text-blue-600 transition-colors">
                  Standar Etika & Independensi Jurnalistik
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="hover:text-blue-600 transition-colors">
                  Profil Lembaga Pers Modern News
                </Link>
              </li>
              <li>
                <Link href="/redaksi" className="hover:text-blue-600 transition-colors">
                  Susunan Dewan Redaksi
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-blue-600 transition-colors">
                  Kontak Redaksi & Iklan
                </Link>
              </li>
              <li>
                <Link href="/feed.xml" className="hover:text-blue-600 transition-colors">
                  Langganan RSS Feed XML
                </Link>
              </li>
              <li className="pt-2 border-t border-slate-200/80 dark:border-slate-800">
                <Link
                  href="/reporter"
                  className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline"
                  title="Khusus Jurnalis & Staf Redaksi"
                >
                  <Lock className="h-3 w-3" />
                  <span>Ruang Wartawan (Reporter Dashboard)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-950 dark:text-white flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              Buletin Redaksi
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-light">
              Dapatkan rangkuman analisis peristiwa paling penting setiap pagi langsung di kotak
              masuk Anda.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom Bar: Copyright, Socials, Back-to-Top */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <p>
            &copy; {new Date().getFullYear()} Modern News Portal Indonesia. Seluruh hak cipta
            dilindungi undang-undang.
          </p>

          <div className="flex items-center space-x-6">
            {siteConfig.socialLinks.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors"
              >
                {s.platform}
              </a>
            ))}

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-1.5 font-bold text-slate-800 dark:text-slate-200 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
              title="Kembali ke atas"
            >
              <span>Atas</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
