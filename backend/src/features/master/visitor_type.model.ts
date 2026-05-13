import mongoose, { Schema } from "mongoose";
export const STATUS = {
  ACTIVE: "active",
  BLOCK: "blocked",
  DELETE: "deleted",
};
const VisitorTypeSchema = new Schema({
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

VisitorTypeSchema.index({ status: 1 });
VisitorTypeSchema.index({ code: 1, status: 1 });

export const VisitorType = mongoose.model("VisitorType", VisitorTypeSchema);
