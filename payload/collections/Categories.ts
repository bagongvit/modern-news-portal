import type { CollectionConfig } from "payload";
import { isEditorOrAdmin, canAccessAdminPanel } from "../access/roles";

export const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "color"],
  },
  access: {
    admin: canAccessAdminPanel,
    read: () => true,
    create: isEditorOrAdmin,
    update: isEditorOrAdmin,
    delete: isEditorOrAdmin,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "color",
      type: "text",
      defaultValue: "#2563eb",
      admin: {
        description: "Hex color or Tailwind color identifier for category badge",
      },
    },
  ],
};
