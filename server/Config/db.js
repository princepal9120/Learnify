import mongoose from "mongoose";

const connectDB= async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongodb Connected");
    } catch (error) {
        console.log("Mongodb error occur: ", error)
    }
}
export default connectDB;