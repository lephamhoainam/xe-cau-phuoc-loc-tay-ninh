import { Router } from "express";
import { Post } from "../models/Post.js";
import { Service } from "../models/Service.js";

const router = Router();

router.get("/posts", async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 10));
  const filter: Record<string, unknown> = { status: "published" };
  if (typeof req.query.tag === "string" && req.query.tag) {
    filter.tag = req.query.tag;
  }

  const [items, total] = await Promise.all([
    Post.find(filter)
      .select("-content")
      .sort({ featured: -1, publishedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Post.countDocuments(filter),
  ]);
  res.json({ items, total, page, pages: Math.ceil(total / limit) });
});

router.get("/posts/:slug", async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug, status: "published" });
  if (!post) return res.status(404).json({ message: "Không tìm thấy bài viết" });
  res.json(post);
});

router.get("/services", async (_req, res) => {
  const items = await Service.find({ isActive: true })
    .select("-topics -intro")
    .sort({ order: 1, createdAt: 1 });
  res.json(items);
});

router.get("/services/:slug", async (req, res) => {
  const item = await Service.findOne({ slug: req.params.slug, isActive: true });
  if (!item) return res.status(404).json({ message: "Không tìm thấy dịch vụ" });
  res.json(item);
});

export default router;