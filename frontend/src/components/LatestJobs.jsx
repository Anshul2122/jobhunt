import React from "react";
import LatestJobCard from "./LatestJobCard";

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const LatestJobs = () => {
  return (
    <div className="max-2-7xl mx-2 my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-blue-700">Latest & Top </span>Job Openings
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {randomJobs.slice(0, 6).map((job, index) => (
          <LatestJobCard />
        ))}
      </div>
    </div>
  );
};

export default LatestJobs;
