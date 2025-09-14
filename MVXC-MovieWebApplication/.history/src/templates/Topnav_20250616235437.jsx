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
        <Link className="w-[100%] bg-blue-500 p-10 flex justify-start items-center border-b-2 border-zinc-1001">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTafKe8N3LSN70oJpjz1IYG8J0eufSTx6h-l9EiobPKJcMYkdaC0aEyMzTnv4yrTpyOt8&usqp=CAU"
            className=""
            alt=""
          />
          <span>Hello Everyone</span>
        </Link>
      </div>
    </div>
  );
};

export default Topnav;
