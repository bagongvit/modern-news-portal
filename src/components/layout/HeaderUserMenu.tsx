"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { logoutReporter } from "@/app/(frontend)/reporter/actions";
import {
  LayoutDashboard,
  FileEdit,
  PenSquare,
  LogOut,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";

interface HeaderUserMenuProps {
  user: {
    name?: string | null;
    email?: string | null;
    role?: string | null;
  };
}

export function HeaderUserMenu({ user }: HeaderUserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 200);
  };

  const displayName = user.name || user.email?.split("@")[0] || "Reporter";
  const initial = displayName.charAt(0).toUpperCase();
  const isSuper = user.role === "admin" || user.role === "editor";
  const roleTitle =
    user.role === "admin"
      ? "Pemimpin Redaksi"
      : user.role === "editor"
        ? "Editor Pelaksana"
        : "Jurnalis & Reporter";

  return (
    <div
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative inline-block"
    >
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="group flex items-center gap-2 rounded-full border border-blue-200/90 dark:border-blue-900/60 bg-blue-50/90 dark:bg-blue-950/50 py-1 pl-1.5 pr-2.5 text-xs font-semibold text-blue-950 dark:text-blue-100 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-xs transition-all cursor-pointer"
        title="Menu Redaksi Akun"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-[11px] font-extrabold text-white shadow-xs">
          {initial}
        </div>

        <div className="hidden sm:flex flex-col text-left">
          <span className="max-w-[100px] truncate leading-tight font-bold">
            {displayName.split(" ")[0]}
          </span>
          <span className="text-[9px] uppercase tracking-wider text-blue-600 dark:text-blue-400 font-extrabold flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {isSuper ? "Admin Redaksi" : "Ruang Redaksi"}
          </span>
        </div>

        <ChevronDown
          className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-blue-600" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 w-72 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Header Card */}
          <div className="rounded-xl bg-gradient-to-br from-slate-900 to-blue-950 p-3.5 text-white mb-2 shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white shadow-md border border-white/20">
                {initial}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider bg-blue-900/60 px-1.5 py-0.2 rounded-sm border border-blue-500/30">
                    ID Pers
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                    ● Aktif
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white truncate mt-0.5">{displayName}</h4>
                <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
              </div>
            </div>

            <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
              <span className="font-semibold flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-blue-400" />
                {roleTitle}
              </span>
              <span className="text-[10px] text-slate-400">Biro Jakarta</span>
            </div>
          </div>

          {/* Action Links */}
          <div className="space-y-1 text-xs">
            {/* Primary CMS Dashboard link */}
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors"
            >
              <LayoutDashboard className="h-4 w-4" />
              <div className="flex-1">
                <div className="leading-tight">Dashboard Admin (Panel CMS)</div>
                <span className="text-[10px] font-normal text-blue-500/80">
                  Mission control, analitik & manajemen konten
                </span>
              </div>
            </Link>

            <Link
              href="/reporter"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <FileEdit className="h-4 w-4 text-slate-400" />
              <div className="flex-1">
                <div className="leading-tight">Meja Redaksi Wartawan</div>
                <span className="text-[10px] text-slate-400 font-normal">
                  Draf tulisan & jangkauan liputan pribadi
                </span>
              </div>
            </Link>

            <Link
              href="/admin/collections/articles/create"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <PenSquare className="h-4 w-4 text-emerald-500" />
              <div className="flex-1">
                <div className="leading-tight">+ Tulis Artikel Baru</div>
                <span className="text-[10px] text-slate-400 font-normal">
                  Buka editor penulisan naskah berita
                </span>
              </div>
            </Link>
          </div>

          {/* Divider */}
          <div className="my-1.5 border-t border-slate-100 dark:border-slate-800" />

          {/* Logout Action */}
          <form action={logoutReporter} className="m-0">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 px-3 py-2 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-950/70 transition-colors cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Keluar dari Sesi</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
