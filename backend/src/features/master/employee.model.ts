import mongoose, { Schema } from "mongoose";

interface Iemployee {
  name: String;
  employeeId: String;
  department: String;
  designation: String;
  email: String;
  phone: String;
  status: String;
}
export const STATUS = {
  ACTIVE: "active",
  BLOCK: "blocked",
  DELETE: "deleted",
};
const EmployeeSchema = new Schema<Iemployee>({
  name: {
    type: String,
    required: true,
  },
  employeeId: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  designation: String,
  email: String,
  phone: String,
  status: {
    type: String,
    enum: Object.values(STATUS),
    default: STATUS.ACTIVE,
  },
});
EmployeeSchema.index({ status: 1 });
EmployeeSchema.index({ department: 1, status: 1 });
EmployeeSchema.index({ code: 1 });
export const Employee = mongoose.model("Employee", EmployeeSchema);
