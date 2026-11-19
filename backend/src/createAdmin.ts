import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { connectDB } from "./db.js";
import { Admin } from "./models/Admin.js";

const [username, password] = process.argv.slice(2);

if (!username || !password || password.length < 8) {
  console.error("Cách dùng: npm run create-admin -- <username> <password (>= 8 ký tự)>");
  process.exit(1);
}

async function main() {
  await connectDB();
  const passwordHash = await bcrypt.hash(password, 10);
  await Admin.create({ username, passwordHash, role: "superAdmin" });
  console.log("Đã tạo superAdmin:", username);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});