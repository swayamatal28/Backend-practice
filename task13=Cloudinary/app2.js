//THIS IS FOR UPLOADING VIDEO
require("dotenv").config();
const cloudinary=require("cloudinary").v2;
cloudinary.config({
    cloud_name:'dw4kt4tiu',
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,   
    
})