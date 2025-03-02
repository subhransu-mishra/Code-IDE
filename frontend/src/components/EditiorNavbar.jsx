import React from 'react'
import logo from "../images/logo.png"
import { FiDownload } from "react-icons/fi";


const EditiorNavbar = () => {
  return (
    <>
      <div className="EditiorNavbar flex items-center justify-between px-[100px] h-[80px] bg-[#141414]">
        <div className="logo">
          <h1 className='text-2xl font-bold text-white'>NexGen Studios</h1>
        </div>
        <p>File / <span className='text-[gray]'>My first project</span></p>
        <i className='p-[8px] btn bg-black rounded-[5px] cursor-pointer text-[20px]'><FiDownload /></i>
      </div>
    </>
  )
}

export default EditiorNavbar