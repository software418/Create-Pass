import mongoose, { Schema } from "mongoose";

interface Iemployee {
  name: String,
  code: Number,
  department: String,
  status: String,
}

const EmployeeSchema = new Schema<Iemployee>({
  name: {
    type: String,
    required: true,
  },
  code: Number,
  department: {
    type: String,
    required: true,
  },
    status: {
    type: String,
    enum: ["active", "blocked","deleted"],
    default: "active",
  },
});
EmployeeSchema.index({status:1});
EmployeeSchema.index({department:1, status: 1});
EmployeeSchema.index({code:1});
export const Employee = mongoose.model("Employee", EmployeeSchema);
