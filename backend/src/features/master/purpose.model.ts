import mongoose,{Schema} from "mongoose";

 const PurposeSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    code:{
        type:Number,
        required: true,
    }
 });

 export const Purpose = mongoose.model("Purpose",PurposeSchema);