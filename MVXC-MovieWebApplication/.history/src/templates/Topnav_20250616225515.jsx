import React from "react";

const Topnav = () => {
  return (
    <div className="w-full h-[10vh] relative ">
      <i classname="text-zinc-400 text-3xl ri-search-line"></i>
      <input type="text" placeholder="search anything" />
      <i classname="text-zinc-400 text-3xl ri-close-fill"></i>
    </div>
  );
};

export default Topnav;
