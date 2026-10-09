import type { CollectionBeforeValidateHook } from "payload";

/**
 * Converts any title or string into a URL-friendly kebab-case slug.
 * Removes Indonesian/Latin diacritics, strips punctuation and non-alphanumeric chars,
 * and collapses multiple hyphens/spaces.
 */
export const formatSlugString = (val: string): string => {
  return val
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // strip diacritics
    .replace(/[^a-z0-9\s-]/g, "") // remove punctuation and illegal URL chars
    .replace(/[\s_-]+/g, "-") // collapse spaces and underscores into a single hyphen
    .replace(/^-+|-+$/g, ""); // trim leading and trailing hyphens
};

/**
 * Payload hook to automatically generate a clean, URL-safe slug from the article's title
 * if the slug is left blank or contains unformatted text.
 */
export const autoGenerateSlug: CollectionBeforeValidateHook = ({ data }) => {
  if (!data) return data;

  const currentSlug = typeof data.slug === "string" ? data.slug.trim() : "";
  const title = typeof data.title === "string" ? data.title.trim() : "";

  // If slug is omitted or empty, derive automatically from title
  if (!currentSlug && title) {
    data.slug = formatSlugString(title);
  } else if (currentSlug) {
    // If user typed a slug, ensure it is sanitized and URL-safe
    data.slug = formatSlugString(currentSlug);
  }

  return data;
};
