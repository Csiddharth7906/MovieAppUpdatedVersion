import React from "react";
import { Link } from "react-router-dom";

const Sidenav = () => {
  return (
    <div className="w-[20%] h-full  border-r-1 border-zinc-400 p-10">
      <h1 className=" text-2xl text-white font-bold ">
        <i classname="text-[#D2042D] ri-tv-fill mr-2"></i>
        <span className="text-2xl ">MVXC</span>
      </h1>
      <nav className="flex flex-col text-zinc-400 text-xl gap-3">
        <h1 className="text-white font-semibold text-xl mt-10 mb-5">
          New Feeds
        </h1>
        <Link className="hover:bg-[#D2042D] hover:text-white rounded-lg duration-300 p-5">
          <i classname="mr-2 ri-fire-fill"></i>Trending
        </Link>
        <Link className="hover:bg-[#D2042D] hover:text-white rounded-lg duration-300 p-5">
          <i classname="mr-2 ri-bard-fill"></i> Popular
        </Link>
        <Link className="hover:bg-[#D2042D] hover:text-white rounded-lg duration-300 p-5">
          {" "}
          Movies
        </Link>
        <Link className="hover:bg-[#D2042D] hover:text-white rounded-lg duration-300 p-5">
          {" "}
          Tv Shows
        </Link>
        <Link className="hover:bg-[#D2042D] hover:text-white rounded-lg duration-300 p-5">
          {" "}
          People
        </Link>
      </nav>
    </div>
  );
};

export default Sidenav;
