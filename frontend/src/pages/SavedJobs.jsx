import Navbar from '@/components/shared/Navbar'
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import { Bookmark } from 'lucide-react'
import React from 'react'

const SavedJobs = () => {
  return (
    <div>
      <Navbar />
      <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 mt-2 m-4'>
        <div
          onClick={() => navigate(`/`)}
          className="p-5 rounded-md shadow-xl bg-gray-100 border-gray-800 cursor-pointer mt-2"
        ><div className="flex items-center justify-between gap-4 border-gray-300">
        <p className="text-sm font-semibold text-gray-400">
          "4 days ago"
          </p>
        <Button variant="outline" className="rounded-full" size='icon'>
          <Bookmark />
        </Button>
      </div>
          <div className='flex flex-row gap-3 text-center mt-1'>
            <Button className="p-6 rounded-full" variant="outline" size="icon">
            <Avatar>
            <AvatarImage src="https://wallpapers.com/images/high/white-letter-s-name-black-r0fw7pwpw9y4t5uz.webp" />
          </Avatar>
            </Button>
            <div>
            <h1 className="font-mediem text-lg text-center mt-2">google</h1>
            <p className="text-sm text-gray-500 text-[15px] mr-4 ">pune</p>
            </div>
          </div>
          <div>
            <h1 className="font-bold text-lg my-2">frontend developer</h1>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi,
              unde!
            </p>
          </div>
          <div className="flex items-center gap-3  mt-4">
          <span className='bg-gray-300 rounded-lg w-28 text-center'> opening 12 </span>
            <span className='bg-gray-300 rounded-lg w-20 text-center'>full time</span>
            <span className='bg-gray-300 rounded-lg w-12 text-center'>1 lpa</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SavedJobs