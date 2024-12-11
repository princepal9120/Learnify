import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";


export const createCourse = async (req, res) => {

    try {
        const { courseTitle, category } = req.body
        if (!courseTitle || !category) {
            return res.status(400).json({
                message: "CourseTitle and Category cannot be empty."
            })
        }
        const course = await Course.create({
            courseTitle,
            category,
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


export const getCreatorCourses = async (req, res) => {
    try {

        const userId = req.id;
        const courses = await Course.find({ creator: userId })
        if (!courses) {
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
export const editCourse = async (req, res) => {
    try {
        console.log(req.body);
        const courseId = req.params.courseId;
        const { courseTitle, subTitle, description, category, courseLevel, coursePrice } = req.body;
        const thumbnail = req.file
        let course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                message: "course not found."
            })
        }
        let courseThumbnail;
        if (thumbnail) {
            if (course.courseThumbnail) {
                console.log(course.courseThumbnail)
                const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
                await deleteMediaFromCloudinary(publicId); // delete old image
            }
            // upload thumbnail on cloudinary
            courseThumbnail = await uploadMedia(thumbnail.path)
        }

        const updatedData = { courseTitle, subTitle, description, category, courseLevel, coursePrice, courseThumbnail: courseThumbnail?.secure_url }
        course = await Course.findByIdAndUpdate(courseId, updatedData, { new: true });
        return res.status(200).json({
            course,
            message: "Course updated Successfully."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to create Course",
        })
    }
}
export const getCourseById = async (req, res) => {
    try {
        const { courseId } = req.params
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: " course not found."
            })
        }
        return res.status(200).json({
            course,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to get Course Id",
        })
    }
}

export const createLecture = async (req, res) => {
    try {
        const { lectureTitle } = req.body;
        const { courseId } = req.params;
        if (!lectureTitle || !courseId) {
            return res.status(400).json({
                message: "Lecture Title  is required."
            })
        }
        // create lecture
        const lecture = await Lecture.create({ lectureTitle })
        const course = await Course.findById(courseId);
        if (course) {
            console.log("Create Lecture id", lecture._id);
            
            course.lectures.push(lecture._id);
            await course.save();
        }
        return res.status(201).json({
            lecture,
            message: "Lecture are created successfully."
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Failed to create lecture."
        })
    }
}
export const getCourseLecture = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId).populate("lectures");
        if (!course) {
            return res.status(400).json({
                message: "course not found."
            })
        }
        return res.status(200).json({
            lectures: course.lectures,
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to create lecture."
        })

    }
}

export const editLecture =async (req, res)=>{
    try {
        const { lectureTitle, videoInfo, isPreviewFree} =req.body;
        const {courseId, lectureId}= req.params;

        const lecture =await Lecture.findById(lectureId);
        if(!lecture){
            return res.status(404).json({
                message: "lecture not found.",
            })
        }
        //update
        if(lectureTitle) lecture.lectureTitle= lectureTitle;
        if(videoInfo.videoUrl) lecture.videoUrl= videoInfo.videoUrl;
        if(videoInfo.publicId) lecture.publicId= videoInfo.publicId;
        if(isPreviewFree)   lecture.isPreviewFree=isPreviewFree;

        await lecture.save();

                } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to edit lecture."
        })

    }
}