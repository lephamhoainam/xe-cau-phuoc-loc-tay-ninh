import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import { connectDB } from "./db.js";
import quotesRouter from "./routes/quotes.js";

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