import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    excerpt: { type: String, trim: true, maxlength: 300, default: "" },
    content: { type: String, default: "", maxlength: 50000 },
    conclusion: { type: String, default: "", maxlength: 5000 },
    image: { type: String, trim: true, default: "" },
    images: { type: [mongoose.Schema.Types.Mixed], default: [] },
    tag: { type: String, trim: true, maxlength: 50, default: "Tin tức" },
    author: { type: String, trim: true, maxlength: 100, default: "Quản trị viên" },
    readTime: { type: String, trim: true, maxlength: 30, default: "" },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);