import { getPayloadClient } from "@/lib/cms/payload";
import { newsletterSchema } from "@/lib/validation";

export type MutationResult =
  | { success: true; status: 201; message: string }
  | { success: false; status: 400 | 503; message: string };

export async function subscribeNewsletter(input: unknown): Promise<MutationResult> {
  const parsed = newsletterSchema.safeParse(input);
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
      message: "Layanan buletin sedang tidak tersedia. Silakan coba lagi nanti.",
    };
  }

  try {
    await payload.create({
      collection: "newsletters",
      overrideAccess: false,
      data: { email: parsed.data.email, status: "active" },
    });
    return {
      success: true,
      status: 201,
      message: "Terima kasih, langganan buletin Anda berhasil.",
    };
  } catch (error) {
    console.error("Newsletter subscription failed:", error);
    return {
      success: false,
      status: 503,
      message: "Langganan belum dapat diproses. Silakan coba lagi nanti.",
    };
  }
}
