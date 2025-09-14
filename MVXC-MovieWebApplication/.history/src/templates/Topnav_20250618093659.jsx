import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpg";

const Topnav = () => {
  const [query, setquery] = useState("");
  const [searches, setsearches] = useState([]);
     const GetSerches = async()=>{
    try {
      const {data}= await axios.get(`/search/multi?query=${query}`);
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
    <div className="w-[90%] h-[8vh] relative flex ml-20 items-center mb-3">
      <i className="text-zinc-400 text-3xl ri-search-line"></i>
      <input
        onChange={(e)=> setquery(e.target.value)}
        value={query}
        className="w-[50%] p-5 text-xl outline-none border-none  text-zinc-400  mx-10"
        type="text"
        placeholder="search anything"
      />
      {query.length >0 &&(
        
        <i onClick={()=>{setquery("")}} className="right-0 text-zinc-400 text-3xl ri-close-fill"></i>
      )}

      <div className="w-[50%] max-h-[50vh] bg-zinc-200 absolute top-[120%] left-[5%] overflow-auto rounded">
        {searches.map((s,i)=> <Link key={i} className="w-[100%] font-semibold hover:text-black hover:bg-zinc-300 duration-300 text-zinc-600  p-10 flex justify-start items-center border-b-2 border-zinc-100">
          <img className="w-[10vh] h-[10vh] shadow-lg object-cover rounded mr-5" src={
            s.backdrop_path ?
            `https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path }`: noimage}  alt="" />
          <span>{s.name ||s.title || s.original_name || s.original_title}</span>
        </Link>)}
      </div>
    </div>
  );
};

export default Topnav;
