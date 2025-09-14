import React, { useState } from "react";
import { Link } from "react-router-dom";

const Topnav = () => {
  const [query, setquery] = useState("");
  return (
    <div className="w-full h-[8vh] relative flex justify-center items-center">
      <i classname="text-zinc-400 text-3xl ri-search-line"></i>
      <input
        onChange={()=>}
        className="w-[50%] p-5 text-xl outline-none border-none bg-transparent text-zinc-400  mx-10"
        type="text"
        placeholder="search anything"
      />
      <i classname="text-zinc-400 text-3xl ri-close-fill"></i>

      <div className="w-[50%] h-[50vh] bg-zinc-200 absolute top-[90%] overflow-auto">
        <Link className="w-[100%] font-semibold hover:text-black hover:bg-zinc-300 duration-300 text-zinc-600  p-10 flex justify-start items-center border-b-2 border-zinc-100">
          <img src="" className="" alt="" />
          <span>Hello Everyone</span>
        </Link>
      </div>
    </div>
  );
};

export default Topnav;
