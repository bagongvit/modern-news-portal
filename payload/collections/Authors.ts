import type { CollectionConfig } from "payload";
import {
  isEditorOrAdmin,
  isEditorOrAdminField,
  canAccessAdminPanel,
  canUpdateAuthors,
} from "../access/roles";
import { syncAvatarUrl } from "../hooks/syncAvatarUrl";

export const Authors: CollectionConfig = {
  slug: "authors",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role", "email", "user"],
  },
  access: {
    admin: canAccessAdminPanel,
    read: () => true,
    create: isEditorOrAdmin,
    update: canUpdateAuthors,
    delete: isEditorOrAdmin,
  },
  hooks: {
    beforeChange: [syncAvatarUrl],
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "role", type: "text", required: true, defaultValue: "Journalist & Editorial Staff" },
    { name: "bio", type: "textarea" },
    {
      name: "avatarImage",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Unggah foto profil dari komputer/HP atau pilih dari galeri media.",
      },
    },
    {
      name: "avatar",
      type: "text",
      admin: {
        description:
          "URL foto avatar (terisi otomatis dari unggahan media di atas, atau dapat diisi tautan foto manual).",
      },
    },
    { name: "email", type: "email", access: { read: isEditorOrAdminField } },
    { name: "twitter", type: "text" },
    { name: "linkedin", type: "text" },
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      unique: true,
      admin: { description: "Akun login reporter yang terhubung ke profil penulis ini." },
      access: {
        read: isEditorOrAdminField,
        create: isEditorOrAdminField,
        update: isEditorOrAdminField,
      },
    },
  ],
};
