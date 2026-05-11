import mongoose,{mongo, Schema} from "mongoose";

const VisitingAreaSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    code:{
        type: Number,
        required: true,
    }
});

export const VisitingArea = mongoose.model("VisitingArea", VisitingAreaSchema);