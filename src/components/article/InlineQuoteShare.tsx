"use client";

import React, { useState, useEffect, useRef } from "react";
import { Copy, MessageSquare, Check, Share2 } from "lucide-react";
import { toast } from "@/lib/toast";

interface InlineQuoteShareProps {
  articleTitle: string;
  articleUrl?: string;
}

export function InlineQuoteShare({ articleTitle, articleUrl }: InlineQuoteShareProps) {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [selectedText, setSelectedText] = useState("");
  const [copied, setCopied] = useState(false);
  const toolbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        // Delay slight hiding if clicking inside toolbar
        return;
      }

      const text = selection.toString().trim();
      if (text.length < 5) {
        setPosition(null);
        setSelectedText("");
        return;
      }

      // Check if selection is within the article content body
      const contentBody = document.getElementById("article-content-body");
      if (!contentBody) return;

      const anchorNode = selection.anchorNode;
      const focusNode = selection.focusNode;
      if (
        !anchorNode ||
        !focusNode ||
        !contentBody.contains(anchorNode) ||
        !contentBody.contains(focusNode)
      ) {
        setPosition(null);
        return;
      }

      try {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        if (rect.width === 0 && rect.height === 0) return;

        setPosition({
          x: rect.left + rect.width / 2,
          y: rect.top - 10, // top relative to viewport
        });
        setSelectedText(text);
      } catch {
        setPosition(null);
      }
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (toolbarRef.current && toolbarRef.current.contains(e.target as Node)) {
        return;
      }
      // If clicked outside selection, hide toolbar after short tick
      setTimeout(() => {
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed) {
          setPosition(null);
          setSelectedText("");
        }
      }, 100);
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, []);

  if (!position || !selectedText) return null;

  const url = articleUrl || (typeof window !== "undefined" ? window.location.href : "");

  const handleCopyQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const formattedQuote = `“${selectedText}”\n— ${articleTitle}\n${url}`;
    navigator.clipboard.writeText(formattedQuote);
    setCopied(true);
    toast.quote("Kutipan berhasil disalin ke clipboard!", "Kutipan Disalin");
    setTimeout(() => {
      setCopied(false);
      setPosition(null);
      window.getSelection()?.removeAllRanges();
    }, 1200);
  };

  const handleShareTwitter = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const cleanQuote = selectedText.length > 180 ? selectedText.slice(0, 180) + "..." : selectedText;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`“${cleanQuote}”\n\n${url}`)}`;
    window.open(tweetUrl, "_blank", "noopener,noreferrer");
    setPosition(null);
  };

  const handleQuoteInComments = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const commentBox = document.getElementById("komentar");
    const textarea = document.getElementById("comment-textarea") as HTMLTextAreaElement | null;

    if (commentBox && textarea) {
      commentBox.scrollIntoView({ behavior: "smooth" });
      const currentVal = textarea.value;
      const quoteBlock = `> "${selectedText}"\n\n`;
      textarea.value = currentVal ? `${currentVal}\n\n${quoteBlock}` : quoteBlock;
      textarea.focus();
      textarea.setSelectionRange(textarea.value.length, textarea.value.length);
      toast.info("Kutipan disisipkan ke kotak komentar redaksi", "Komentari Kutipan");
    } else if (commentBox) {
      commentBox.scrollIntoView({ behavior: "smooth" });
    }
    setPosition(null);
    window.getSelection()?.removeAllRanges();
  };

  return (
    <div
      ref={toolbarRef}
      style={{
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -100%)",
      }}
      className="z-50 flex items-center gap-1 p-1.5 rounded-full bg-slate-950/90 dark:bg-slate-900/95 border border-slate-700/80 shadow-2xl backdrop-blur-md text-white text-xs select-none animate-in fade-in zoom-in-95 duration-150"
    >
      <button
        onClick={handleCopyQuote}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-slate-800 text-slate-200 hover:text-white transition-colors cursor-pointer font-semibold text-[11px]"
        title="Salin kutipan teks"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-emerald-400">Tersalin</span>
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5 text-blue-400" />
            <span>Salin</span>
          </>
        )}
      </button>

      <span className="h-3.5 w-px bg-slate-800" />

      <button
        onClick={handleShareTwitter}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full hover:bg-slate-800 text-slate-200 hover:text-sky-400 transition-colors cursor-pointer font-semibold text-[11px]"
        title="Bagikan kutipan ke X (Twitter)"
      >
        <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        <span className="hidden sm:inline">Kutip di X</span>
      </button>

      <span className="h-3.5 w-px bg-slate-800" />

      <button
        onClick={handleQuoteInComments}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-slate-800 text-slate-200 hover:text-indigo-400 transition-colors cursor-pointer font-semibold text-[11px]"
        title="Tanggapi kutipan ini di kolom komentar"
      >
        <MessageSquare className="h-3.5 w-3.5" />
        <span>Tanggapi</span>
      </button>

      {/* Downward pointing triangle arrow */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-950/90 dark:border-t-slate-900/95 pointer-events-none" />
    </div>
  );
}
