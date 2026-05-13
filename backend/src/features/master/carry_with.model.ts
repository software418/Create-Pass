import mongoose, { Schema } from "mongoose";

export const STATUS = {
  ACTIVE: "active",
  BLOCK: "blocked",
  DELETE: "deleted",
};
const CarryWithSchema = new Schema({
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
CarryWithSchema.index({ status: 1 });
export const CarryWith = mongoose.model("CarryWith", CarryWithSchema);
