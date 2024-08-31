import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
const filterData = [
  {
    filterType: "Loaction",
    array: [
      "Dehli NCR",
      "Bangalore", 
      "Hyderabad",
      "Pune",
      "Mumbai",
      "Kolkata",
      "Gurugram",
    ],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Development",
      "Backend Development",
      "FullStack Development",
      "Data Analytics",
      "HR",
    ],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "41-60k", "61-1lakh", "1-5lack", "5-10lakh", "10-20lakh"],
  },
];
const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();
  const ChangeHandler= (value)=>{
    setSelectedValue(value);
  }
  useEffect(()=>{
    dispatch(setSearchedQuery(selectedValue));
  },[])
  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup value={selectedValue} onValueChange={ChangeHandler}>
        {filterData.map((data, i) => (
          <div>
            <h1 className="font-bold text-lg">{data.filterType}</h1>
            {data.array.map((item, index) => {
              const itemId = `id${index}-${idx}`
              return (
                <div className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlfor={itemId}>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
