import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { setSingleJob } from "@/redux/jobSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {JOB_API_END_POINT} from "../utils/constant.js";

const JobDescription = () => {
  const { user } = useSelector(store => store.auth);
  const applied = false;
  const params = useParams();
  const jobId = params.id;
  const {singleJob} = useSelector(store=>store.job);
  const dispatch = useDispatch();
    useEffect(()=>{
        const fetchSingleJob = async()=>{
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                }
            } catch (error) {
                console.log(error);
            }
            console.log(singleJob?.experienceLevel);
            
        }
        fetchSingleJob();
    },[jobId, dispatch, user?._id]);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-2 my-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold  text-3xl">{singleJob?.title}</h1>
            
          </div>
          <Button
            disabled={applied}
            className={`rounded ${
              applied
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-700 hover:bg-blue-900"
            }`}
          >
            {applied ? "Applied" : "Apply"}
          </Button>
        </div>
        <div className="m-4">
          <h1 className="border-b-2 border-b-gray-300 font-medium py-4 ">
            Job Description
          </h1>
          <div>
            <h1 className="font-bold my-1">
              Role:
              <span className="pl-4 font-normal text-gray-800">
              {singleJob?.title}
              </span>
            </h1>
            <h1 className="font-bold my-1">
              Location:
              <span className="pl-4 font-normal text-gray-800">{singleJob?.location}</span>
            </h1>
            <h1 className="font-bold my-1">
              Description:
              <span className="pl-4 font-normal text-gray-800">
              {singleJob?.description}
              </span>
            </h1>
            <h1 className="font-bold my-1">
              Experience required:
              <span className="pl-4 font-normal text-gray-800">{singleJob?.experienceLevel} years  </span>
            </h1>
            <h1 className="font-bold my-1">
              Salary:
              <span className="pl-4 font-normal text-gray-800">{singleJob?.salary} Lpa</span>
            </h1>
            <h1 className="font-bold my-1">
              TotalApplicants:
              <span className="pl-4 font-normal text-gray-800">{singleJob?.applications?.length}</span>
            </h1>
            <h1 className="font-bold my-1">
              Posted Date:
              <span className="pl-4 font-normal text-gray-800">{singleJob?.createdAt.split("T")[0]}</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
