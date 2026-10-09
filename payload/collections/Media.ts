import type { CollectionConfig } from "payload";
import { isEditorOrAdmin, canAccessAdminPanel } from "../access/roles";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    admin: canAccessAdminPanel,
    read: () => true,
    create: canAccessAdminPanel,
    update: isEditorOrAdmin,
    delete: isEditorOrAdmin,
  },
  upload: {
    staticDir: "public/media",
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        position: "centre",
      },
      {
        name: "card",
        width: 768,
        height: 512,
        position: "centre",
      },
      {
        name: "hero",
        width: 1920,
        height: 1080,
        position: "centre",
      },
    ],
    adminThumbnail: "thumbnail",
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
    {
      name: "caption",
      type: "text",
    },
  ],
};
