import React from "react";
import Sidenav from "../templates/Sidenav";

const Home = () => {
  document.title = "MVXC | HomePage";
  return (
    <>
      <Sidenav />
      <div className="w-[80%] h-full bg-red-300"></div>
    </>
  );
};

export default Home;
