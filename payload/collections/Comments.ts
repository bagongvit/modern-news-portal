import type { CollectionConfig } from "payload";
import { isEditorOrAdmin, isEditorOrAdminField, canAccessAdminPanel } from "../access/roles";

export const Comments: CollectionConfig = {
  slug: "comments",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "article", "status", "createdAt"],
  },
  access: {
    admin: canAccessAdminPanel,
    read: ({ req }) =>
      req.user?.role === "admin" || req.user?.role === "editor"
        ? true
        : { status: { equals: "approved" } },
    create: () => true,
    update: isEditorOrAdmin,
    delete: isEditorOrAdmin,
  },
  fields: [
    {
      name: "article",
      type: "relationship",
      relationTo: "articles",
      required: true,
    },
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
      access: {
        read: isEditorOrAdminField,
      },
    },
    {
      name: "content",
      type: "textarea",
      required: true,
    },
    {
      name: "status",
      type: "select",
      options: [
        { label: "Approved", value: "approved" },
        { label: "Pending", value: "pending" },
        { label: "Spam", value: "spam" },
      ],
      defaultValue: "pending",
      required: true,
      access: {
        create: isEditorOrAdminField,
        update: isEditorOrAdminField,
      },
    },
  ],
};
