import { Router } from "express";
import mongoose from "mongoose";
import { Quote } from "../models/Quote.js";
import { requireAuth, requirePermission } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);

const STATUSES = ["new", "contacted", "done"];

// Xem danh sách: lọc theo trạng thái, tìm theo tên/SĐT, phân trang
router.get("/", requirePermission("quotes:read"), async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 20));
  const { status, q } = req.query;

  const filter: Record<string, unknown> = {};
  if (typeof status === "string" && STATUSES.includes(status)) {
    filter.status = status;
  }
  if (typeof q === "string" && q.trim()) {
    const keyword = q.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    filter.$or = [
      { name: { $regex: keyword, $options: "i" } },
      { phone: { $regex: keyword, $options: "i" } },
    ];
  }

  const [items, total] = await Promise.all([
    Quote.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Quote.countDocuments(filter),
  ]);

  res.json({ items, total, page, pages: Math.ceil(total / limit) });
});

// Đổi trạng thái
router.patch("/:id", requirePermission("quotes:update"), async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "ID không hợp lệ" });
  }
  const { status } = req.body ?? {};
  if (!STATUSES.includes(status)) {
    return res.status(400).json({ message: "Trạng thái không hợp lệ" });
  }
  const quote = await Quote.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!quote) return res.status(404).json({ message: "Không tìm thấy yêu cầu" });
  res.json(quote);
});

// Xóa
router.delete("/:id", requirePermission("quotes:delete"), async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "ID không hợp lệ" });
  }
  const quote = await Quote.findByIdAndDelete(req.params.id);
  if (!quote) return res.status(404).json({ message: "Không tìm thấy yêu cầu" });
  res.json({ message: "Đã xóa" });
});

export default router;