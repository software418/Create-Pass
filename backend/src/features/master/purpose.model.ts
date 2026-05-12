import mongoose, { Schema } from "mongoose";

const PurposeSchema = new Schema({
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

PurposeSchema.index({status: 1});
PurposeSchema.index({code:1, status:1});

export const Purpose = mongoose.model("Purpose", PurposeSchema);
