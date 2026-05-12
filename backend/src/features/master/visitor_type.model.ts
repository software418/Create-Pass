import mongoose, { Schema } from "mongoose";
import { required } from "zod/mini";

const VisitorTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "blocked","deleted"],
    default: "active",
  },
});

VisitorTypeSchema.index({status:1});
VisitorTypeSchema.index({code:1, status:1});

export const VisitorType = mongoose.model("VisitorType", VisitorTypeSchema);
