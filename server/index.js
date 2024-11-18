import express from "express"
import dotenv from "dotenv"
import connectDB from "./Config/db.js";
dotenv.config({});
const app =express();

 connectDB();

 const Port= process.env.PORT|| 3000

 app.listen(Port, ()=>{
    console.log(`Sever listen at port ${Port}`);
    
 })