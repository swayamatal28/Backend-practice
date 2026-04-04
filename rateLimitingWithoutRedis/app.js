const express=require("express");
const app=express();
const port=3000;
const {tokenBucketRateLimiter}=require("./ratelimiter");

app.use(
    tokenBucketRateLimiter({
        tokensPerInterval:5,
        intervalMs:10_000,
        bucketSize:10,
    })
);

app.get("/",(req,res)=>{
    res.send('Hello there bayb!');
})

app.listen(port,()=>{
    console.log('You can start testing rate limiting!');
})