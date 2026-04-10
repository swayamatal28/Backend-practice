const express=require("express");
const axios=require("axios"); 
const app=express();
const PORT=3000;
const client=require("./client");

//redis only store strings
app.get("/",async (req,res)=>{
    const cache=await client.get('todos');
    if(cache) return res.json(JSON.parse(cache));
    const {data}=await axios.get('https://jsonplaceholder.typicode.com/todos');
    await client.set('todos',JSON.stringify(data));
    await client.expire('todos',30);
    return res.json(data);
})

app.listen(PORT,()=>{
    console.log('Server is started...')
});