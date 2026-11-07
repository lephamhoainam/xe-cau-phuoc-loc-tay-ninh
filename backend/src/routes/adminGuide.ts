import { Router } from "express";
import mongoose from "mongoose";
import sanitizeHtml from "sanitize-html";
import { Guide } from "../models/Guide.js";
import { requireAuth, requirePermission } from "../middleware/auth.js";
import { uniqueSlug, slugify } from "../utils/slug.js";
import { cleanText, checkText } from "../utils/validate.js";

const router = Router();
router.use(requireAuth, requirePermission("guides:manage"));

function cleanHtml(html: unknown): string {
  return sanitizeHtml(String(html ?? "").slice(0, 60000), {
    allowedTags: ["h2", "h3", "p", "br", "strong", "em", "u", "s", "ul", "ol", "li", "a", "blockquote"],
    allowedAttributes: { a: ["href", "target", "rel"] },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer", target: "_blank" }),
    },
  });
}

function parseGuide(body: any) {
  const title = cleanText(body?.title);
  const tag = cleanText(body?.tag);
  const summary = cleanText(body?.summary);
  const author = cleanText(body?.author) || "Quản trị viên";

  const err =
    checkText(title, "Tiêu đề", { min: 5, max: 200, minWords: 2 }) ??
    checkText(tag, "Chuyên mục", { min: 2, max: 80 }) ??
    checkText(summary, "Tóm tắt", { max: 500, required: false, minWords: 2 }) ??
    checkText(author, "Tác giả", { min: 2, max: 100 });
  if (err) return { error: err } as const;

  const readTime = Math.round(Number(body?.readTime));
  if (!Number.isFinite(readTime) || readTime < 1 || readTime > 120) {
    return { error: "Thời gian đọc phải từ 1 đến 120 phút" } as const;
  }

  const rawSections = Array.isArray(body?.sections) ? body.sections.slice(0, 50) : [];
  const sections = [];
  for (const s of rawSections) {
    const sTitle = cleanText(s?.title);
    const e = checkText(sTitle, "Tiêu đề nội dung", { max: 200, required: false });
    if (e) return { error: e } as const;
    sections.push({ title: sTitle, html: cleanHtml(s?.html) });
  }

  return {
    data: {
      title,
      tag,
      summary,
      author,
      readTime,
      sections,
      slug: slugify(String(body?.slug ?? "")),
      status: body?.status === "published" ? ("published" as const) : ("draft" as const),
    },
  } as const;
}

// Danh sách chuyên mục đã dùng (gợi ý cho form)
router.get("/categories", async (_req, res) => {
  const tags = await Guide.distinct("tag");
  res.json(tags.filter(Boolean).sort());
});

router.get("/", async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 20));
  const filter: Record<string, unknown> = {};

  if (req.query.status === "draft" || req.query.status === "published") {
    filter.status = req.query.status;
  }
  if (typeof req.query.q === "string" && req.query.q.trim()) {
    const kw = req.query.q.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    filter.title = { $regex: kw, $options: "i" };
  }

  const [items, total] = await Promise.all([
    Guide.find(filter)
      .select("-sections")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Guide.countDocuments(filter),
  ]);
  res.json({ items, total, page, pages: Math.ceil(total / limit) });
});

router.get("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "ID không hợp lệ" });
  }
  const guide = await Guide.findById(req.params.id);
  if (!guide) return res.status(404).json({ message: "Không tìm thấy cẩm nang" });
  res.json(guide);
});

router.post("/", async (req, res) => {
  const parsed = parseGuide(req.body);
  if ("error" in parsed) return res.status(400).json({ message: parsed.error });

  const slug = await uniqueSlug(Guide, parsed.data.slug || parsed.data.title);
  const guide = await Guide.create({
    ...parsed.data,
    slug,
    publishedAt: parsed.data.status === "published" ? new Date() : undefined,
  });
  res.status(201).json(guide);
});

router.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "ID không hợp lệ" });
  }
  const parsed = parseGuide(req.body);
  if ("error" in parsed) return res.status(400).json({ message: parsed.error });

  const guide = await Guide.findById(req.params.id);
  if (!guide) return res.status(404).json({ message: "Không tìm thấy cẩm nang" });

  const { slug: wanted, ...rest } = parsed.data;
  if (wanted && wanted !== guide.slug) {
    guide.slug = await uniqueSlug(Guide, wanted, guide._id.toString());
  }
  if (rest.status === "published" && !guide.publishedAt) guide.publishedAt = new Date();
  Object.assign(guide, rest);
  await guide.save();
  res.json(guide);
});

router.delete("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "ID không hợp lệ" });
  }
  const guide = await Guide.findByIdAndDelete(req.params.id);
  if (!guide) return res.status(404).json({ message: "Không tìm thấy cẩm nang" });
  res.json({ message: "Đã xóa" });
});

export default router;