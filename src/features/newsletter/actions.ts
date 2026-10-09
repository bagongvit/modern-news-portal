"use server";

import { subscribeNewsletter } from "@/features/newsletter/services/subscribe";

export interface NewsletterState {
  success: boolean;
  message: string;
  error?: string;
}

export async function subscribeNewsletterAction(
  _prevState: NewsletterState | null,
  formData: FormData,
): Promise<NewsletterState> {
  const result = await subscribeNewsletter({
    email: formData.get("email"),
    honeypot: String(formData.get("honeypot") ?? ""),
  });

  return result.success
    ? { success: true, message: result.message }
    : { success: false, message: result.message, error: result.message };
}
