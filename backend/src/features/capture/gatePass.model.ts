import mongoose from "mongoose";
import { required } from "zod/mini";

const gatePassSchema = new mongoose.Schema({
    passType:{
        type: String,
        required: true,
        enum: ['single', 'multiple']
    },
    passDate: {
        type: Date,
        required: true  
        },
    companyName: {
        type: String,
        required: true
    },
   state: {
    type: String,
    required: true  
    },  
    city: {
        type: String,
        required: true      
        },
    purpose: {
        type: String,
        required: true
    },
    visitorType: {
        type: String,
        required: true,
        enum: ['employee', 'contractor', 'visitor']
    },
    location: {
        type: String,
        required: true
    },
    exployee:{
        type: String,

    },
    carryWith: {
        type: String
    },
    idType: {
        type: String,
        required: true,
    },
    idNumber: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    maskCovid: {
        type: String
    },
    noOfPersone: {
        type: String
    },
    visitingArea: {
        type: String,

    },
    allowedHour: {
         type: String,
         required: true
    },
    

});

const GatePass = mongoose.model("GatePass", gatePassSchema);
export default GatePass;
