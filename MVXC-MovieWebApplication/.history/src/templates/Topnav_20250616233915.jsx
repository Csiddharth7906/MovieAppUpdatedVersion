import React from "react";
import { Link } from "react-router-dom";

const Topnav = () => {
  return (
    <div className="w-full h-[8vh] relative flex justify-center items-center">
      <i classname="text-zinc-400 text-3xl ri-search-line"></i>
      <input
        className="w-[50%] p-5 text-xl outline-none border-none bg-transparent text-zinc-400  mx-10"
        type="text"
        placeholder="search anything"
      />
      <i classname="text-zinc-400 text-3xl ri-close-fill"></i>

      <div className="w-[50%] h-[50vh] bg-red-100 absolute top-[90%]">
        <Link className="p-10">
          <img src="" alt="" />
          <span>Hello Everyone</span>
        </Link>
      </div>
    </div>
  );
};

export default Topnav;
