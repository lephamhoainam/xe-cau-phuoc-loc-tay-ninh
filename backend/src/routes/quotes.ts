import { Router } from "express";
import rateLimit from "express-rate-limit";
import { Quote } from "../models/Quote.js";
import { cleanText, checkText, checkPhone } from "../utils/validate.js";

const router = Router();

const quoteLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 phút
  max: 5, // tối đa 5 yêu cầu mỗi IP
  message: { message: "Bạn gửi quá nhiều yêu cầu, vui lòng thử lại sau" },
});

// Khách gửi yêu cầu báo giá (công khai)
router.post("/", quoteLimiter, async (req, res) => {
  const name = cleanText(req.body?.name);
  const phone = cleanText(req.body?.phone);
  const craneType = cleanText(req.body?.craneType);
  const location = cleanText(req.body?.location);
  const note = cleanText(req.body?.note);

  const err =
    checkText(name, "Họ tên", { min: 2, max: 100 }) ??
    checkPhone(phone) ??
    checkText(craneType, "Loại xe", { max: 100, required: false }) ??
    checkText(location, "Địa điểm", { max: 200, required: false }) ??
    checkText(note, "Ghi chú", { max: 1000, required: false });
  if (err) return res.status(400).json({ message: err });

  try {
    const quote = await Quote.create({ name, phone, craneType, location, note });
    res.status(201).json({ message: "Đã nhận yêu cầu", id: quote._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
});

export default router;