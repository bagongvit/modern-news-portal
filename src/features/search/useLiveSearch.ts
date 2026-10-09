"use client";

import { useQuery } from "@tanstack/react-query";
import { Article } from "@/types/news";

interface SearchResponse {
  query: string;
  category: string | null;
  total: number;
  articles: Article[];
}

async function fetchSearchResults(query: string, category?: string): Promise<SearchResponse> {
  const params = new URLSearchParams();
  if (query) params.append("q", query);
  if (category) params.append("category", category);

  const res = await fetch(`/api/search?${params.toString()}`);
  if (!res.ok) {
    throw new Error("Gagal memuat hasil pencarian.");
  }
  return res.json();
}

export function useLiveSearch(query: string, category?: string) {
  return useQuery({
    queryKey: ["articles-search", query, category],
    queryFn: () => fetchSearchResults(query, category),
    enabled: query.trim().length > 1,
    staleTime: 1000 * 60, // 1 minute
  });
}
