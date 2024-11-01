import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { setSingleJob } from "@/redux/jobSlice";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {JOB_API_END_POINT} from "../utils/constant.js";
import {APPLICATION_API_END_POINT}  from "../utils/constant.js";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";

const JobDescription = () => {
  const [isSaved, setIsSaved] = useState(false);
  const {singleJob} = useSelector(store=>store.job);
  const { user } = useSelector(store => store.auth);
  const isIntiallyApplied = singleJob?.applications?.some(application=>application.applicant===user?._id) && false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
    const handleSaveJob = async () =>{  
      
      console.log(jobId);
      try {
        if (!token) {
          throw new Error('Token not found. Please log in again.');
        }
        const res = await axios.post(`${USER_API_END_POINT}/saveJobs/${jobId}`, {}, {

          withCredentials: true,
        });
        
        console.log(res.data);
        if(res.data.success){
          setIsSaved(res.data);
          console.log("job saved successfully");
          toast.success("job saved");
          
        }
      } catch (error) {
        console.log("token: ",token);
        console.log("job save error : ",error);
      }
  }
  
  const applyJobHandler = async() =>{
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`,{withCredentials:true});
      console.log(res.data);
      if(res.data.success) {
        setIsApplied(true); // Update the local state
        const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]};
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
        
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
    useEffect(()=>{
        const fetchSingleJob = async()=>{
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    },[jobId, dispatch, user?._id]);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-2 my-10 ml-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold  text-3xl">{singleJob?.title}</h1>
          </div>
          <div className="flex gap-3">
          <Button 
          onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`rounded-lg ${isApplied ? "bg-gray-600 cursor-not-allowed": "bg-blue-700 hover:bg-blue-900"}`}>
            {isApplied ? "Applied" : "Apply"}
          </Button>
          <Button 
          onClick={handleSaveJob}
            disabled={isSaved}
            className={`rounded-lg ${isSaved ? "bg-gray-600 cursor-not-allowed": "bg-blue-700 hover:bg-blue-900"}`}>
            {isSaved ? "saved" : "save"}
          </Button>
          </div>
        </div>
        <h1 className="border-b-2 border-b-gray-300 font-medium py-4 ">Job Description</h1>
        <div className="my-4">
          <h1 className="font-bold my-1">Role:<span className="pl-4 font-normal text-gray-800">{singleJob?.title}</span></h1>
            <h1 className="font-bold my-1">Location:<span className="pl-4 font-normal text-gray-800">{singleJob?.location}</span></h1>
            <h1 className="font-bold my-1">
              Description:<span className="pl-4 font-normal text-gray-800">{singleJob?.description}</span></h1>
            <h1 className="font-bold my-1">Experience required:<span className="pl-4 font-normal text-gray-800">{singleJob?.experienceLevel} years  </span></h1>
            <h1 className="font-bold my-1"> Salary:<span className="pl-4 font-normal text-gray-800">{singleJob?.salary} Lpa</span></h1>
            <h1 className="font-bold my-1">Total Applicants:<span className="pl-4 font-normal text-gray-800">{singleJob?.applications?.length}</span></h1>
            <h1 className="font-bold my-1">Posted Date:<span className="pl-4 font-normal text-gray-800">{singleJob?.createdAt.split("T")[0]}</span></h1>
        </div>
      </div>
    </div>
  )
}

export default JobDescription