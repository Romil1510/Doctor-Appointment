import express from "express";
import { isAdminAunthentication } from "../controller/auth.js";
import { getAllMessages, sendMessage } from "../controller/messageController.js";

const router = express.Router();

router.post("/send",sendMessage);
router.get("/getall",isAdminAunthentication,getAllMessages)

export default router;  //export the router to use it in other files