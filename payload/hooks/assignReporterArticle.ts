import type { CollectionBeforeChangeHook } from "payload";

export const assignReporterArticle: CollectionBeforeChangeHook = async ({ data, req }) => {
  if (!data || req.user?.role !== "author") return data;

  const profiles = await req.payload.find({
    collection: "authors",
    where: { user: { equals: req.user.id } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });
  const profile = profiles.docs[0];
  if (!profile) {
    throw new Error("Akun reporter belum ditautkan ke profil penulis oleh editor.");
  }

  data.author = profile.id;
  data.reporter = req.user.id;
  if (!data.status) {
    data.status = "draft";
  }
  data.isFeatured = false;
  data.isBreaking = false;
  return data;
};
