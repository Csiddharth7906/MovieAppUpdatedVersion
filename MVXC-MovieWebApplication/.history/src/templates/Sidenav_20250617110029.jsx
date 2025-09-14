import React from "react";
import { Link } from "react-router-dom";

const Sidenav = () => {
   const GetSerches = async()=>{
    try
   }
  return (
    <div className="w-[20%] h-full border-r border-zinc-600 p-8 bg-[#1F1E24]">
      {/* Logo */}
      <h1 className="text-3xl text-white font-bold flex items-center mb-8">
        <i className="text-[#D2042D] ri-tv-fill mr-2 text-4xl"></i>
        MVXC
      </h1>

      {/* New Feeds */}
      <nav className="text-zinc-400 text-lg flex flex-col gap-2">
        <h2 className="text-white font-semibold mt-4 mb-3">New Feeds</h2>
        <Link className="hover:bg-[#D2042D] hover:text-white rounded-md transition duration-200 p-3 flex items-center">
          <i className="mr-2 ri-fire-fill"></i> Trending
        </Link>
        <Link className="hover:bg-[#D2042D] hover:text-white rounded-md transition duration-200 p-3 flex items-center">
          <i className="mr-2 ri-bard-fill"></i> Popular
        </Link>
        <Link className="hover:bg-[#D2042D] hover:text-white rounded-md transition duration-200 p-3 flex items-center">
          <i className="mr-2 ri-clapperboard-fill"></i> Movies
        </Link>
        <Link className="hover:bg-[#D2042D] hover:text-white rounded-md transition duration-200 p-3 flex items-center">
          <i className="mr-2 ri-tv-2-fill"></i> TV Shows
        </Link>
        <Link className="hover:bg-[#D2042D] hover:text-white rounded-md transition duration-200 p-3 flex items-center">
          <i className="mr-2 ri-user-smile-fill"></i> People
        </Link>
      </nav>

      <hr className="border-none h-[1px] bg-zinc-500 my-6" />

      {/* Website Information */}
      <nav className="text-zinc-400 text-lg flex flex-col gap-2">
        <h2 className="text-white font-semibold mt-4 mb-3">
          Website Information
        </h2>
        <Link className="hover:bg-[#D2042D] hover:text-white rounded-md transition duration-200 p-3 flex items-center">
          <i className="mr-2 ri-information-2-fill"></i> About MVXC
        </Link>
        <Link className="hover:bg-[#D2042D] hover:text-white rounded-md transition duration-200 p-3 flex items-center">
          <i className="mr-2 ri-phone-fill"></i> Contact Us
        </Link>
      </nav>
    </div>
  );
};

export default Sidenav;
