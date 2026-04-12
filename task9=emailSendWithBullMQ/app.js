const express=require("express");
const port=3000;
const path=require("path");
const app=express();
const emailRoute=require("./routes/email");
app.set('view engine','ejs');
app.set('views',path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/email-send",emailRoute);

app.get("/",(req,res)=>{
    res.render("home");
})

app.listen(port,()=>{
    console.log('server started,');
})