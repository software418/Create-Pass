import mongoose, { Schema } from "mongoose";
export const STATUS = {
  ACTIVE: "active",
  BLOCK: "blocked",
  DELETE: "deleted",
};
const VisitingAreaSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  floor: {
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

VisitingAreaSchema.index({ status: 1 });
VisitingAreaSchema.index({ code: 1, status: 1 });

export const VisitingArea = mongoose.model("VisitingArea", VisitingAreaSchema);
