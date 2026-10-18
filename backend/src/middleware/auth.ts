import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Admin } from "../models/Admin.js";
import type { Permission } from "../permissions.js";

// Bắt buộc đăng nhập, gắn tài khoản vào res.locals.admin
export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) {
    return res.status(401).json({ message: "Chưa đăng nhập" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    const admin = await Admin.findById(payload.id);
    if (!admin || !admin.isActive) {
      return res.status(401).json({ message: "Tài khoản không tồn tại hoặc đã bị khóa" });
    }
    res.locals.admin = admin;
    next();
  } catch {
    res.status(401).json({ message: "Phiên đăng nhập không hợp lệ hoặc đã hết hạn" });
  }
}

// Yêu cầu có một quyền cụ thể (superAdmin luôn qua)
export function requirePermission(permission: Permission) {
  return (_req: Request, res: Response, next: NextFunction) => {
    const admin = res.locals.admin;
    if (admin.role === "superAdmin" || admin.permissions.includes(permission)) {
      return next();
    }
    res.status(403).json({ message: "Bạn không có quyền thực hiện thao tác này" });
  };
}

// Chỉ superAdmin
export function requireSuperAdmin(_req: Request, res: Response, next: NextFunction) {
  if (res.locals.admin.role !== "superAdmin") {
    return res.status(403).json({ message: "Chỉ superAdmin mới được thực hiện" });
  }
  next();
}