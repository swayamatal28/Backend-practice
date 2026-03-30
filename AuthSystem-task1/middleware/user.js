const {validatetoke}=require("../services/user");

function checkauth(cookie){
    return (req,res,next)=>{
        const cook=req.cookies[cookie];
        if(!cook){
            return next();
        }
        try{
            const userPayload=validatetoke(cook);
            req.user=userPayload;
        }
        catch(error){};
        return next();
    }
}

module.exports={
    checkauth,
};