import mongoose, { Schema } from "mongoose";

const VisitingAreaSchema = new Schema({
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

VisitingAreaSchema.index({status:1});
VisitingAreaSchema.index({code: 1,status:1});

export const VisitingArea = mongoose.model("VisitingArea", VisitingAreaSchema);
