import mongoose,{Schema} from "mongoose";
import { required } from "zod/mini";

const VisitorTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: Number,
        required: true,
    }
});

export const VisitorType = mongoose.model("VisitorType", VisitorTypeSchema);