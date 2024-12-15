import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { useCreateCheckoutSessionMutation } from "@/features/api/purchaseApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

function BuyCourseButton({ courseId }) {
  const [createCheckoutSession, { data, isSuccess, isError,isLoading ,error }] =
    useCreateCheckoutSessionMutation();

  const purchaseCourseHandler = async () => {
    await createCheckoutSession(courseId);
  };
  useEffect(()=>{
      if(isSuccess){
        if(data?.url){
          window.location.href= data.url;   // redirect strip checkout url
        }else{
          toast.error("Error while set to buy course link.")
        }
      }
      if(isError){
        toast.error(error?.data?.message || "Failed to create checkout session.")
      }
  },[data, isSuccess, isError, error])
  return (
    <Button className="w-full" onClick={purchaseCourseHandler}>
     {
      isLoading ? <>
      <Loader2 size={14} className="mr-2 animate-spin"/> please wait...
      </>:"Buy Course"
     }
    </Button>
  );
};

export default BuyCourseButton;
