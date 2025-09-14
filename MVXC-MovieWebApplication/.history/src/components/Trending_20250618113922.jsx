import React from 'react'
import Topnav from '../templates/Topnav'
import { Link, useNavigate } from 'react-router-dom'
import DropDown from '../templates/DropDown'

const Trending = () => {
  const navigate =  useNavigate()
  return (
    <div className="w-screen h-screen p-4 bg-zinc-900 text-white">
  <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
    
    <h1 className="text-2xl text-zinc-300 font-semibold flex items-center">
      <i
        onClick={() => navigate(-1)}
        className="hover:text-[#D2042D] mr-3 ri-arrow-left-line cursor-pointer"
      ></i>
      Trending
    </h1>

    <div className="flex flex-wrap md:flex-nowrap items-center gap-4 w-full md:w-[80%]">
      <Topnav />
      <DropDown title="Category" options={["movie", "tv", "all"]} func="" />
      <DropDown title="Duration" options={["week", "day"]} func="" />
    </div>
    
  </div>
</div>

  )
}

export default Trending