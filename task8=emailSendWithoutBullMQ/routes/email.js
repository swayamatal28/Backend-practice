const express=require("express");
const router=express.Router();
const queue=require("../queue/emailQueue");

router.post("/",(req,res)=>{
    const {email,message}=req.body;
    const job={
        id:Date.now(),
        email,
        message,
    };
    queue.push(job);
    console.log("Job Added!", job);
    res.send('Email sent successfully!');
})

module.exports=router;