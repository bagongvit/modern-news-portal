import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Author } from "@/types/news";
import { Mail, ExternalLink, CheckCircle2 } from "lucide-react";

interface AuthorBioBoxProps {
  author: Author;
}

export function AuthorBioBox({ author }: AuthorBioBoxProps) {
  return (
    <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-6 sm:p-7 my-12 shadow-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <Link
          href={`/penulis/${author.slug}`}
          className="relative h-18 w-18 shrink-0 rounded-2xl overflow-hidden border-2 border-blue-500 shadow-md bg-slate-200 dark:bg-slate-800 hover:opacity-90 transition-opacity"
        >
          {author.avatar ? (
            <Image
              src={author.avatar}
              alt={author.name}
              fill
              sizes="72px"
              className="object-cover"
            />
          ) : null}
        </Link>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white">
                  <Link
                    href={`/penulis/${author.slug}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {author.name}
                  </Link>
                </h3>
                <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mt-0.5">
                {author.role}
              </p>
            </div>

            <div className="flex items-center space-x-2 text-slate-500">
              {author.twitter && (
                <a
                  href={`https://twitter.com/${author.twitter.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-900 hover:text-white dark:hover:bg-slate-700 transition-all font-semibold"
                  aria-label={`Twitter ${author.name}`}
                >
                  <span className="font-bold">𝕏</span>
                  <span>{author.twitter}</span>
                </a>
              )}
              {author.linkedin && (
                <a
                  href={`https://linkedin.com/in/${author.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-600 hover:text-white transition-all font-semibold"
                  aria-label={`LinkedIn ${author.name}`}
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>LinkedIn</span>
                </a>
              )}
              {author.email && (
                <a
                  href={`mailto:${author.email}`}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-400 transition-all"
                  aria-label={`Email ${author.name}`}
                >
                  <Mail className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {author.bio && (
            <p className="mt-3.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {author.bio}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
