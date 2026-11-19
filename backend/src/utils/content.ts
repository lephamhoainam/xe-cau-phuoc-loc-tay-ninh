import { safeImageUrl } from "./slug";

const str = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

export type GalleryImage = { src: string; alt?: string; caption?: string };

export function cleanImages(input: unknown): GalleryImage[] {
  if (!Array.isArray(input)) return [];
  return input
    .slice(0, 30)
    .map((i: any) => ({
      src: safeImageUrl(i?.src),
      alt: str(i?.alt, 200),
      caption: str(i?.caption, 300),
    }))
    .filter((i) => i.src);
}

export function cleanStringList(input: unknown, maxItems = 30, maxLen = 300): string[] {
  if (!Array.isArray(input)) return [];
  return input
    .slice(0, maxItems)
    .map((s) => str(s, maxLen))
    .filter(Boolean);
}

function cleanBlock(b: any) {
  switch (b?.type) {
    case "paragraph":
      return { type: "paragraph", text: str(b.text, 5000) };
    case "note":
      return { type: "note", text: str(b.text, 2000) };
    case "list":
      return {
        type: "list",
        items: cleanStringList(b.items),
        ...(b.tone === "bad" ? { tone: "bad" } : {}),
      };
    case "image":
      return {
        type: "image",
        src: safeImageUrl(b.src),
        alt: str(b.alt, 200),
        caption: str(b.caption, 300),
      };
    case "gallery":
      return { type: "gallery", images: cleanImages(b.images), caption: str(b.caption, 300) };
    default:
      return null;
  }
}

export function cleanTopics(input: unknown) {
  if (!Array.isArray(input)) return [];
  return input.slice(0, 30).map((t: any, idx) => ({
    id: str(t?.id, 60) || `topic-${idx + 1}`,
    title: str(t?.title, 200),
    blocks: (Array.isArray(t?.blocks) ? t.blocks.slice(0, 100) : [])
      .map(cleanBlock)
      .filter(Boolean),
  }));
}

export const SERVICE_LAYOUTS = ["toc", "steps", "grid", "showcase"] as const;