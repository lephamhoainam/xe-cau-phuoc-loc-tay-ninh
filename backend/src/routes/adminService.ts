import { Router } from "express";
import mongoose from "mongoose";
import { Service } from "../models/Service.js";
import { requireAuth, requirePermission } from "../middleware/auth.js";
import { uniqueSlug, safeImageUrl } from "../utils/slug.js";
import { cleanImages, cleanStringList, cleanTopics, SERVICE_LAYOUTS } from "../utils/content.js";

const router = Router();
router.use(requireAuth, requirePermission("services:manage"));

function parseService(body: any) {
  const title = String(body?.title ?? "").trim();
  if (!title) return { error: "Vui lòng nhập tên dịch vụ" } as const;
  if (title.length > 150) return { error: "Tên tối đa 150 ký tự" } as const;

  const order = Number(body.order);
  return {
    data: {
      title,
      desc: String(body.desc ?? "").trim().slice(0, 400),
      image: safeImageUrl(body.image),
      images: cleanImages(body.images),
      capacity: String(body.capacity ?? "").trim().slice(0, 50),
      points: cleanStringList(body.points, 10, 200),
      intro: String(body.intro ?? "").slice(0, 5000),
      layout: (SERVICE_LAYOUTS as readonly string[]).includes(body.layout) ? body.layout : "toc",
      topics: cleanTopics(body.topics),
      order: Number.isFinite(order) ? order : 0,
      isActive: body.isActive === undefined ? true : Boolean(body.isActive),
    },
  } as const;
}

router.get("/", async (_req, res) => {
  const items = await Service.find().select("-topics -intro").sort({ order: 1, createdAt: 1 });
  res.json(items);
});

router.get("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "ID không hợp lệ" });
  }
  const item = await Service.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Không tìm thấy dịch vụ" });
  res.json(item);
});

router.post("/", async (req, res) => {
  const parsed = parseService(req.body);
  if ("error" in parsed) return res.status(400).json({ message: parsed.error });

  const slug = await uniqueSlug(Service, parsed.data.title);
  const item = await Service.create({ ...parsed.data, slug });
  res.status(201).json(item);
});

router.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "ID không hợp lệ" });
  }
  const parsed = parseService(req.body);
  if ("error" in parsed) return res.status(400).json({ message: parsed.error });

  const item = await Service.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Không tìm thấy dịch vụ" });

  if (parsed.data.title !== item.title) {
    item.slug = await uniqueSlug(Service, parsed.data.title, item._id.toString());
  }
  Object.assign(item, parsed.data);
  await item.save();
  res.json(item);
});

router.delete("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "ID không hợp lệ" });
  }
  const item = await Service.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: "Không tìm thấy dịch vụ" });
  res.json({ message: "Đã xóa" });
});

export default router;