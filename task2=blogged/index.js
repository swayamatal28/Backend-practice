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
const client=require("./client");


app.get("/home",async  (req, res) => {
    if (!req.user) {
        return res.redirect("/user/signin");  
    }
    const blog_cache=await client.get('pc');
    let blogs;
    if(blog_cache) {
        console.log("⚡ CACHE HIT");
        blogs=JSON.parse(blog_cache);
    }

    else {
        console.log("DB HIT");

        blogs = await Blog.find().populate("createdBy");
        await client.set("pc",JSON.stringify(blogs));
        await client.expire('pc',3);

    }
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
