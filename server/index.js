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
dotenv.config({});
const app =express();

 connectDB();

 const Port= process.env.PORT || 3000
 // default middleware
 
 app.use(express.json());
 app.use(cookieParser());
 app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
 }))


//apis

app.use("/api/v1/media", mediaRoute)
app.use("/api/v1/user",userRoute)
app.use("/api/v1/course" ,courseRoute)
app.use("/api/v1/purchase" ,purchaseRoute)
app.user("/api/v1/lprogress",courseProgressRoute)


 app.listen(Port, ()=>{
    console.log(`Sever listen at port ${Port}`);
    
 })