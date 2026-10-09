import type { CollectionConfig } from "payload";
import {
  isAdmin,
  isAdminField,
  canAccessAdminPanel,
  canReadUsers,
  canUpdateUsers,
} from "../access/roles";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  access: {
    admin: canAccessAdminPanel,
    create: isAdmin,
    read: canReadUsers,
    update: canUpdateUsers,
    delete: isAdmin,
  },
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "role",
      type: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
        { label: "Author", value: "author" },
      ],
      defaultValue: "admin",
      required: true,
      access: {
        create: isAdminField,
        update: isAdminField,
      },
    },
  ],
};
