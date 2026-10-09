export type ToastType = "success" | "info" | "bookmark" | "error" | "quote";

export interface ToastItem {
  id: string;
  title?: string;
  message: string;
  type?: ToastType;
  duration?: number;
}

export function showToast(message: string, type: ToastType = "info", title?: string, duration = 3500) {
  if (typeof window === "undefined") return;

  const id = "toast_" + Math.random().toString(36).substring(2, 9);
  const event = new CustomEvent<ToastItem>("modern-news-toast", {
    detail: {
      id,
      message,
      type,
      title,
      duration,
    },
  });
  window.dispatchEvent(event);
}

export const toast = {
  success: (msg: string, title?: string, duration?: number) => showToast(msg, "success", title, duration),
  info: (msg: string, title?: string, duration?: number) => showToast(msg, "info", title, duration),
  bookmark: (msg: string, title?: string, duration?: number) => showToast(msg, "bookmark", title, duration),
  error: (msg: string, title?: string, duration?: number) => showToast(msg, "error", title, duration),
  quote: (msg: string, title?: string, duration?: number) => showToast(msg, "quote", title, duration),
};
