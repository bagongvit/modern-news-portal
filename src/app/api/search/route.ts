import { NextRequest, NextResponse } from "next/server";
import { searchArticles } from "@/lib/cms/payload";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || undefined;

  const results = await searchArticles(q, category);

  return NextResponse.json({
    query: q,
    category: category || null,
    total: results.length,
    articles: results,
  });
}
