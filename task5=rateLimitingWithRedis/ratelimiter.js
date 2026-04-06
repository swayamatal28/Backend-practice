const Redis=require("ioredis");
const moment=require("moment");
const redisClient=new Redis({url:"redis://localhost:6379"});
const ratelimitinseconds=10;
const reqallow=2;


module.exports={
    rateLimiter:async (req,res,next)=>{
        // const userId=req.headers["user_id"];
        //for now only
        const userId=req.ip;
        const time=moment().unix();
        const result=await redisClient.hgetall(userId);

        if(Object.keys(result).length==0){
            await redisClient.hset(userId,{
                "createdAt":time,
                "count":1,
            })
            return next();
        } 
        if(result)
        {
            let diff = time - parseInt(result["createdAt"]);
            if(diff>ratelimitinseconds){
                await redisClient.hset(userId,{
                    "createdAt":time,
                    "count":1,
                })
                return next();
            }
            //else condi
            if(parseInt(result["count"]) >= reqallow){
                return res.status(429).json({
                    "success":false,
                    "message":"try again rate reached"
                })
            }
            else{
                await redisClient.hset(userId,{
                    "count":parseInt(result["count"])+1
                })
                next()
            }
        }

    }
}