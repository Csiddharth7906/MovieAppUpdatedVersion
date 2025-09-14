import React, { useState } from "react";
import Sidenav from "../templates/Sidenav";

import Topnav from "../templates/Topnav";
import axios from "../utils";

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
