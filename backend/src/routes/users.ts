import { Router } from "express";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { Admin } from "../models/Admin.js";
import { requireAuth, requireSuperAdmin } from "../middleware/auth.js";
import { PERMISSIONS } from "../permissions.js";

const router = Router();
router.use(requireAuth, requireSuperAdmin);

const validPermissions = (list: unknown): list is string[] =>
  Array.isArray(list) && list.every((p) => (PERMISSIONS as readonly string[]).includes(p));

// Danh sách quyền có thể cấp (để frontend vẽ checkbox)
router.get("/permissions", (_req, res) => {
  res.json(PERMISSIONS);
});

// Danh sách tài khoản
router.get("/", async (_req, res) => {
  const users = await Admin.find().select("-passwordHash").sort({ createdAt: -1 });
  res.json(users);
});

// Tạo tài khoản staff
router.post("/", async (req, res) => {
  const { username, password, permissions = [] } = req.body ?? {};

  if (typeof username !== "string" || username.trim().length < 3) {
    return res.status(400).json({ message: "Tên đăng nhập tối thiểu 3 ký tự" });
  }
  if (typeof password !== "string" || password.length < 8) {
    return res.status(400).json({ message: "Mật khẩu tối thiểu 8 ký tự" });
  }
  if (!validPermissions(permissions)) {
    return res.status(400).json({ message: "Danh sách quyền không hợp lệ" });
  }
  if (await Admin.exists({ username: username.trim() })) {
    return res.status(409).json({ message: "Tên đăng nhập đã tồn tại" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await Admin.create({
    username: username.trim(),
    passwordHash,
    role: "staff",
    permissions,
  });
  res.status(201).json({ id: user._id, username: user.username });
});

// Sửa quyền, khóa/mở khóa, đặt lại mật khẩu
router.patch("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "ID không hợp lệ" });
  }
  const user = await Admin.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "Không tìm thấy tài khoản" });
  if (user.role === "superAdmin") {
    return res.status(403).json({ message: "Không sửa superAdmin qua API" });
  }

  const { permissions, isActive, password } = req.body ?? {};

  if (permissions !== undefined) {
    if (!validPermissions(permissions)) {
      return res.status(400).json({ message: "Danh sách quyền không hợp lệ" });
    }
    user.permissions = permissions;
  }
  if (isActive !== undefined) user.isActive = Boolean(isActive);
  if (password !== undefined) {
    if (typeof password !== "string" || password.length < 8) {
      return res.status(400).json({ message: "Mật khẩu tối thiểu 8 ký tự" });
    }
    user.passwordHash = await bcrypt.hash(password, 10);
  }

  await user.save();
  res.json({ message: "Đã cập nhật" });
});

// Xóa tài khoản staff
router.delete("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "ID không hợp lệ" });
  }
  const user = await Admin.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "Không tìm thấy tài khoản" });
  if (user.role === "superAdmin") {
    return res.status(403).json({ message: "Không xóa superAdmin qua API" });
  }
  await user.deleteOne();
  res.json({ message: "Đã xóa" });
});

export default router;