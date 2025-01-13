import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import connectDB from "./Config/db.js";
import cors from "cors"
import userRoute from "./routes/user.route.js"
import courseRoute from './routes/course.route.js'
import mediaRoute from './routes/media.route.js'
import purchaseRoute from './routes/purchaseCourse.route.js'
import courseProgressRoute from './routes/courseProgress.route.js'
import path from 'path'
dotenv.config({});
connectDB();


const app =express();



 const Port= process.env.PORT || 3000
 // default middleware
 const _dirname= path.resolve();
 
 app.use(express.json());
 app.use(cookieParser());
 app.use(cors({
    origin: "https://learnifywithai.onrender.com",
    credentials: true,
 }))


//apis

app.use("/api/v1/media", mediaRoute)
app.use("/api/v1/user",userRoute)
app.use("/api/v1/course" ,courseRoute)
app.use("/api/v1/purchase" ,purchaseRoute)
app.use("/api/v1/progress",courseProgressRoute)

app.use(express.static(path.join(_dirname, "/client/dist")));
app.get('*', (req, res)=>{
   res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"))
});

 app.listen(Port, ()=>{
    console.log(`Sever listen at port ${Port}`);
    
 })