//using multer
const multer=require("multer");
const fs=require("fs");
require("dotenv").config();
const cloudinary=require("cloudinary").v2;
const path=require("path");
const express=require("express");
const app=express();

cloudinary.config({
    cloud_name:'dw4kt4tiu',
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,   
    
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname)
    }
})
//in multer, we temporarily takes the file from the user and then we store it temprarily the upload and eventually we unlink it after the upload

//refer both app.js and app2.js and see the difference in approach

const upload= multer({storage:storage}); 
const uploadOnCloudinary= async (localFilePath)=>{
    try{
        if(!localFilePath)  return null;
        //upload the file on cloudinary;
        const res=await cloudinary.uploader.upload(localFilePath,{
            resource_type:'auto',
        });
        console.log('uploaded ',res.url);
        return res;
    }
    catch(error){
        //if we hit error, that means the file may be corrupted , so we unlink/delete the file from our server
        fs.unlinkSync(localFilePath);
        console.error('fail')
        console.error(err);
        return null;
    }
}

app.post("/upload", upload.single("image"), async (req, res) => {
    try {
        const localPath = req.file?.path;

        if (!localPath) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const uploaded = await uploadOnCloudinary(localPath);

        if (!uploaded) {
            return res.status(500).json({ message: "Upload failed" });
        }

        res.status(200).json({
            message: "Success",
            url: uploaded.secure_url,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});