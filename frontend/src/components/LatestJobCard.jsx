import React from "react";
import { Badge } from "./ui/badge";

const LatestJobCard = () => {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border-gray-200 cursor-pointer">
      <div>
        <h1 className="font-mediem text-lg">Compnay Name</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">Job Title</h1>
        <p>Lorem ipsum dolor sit amet consectetu.</p>
      </div>
      <div className="flex items-center gap-1  mt-4">
        <Badge className="text-gray-400 font-bold" variant="ghost">
          12 Position
        </Badge>
        <Badge className="text-gray-400 font-bold" variant="ghost">
          Part Time
        </Badge>
        <Badge className="text-gray-400 font-bold" variant="ghost">
          24 LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCard;
