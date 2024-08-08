import Navbar from '@/components/shared/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import useGetAllAdminJobs from "@hooks/useGetAllAdminJobs"
import { setSearchJobByText } from '@/redux/jobSlice'

const AdminJobs = () => {
    useGetAllAdminJobs();
    const navigate = useNavigate();
    const [input, setInput] = useState("");
    const dispatch =  useDispatch();

    useEffect(()=>{
      dispatch(setSearchJobByText(input));
    }, [input]);
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-2 my-10 ">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="filter by name, role"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => {
              navigate("/admin/jobs/create");
            }}
          >
            New Job
          </Button>
        </div>
        {/* <CompaniesTable /> */}
      </div>
    </div>
  );
}

export default AdminJobs