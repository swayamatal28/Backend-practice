const express=require("express");
const app=express();
const PORT=3000;
const path=require("path");
const cookieParser=require("cookie-parser");
const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/blogged").then(e=> console.log('Connect with the db'));
app.set('view engine','ejs');
app.set('views',path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const userRoute=require("./routes/user");
const {checkforauth}=require("./middlewares/user");
const blogRoute=require("./routes/blog");
app.use(checkforauth("token"));
app.use(express.static(path.resolve('./public')));
const Blog = require("./models/blog");

app.get("/home",async  (req, res) => {
    if (!req.user) {
        return res.redirect("/user/signin");  
    }
    const blogs = await Blog.find().populate("createdBy");
    return res.render("home", {
        user: req.user,  
        blogs,
    });
});

app.get('/',(req,res)=>{
    res.render("basic");
})
app.use("/user",userRoute);
app.use("/blog",blogRoute);

app.listen(PORT,()=> console.log('server started'));
