import mongoose, { Schema } from "mongoose";

const EmployeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: Number,
  department: {
    type: String,
    required: true,
  },
});

export const Employee = mongoose.model("Employee", EmployeeSchema);
