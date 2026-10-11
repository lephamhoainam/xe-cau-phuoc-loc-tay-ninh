export type GalleryImage = { src: string; alt: string };
export type GalleryMode = "none" | "single" | "slider";
type Item = string | { file: string; alt?: string };

export const IMG_DIR = "/assets/"; // = public/assets/

// Nối folder. Link ngoài (https://...) thì giữ nguyên.
export const withDir = (file: string) =>
  !file ? "" : /^https?:\/\//.test(file) ? file : IMG_DIR + file;

// Tạo mảng ảnh. Mỗi phần tử là tên file, hoặc { file, alt } nếu muốn alt riêng.
// Tên file trống "" sẽ bị bỏ.
export const gallery = (defaultAlt: string, items: Item[]): GalleryImage[] =>
  items
    .map((it) => {
      const file = typeof it === "string" ? it : it.file;
      const alt = typeof it === "string" ? defaultAlt : it.alt ?? defaultAlt;
      return { src: withDir(file), alt };
    })
    .filter((img) => img.src);

// Ảnh đầu tiên, dùng cho component cũ vẫn đọc field `image`
export const cover = (images: GalleryImage[]) => images[0]?.src ?? "";

// Quyết định kiểu hiển thị theo số ảnh
export const getGalleryMode = (images?: GalleryImage[]): GalleryMode => {
  const n = images?.length ?? 0;
  if (n === 0) return "none"; // báo "Chưa có ảnh"
  if (n === 1) return "single"; // hiện 1 ảnh
  return "slider"; // 2 ảnh trở lên: nút bấm + tự chuyển
};