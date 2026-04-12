const express=require("express");
const router =express.Router();
const workingQueue=require("../queue/email");

router.post("/",async (req,res)=>{
    const {email,message}=req.body;
    await workingQueue.add(`email for ${email}`,{
        email,
        message,
    })
    res.send('added to queue');
});

module.exports=router;