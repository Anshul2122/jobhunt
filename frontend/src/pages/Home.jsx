import React, { useEffect } from "react";
import Navbar from "../components/shared/Navbar";
import HeroSection from "../components/HeroSection";
import CategoryCarousel from "../components/CategoryCarousel";
import LatestJobs from "../components/LatestJobs";
import Footer from "../components/shared/Footer";
import useGetAllJobs from "@/components/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  useGetAllJobs();
  const navigate = useNavigate();
  const {user} = useSelector(store=>store.auth);
  useEffect(()=>{
    if(user?.role==='recruiter'){
      navigate('/admin/companies');
    }
  },[]);
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </div>
  );
};

export default Home;
