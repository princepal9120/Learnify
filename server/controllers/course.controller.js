import { Course } from "../models/course.model.js";


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


export const getCreatorCourses = async (req,res) => {
        try {
            
            const userId= req.id;
            const courses = await Course.find({creator: userId})
            if(!courses){
                return res.status(401).json({
                    courses: [],
                    message: "Courses not found"
                })
            }
            return res.status(200).json({
                courses,
                message: "Courses are here."
            })
        } catch (error) {
             console.log(error);
        return res.status(500).json({
            message: "Failed to create Course",
        })
        }
} 