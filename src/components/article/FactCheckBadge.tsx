"use client";

import React, { useState } from "react";
import { ShieldCheck, CheckCircle2, Info, X, ExternalLink, Award } from "lucide-react";
import Link from "next/link";

interface FactCheckBadgeProps {
  publishedDate: string;
}

export function FactCheckBadge({ publishedDate }: FactCheckBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="inline-flex items-center gap-2 p-1.5 pr-3 rounded-full bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200/90 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs shadow-2xs">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white shrink-0">
          <ShieldCheck className="h-3.5 w-3.5" />
        </div>
        <span className="font-bold text-[11px] tracking-wide">
          Fakta Terverifikasi Redaksi
        </span>
        <button
          onClick={() => setIsOpen(true)}
          className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-200 underline text-[10px] cursor-pointer ml-0.5"
          title="Lihat metodologi cek fakta"
        >
          Metodologi
        </button>
      </div>

      {/* Modal Penjelasan Cek Fakta */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-950 dark:text-white">
                    Standar Verifikasi & Cek Fakta
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Kepatuhan Pedoman Pemberitaan Media Siber
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <div className="p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 space-y-1">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  Status: Lolos Uji Keabsahan Fakta Primer
                </span>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Naskah berita ini telah melalui verifikasi silang (cross-check) minimal dua sumber independen atau dokumen otoritas resmi sebelum dipublikasikan.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-slate-100">
                  Prinsip Jurnalisme yang Diterapkan:
                </h4>
                <ul className="space-y-1.5 list-disc pl-4 text-[11px] text-slate-600 dark:text-slate-400">
                  <li><strong>Akurasi & Verifikasi:</strong> Konfirmasi langsung kepada pihak terkait tanpa bias spekulasi.</li>
                  <li><strong>Keberimbangan (Cover Both Sides):</strong> Memberikan hak jawab dan proporsi berimbang bagi semua pihak.</li>
                  <li><strong>Koreksi Transparan:</strong> Jika terdapat kekeliruan data, ralat akan dipublikasikan secara terbuka dengan riwayat revisi.</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <Link
                href="/standar-editorial"
                onClick={() => setIsOpen(false)}
                className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-bold"
              >
                <span>Baca Standar Editorial Lengkap</span>
                <ExternalLink className="h-3 w-3" />
              </Link>

              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold hover:opacity-90 transition-opacity cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
