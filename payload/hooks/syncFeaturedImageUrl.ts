import type { CollectionBeforeChangeHook } from "payload";

export const syncFeaturedImageUrl: CollectionBeforeChangeHook = async ({
  data,
  originalDoc,
  req,
}) => {
  if (!data) return data;

  const image = data.featuredImage;
  const imageID =
    typeof image === "number"
      ? image
      : typeof image === "object" && image !== null && "id" in image && typeof image.id === "number"
        ? image.id
        : undefined;

  if (imageID !== undefined) {
    const media = await req.payload.findByID({
      collection: "media",
      id: imageID,
      depth: 0,
      overrideAccess: true,
    });
    if (media.url) data.featuredImageUrl = media.url;
  }

  if (!data.featuredImageUrl && originalDoc?.featuredImageUrl) {
    data.featuredImageUrl = originalDoc.featuredImageUrl;
  }

  return data;
};
