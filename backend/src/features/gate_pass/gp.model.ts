import mongoose, { Schema } from "mongoose";

const PersonDetailSchema = new Schema(
  {
    name: { type: String, required: true },
    phoneNo: { type: String, required: true },
    aadharNumber: { type: String, required: true },
    aadharFileUrl: { type: String, default: "" }, // URL set by the service after saving the file
  },
  { _id: false }
);

const FormDataSchema = new Schema(
  {
    gatePassType: { type: String, enum: ["single", "multi"], required: true },
    passDate: { type: Date, required: true },
    mobileNo: { type: String, required: true, index: true },
    name: { type: String, required: true },
    emailId: { type: String, required: true },
    companyName: String,
    address: String,
    state: String,
    city: String,
    representingVisitorType: String,
    subLocation: String,
    toMeetWith: String,
    carryWith: {
      mobile: { type: Boolean, default: false },
      laptop: { type: Boolean, default: false },
      pendrive: { type: Boolean, default: false },
      camera: { type: Boolean, default: false },
    },
    idType: String,
    idNumber: String,
    description: String,
    maskCovid: { type: String, enum: ["yes", "no", ""], default: "" },
    noOfPerson: { type: Number, default: 0 },
    persons: [PersonDetailSchema],
    visitArea: [String],
    purpose: String,
    allowedHours: String,
    photoUrl: { type: String, default: "" }, // Visitor webcam photo URL
  },
  { timestamps: true }
);

export const FormData = mongoose.model("FormData", FormDataSchema);