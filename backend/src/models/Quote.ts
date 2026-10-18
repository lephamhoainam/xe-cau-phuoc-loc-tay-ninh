import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    phone: { type: String, required: true, trim: true, maxlength: 20 },
    craneType: { type: String, trim: true, maxlength: 100 },
    location: { type: String, trim: true, maxlength: 200 },
    note: { type: String, trim: true, maxlength: 1000 },
    status: {
      type: String,
      enum: ["new", "contacted", "done"],
      default: "new",
    },
  },
  { timestamps: true }
);

export const Quote = mongoose.model("Quote", quoteSchema);