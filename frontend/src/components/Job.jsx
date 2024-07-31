import React from "react";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

const style = "text-gray-400 font-bold";
const Job = () => {
  return (
    <div className="p-5 ml-2 rounded-md shadow-xl bg-white border-gray-400 mt-2">
      <div className="flex items-center justify-between gap-4 border-gray-300">
        <p className="text-sm font-semibold text-gray-400">2 days ago</p>
        <Button variant="outline" className="rounded-full">
          <Bookmark />
        </Button>
      </div>
      <div className=" flex flex-row  items-center gap-2">
        <Button className="p-6 rounded-full" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png" />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">Company Name</h1>
          <p className="texxt-sm text-gray-500">India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">Title</h1>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
          repellat quaerat minima quae similique velit vel iste voluptate optio
          maxime!
        </p>
      </div>
      <div className="flex items-center md:gap-3 gap-1/2 mt-4 ">
        <Badge className={style} variant="ghost">
          12 Position
        </Badge>
        <Badge className={style} variant="ghost">
          Part Time
        </Badge>
        <Badge className={style} variant="ghost">
          24 LPA
        </Badge>
      </div>
      <div className="flex items-center lg:items-start  gap-4 mt-4 ">
        <Button variant="outline" className="bg-white">
          Details
        </Button>
        <Button
          variant="outline"
          className="bg-blue-700 text-white hover:bg-blue-900 hover:text-white w-20
          "
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default Job;
