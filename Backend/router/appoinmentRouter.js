import express from "express";
import { deleteAppointmentv, getAllAppointments, postAppointment, updateAppointmentStatus } from "../controller/appoinmentController.js";
import { isAdminAunthentication, isPatientAunthentication } from "../controller/auth.js";

const router = express.Router();

router.post("/post",isPatientAunthentication,postAppointment)
router.get("/getall",isAdminAunthentication,getAllAppointments)
router.put("/update/:id",isAdminAunthentication,updateAppointmentStatus)
router.delete("/delete/:id",isAdminAunthentication,deleteAppointmentv)

export default router;