import mongoose,{Schema} from 'mongoose';

const CarryWithSchema = new Schema({
    name:{
        type:String,
        required: true,
    },
    code: {
        type: Number,
        required: true,
    }
})