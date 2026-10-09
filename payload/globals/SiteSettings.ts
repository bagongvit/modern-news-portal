import type { GlobalConfig } from "payload";
import { isEditorOrAdmin } from "../access/roles";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  access: {
    read: () => true,
    update: isEditorOrAdmin,
  },
  fields: [
    {
      name: "siteName",
      type: "text",
      required: true,
      defaultValue: "Modern News Portal",
    },
    {
      name: "tagline",
      type: "text",
      defaultValue: "Jurnalisme Terpercaya, Cepat, dan Mendalam",
    },
    {
      name: "description",
      type: "textarea",
      defaultValue:
        "Portal berita modern yang menyajikan liputan mendalam seputar teknologi, bisnis, sains, dan peristiwa global secara akurat dan independen.",
    },
    {
      name: "contactEmail",
      type: "email",
      defaultValue: "redaksi@modernnews.id",
    },
  ],
};
