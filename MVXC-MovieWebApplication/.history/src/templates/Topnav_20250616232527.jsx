import React from "react";

const Topnav = () => {
  return (
    <div className="w-full h-[10vh] relative flex justify-center items-center">
      <i classname="text-zinc-400 text-3xl ri-search-line"></i>
      <input
        className="w-[50%] p-5 text-xl outline-none border-none bg-transparent  mx-10"
        type="text"
        placeholder="search anything"
      />
      <i classname="text-zinc-400 text-3xl ri-close-fill"></i>
    </div>
  );
};

export default Topnav;
