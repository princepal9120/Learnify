import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";

function CourseDetail() {
  const params = useParams();
  const isLock = true;
  const isPurchased = true;
  return (
    <div className="mt-10 space-y-5">
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">course title</h1>
          <p className="text-base md:text-lg">course subtitle</p>
          <p>
            Created by:{" "}
            <span className="text-[#3F4f43] underline italic">mern</span>
          </p>
          <div className="flex  items-center gap-2 text-sm">
            {" "}
            <BadgeInfo size={16} /> <p>Last Updated: 11-12-2024</p>
          </div>
          <p>Students enrolled: 10</p>
        </div>
      </div>
      <div
        className="max-w-7xl mx-auto my-5 px4 md:px-8
         flex flex-col md:flex-row justify-between gap-4"
      >
        <div className="w-full lg:w-1/2 space-y-5">
          <h1>Description</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
            provident inventore harum tempora numquam repellendus recusandae
            eaque ut non fugiat, eos aspernatur quibusdam delectus. Quibusdam
            quam adipisci iste voluptatum. Qui?
          </p>
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>4 lectures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {[1, 2, 3].map((lecture, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm">
                  <span>
                    {isLock ? <PlayCircle size={14} /> : <Lock size={14} />}
                  </span>
                  <p>lecture title</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="p-4 flex flex-col ">
              <div className="w-full aspect-video mb-4">
                <ReactPlayer
                  width="100%"
                  height={"100%"}
                  // url={course.lectures[0].videoUrl}
                  controls={true}
                />
              </div>
              <h1>Lecture title</h1>
              <Separator className="my-2" />
              <h1 className="font-semibold text-lg md:text-xl">Course Price</h1>
            </CardContent>
            <CardFooter>
              {isPurchased ? (
                <Button className="w-full">Continue Course</Button>
              ) : (
                <BuyCourseButton />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
