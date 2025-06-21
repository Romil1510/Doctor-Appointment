import express from "express";
import { isAdminAunthentication, isPatientAunthentication } from "../controller/auth.js";
import { addAdmin, addNewDoctor, getAlldoctors, getUserDetails, login, logoutAdmin, logoutPatient, patientRegister } from "../controller/userController.js";

const router =express.Router();

router.post('/patient/register',patientRegister)
router.post('/login',login)
router.post("/admin/addnew",isAdminAunthentication,addAdmin)
router.get("/doctors",getAlldoctors)
router.get("/admin/me",isAdminAunthentication,getUserDetails)
router.get("/patient/me",isPatientAunthentication,getUserDetails)
router.get("/admin/logout",isAdminAunthentication,logoutAdmin)
router.get("/patient/logout",isPatientAunthentication,logoutPatient)
router.post("/doctor/addnew",isAdminAunthentication,addNewDoctor)

export default router;  