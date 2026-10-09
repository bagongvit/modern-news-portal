import { NextRequest, NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/cms/payload";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function POST(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "Article ID is required" }, { status: 400 });
    }

    const payload = await getPayloadClient();
    if (!payload) {
      return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    }

    // Find current viewCount
    const numericId = Number(id);
    const article = await payload.findByID({
      collection: "articles",
      id: isNaN(numericId) ? id : numericId,
      depth: 0,
      overrideAccess: true,
    });

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    const currentViews = typeof article.viewCount === "number" ? article.viewCount : 0;
    const newViews = currentViews + 1;

    // Increment and save
    await payload.update({
      collection: "articles",
      id: isNaN(numericId) ? id : numericId,
      data: {
        viewCount: newViews,
      },
      overrideAccess: true,
    });

    return NextResponse.json({
      success: true,
      viewCount: newViews,
    });
  } catch (error) {
    console.error("Failed to increment article viewCount:", error);
    return NextResponse.json({ error: "Failed to update views" }, { status: 500 });
  }
}
