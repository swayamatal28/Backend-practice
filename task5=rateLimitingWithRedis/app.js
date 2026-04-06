const express=require("express");
const app=express();
const PORT=3000;
const rateLimiter=require("./ratelimiter");

app.use(rateLimiter.rateLimiter);


//THIS IS NOT BUCKET SIZE ALGORITHM WHICH WE IMPLEMENTED USING THE NORMAL FUNCTIONALITIEIS AND NOT REDIS , THIS IS WITH REDIS FIXED WINDOW ,(NOT BUCKET SIZE SO THE LOGIC IN ITHE MIDDLEWARE IS SLIGHTLY CHANGES)

app.get("/",(req,res)=>{
    return res.send('Heloeew');
})




app.listen(PORT,()=>{
    console.log('Server got started!')
})