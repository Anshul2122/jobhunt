import React, { useState } from "react";
import Navbar from "./../components/shared/Navbar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import ApplictionTable from "@/components/ApplictionTable";
import UpdateProfileDialog from "@/components/UpdateProfileDialog";
import { useSelector } from "react-redux";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const isHaveResume = true;
  const { user } = useSelector((store) => store.auth);
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-2 bg-wite border border-gray-300  rounded-2xl my-4 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png" />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p>
                {user?.profile?.bio}
              </p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className="text-right"
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className=" flex gap-2">
          <h1 className="font-bold mt-2">Skills :</h1>
          <div className="flex items-center gap-1">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge key={index}>{item}</Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>

        <div className="grid max-w-sm items-center gap-1.5">
          <Label className=" text-md font-bold">Resume</Label>
          {isHaveResume ? (
            <a target="blank" href={user?.profile.resume}>
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className="text-gray-400">not uploaded yet</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-2 bg-white rounded-2xl">
        <h1 className="font-bold text-lg my-5">Applied jobs</h1>
        <ApplictionTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
