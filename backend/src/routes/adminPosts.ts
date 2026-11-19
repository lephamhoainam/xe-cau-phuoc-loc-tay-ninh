import { Router } from "express";
import mongoose from "mongoose";
import { Post } from "../models/Post.js";
import { requireAuth, requirePermission } from "../middleware/auth.js";
import { uniqueSlug, safeImageUrl } from "../utils/slug.js";
import { cleanImages } from "../utils/content.js";

const router = Router();
router.use(requireAuth, requirePermission("posts:manage"));

function parsePost(body: any) {
  const title = String(body?.title ?? "").trim();
  if (!title) return { error: "Vui lòng nhập tiêu đề" } as const;
  if (title.length > 200) return { error: "Tiêu đề tối đa 200 ký tự" } as const;

  return {
    data: {
      title,
      excerpt: String(body.excerpt ?? "").trim().slice(0, 300),
      content: String(body.content ?? "").slice(0, 50000),
      image: safeImageUrl(body.image),
      images: cleanImages(body.images),
      tag: String(body.tag ?? "").trim().slice(0, 50) || "Tin tức",
      author: String(body.author ?? "").trim().slice(0, 100) || "Quản trị viên",
      readTime: String(body.readTime ?? "").trim().slice(0, 30),
      featured: Boolean(body.featured),
      status: body.status === "published" ? ("published" as const) : ("draft" as const),
    },
  } as const;
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

  const slug = await uniqueSlug(Post, parsed.data.title);
  const post = await Post.create({
    ...parsed.data,
    slug,
    publishedAt: parsed.data.status === "published" ? new Date() : undefined,
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

  if (parsed.data.title !== post.title) {
    post.slug = await uniqueSlug(Post, parsed.data.title, post._id.toString());
  }
  if (parsed.data.status === "published" && !post.publishedAt) {
    post.publishedAt = new Date();
  }
  Object.assign(post, parsed.data);
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