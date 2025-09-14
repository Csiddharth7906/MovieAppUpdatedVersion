import React from "react";
import { Link } from "react-router-dom";

const Sidenav = () => {
  return (
    <div className="w-[20%] h-full  border-r-1 border-zinc-400 p-10">
      <h1 className=" text-2xl text-white font-bold ">
        <i classname="text-[#D2042D] ri-tv-fill mr-2"></i>
        <span className="text-2xl ">MVXC</span>
      </h1>
      <nav className="fle">
        <h1 className="text-white font-semibold text-xl mt-10 mb-5">
          New Feeds
        </h1>
        <Link> Trending</Link>
        <Link> Popular</Link>
        <Link> Movies</Link>
        <Link> Tv Shows</Link>
        <Link> People</Link>
      </nav>
    </div>
  );
};

export default Sidenav;
