import { Router } from "express";
import mongoose from "mongoose";
import { Post } from "../models/Post.js";
import { requireAuth, requirePermission } from "../middleware/auth.js";
import { uniqueSlug, safeImageUrl, slugify } from "../utils/slug.js";
import { cleanImages, type GalleryImage } from "../utils/content.js";

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
  const title = String(body?.title ?? "").trim();
  if (!title) return { error: "Vui lòng nhập tiêu đề" };
  if (title.length > 200) return { error: "Tiêu đề tối đa 200 ký tự" };

  const images = cleanImages(body.images);

  const data: PostInput = {
    title,
    excerpt: String(body.excerpt ?? "").trim().slice(0, 300),
    content: String(body.content ?? "").slice(0, 50000),
    conclusion: String(body.conclusion ?? "").slice(0, 5000),
    images,
    image: images[0]?.src ?? "", // ảnh bìa = ảnh đầu tiên
    tag: String(body.tag ?? "").trim().slice(0, 50) || "Tin tức",
    author: String(body.author ?? "").trim().slice(0, 100) || "Quản trị viên",
    readTime: String(body.readTime ?? "").trim().slice(0, 30),
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