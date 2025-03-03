import React from 'react'
import { FiDownload } from "react-icons/fi";

const EditiorNavbar = () => {
  return (
    <div className="EditiorNavbar flex items-center justify-between px-4 md:px-[100px] h-[60px] md:h-[80px] bg-[#141414]">
      {/* Logo Section */}
      <div className="logo flex items-center">
        <h1 className='text-xl md:text-2xl font-bold text-white truncate'>
          NexGen Studios
        </h1>
      </div>

      {/* File Path - Hidden on mobile */}
      <p className="hidden md:block text-sm md:text-base text-gray-300 truncate max-w-[200px] lg:max-w-none">
        File / <span className='text-gray-400'>My first project</span>
      </p>

      {/* Download Button */}
      <button className="flex items-center space-x-1 md:space-x-2 btn bg-black hover:bg-gray-800 rounded-[5px] cursor-pointer transition-colors px-2 py-1 md:p-2">
        <FiDownload className="text-lg md:text-xl" />
        <span className="hidden sm:inline-block text-sm md:text-base">Export</span>
      </button>
    </div>
  )
}

export default EditiorNavbar