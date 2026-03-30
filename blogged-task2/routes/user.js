const {Router}=require('express');
const User=require("../models/user");
const router=Router();

router.get("/signin",(req,res)=>{
    return res.render('signin');
})
router.get("/signup",(req,res)=>{
    return res.render('signup');
})

router.get("/logout",(req,res)=>{
    return res.clearCookie("token").redirect("/");
})

router.post("/signup",async (req,res)=>{
    const {name,email,password}=req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect("/user/signin");
})

router.post("/signin",async (req,res)=>{
    //signin 
    const {email,password}=req.body;
    try{
        const token=await User.match(email,password);
        return res.cookie("token",token).redirect("/home");
    }
    catch(error){
        return res.render("signin",{
            error:"Incorrect password",
        });
    }
})

module.exports=router;