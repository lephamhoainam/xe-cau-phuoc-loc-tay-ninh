import mongoose from "mongoose";
import { PERMISSIONS } from "../permissions.js";

const adminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["superAdmin", "staff"], default: "staff" },
    permissions: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Admin = mongoose.model("Admin", adminSchema);