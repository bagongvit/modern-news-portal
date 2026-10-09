import { NextResponse } from "next/server";
import { subscribeNewsletter } from "@/features/newsletter/services/subscribe";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Format JSON tidak valid." }, { status: 400 });
  }

  const result = await subscribeNewsletter(body);
  return NextResponse.json({ message: result.message }, { status: result.status });
}
