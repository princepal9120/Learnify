import { Course } from "../models/course.model";


export const createCourse= async (req,res) => {
    
    try {
        const {courseTitle, category} =req.body
        if(!courseTitle || !category){
            return res.status(400).json({
                message: "CourseTitle and Category cannot be empty."
            })
        }
        const course = await Course.create({
          courseTitle,
          category ,
          creator: req.id
        });
        return res.status(201).json({
            course, 
            message: "Course created Successfully."
        })
    } catch (error) {
        console.log(err);
        return res.status(500).json({
            message: "Failed to create Course",
        })
    }
}