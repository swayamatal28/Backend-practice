const  express=require("express");
const router=express.Router();
const URL=require("../models/url");
const shortid = require("shortid");
router.post("/",async (req,res)=>{
    const body=req.body;
    if(!body.url) return res.status(400).json({error:'url is required'});
    const shortId=shortid(8);
    await URL.create({
        shortId:shortId,
        redirectedUrl:body.url,
    })
    const entry= await URL.findOne({shortId});
    let redirectedUrl=entry.redirectedUrl;
    return res.render("home",{
        id:shortId,
        redirectedUrl,
    })
})
router.get(("/:shortId"),async (req,res)=>{
    const shortId=req.params.shortId;
    const entry= await URL.findOne({shortId});

    if(!entry) return res.status(404).json({error:"Short url not found"});

    let redirectedUrl=entry.redirectedUrl;
    if(!redirectedUrl.startsWith('http://')&& !redirectedUrl.startsWith('https://')){
        redirectedUrl='https://'+redirectedUrl;
    }
    return res.redirect(redirectedUrl);
});
module.exports=router;