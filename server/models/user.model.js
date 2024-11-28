import mongoose, { model } from "mongoose"


const userSchema =new mongoose.Schema({
    name:{
        type: String,
        required: true,
    }, email:{
        type: String,
        required: true,
    } ,password:{
        type: String,
        required: true,
    } ,role:{
        type: String,
        enum: ["student","instructor"],
        default: "student",
    } ,
    enrolledCourses:[
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Course" 
        }
    ],
    photoUrl:{
        type: String,
        default: "",
    }
})


export const User=mongoose.model("User",userSchema);