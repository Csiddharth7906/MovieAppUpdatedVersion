import React from 'react'
import Topnav from '../templates/Topnav'
import { Link, useNavigate } from 'react-router-dom'
import DropDown from '../templates/DropDown'

const Trending = () => {
  const navigate =  useNavigate()
  return (
    <div className='w-screen h-screen p-[2%]'>
        <div className='w-full   flex items-center justify-between'>
            
            <h1 className=' text-2xl text-zinc-400 font-semibold '> 
                <i onClick={()=>navigate(-1)} className="hover:text-[#D2042D] mr-3 ri-arrow-left-line  "></i>
                 Trending
                 </h1>
                <div className='flex  items-center w-[80%]'>
               <span className='mb-10'><Topnav   />  </span>
              <DropDown title="Category" options={["movie","tv","all"]} func="" />
              <div className='w-[2%]'></div>
               <DropDown title="Duration" options={["week","day"]} func="" />
                </div>
        </div>
    </div>
  )
}

export default Trending