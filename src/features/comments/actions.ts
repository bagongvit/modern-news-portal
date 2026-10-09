"use server";

import { revalidatePath } from "next/cache";
import { submitComment } from "@/features/comments/services/submit-comment";

export interface CommentState {
  success: boolean;
  message: string;
  error?: string;
}

export async function submitCommentAction(
  _prevState: CommentState | null,
  formData: FormData,
): Promise<CommentState> {
  const articleSlug = String(formData.get("articleSlug") ?? "");
  const result = await submitComment({
    articleId: formData.get("articleId"),
    name: formData.get("name"),
    email: formData.get("email"),
    content: formData.get("content"),
    honeypot: String(formData.get("honeypot") ?? ""),
  });

  if (result.success && articleSlug) {
    revalidatePath(`/berita/${articleSlug}`);
  }

  return result.success
    ? { success: true, message: result.message }
    : { success: false, message: result.message, error: result.message };
}
