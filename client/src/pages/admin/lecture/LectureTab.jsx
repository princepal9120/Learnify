import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  useEditLectureMutation,
  useGetLectureByIdQuery,
  useRemoveLectureMutation,
} from "@/features/api/courseApi";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { use } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const MEDIA_API = "https://localhost:8080/api/v1/media";

function LectureTab() {
  const [lectureTitle, setLectureTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);

  const params = useParams();
  const { lectureId, courseId } = params;

  const [editLecture, { data, isLoading, error, isSuccess }] =
    useEditLectureMutation();
  const [
    removeLecture,
    { data: removeData, isLoading: removeLoading, isSuccess: removeSuccess },
  ] = useRemoveLectureMutation();
  const { data: lectureData } = useGetLectureByIdQuery(lectureId);
  const lecture = lectureData?.lecture;

  useEffect(() => {
    if (lecture) {
      setLectureTitle(lecture.lectureTitle);
      setIsFree(lecture.isPreviewFree);
      setUploadVideoInfo(lecture.videoInfo);
    }
  }, [lecture]);
  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);
      try {
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          },
        });

        if (res.data.success) {
          console.log(res);
          setUploadVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id,
          });
          setBtnDisable(false);
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("video upload failed");
      } finally {
        setMediaProgress(false);
      }
    }
  };

  const editLectureHandler = async () => {
    await editLecture({
      courseId,
      lectureId,
      lectureTitle,
      videoInfo: uploadVideoInfo,
      isPreviewFree: isFree,
    });
  };
  const removeLectureHandler = async () => {
    await removeLecture(lectureId);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [error, isSuccess]);

  useEffect(() => {
    if (removeSuccess) {
      toast.success(removeData.message);
    }
  });

  return (
    <Card>
      <CardHeader>
        <div className="space-y-2 ">
          <CardTitle>Edit lecture</CardTitle>
          <CardDescription>Make changes and edit lecture</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button
            disabled={removeLoading}
            variant="destructive"
            onClick={removeLectureHandler}
          >
            {removeLoading ? (
              <>
                <Loader2 className="size-24 mr-2 animate-spin" /> please wait..
              </>
            ) : (
              "Remove Lecture"
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="">
          <Label>Title</Label>
          <Input
            type="text"
            placeholder="Ex. Introduction to your topic"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
          />
        </div>
        <div className="">
          <Label>
            Video <span className="text-red-500">*</span>
          </Label>
          <Input
            onChange={fileChangeHandler}
            type="file"
            accept="video/*"
            placeholder="Ex. Introduction to your topic"
          />
        </div>
        <div className="flex items-center space-x-2 my-4">
          <Switch
            checked={isFree}
            onCheckedChange={setIsFree}
            id="airplane-mode"
          />
          <Label htmlFor="airplane-mode">is this video free ?</Label>
        </div>
        {mediaProgress && (
          <div className="my-4">
            <Progress value={uploadProgress} />
            <p>{uploadProgress}% uploaded</p>
          </div>
        )}
        <div className="mt-4">
          <Button disabled={isLoading} onClick={editLectureHandler}>
            {isLoading ? (
              <>
                {" "}
                <Loader2 className="size-24 mr-2 animate-spin" /> please wait..
              </>
            ) : (
              "Update Lecture"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default LectureTab;
