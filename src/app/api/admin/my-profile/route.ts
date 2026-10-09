import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getPayloadClient } from "@/lib/cms/payload";

export async function GET(request: Request) {
  const payload = await getPayloadClient();
  const requestUrl = new URL(request.url);

  if (!payload) {
    return NextResponse.redirect(new URL("/admin", requestUrl.origin));
  }

  const auth = await payload.auth({ headers: await headers() });
  if (!auth.user) {
    return NextResponse.redirect(new URL("/admin/login", requestUrl.origin));
  }

  try {
    // Find the author profile linked to this user account
    const authors = await payload.find({
      collection: "authors",
      where: { user: { equals: auth.user.id } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
      user: auth.user,
    });

    if (authors.docs.length > 0) {
      const authorId = authors.docs[0].id;
      return NextResponse.redirect(
        new URL(`/admin/collections/authors/${authorId}`, requestUrl.origin),
      );
    }
  } catch (error) {
    console.error("Gagal menemukan profil penulis:", error);
  }

  // Fallback to authors collection list if not linked yet
  return NextResponse.redirect(new URL("/admin/collections/authors", requestUrl.origin));
}
