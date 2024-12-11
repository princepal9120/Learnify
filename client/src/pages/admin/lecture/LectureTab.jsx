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
import axios from "axios";
import React, { useState } from "react";
import { toast } from "sonner";

const MEDIA_API = "https://localhost:8080/api/v1/media";

function LectureTab() {
    const [lectureTitle, setLectureTitle] = useState("")
    const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
    const [isFree, setIsFree] = useState(false);
    const [mediaProgress, setMediaProgress] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [btnDisable, setBtnDisable] = useState(true);

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

    return (
        <Card>
            <CardHeader>
                <div className="space-y-2 ">
                    <CardTitle>Edit lecture</CardTitle>
                    <CardDescription>Make changes and edit lecture</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="destructive">Remove Lecture</Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="">
                    <Label>Title</Label>
                    <Input type="text" placeholder="Ex. Introduction to your topic" />
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
                    <Switch id="airplane-mode" />
                    <Label htmlFor="airplane-mode">is this video free ?</Label>
                </div>
                {mediaProgress && (
                    <div className="my-4">
                        <Progress value={uploadProgress} />
                        <p>{uploadProgress}% uploaded</p>
                    </div>
                )}
                <div className="mt-4">
                    <Button>Update Lecture</Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default LectureTab;
