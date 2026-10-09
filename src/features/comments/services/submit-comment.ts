import { getPayloadClient } from "@/lib/cms/payload";
import { commentSchema } from "@/lib/validation";

export type MutationResult =
  | { success: true; status: 201; message: string }
  | { success: false; status: 400 | 503; message: string };

export async function submitComment(input: unknown): Promise<MutationResult> {
  const parsed = commentSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      status: 400,
      message: parsed.error.issues[0]?.message ?? "Input tidak valid.",
    };
  }

  if (parsed.data.honeypot) {
    return { success: false, status: 400, message: "Permintaan tidak dapat diproses." };
  }

  const payload = await getPayloadClient();
  if (!payload) {
    return {
      success: false,
      status: 503,
      message: "Layanan komentar sedang tidak tersedia. Silakan coba lagi nanti.",
    };
  }

  try {
    await payload.create({
      collection: "comments",
      overrideAccess: false,
      data: {
        article: parsed.data.articleId,
        name: parsed.data.name,
        email: parsed.data.email,
        content: parsed.data.content,
        status: "pending",
      },
    });
    return { success: true, status: 201, message: "Komentar Anda diterima dan menunggu moderasi." };
  } catch (error) {
    console.error("Comment submission failed:", error);
    return {
      success: false,
      status: 503,
      message: "Komentar belum dapat dikirim. Periksa ID artikel dan coba lagi.",
    };
  }
}
