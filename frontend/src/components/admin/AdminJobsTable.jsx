import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from 'react-redux'
import { Popover,PopoverTrigger } from "../ui/popover";
import { useNavigate } from "react-router-dom";
import { PopoverContent } from "@radix-ui/react-popover";

const AdminJobsTable = () => { 
  const navigate = useNavigate();
  const {allAdminJobs, searchJobByText} = useSelector(store=>store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  useEffect(()=>{
    const filteredJobs= allAdminJobs.filter((job)=>{
      if(!searchJobByText){
        return true;
      }
      return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.toLowerCase().includes(searchJobByText.toLowerCase());
    });
    setFilterJobs(filteredJobs);
  },[allAdminJobs,searchJobByText]);
  return (
    <div>
      <Table>
        <TableCaption>list of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Comapny Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className='text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            filterJobs.map((job)=>{
              <tr>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() => navigate(`/admin/companies/${job._id}`)}
                        className="flex items-center gap-2 w-git cursor-pointer"
                      >
                        <Edit2 className="w-4" />
                        <Eye/>
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                        className="flex items-center w-fit gap-2 cursor-pointer mt-2"
                      >
                        <Eye className="w-4" />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>;
            })
          }
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
