import type { Access, FieldAccess, PayloadRequest, Where } from "payload";

function userHasRole(user: unknown, roles: readonly string[]): boolean {
  if (typeof user !== "object" || user === null || !("role" in user)) return false;
  return typeof user.role === "string" && roles.includes(user.role);
}

function reporterOwnsArticles(req: PayloadRequest): Where | false {
  if (!req.user || !userHasRole(req.user, ["author"])) return false;
  return { reporter: { equals: req.user.id } };
}

export const isAdmin: Access = ({ req }) => userHasRole(req.user, ["admin"]);
export const isEditorOrAdmin: Access = ({ req }) => userHasRole(req.user, ["admin", "editor"]);
export const isAdminField: FieldAccess = ({ req }) => userHasRole(req.user, ["admin"]);
export const isEditorOrAdminField: FieldAccess = ({ req }) =>
  userHasRole(req.user, ["admin", "editor"]);
export const canAssignArticleReporter: FieldAccess = ({ req }) =>
  userHasRole(req.user, ["admin", "editor", "author"]);
export const canReadArticleReporter: FieldAccess = ({ req }) =>
  userHasRole(req.user, ["admin", "editor", "author"]);

export const canAccessAdminPanel = ({ req }: { req: PayloadRequest }): boolean =>
  userHasRole(req.user, ["admin", "editor", "author"]);
export const canManageUsers = ({ req }: { req: PayloadRequest }): boolean =>
  userHasRole(req.user, ["admin"]);

export const canReadArticles: Access = ({ req }) => {
  if (userHasRole(req.user, ["admin", "editor"])) return true;
  const ownedArticles = reporterOwnsArticles(req);
  if (ownedArticles) return ownedArticles;
  return { status: { equals: "published" } };
};

export const canCreateArticles: Access = ({ req }) => {
  if (userHasRole(req.user, ["admin", "editor"])) return true;
  return reporterOwnsArticles(req);
};

export const canManageArticles: Access = ({ req }) => {
  if (userHasRole(req.user, ["admin", "editor"])) return true;
  return reporterOwnsArticles(req);
};

export const canReadUsers: Access = ({ req }) => {
  if (userHasRole(req.user, ["admin"])) return true;
  if (req.user) return { id: { equals: req.user.id } };
  return false;
};

export const canUpdateUsers: Access = ({ req }) => {
  if (userHasRole(req.user, ["admin"])) return true;
  if (req.user) return { id: { equals: req.user.id } };
  return false;
};

export const canUpdateAuthors: Access = ({ req }) => {
  if (userHasRole(req.user, ["admin", "editor"])) return true;
  if (req.user) return { user: { equals: req.user.id } };
  return false;
};
