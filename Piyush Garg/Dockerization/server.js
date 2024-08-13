const express=require("express");
const app=express();

app.get("/",(req,res)=>{
    res.send(`<h1>Hi Srijit i am running inside from container</h1>`)
})

app.get("/get",(req,res)=>{
   res.json({message:"Hey i am Node js running from container"});
})

app.listen(4000,()=>{
    console.log("Server is running in port 4000");
    
})