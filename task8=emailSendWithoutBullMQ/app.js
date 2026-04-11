const express=require("express");
const port=3000;
const path=require("path");
const app=express();
app.set('view engine',"ejs")
const emailRoute=require("./routes/email");


require("./worker/emailWorker");

app.set('views',path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/email-send",emailRoute);
app.get("/",(req,res)=>{
    res.render("home");
})

app.listen(port,()=>{
    console.log('Server started!');
})