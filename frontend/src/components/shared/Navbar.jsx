import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const navigate =  useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const logoutHandler = async()=>{
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {withCredentials:true});
      if(res.data.success){
        dispatch(setUser(null));
        navigate('/login');
        toast.success(res.data.message);
      }
      if(!res.data.success){
        console.log("error in logout");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="bg-white shadow-sm pb-1">
      <div className="flex items-center justify-between mx-auto max-w-7xl max-h-16">
        <div>
          <h1 className="text-2xl font-bold cursor-pointer">
            Job<span className="text-blue-500 underline">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            <li className="">
              <Link to="/">Home</Link>
            </li>
            <li className="">
              <Link to="/jobs">Jobs</Link>
            </li>
            <li className="">
              <Link to="/browse">Browse</Link>
            </li>
          </ul>
          {user ? (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user.profile.profilePhoto}
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-4 space-y-2">
                  <Avatar>
                    <AvatarImage
                      src={user.profile.profilePhoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col   text-gray-600">
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <User2 />
                    <Button variant="link">
                      <Link to="/profile">profile</Link>
                    </Button>
                  </div>
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <div className="flex item-center gap-2 mt-2 mr-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button
                  variant="outline"
                  className="hover:bg-blue-900 hover:text-white bg-blue-700 text-white "
                >
                  signup
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
