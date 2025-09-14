import React, { useState } from "react";
import Sidenav from "../templates/Sidenav";

import Topnav from "../templates/Topnav";

const Home = () => {
  document.title = "MVXC | HomePage";
  const [wallpaper, setwallpaper] = useState(null);
  const

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
