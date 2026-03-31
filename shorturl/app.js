const express=require("express");
const app=express();
const PORT=3001;
const path=require("path"); 
const mongoose=require("mongoose");
app.set('view engine',"ejs");
app.set('views',path.resolve("./views"));
const urlRoute=require("./routes/url");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/url",urlRoute);
mongoose.connect("mongodb://localhost:27017/shorturl").then(()=>{
    console.log('Connected-db');
});

app.get("/",(req,res)=>{
   return res.render("home");
})

app.listen(PORT,()=>{
    console.log('started');
})