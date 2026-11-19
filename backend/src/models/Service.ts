import mongoose from "mongoose";
import { SERVICE_LAYOUTS } from "../utils/content.js";

const serviceSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true, trim: true, maxlength: 150 },
    desc: { type: String, trim: true, maxlength: 400, default: "" },
    image: { type: String, trim: true, default: "" },
    images: { type: [mongoose.Schema.Types.Mixed], default: [] },
    capacity: { type: String, trim: true, maxlength: 50, default: "" },
    points: { type: [String], default: [] },
    intro: { type: String, maxlength: 5000, default: "" },
    layout: { type: String, enum: [...SERVICE_LAYOUTS], default: "toc" },
    topics: { type: [mongoose.Schema.Types.Mixed], default: [] },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Service = mongoose.model("Service", serviceSchema);