import React, { useEffect, useState } from "react";
import Sidenav from "../templates/Sidenav";
import axios from "../utils/axios";
import Topnav from "../templates/Topnav";
import Header from "../templates/Header";


const Home = () => {
  document.title = "MVXC | HomePage";
  const [wallpaper, setwallpaper] = useState(null);
  const GetHeaderWallpaper =async()=>{
    try {
      const {data}= await axios.get(`/trending/all/day`);
      let randomedata = data.results[(Math.random()*data.results.length).toFixed()];
      setwallpaper(randomedata); 
    } catch (error) {
      console.log("Errror :",error)
    }
   };
   console.log(wallpaper)
   
       useEffect (()=>{
        setInterval(() => {
          
        }, 500);
      !wallpaper && GetHeaderWallpaper();
     },[])

    
  
  return wallpaper?(
    <>
      <Sidenav />
      <div className="w-[80%] h-full ">
        <Topnav />
        <Header data={wallpaper}/>
      </div>
    </>
  ):<h1>Loading</h1>
};

export default Home;
