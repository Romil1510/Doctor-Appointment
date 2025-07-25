import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name Is Required!"],
    minLength: [3, "First Name Must Contain At Least 3 Characters!"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name Is Required!"],
    minLength: [3, "Last Name Must Contain At Least 3 Characters!"],
  },
  email: {
    type: String,
    required: [true, "Email Is Required!"],
    validate: [validator.isEmail, "Provide A Valid Email!"],
  },
  phone: {
    type: String,
    required: [true, "Phone Is Required!"],
    minLength: [11, "Phone Number Must Contain Exact 11 Digits!"],
    maxLength: [11, "Phone Number Must Contain Exact 11 Digits!"],
  },
  nic: {
    type: String,
    required: [true, "NIC Is Required!"],
    minLength: [13, "NIC Must Contain Only 13 Digits!"],
    maxLength: [13, "NIC Must Contain Only 13 Digits!"],
  },
  dob: {
    type: Date,
    required: [true, "DOB Is Required!"],
  },
  gender: {
    type: String,
    required: [true, "Gender Is Required!"],
    enum: ["Male", "Female"],
  },
  appointment_date:{
    type:String,
    required:true,

  },
  department:{
    type:String,
    required:true,
 },
 doctor:{
firstName: {
    type: String,
    required: [true, "First Name Is Required!"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name Is Required!"],
  },
 },
 hasVisited:{
    type:Boolean,
    default:false

 },
 doctorId:{
    type:mongoose.Schema.ObjectId,
    required:true
 },
 patientId:{
    type:mongoose.Schema.ObjectId,
    required:true
 },
 address:{
    type:String,
    required:true,
 },
 status:{
    type:String,
    enum:["Pending","Accepted","Rejected"],
    default:"Pending",
 },

});

export const Appointment = mongoose.model("Appointment", appointmentSchema);

