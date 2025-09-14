import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Topnav = () => {
  const [query, setquery] = useState("");
  const [searches, setsearches] = useState(null);
     const GetSerches = async()=>{
    try {
      const data= await axios.get(`/search/multi?query=${query}`);
      setsearches(data.results); 
    } catch (error) {
      console.log("Errror :",error)
    }
   };
   useEffect
   (()=>{
      GetSerches();
   },[query])
  return (
    <div className="w-full h-[8vh] relative flex justify-start ml-[15%] items-center">
      <i classname="text-zinc-400 text-3xl ri-search-line"></i>
      <input
        onChange={(e)=> setquery(e.target.value)}
        value={query}
        className="w-[50%] p-5 text-xl outline-none border-none bg-transparent text-zinc-400  mx-10"
        type="text"
        placeholder="search anything"
      />
      {query.length >0 &&(
        
        <i onClick={()=>{setquery("")}} classname="text-zinc-400 text-3xl ri-close-fill"></i>
      )}

      <div className="w-[50%] max-h-[50vh] bg-zinc-200 absolute top-[90%] overflow-auto rounded-lg">
        {searches.map((s,i)=><Link key={} className="w-[100%] font-semibold hover:text-black hover:bg-zinc-300 duration-300 text-zinc-600  p-10 flex justify-start items-center border-b-2 border-zinc-100">
          <img src="" className="" alt="" />
          <span>Hello Everyone</span>
        </Link>)}
        
      </div>
    </div>
  );
};

export default Topnav;
