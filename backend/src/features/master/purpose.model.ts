import mongoose, { Schema } from "mongoose";
export const STATUS = {
  ACTIVE: "active",
  BLOCK: "blocked",
  DELETE: "deleted",
};
const PurposeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(STATUS),
    default: STATUS,
  },
});

PurposeSchema.index({ status: 1 });
PurposeSchema.index({ code: 1, status: 1 });

export const Purpose = mongoose.model("Purpose", PurposeSchema);
