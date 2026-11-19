import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import { connectDB } from "./db.js";
import quotesRouter from "./routes/quotes.js";
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";
import adminQuotesRouter from "./routes/adminQuotes.js";
import publicContentRouter from "./routes/publicContent.js";
import adminPostsRouter from "./routes/adminPosts.js";
import adminServicesRouter from "./routes/adminService.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") ?? ["http://localhost:3000"],
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/quotes", quotesRouter);
app.use("/api/auth", authRouter);
app.use("/api/admin/users", usersRouter);
app.use("/api/admin/quotes", adminQuotesRouter);
app.use("/api", publicContentRouter);
app.use("/api/admin/posts", adminPostsRouter);
app.use("/api/admin/services", adminServicesRouter);
const port = Number(process.env.PORT ?? 4000);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`API chạy tại http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Không kết nối được MongoDB:", err.message);
    process.exit(1);
  });