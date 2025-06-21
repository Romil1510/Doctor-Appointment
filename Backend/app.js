
import express from "express";

import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv';
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbconnection.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import appoinmentRouter from "./router/appoinmentRouter.js";
import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";

const app=express();
dotenv.config({ path: './config/config.env' });

app.use(cors({
    origin: [process.env.FRONTEND_URL,process.env.BACKEND_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
}))

app.use("/api/v1/message",messageRouter)
app.use("/api/v1/user",userRouter)
app.use("/api/v1/appoinment",appoinmentRouter)

dbConnection();


app.use(errorMiddleware)
export default app;