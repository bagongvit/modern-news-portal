import type { GlobalConfig } from "payload";
import { isEditorOrAdmin } from "../access/roles";

export const BreakingNews: GlobalConfig = {
  slug: "breaking-news",
  access: {
    read: () => true,
    update: isEditorOrAdmin,
  },
  fields: [
    {
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
    },
    {
      name: "headline",
      type: "text",
      defaultValue: "Peluncuran Misi Luar Angkasa Generasi Terbaru Berhasil Memasuki Orbit Bumi",
    },
    {
      name: "url",
      type: "text",
      defaultValue: "/berita/peluncuran-misi-luar-angkasa-orbit-bumi",
    },
    {
      name: "badgeText",
      type: "text",
      defaultValue: "BREAKING",
    },
  ],
};
