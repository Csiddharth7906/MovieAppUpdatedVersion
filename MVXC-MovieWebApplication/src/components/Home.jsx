import React, { useEffect, useState } from "react";
import Sidenav from "../templates/Sidenav";
import axios from "../utils/axios";
import Topnav from "../templates/Topnav";
import Header from "../templates/Header";
import HorizontalCards from "../templates/HorizontalCards";
import DropDown from "../templates/DropDown";
import Loading from "./Loading";


const Home = () => {
  document.title = "MVXC | HomePage";
  const [wallpaper, setwallpaper] = useState(null);
  const [trending, settrending] = useState(null);
  const [category, setcategory] = useState("all")
  const GetHeaderWallpaper =async()=>{
    try {
      const {data}= await axios.get(`/trending/all/day`);
      let randomedata = data.results[(Math.random()*data.results.length).toFixed()];
      setwallpaper(randomedata); 
    } catch (error) {
      console.log("Errror :",error)
    }
   };
    const GetTrending =async()=>{
    try {
      const {data}= await axios.get(`/trending/${category}/day`);
      settrending(data.results)
    } catch (error) {
      console.log("Errror :",error)
    }
   };
   
       useEffect (()=>{
        
          
         GetTrending();
          !wallpaper && GetHeaderWallpaper();
       
     },[category])

    
  
  return wallpaper && trending ?(
    <>
      <Sidenav />
      <div className="w-full max-w-full lg:w-[80%] h-full overflow-auto overflow-x-hidden">
        <Topnav />
        <Header data={wallpaper}/>
         <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 lg:p-5 bg-gradient-to-r from-zinc-900/50 to-zinc-800/30 lg:bg-none rounded-lg lg:rounded-none mx-4 lg:mx-0 mb-2 lg:mb-0'>
        <div>
          <h1 className='text-2xl lg:text-3xl font-bold text-white lg:text-zinc-400 mb-1'>Trending</h1>
          <p className='text-sm text-zinc-400 lg:hidden'>Discover what's popular right now</p>
        </div>
        <DropDown title="Filter" options={["tv","movie","all"]} func={(e)=>setcategory(e.target.value)} />
        </div>

        <HorizontalCards data={trending} />
      </div>
    </>
  ):<Loading/>
};

export default Home;
