import React from 'react'
import Topnav from '../templates/Topnav'
import { Link, useNavigate } from 'react-router-dom'
import DropDown from '../templates/DropDown'

const Trending = () => {
  const navigate =  useNavigate()
  return (
    <div className='w-screen h-screen p-[3%]'>
        <div className='w-full   flex items-center justify-center'>
            
            <h1 className='w-[20%] text-2xl text-zinc-400 font-semibold '> 
                <i onClick={()=>navigate(-1)} className="hover:text-[#D2042D] mr-3 ri-arrow-left-line  "></i>
                 Trending
                 </h1>
                <div className='flex justify-between'>
              <Topnav  />  
              <DropDown title="Category" options={["movie","tv","all"]} func="" />
              <div className='w-[2%]'></div>
               <DropDown title="Duration" options={["week","day"]} func="" />
                </div>
        </div>
    </div>
  )
}

export default Trending