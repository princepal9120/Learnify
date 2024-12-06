import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEditCourseMutation } from "@/features/api/courseApi";
import { toast } from "sonner";

function CourseTab() {
  const isPublished = true;
  const navigate = useNavigate();
  const [previewThumbnail, setPreviewThumbnail] = useState('')
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });
  const [editCourse, { data, isLoading, isSuccess, error }] = useEditCourseMutation();
  const params = useParams();
  const courseId = params.courseId;
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const selectCategory = (value) => {
    setInput({ ...input, category: value })


  }
  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value })
  }
  //get file
  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    // console.log(file);
    if (file) {
      setInput({ ...input, courseThumbnail: file })
      const fileReader = new FileReader();
      fileReader.onload = () => setPreviewThumbnail(fileReader.result)
      fileReader.readAsDataURL(file)
    }

  }
  const updateCourseHandler = async () => {
    console.log(input);
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle)
    formData.append("subTitle", input.subTitle)
    formData.append("description", input.description)
    formData.append("category", input.category)
    formData.append("courseLevel", input.courseLevel)
    formData.append("coursePrice", input.coursePrice)
    formData.append("courseThumbnail", input.courseThumbnail)
    await editCourse({ formData, courseId })
  }
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Course Update.")
    }
    if (error) {
      toast.error(error.data.message || "Failed to update course")
    }
  }, [isSuccess, error])
  return (
    <Card className=" ">
      <CardHeader className="flex flex-row justify-between">
        <div className="">
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Make changes to your course her. Click save when you're don.
          </CardDescription>
        </div>
        <div className="space-x-2">
          <Button variant="outline">
            {isPublished ? "Unpublished" : "Published"}{" "}
          </Button>
          <Button> Remove Course</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-5">
          <div>
            <Label> Title:</Label>
            <Input
              placeholder="Enter your title"
              name="courseTitle"
              type="text"
              value={input.courseTitle}
              onChange={changeHandler}
            />
          </div>
          <div>
            <Label> SubTitle:</Label>
            <Input
              placeholder="Learn how to build ,deploy and manage application with technologies."
              name="subTitle"
              type="text"
              value={input.subTitle}
              onChange={changeHandler}
            />
          </div>
          <div>
            <Label>Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>
          <div className="flex items-center gap-3">
            <div>
              <Label>Category:</Label>
              <Select defaultValue={input.category}
                onValueChange={selectCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Courses</SelectLabel>
                    <SelectItem value="web-development">
                      Web Development
                    </SelectItem>
                    <SelectItem value="ml">Machine learning</SelectItem>
                    <SelectItem value="mern">Mern</SelectItem>
                    <SelectItem value="ai">Artificial Intelligence</SelectItem>
                    <SelectItem value="nextjs">Nextjs</SelectItem>
                    <SelectItem value="mern">Javascript</SelectItem>
                    <SelectItem value="ai">
                      Data structure & Algorithem
                    </SelectItem>
                    <SelectItem value="nextjs">Java Springboot</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Course Level</Label>
              <Select defaultValue={input.courseLevel} onValueChange={selectCourseLevel} >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a course level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Courses</SelectLabel>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="advance">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Prince in (INR) </Label>
              <Input
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                onChange={changeHandler}
                placeholder="₹499"
                className="w-fit"
              />
            </div>

          </div>
          <div>
            <Label>Course Thumbnail</Label>
            <Input type="file"
              accept="image/*"
              className="w-fit"
              onChange={selectThumbnail}
            />
            {
              previewThumbnail && (
                <img src={previewThumbnail}
                  className="e-64 my-2"
                  alt="Course Thumbnail" />
              )
            }
          </div>
          <div className="space-x-3">
            <Button variant="outline" onClick={() => navigate('/admin/course')}>cancel</Button>
            <Button disabled={isLoading} onClick={updateCourseHandler}>{
              isLoading ?
                <>
                  <Loader2 className="mr-2 size-18 animate-spin" />
                  please wait...
                </> : ("Save")
            }</Button>
          </div>
        </div>


      </CardContent>
    </Card>
  );
}

export default CourseTab;
