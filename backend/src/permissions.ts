export const PERMISSIONS = [
  "quotes:read",
  "quotes:update",
  "quotes:delete",
  "posts:manage",
  "guides:manage",
  "services:manage",
] as const;

export type Permission = (typeof PERMISSIONS)[number];