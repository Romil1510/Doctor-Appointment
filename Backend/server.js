import cloudinary from "cloudinary";
import app from './app.js';

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.listen(process.env.PORT,()=>{
    console.log(`server listening done ${process.env.PORT}`);
})