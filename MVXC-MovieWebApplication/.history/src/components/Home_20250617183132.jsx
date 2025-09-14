import React, { useEffect, useState } from "react";
import Sidenav from "../templates/Sidenav";
import axios from "../utils/axios";
import Topnav from "../templates/Topnav";


const Home = () => {
  document.title = "MVXC | HomePage";
  const [wallpaper, setwallpaper] = useState(null);
  const GetHeaderWallpaper =async()=>{
    try {
      const {data}= await axios.get(`/trending/all/day`);
      setsearches(data.results); 
      
    } catch (error) {
      console.log("Errror :",error)
    }
   };

   useEffect (()=>{
      !wallpaper 
   },[])

  return (
    <>
      <Sidenav />
      <div className="w-[80%] h-full ">
        <Topnav />
      </div>
    </>
  );
};

export default Home;
