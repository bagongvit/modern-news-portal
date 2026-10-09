import type { CollectionBeforeChangeHook } from "payload";

export const populateReadingTime: CollectionBeforeChangeHook = async ({ data }) => {
  if (!data) return data;

  // Calculate word count from lead and content
  let text = (data.lead as string) || "";

  if (data.content) {
    if (typeof data.content === "string") {
      text += " " + data.content;
    } else if (typeof data.content === "object") {
      text += " " + JSON.stringify(data.content);
    }
  }

  const words = text.trim().split(/\s+/).filter(Boolean).length;
  // Standard reading speed ~200 words per minute
  const readingTime = Math.max(1, Math.ceil(words / 200));
  data.readingTimeMinutes = readingTime;

  return data;
};
