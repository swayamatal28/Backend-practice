const {validateToken}=require("../services/user");

function checkforauth(cookie){
    return (req,res,next)=>{
        const token=req.cookies[cookie];
        if(!token) {
           return next();
        }

        try{
            const payload=validateToken(token);
            req.user=payload;
        }
        catch (error){}

        return next();
    };
}

module.exports={
    checkforauth,
};

