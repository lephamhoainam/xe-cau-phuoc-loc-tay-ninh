import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Admin } from "../models/Admin.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body ?? {};
  if (!username || !password) {
    return res.status(400).json({ message: "Thiếu tên đăng nhập hoặc mật khẩu" });
  }

  const admin = await Admin.findOne({ username: String(username) });
  const ok = admin && admin.isActive && (await bcrypt.compare(String(password), admin.passwordHash));
  if (!ok) {
    return res.status(401).json({ message: "Sai tên đăng nhập hoặc mật khẩu" });
  }

  const token = jwt.sign(
    { id: admin._id.toString() },
    process.env.JWT_SECRET as string,
    { expiresIn: (process.env.JWT_EXPIRES ?? "7d") as jwt.SignOptions["expiresIn"] }
  );

  res.json({
    token,
    user: { username: admin.username, role: admin.role, permissions: admin.permissions },
  });
});

// Lấy thông tin tài khoản đang đăng nhập
router.get("/me", requireAuth, (_req, res) => {
  const a = res.locals.admin;
  res.json({ username: a.username, role: a.role, permissions: a.permissions });
});

export default router;