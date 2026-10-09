import type { CollectionConfig } from "payload";
import { isEditorOrAdmin, isEditorOrAdminField, canAccessAdminPanel } from "../access/roles";

export const Newsletters: CollectionConfig = {
  slug: "newsletters",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "status", "createdAt"],
  },
  access: {
    admin: canAccessAdminPanel,
    read: isEditorOrAdmin,
    create: () => true,
    update: isEditorOrAdmin,
    delete: isEditorOrAdmin,
  },
  fields: [
    {
      name: "email",
      type: "email",
      required: true,
      unique: true,
      index: true,
      access: {
        read: isEditorOrAdminField,
      },
    },
    {
      name: "status",
      type: "select",
      options: [
        { label: "Active", value: "active" },
        { label: "Unsubscribed", value: "unsubscribed" },
      ],
      defaultValue: "active",
      required: true,
      access: {
        create: isEditorOrAdminField,
        update: isEditorOrAdminField,
        read: isEditorOrAdminField,
      },
    },
  ],
};
