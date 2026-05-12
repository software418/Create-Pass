import mongoose, { mongo, Schema } from "mongoose";

const CarryWithSchema = new Schema({
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
CarryWithSchema.index({status: 1});
export const CarryWith = mongoose.model("CarryWith", CarryWithSchema);
