import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import connectDB from "./Config/db.js";
import cors from "cors"
import userRoute from "./routes/user.route.js"
dotenv.config({});
const app =express();

 connectDB();

 const Port= process.env.PORT || 3000
 // default middleware
 app.use(express.json());
 app.use(cookieParser());
 app.use(cors({
    origin: "http://localhost:5174",
    credentials: true,
 }))


//apis
app.use("/api/v1/user",userRoute)



 app.listen(Port, ()=>{
    console.log(`Sever listen at port ${Port}`);
    
 })