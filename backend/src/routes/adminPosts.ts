import { Router } from "express";
import mongoose from "mongoose";
import { Post } from "../models/Post.js";
import { requireAuth, requirePermission } from "../middleware/auth.js";
import { uniqueSlug, safeImageUrl, slugify } from "../utils/slug.js";
import { cleanImages, type GalleryImage } from "../utils/content.js";
import { cleanText, cleanMultiline, checkText, checkMultiline } from "../utils/validate.js";
const router = Router();
router.use(requireAuth, requirePermission("posts:manage"));

type PostInput = {
  title: string;
  excerpt: string;
  content: string;
  conclusion: string;
  images: GalleryImage[];
  image: string;
  tag: string;
  author: string;
  readTime: string;
  featured: boolean;
  status: "draft" | "published";
  publishedAt?: Date;
  slug: string;
};

function parsePost(body: any): { error: string } | { data: PostInput } {
    const title = cleanText(body?.title);
  const excerpt = cleanText(body?.excerpt);
  const tag = cleanText(body?.tag) || "Tin tức";
  const author = cleanText(body?.author) || "Quản trị viên";
  const readTime = cleanText(body?.readTime);
  const content = cleanMultiline(body?.content, 50000);
  const conclusion = cleanMultiline(body?.conclusion, 5000);

  const err =
    checkText(title, "Tiêu đề", { min: 5, max: 200 }) ??
    checkText(excerpt, "Mô tả", { max: 300, required: false }) ??
    checkText(tag, "Danh mục", { max: 50 }) ??
    checkText(author, "Tên người đăng", { min: 2, max: 100 }) ??
    checkText(readTime, "Thời gian đọc", { max: 30, required: false }) ??
    checkMultiline(content, "Nội dung bài viết", { max: 50000, required: false }) ??
    checkMultiline(conclusion, "Kết luận", { max: 5000, required: false });
  if (err) return { error: err };
  const images = cleanImages(body.images);  
  const data: PostInput = {
    title,
    excerpt,
    content,
    conclusion,
    images,
    image: images[0]?.src ?? "", // ảnh bìa = ảnh đầu tiên
    tag,
    author,
    readTime,
    featured: Boolean(body.featured),
    status: body.status === "published" ? "published" : "draft",
    slug: slugify(String(body.slug ?? "")),
  };

  if (body.publishedAt) {
    const d = new Date(body.publishedAt);
    if (!Number.isNaN(d.getTime())) data.publishedAt = d;
  }

  return { data };
}

// Chỉ giữ một bài nổi bật
async function clearOtherFeatured(exceptId: unknown) {
  await Post.updateMany({ _id: { $ne: exceptId }, featured: true }, { featured: false });
}

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
    Post.find(filter)
      .select("-content")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Post.countDocuments(filter),
  ]);
  res.json({ items, total, page, pages: Math.ceil(total / limit) });
});

router.get("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "ID không hợp lệ" });
  }
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Không tìm thấy bài viết" });
  res.json(post);
});

router.post("/", async (req, res) => {
  const parsed = parsePost(req.body);
  if ("error" in parsed) return res.status(400).json({ message: parsed.error });

  const slug = await uniqueSlug(Post, parsed.data.slug || parsed.data.title);
  const post = await Post.create({
    ...parsed.data,
    slug,
    publishedAt:
      parsed.data.publishedAt ??
      (parsed.data.status === "published" ? new Date() : undefined),
  });

  if (post.featured) await clearOtherFeatured(post._id);
  res.status(201).json(post);
});

router.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "ID không hợp lệ" });
  }
  const parsed = parsePost(req.body);
  if ("error" in parsed) return res.status(400).json({ message: parsed.error });

  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Không tìm thấy bài viết" });

    const wantedSlug = parsed.data.slug || post.slug;
  if (wantedSlug !== post.slug) {
    post.slug = await uniqueSlug(Post, wantedSlug, post._id.toString());
  }
  if (parsed.data.status === "published" && !post.publishedAt) {
    post.publishedAt = new Date();
  }
  const { slug: _ignored, ...rest } = parsed.data;
  Object.assign(post, rest);
  await post.save();

  if (post.featured) await clearOtherFeatured(post._id);
  res.json(post);
});

router.delete("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "ID không hợp lệ" });
  }
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) return res.status(404).json({ message: "Không tìm thấy bài viết" });
  res.json({ message: "Đã xóa" });
});

export default router;