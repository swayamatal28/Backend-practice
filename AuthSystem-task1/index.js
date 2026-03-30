const express=require('express');
const app=express();//this is instance of express
const port=3000;
const path=require("path");
const mongoose=require('mongoose');
const User=require('./models/user');
const {checkauth}=require("./middleware/user")
const cookieParser=require("cookie-parser");

app.use(cookieParser());

mongoose.connect("mongodb://127.0.0.1:27017/task1").then(e=>console.log('connected with the database'));
app.use(express.urlencoded({extended:false}));
app.use(checkauth("token"));
app.set('view engine','ejs');
app.set('views',path.resolve("./views"));
app.get("/",(req,res)=>{
    res.render("home",{
        user:req.user,
    })
});
app.get("/signup",(req,res)=>{
    res.render("signup");
});
app.get("/signin",(req,res)=>{
    res.render("signin");
});

app.post("/signin",async (req,res)=>{
    const {email,password}=req.body;
    try{
        const token=await User.matchPassAndGiveMeToken(email,password);
        console.log(token);
        return res.cookie("token",token).redirect("/");
    }
    catch(error){
        return res.render('signin',{
            error:"Incorrect email or password",
        });
    }
})

app.post("/signup",async (req,res)=>{
    console.log(req.body);
    const {name,email,password}=req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect("/");
});

app.get("/logout",(req,res)=>{
    res.clearCookie("token").redirect("/");
})


app.listen(3000,()=>{
    console.log('Server started');
});