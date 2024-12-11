import { Edit } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

function Lecture({ lecture, courseId, index }) {
  const navigate = useNavigate();
  const goToUpdateLecture = () => {
    navigate(`${lecture._id}`)
    // console.log(courseId)
  }
  return (
    <div className="flex justify-between items-center bg-[#F7F9FA] dark:bg-[#181819] mb-2 ">
      <h1 className="font-bold text-gray-800 dark:text-red-100 uppercase">
        Lecture- {index + 1} {lecture?.lectureTitle}
      </h1>
      <Edit
        onClick={goToUpdateLecture}
        className="cursor-pointer text-gray-600 dark:text-gray-300 dark:hover:text-gray-100"
        size={20}
      />
    </div>
  );
}

export default Lecture;
