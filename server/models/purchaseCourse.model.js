import mongoose from "mongoose";

const CoursePurchaseSchema= new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    courseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    amount:{
        type: Number,
        required: true,
    },
    status:{
        type: String,
        enum: ["pending", "failed", "completed"]
    }
})