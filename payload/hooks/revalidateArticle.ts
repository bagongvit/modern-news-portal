import type { CollectionAfterChangeHook } from "payload";
import { revalidatePath } from "next/cache";

export const revalidateArticle: CollectionAfterChangeHook = async ({ doc, previousDoc }) => {
  try {
    if (doc?.slug) {
      revalidatePath(`/berita/${doc.slug}`);
    }
    if (previousDoc?.slug && previousDoc.slug !== doc?.slug) {
      revalidatePath(`/berita/${previousDoc.slug}`);
    }
    revalidatePath("/");
  } catch (error) {
    console.warn("ISR revalidation warning:", error);
  }

  return doc;
};
