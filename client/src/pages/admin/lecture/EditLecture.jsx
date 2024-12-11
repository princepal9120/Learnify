import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React from "react";

import { Link, useParams } from "react-router-dom";
import LectureTab from "./LectureTab";

function EditLecture() {
    const params=useParams();
    const courseId= params.courseId;
  return (
    <div><div className="flex justify-between items-center mb-5">
    <div className="flex items-center gap-2">
      <Link to={`/admin/course/${courseId}/lecture`}>
        {" "}
        <Button 
         size="icon" variant="outline" className="rounded-full">
          <ArrowLeft size={20} className="text-gray-500"/>
        </Button>{" "}
      </Link>
      <h2 className="font-bold text-xl">Update your lecture</h2>
    </div>
  

  </div>
  <LectureTab/>
  </div>
  );
}

export default EditLecture;
