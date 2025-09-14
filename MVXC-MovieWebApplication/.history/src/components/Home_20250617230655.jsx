import React, { useEffect, useState } from "react";
import Sidenav from "../templates/Sidenav";
import axios from "../utils/axios";
import Topnav from "../templates/Topnav";
import Header from "../templates/Header";
import HorizontalCards from "../templates/HorizontalCards";


const Home = () => {
  document.title = "MVXC | HomePage";
  const [wallpaper, setwallpaper] = useState(null);
  const [trending, settrending] = useState(null)
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
      const {data}= await axios.get(`/trending//day`);
      settrending(data.results)
    } catch (error) {
      console.log("Errror :",error)
    }
   };
   
       useEffect (()=>{
        
          
          !wallpaper && GetHeaderWallpaper();
          !trending && GetTrending();
       
     },[])

    
  
  return wallpaper && trending ?(
    <>
      <Sidenav />
      <div className="w-[80%] h-full overflow-auto overflow-x-hidden">
        <Topnav />
        <Header data={wallpaper}/>
        <HorizontalCards data={trending}/>
      </div>
    </>
  ):<h1>Loading</h1>
};

export default Home;
