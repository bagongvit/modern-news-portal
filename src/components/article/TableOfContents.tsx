"use client";

import React, { useEffect, useState } from "react";
import { ListOrdered, ChevronDown, ChevronUp, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const articleContainer = document.getElementById("article-content-body");
      if (!articleContainer) return;

      const headingElements = articleContainer.querySelectorAll("h2, h3");
      const items: HeadingItem[] = [];

      headingElements.forEach((el, index) => {
        const id = el.id || `heading-${index}`;
        el.id = id;
        items.push({
          id,
          text: el.textContent || "",
          level: el.tagName === "H2" ? 2 : 3,
        });
      });

      setHeadings(items);
      if (items.length > 0) {
        setActiveId(items[0]?.id ?? null);
      }
    }, 60);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (headings.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;
      let currentActive = headings[0]?.id || null;

      for (const item of headings) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollPosition >= top) {
            currentActive = item.id;
          }
        }
      }

      setActiveId(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  const handleHeadingClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      history.pushState(null, "", `#${id}`);
      setActiveId(id);
    }
  };

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="Daftar Isi Liputan"
      className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/60 p-5 my-8 shadow-2xs transition-all"
    >
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 hover:text-blue-600 transition-colors w-full justify-between cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
              <ListOrdered className="h-3.5 w-3.5" />
            </div>
            <span>Daftar Isi Liputan ({headings.length} Bab)</span>
          </div>
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      {isOpen && (
        <ul className="mt-4 space-y-1.5 border-t border-slate-200/80 dark:border-slate-800 pt-3 text-xs">
          {headings.map((item) => {
            const isActive = activeId === item.id;

            return (
              <li key={item.id} className={item.level === 3 ? "ml-4" : ""}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleHeadingClick(e, item.id)}
                  className={cn(
                    "flex items-center gap-2 py-1 px-2.5 rounded-lg transition-all leading-relaxed",
                    isActive
                      ? "text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-950/50 shadow-2xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/80 dark:hover:bg-slate-800/50",
                  )}
                >
                  <ChevronRight
                    className={cn(
                      "h-3 w-3 shrink-0 transition-transform",
                      isActive
                        ? "text-blue-600 dark:text-blue-400 translate-x-0.5"
                        : "text-slate-400 opacity-60",
                    )}
                  />
                  <span className="line-clamp-1">{item.text}</span>
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
}
