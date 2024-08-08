import CompaniesTable from '@/components/admin/CompaniesTable'
import Navbar from '@/components/shared/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '../hooks/userGetAllCompanies'
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
  useGetAllCompanies();
    const navigate = useNavigate();
    const [input, setInput] = useState("");
    const dispatch =  useDispatch();

    useEffect(()=>{
      dispatch(setSearchCompanyByText(input));
    }, [input]);
  return (
    <div><Navbar/>
    <div className='max-w-6xl mx-2 my-10 '>
        <div className='flex items-center justify-between '>
            <Input className='w-fit' placeholder='filter by name' onChange={(e)=> setInput(e.target.value)}/>
            <Button onClick={()=>{navigate('/admin/companies/create')}}>New Company</Button>
        </div>
        <CompaniesTable/>
    </div>
    </div>
  )
}

export default Companies