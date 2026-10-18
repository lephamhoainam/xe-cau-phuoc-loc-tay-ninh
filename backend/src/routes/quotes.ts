import { Router } from "express";
import { Quote } from "../models/Quote.js";

const router = Router();

// Khách gửi yêu cầu báo giá (công khai)
router.post("/", async (req, res) => {
  const { name, phone, craneType, location, note } = req.body ?? {};

  if (!name || !phone) {
    return res.status(400).json({ message: "Vui lòng nhập tên và số điện thoại" });
  }

  const phoneOk = /^(0|\+84)\d{9,10}$/.test(String(phone).replace(/\s/g, ""));
  if (!phoneOk) {
    return res.status(400).json({ message: "Số điện thoại không hợp lệ" });
  }

  try {
    const quote = await Quote.create({ name, phone, craneType, location, note });
    res.status(201).json({ message: "Đã nhận yêu cầu", id: quote._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
});

export default router;