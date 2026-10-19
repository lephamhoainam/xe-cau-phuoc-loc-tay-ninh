import type { Model } from "mongoose";

export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Nếu slug đã tồn tại thì thêm -2, -3...
export async function uniqueSlug(
  model: Model<any>,
  title: string,
  excludeId?: string
): Promise<string> {
  const base = slugify(title) || "muc";
  let slug = base;
  let i = 2;
  while (
    await model.exists({
      slug,
      ...(excludeId ? { _id: { $ne: excludeId } } : {}),
    })
  ) {
    slug = `${base}-${i++}`;
  }
  return slug;
}

// Chỉ cho phép ảnh là link http(s) hoặc đường dẫn nội bộ, chặn javascript:
export function safeImageUrl(value: unknown): string {
  const s = String(value ?? "").trim();
  return /^(https?:\/\/|\/)/.test(s) ? s : "";
}