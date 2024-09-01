import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

const style = "text-gray-400 font-bold";
const Job = ({ job }) => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference/(1000*24*60*60));
}
const handleSaveJob = async () =>{  
    try {
      const res = await axios.post(`${USER_API_END_POINT}/saveJobs`, {withCredentials:true});
      if(res.data.success){
        setIsSaved(res.data);
        console.log("job saved successfully");
        toast.success("job saved");
        
      }
    } catch (error) {
      console.log("job save error : ",error);
    }
}
  
  return (
    <div onClick={() => navigate(`/description/${job?._id}`)}  className="p-5 ml-2 rounded-md shadow-xl bg-white border-gray-400 mt-2 cursor-pointer">
      <div className="flex items-center justify-between gap-4 border-gray-300">
        <p className="text-sm font-semibold text-gray-400">
          {daysAgoFunction(job?.created)===0 
          ? `Today`
          : `${daysAgoFunction(job?.createdAt)} day ago`}
          </p>
        <Button variant="outline" className="rounded-full" size='icon'>
          <Bookmark />
        </Button>
      </div>
      <div className=" flex flex-row  items-center gap-2">
        <Button className="p-6 rounded-full" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">{job.location}</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center md:gap-3 gap-1/2 mt-4 ">
        <Badge className={style} variant="ghost">
        {job?.position} Position
        </Badge>
        <Badge className={style} variant="ghost">
        {job?.jobType}
        </Badge>
        <Badge className={style} variant="ghost">
        {job?.salary} Lpa
        </Badge>
      </div>
      <div className="flex items-center lg:items-start  gap-4 mt-4 ">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="bg-white"
        >
          Details
        </Button>
        <Button onClick={handleSaveJob}  disabled = {isSaved} variant="outline" className="bg-blue-700 text-white hover:bg-blue-900 hover:text-white w-20">
          {isSaved? "saved" : "save"}
        </Button>
      </div>
    </div>
  );
};

export default Job;
