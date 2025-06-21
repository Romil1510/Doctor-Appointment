import cloudinary from "cloudinary";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";

export const patientRegister = catchAsyncErrors(async(req,res,next)=>{
    const{firstName,lastName,email,gender,phone,password,dob,nic,role}=req.body;

    if(
        !firstName||!lastName||!email||!gender||!phone||!password||!dob||!nic||!role
    ){
        return res.status(400).json({message:"Please fill all the fields"});
    }
    let user = await User.findOne({email});
    if(user){
        return res.status(400).json({message:"Email already exists"});
    }
    user = await User.create({firstName,lastName,email,gender,phone,password,dob,nic,role});
    generateToken(user,"User create successfully",200,res)
    

})

// export const login = catchAsyncErrors(async(req,res,next)=>{
//     const {email,password,confirmPassword,role}=req.body;
//     if(!email||!password||!confirmPassword||!role){
//         return res.status(400).json({message:"Please fill all the fields"});
//     }
//     if(password!==confirmPassword){
//         return res.status(400).json({message:"Passwords do not match"});
//     }
//     const user = await User.findOne({email}).select("+password");
//     if(!user){
//         return res.status(400).json({message:"Email does not exist"});
//     }
//     const isPassowrdMatch = await user.comparePassword(password);
//     if(!isPassowrdMatch){
//         return res.status(400).json({message:"Password is incorrect"});
//     }
//     if (role!==user.role){
//         return res.status(400).json({message:"You are not authorized to login"});
//     }
//     res.status(200),json({
//         message:"User logged in successfully",
//     })

// });

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;
  if (!email || !password || !confirmPassword || !role) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("Password & Confirm Password Do Not Match!", 400)
    );
  }
const user = await User.findOne({email}).select("+password");
     if(!user){
         return res.status(400).json({message:"Email does not exist"});
     }

  const isPasswordMatch = await user.comparePassword(password);
     if(!isPasswordMatch){
         return res.status(400).json({message:"Password is incorrect"});
     }
 if (role!==user.role){
        return res.status(400).json({message:"You are not authorized to login"});
    }
   
  generateToken(user, "Login Successfully!", 201, res);

});

export const addAdmin=catchAsyncErrors(async(req,res,next)=>{
   const{firstName,lastName,email,gender,phone,password,dob,nic}=req.body;
if(
        !firstName||!lastName||!email||!gender||!phone||!password||!dob||!nic
    ){
        return res.status(400).json({message:"Please fill all the fields"});
    }
    const isRegistered= await User.findOne({email})
    if(isRegistered){
      return res.status(400).json({message:"Already exist"})
    }
    const admin=await User.create({firstName,lastName,email,gender,phone,password,dob,nic,role:"Admin"});

res.status(200).json({
  message:"success registered ADMIN"
})
  })

export const getAlldoctors=catchAsyncErrors(async(req,res,next)=>{

  const doctors=await User.find({role:"Doctor"})
  res.status(200).json({
    success:true,
    doctors
  })
})

export const getUserDetails=catchAsyncErrors(async(req,res,next)=>{
  const user=req.user
  res.status(200).json({
    success:true,
    user
  })

})

export const logoutAdmin=catchAsyncErrors(async(req,res,next)=>{
  res.status(200).cookie("adminToken","",{
    httpOnly:true,
    expires:new Date(Date.now())
  }).json({
    success:true,
    message:"User Logged Out"
  })
});


export const logoutPatient=catchAsyncErrors(async(req,res,next)=>{
  res.status(200).cookie("patientToken","",{
httpOnly:true,
expires:new Date(Date.now())
  }).json({
    success:true,
    message:"User Logged Out "
  })
})

export const addNewDoctor =catchAsyncErrors(async(req,res,next)=>{
  if(!req.files || Object.keys(req.files).length==0){
    return res.status(400).json({
      message:"Doctor avtar required"
    })
  }
  const {docAvatar}=req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp", "image/jpg"];

if (!allowedFormats.includes(docAvatar.mimetype)) {
  return res.status(400).json({
    message: "File Format Not Supported"
  });
}
  const{firstName,lastName,email,gender,phone,password,dob,nic,doctorDepartment}=req.body;

  if((!firstName||!lastName||!email||!gender||!phone||!password||!dob||!nic||!doctorDepartment)){
    return res.status(400).json({
      message:"Field Required"
    })

    const isRegistered=await User.findOne({email})
    if(isRegistered){
      return res.status(400).json({
        message:"Already Registered this email"
      })
    };
  }
  
  const cloudinaryResponse=await cloudinary.uploader.upload(
    docAvatar.tempFilePath
  );
  if(!cloudinaryResponse || cloudinaryResponse.error){
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Error"
    );
  }
  const doctor = await User.create({
    firstName,lastName,email,gender,phone,password,dob,nic,doctorDepartment,role:"Doctor",docAvatar:{
      public_id:cloudinaryResponse.public_id,
      url:cloudinaryResponse.secure_url,
    },
  });
 res.status(200).json({
  success:true,
  message:"New Doctor Registered"
 })

})