import React from 'react'
import Topnav from '../templates/Topnav'
import { Link, useNavigate } from 'react-router-dom'

const Trending = () => {
  const navigate =  useNavigate()
  return (
    <div className='w-screen h-screen p-[3%]'>
        <div className='w-full   flex items-center'>
            
            <h1 className='text-2xl text-zinc-400 font-semibold'> 
                <i onClick={()=>navigate(-1)} className="hover:text-[#D2042D] ri-arrow-left-line pl-5 "></i>
                 Trending
                 </h1>
        </div>
    </div>
  )
}

export default Trending