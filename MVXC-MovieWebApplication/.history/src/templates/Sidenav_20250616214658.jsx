import React from "react";

const Sidenav = () => {
  return (
    <div className="w-[20%] h-full  border-r-1 border-zinc-400 p-10">
      <h1 className=" text-2xl text-white font-bold ">
        <i classname="text-[#55FF55] ri-tv-fill mr-2"></i>
        <span className="text-2xl ">MVXC</span>
      </h1>
      <nav>
        <h1 className="text-white font-semibold text-xl ">New Feeds</h1>
      </nav>
    </div>
  );
};

export default Sidenav;
