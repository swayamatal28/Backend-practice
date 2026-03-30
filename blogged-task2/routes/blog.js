const { Router } = require("express");
const Blog = require("../models/blog");
const router = Router();
const multer = require("multer");
const path=require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/uploads`));
    },
    filename: function (req, file, cb) {
        const fileName=`${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    },
});
const upload=multer({storage:storage});
router.get("/add-blog", (req, res) => {
    return res.render('addblog')
})
router.post("/add-blog", upload.single("cover"),async (req, res) => {
    const {title,body}=req.body;
    const blog=await Blog.create({
        body,
        title,
        createdBy:req.user._id,
        cover: `/uploads/${req.file.filename}`,
    });
    return res.redirect(`/blog/${blog._id}`)
});
router.get("/:id",async(req,res)=>{
    const blog=await Blog.findById(req.params.id).populate("createdBy");

    return res.render("blog",{
        user:req.user,
        blog,
    });
})
module.exports = router;