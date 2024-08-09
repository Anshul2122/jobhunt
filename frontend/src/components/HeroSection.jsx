import { Search } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState();
  const navigate = useNavigate();
  const searchJobHandler = ()=>{
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  }
  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="m-auto px-4 py-2 mt-2 rounded-full bg-gray-300 text-blue-700 font-medium">
          No. 1 job hunt website
        </span>
        <h1 className="text-5xl font-bold mt-4">
          Search, Apply & <br />
          Get your <span className="text-blue-700">Dream Jobs</span>
        </h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate,
          neque.
        </p>
        <div className="flex w-[40%] shadow-lg border border-gray-200 rounded-3xl items-center gap-4 mx-auto ">
          <input
            type="text"
            placeholder="find your dream jobs"
            onChange={(e)=> setQuery(e.target.value)}
            className="outline-none border-none w-full ml-3"
          />
          <Button onClick={searchJobHandler} className="rounded-r-full bg-blue-700">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
