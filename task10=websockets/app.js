const express=require("express");
const app=express();
const http=require("http");
const path=require("path");
const server=http.createServer(app);
const {Server}=require("socket.io");

app.use(express.static(path.resolve("./views")));
const io=new Server(server);//io means input output

io.on('connection',(socket)=>{ // this runs everytime a new user connectes and this socket shows that user
    socket.on("chat-message",(message)=>{
        io.emit("message",message);
    })
})

app.get("/",(req,res)=>{
    return res.sendFile('./views/index.html');
})

server.listen(3000,()=> console.log('Server has bin started'));