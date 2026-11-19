import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, maxlength: 200, default: "" },
    html: { type: String, default: "", maxlength: 50000 },
  },
  { _id: false }
);

const guideSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    tag: { type: String, trim: true, maxlength: 80, default: "" }, // chuyên mục
    summary: { type: String, trim: true, maxlength: 500, default: "" },
    author: { type: String, trim: true, maxlength: 100, default: "Quản trị viên" },
    readTime: { type: Number, min: 1, max: 120, default: 5 }, // phút
    sections: { type: [sectionSchema], default: [] },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

export const Guide = mongoose.model("Guide", guideSchema);