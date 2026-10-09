import { NextResponse } from "next/server";
import { submitComment } from "@/features/comments/services/submit-comment";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Format JSON tidak valid." }, { status: 400 });
  }

  const result = await submitComment(body);
  return NextResponse.json({ message: result.message }, { status: result.status });
}
