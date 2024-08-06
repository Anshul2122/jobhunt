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
import { Avatar, AvatarImage } from "../ui/avatar";
import { Edit2 } from "lucide-react";
import { useSelector } from 'react-redux'




const CompaniesTable = () => { 
  const {companies, searchCompanyByText} = useSelector(store=>store.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  useEffect(()=>{
    const filteredCompany = companies.length>=0 && companies.filter((company)=>{
      if(!searchCompanyByText){
        return true;
      }
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });
    setFilterCompany(filteredCompany);
  },[companies,searchCompanyByText]);
  return (
    <div>
      <Table>
        <TableCaption>list of your recent registered comanies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className='text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.length <= 0 ? (
            <span>You haven't register any Company yet</span>
          ) : (
            filterCompany?.map((company)  =>  (
              <tr key={company._id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={company.logo} />
                </Avatar>
              </TableCell>
              <TableCell>{company.name}</TableCell>
              <TableCell>{company.createAt.split('T')[0]}</TableCell>
              <TableCell>
                <span
                  className="cursor-pointer hover:underline"
                >
                  <Edit2 />
                </span>
              </TableCell>
              </tr>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
