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
      setwallpaper(data.results); 
      data.results(Math.random()*data.results.length)
    } catch (error) {
      console.log("Errror :",error)
    }
   };

   useEffect (()=>{
      !wallpaper && GetHeaderWallpaper();
   },[])

  return (
    <>
      <Sidenav />
      <div className="w-[80%] h-full ">
        <Topnav />
        <Header />
      </div>
    </>
  );
};

export default Home;
