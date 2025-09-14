import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMobile } from "../contexts/MobileContext";
import noimage from "/noimage.jpg";

const Topnav = () => {
  const [query, setquery] = useState("");
  const [searches, setsearches] = useState([]);
  const { toggleSidenav } = useMobile();
  
  const GetSerches = async()=>{
    try {
      const {data}= await axios.get(`/search/multi?query=${query}`);
      setsearches(data.results); 
      
    } catch (error) {
      console.log("Errror :",error)
    }
  };
  
  useEffect(()=>{
    GetSerches();
  },[query])
  
  return (
    <div className="w-full max-w-full h-[10vh] lg:h-[8vh] relative flex items-center mb-4 px-3 lg:w-[90%] lg:ml-20 lg:px-0 bg-gradient-to-r from-[#1F1E24] to-[#2A2930] lg:bg-none rounded-lg lg:rounded-none shadow-lg lg:shadow-none">
      {/* Hamburger Menu Button - Mobile Only */}
      <button
        onClick={toggleSidenav}
        className="lg:hidden text-zinc-300 hover:text-[#D2042D] text-2xl mr-3 p-2 rounded-lg hover:bg-zinc-800 transition-all duration-200"
      >
        <i className="ri-menu-line"></i>
      </button>
      
      {/* Search Container */}
      <div className="flex-1 flex items-center bg-zinc-800 lg:bg-transparent rounded-lg lg:rounded-none px-3 lg:px-0 py-2 lg:py-0">
        <i className="text-zinc-400 hover:text-[#D2042D] text-xl lg:text-2xl ri-search-line"></i>
        <input
          onChange={(e)=> setquery(e.target.value)}
          value={query}
          className="flex-1 lg:w-[50%] p-2 lg:p-5 text-base lg:text-xl outline-none border-none text-zinc-300 lg:text-zinc-400 mx-3 lg:mx-10 bg-transparent placeholder-zinc-500"
          type="text"
          placeholder="Search movies, TV shows..."
        />
        {query.length >0 &&(
          <i onClick={()=>{setquery("")}} className="hover:text-[#D2042D] text-zinc-400 text-xl lg:text-3xl ri-close-fill cursor-pointer p-1 hover:bg-zinc-700 lg:hover:bg-transparent rounded transition-all duration-200"></i>
        )}
      </div>

      {/* Search Results Dropdown */}
      <div className="w-[90%] lg:w-[60%] max-h-[50vh] z-[99999] bg-zinc-200 absolute top-[120%] left-[5%] overflow-auto rounded">
        {searches && searches.map((s,i)=> <Link to={`/${s.media_type}/details/${s.id}`} key={i} className="w-[100%] font-semibold hover:text-black hover:bg-zinc-300 duration-300 text-zinc-600 p-4 lg:p-10 flex justify-start items-center border-b-2 border-zinc-100">
          <img className="w-[8vh] h-[8vh] lg:w-[10vh] lg:h-[10vh] object-cover rounded-md shadow-lg mr-3 lg:mr-5" src={
            s.backdrop_path || s.profile_path?
            `https://image.tmdb.org/t/p/original/${s.poster_path ||s.backdrop_path || s.profile_path }`: noimage}  alt="" />
          <span className="text-sm lg:text-base">{s.name ||s.title || s.original_name || s.original_title}</span>
        </Link>)}
      </div>
    </div>
  );
};

export default Topnav;
