import type { CollectionBeforeChangeHook } from "payload";

export const syncAvatarUrl: CollectionBeforeChangeHook = async ({ data, originalDoc, req }) => {
  if (!data) return data;

  const image = data.avatarImage;
  const imageID =
    typeof image === "number" || typeof image === "string"
      ? image
      : typeof image === "object" && image !== null && "id" in image
        ? image.id
        : undefined;

  if (imageID !== undefined) {
    try {
      const media = await req.payload.findByID({
        collection: "media",
        id: imageID,
        depth: 0,
        overrideAccess: true,
      });
      if (media?.url) {
        data.avatar = media.url;
      }
    } catch (e) {
      console.error("Gagal sinkronisasi avatar URL:", e);
    }
  }

  if (!data.avatar && originalDoc?.avatar) {
    data.avatar = originalDoc.avatar;
  }

  return data;
};
