import mongoose from "mongoose"
import validator from "validator"

const messageSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,"At least 3 character"]
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3,"At least 3 character"]
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"Please Provide A Valid Email"]
    },
    phone:{
        type:String,
        required:true,
        minLength:[10,"At least 10 digit"],
        maxLength:[11,"At most 11 digit"]
    },
    message:{
        type:String,
        required:true,
        minLength:[10,"At least 10 character"]
    },
})

export const Message = mongoose.model("Message",messageSchema)  //exporting the model to use in other