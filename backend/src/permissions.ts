export const PERMISSIONS = [
  "quotes:read",
  "quotes:update",
  "quotes:delete",
  "posts:manage",
  "services:manage",
] as const;

export type Permission = (typeof PERMISSIONS)[number];