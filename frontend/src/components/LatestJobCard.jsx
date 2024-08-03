import React from "react";
import { Badge } from "./ui/badge";
import {useNavigate} from "react-router-dom";

const LatestJobCard = ({job}) => {
  const navigate = useNavigate();
  return (
    <div onClick={()=>navigate(`/description/${job._id}`)} className="p-5 rounded-md shadow-xl bg-gray-100 border-gray-800 cursor-pointer mt-2">

      <div>
        <div className="flex flex-row gap-3 mb-2">
        <h1>compnay logo</h1>
        <h1 className="font-mediem text-lg">{job?.companyId?.name}</h1>
        </div>
        
        <p className="text-sm text-gray-500">{job.location}</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p>{job?.description}</p>
      </div>
      <div className="flex items-center gap-1  mt-4">
        <Badge className="text-gray-400 font-bold" variant="ghost">
          {job?.position} Position
        </Badge>
        <Badge className="text-gray-400 font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-gray-400 font-bold" variant="ghost">
          {job?.salary} Lpa
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCard;
