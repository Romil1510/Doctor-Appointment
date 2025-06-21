import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import { Message } from "../models/messageSchema.js";
import { User } from "../models/userSchema.js";

export const sendMessage = catchAsyncErrors(async(req,res,next)=>{
    const {firstName,lastName,email,phone,message}=req.body;
    if(!firstName || !lastName || !email || !phone || !message){
        return res.status(400).json({
            message:"Please fill all the fields",
            success:false
        })
    }
        await Message.create({firstName,lastName,email,phone,message});
        res.status(201).json({
            message:"Message sent successfully",
        });
    
})

export const getAllMessages= catchAsyncErrors(async(req,res,next)=>{
    const messages= await User.find();
    res.status(200).json({
        success:true,
        messages,
    })
})