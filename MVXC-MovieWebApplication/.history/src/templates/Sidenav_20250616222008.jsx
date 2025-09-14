import React from "react";
import { Link } from "react-router-dom";

const Sidenav = () => {
  return (
    <div className="w-[20%] h-full border-r border-zinc-700 p-8 bg-[#0f0f0f]">
      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white flex items-center">
          <i className="text-[#D2042D] ri-tv-fill mr-2"></i>
          MVXC
        </h1>
      </div>

      {/* New Feeds */}
      <nav className="mb-10">
        <h2 className="text-white font-semibold text-lg mb-4">New Feeds</h2>
        <ul className="flex flex-col gap-2 text-zinc-400 text-base">
          <li>
            <Link
              to="#"
              className="flex items-center gap-2 p-3 rounded-md hover:bg-[#D2042D] hover:text-white transition duration-200"
            >
              <i className="ri-fire-fill"></i> Trending
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="flex items-center gap-2 p-3 rounded-md hover:bg-[#D2042D] hover:text-white transition duration-200"
            >
              <i className="ri-bard-fill"></i> Popular
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="flex items-center gap-2 p-3 rounded-md hover:bg-[#D2042D] hover:text-white transition duration-200"
            >
              <i className="ri-clapperboard-fill"></i> Movies
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="flex items-center gap-2 p-3 rounded-md hover:bg-[#D2042D] hover:text-white transition duration-200"
            >
              <i className="ri-tv-2-fill"></i> TV Shows
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="flex items-center gap-2 p-3 rounded-md hover:bg-[#D2042D] hover:text-white transition duration-200"
            >
              <i className="ri-user-smile-fill"></i> People
            </Link>
          </li>
        </ul>
      </nav>

      <hr className="border-zinc-600 mb-8" />

      {/* Website Info */}
      <nav>
        <h2 className="text-white font-semibold text-lg mb-4">
          Website Information
        </h2>
        <ul className="flex flex-col gap-2 text-zinc-400 text-base">
          <li>
            <Link
              to="#"
              className="flex items-center gap-2 p-3 rounded-md hover:bg-[#D2042D] hover:text-white transition duration-200"
            >
              <i className="ri-information-2-fill"></i> About
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="flex items-center gap-2 p-3 rounded-md hover:bg-[#D2042D] hover:text-white transition duration-200"
            >
              <i className="ri-contacts-fill"></i> Contact
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidenav;
