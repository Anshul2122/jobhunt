import React from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";

const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Jobs = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-2 mt-1">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          {jobsArray.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5 mt-2">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                {jobsArray.map((item, i) => (
                  <div key={i}>
                    <Job />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
