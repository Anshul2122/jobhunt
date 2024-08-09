import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const category = [
  "Frontend Developer",
  "React js developer",
  "Backend Developer",
  "Full Stack Developer",
  "Mobile Developer",
  "Data Scientist",
  "UX/UI Designer",
  "Data Analyts",
  "Buisses Analyts",
  "Pyhton Developer",
  "Javascript Developer",
  "Java Developer",
  "cloud computing",
  "Data science",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = (query)=>{
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  }
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className=" rounded-3xl items-center md:basis-1/3 lg-basis-1/4"
            >
              <Button
                onClick={()=>searchJobHandler(cat)}
                variant="outline"
                className="rounded-3xl hover:bg-gray-300"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
