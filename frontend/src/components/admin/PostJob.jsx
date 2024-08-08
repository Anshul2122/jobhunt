import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { JOB_API_END_POINT } from '@/utils/constant';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from '../ui/select';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';

const PostJob = () => {
    const [input, setInput] = useState({
        title:"",
        description:"",
        salary:"",
        location:"",
        jobType:"",
        experience:"",
        position:0,
        companyId:""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {companies} = useSelector(store=>store.company);
    const changeEventHandler = (e)=>{
        setInput({...input, [e.target.name]:e.target.value});
    };
    const selectChangeHandler = (value)=>{
        const selectedComapny = companies.find((company)=> company.name.toLowerCase()===value);
        setInput({...input, companyId:selectedComapny._id});
    };
    const submitHandler = async (e)=>{
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input,{
                headers:{
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if(res.data.success){
                toast.success(res.data.success);
                navigate('/admin/jobs');
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.res.data.message);
        }
        finally{
            setLoading(false);
        }
    }
    return (
    <div>
        <Navbar/>
        <div className='flex items-center justify-center w-screen my-5'>
            <form onSubmit={submitHandler} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md'>
                <div className='grid grid-cols-2 gap-2'>
                <div>
                <Label>Title</Label>
                <Input 
                type='text'
                name='title' 
                value={input.title}
                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                onChange={changeEventHandler}
                />
            </div>
            <div>
                <Label>Description</Label>
                <Input 
                type='text'
                name='description' 
                value={input.description}
                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                onChange={changeEventHandler}
                />
            </div>
            <div>
                <Label>Requirements</Label>
                <Input 
                type='text'
                name='requirements' 
                value={input.requirements}
                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                onChange={changeEventHandler}
                />
            </div>
            <div>
                <Label>Salary</Label>
                <Input 
                type='text'
                name='salary'
                value={input.salary} 
                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                onChange={changeEventHandler}
                />
            </div>
            <div>
                <Label>Location</Label>
                <Input 
                type='text'
                name='location' 
                value={input.location}
                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                onChange={changeEventHandler}
                />
            </div>
            <div>
                <Label>Job Type</Label>
                <Input 
                type='text'
                name='jobType' 
                value={input.jobType}
                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                onChange={changeEventHandler}
                />
            </div>
            <div>
                <Label>Experience Level</Label>
                <Input 
                type='text'
                name='experience' 
                value={input.experience}
                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                onChange={changeEventHandler}
                />
            </div>
            <div>
                <Label>No of position</Label>
                <Input 
                type='text'
                name='position' 
                value={input.position}
                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                onChange={changeEventHandler}
                />
            </div>
            {
              companies.length> 0 && (
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className='2-[180px]'>
                    <SelectValue placeholder ='Select a company'/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {
                        companies.map((company)=>{
                          return(
                            <SelectItem value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
                          )
                        })
                      }
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )
            }
          </div>
          {
          loading?
          <Button className='w-full my-4'><Loader2 className='mr-2 h-4 w-4 animated-spin'/>Saving...</Button> 
          :
          <Button type='submit' className='w-full my-4'>Post new job</Button>
          }
          {
            companies.length ===0 && <p className='text-xs text-red-600 font-bold text-center my-3'>*Please register a company first, before posting a job</p>
          }
        </form>
      </div>
    </div>
  )
}

export default PostJob