import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useMobile } from "../contexts/MobileContext";

const Sidenav = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { isSidenavOpen, closeSidenav } = useMobile();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    setShowProfileDropdown(false);
  };

  const handleLinkClick = () => {
    closeSidenav();
    setShowProfileDropdown(false);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isSidenavOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeSidenav}
        />
      )}
      
      {/* Sidenav */}
      <div className={`
        w-[20%] h-screen border-r border-zinc-600 p-8 bg-[#1F1E24]
        lg:relative lg:translate-x-0 lg:block
        fixed top-0 left-0 z-50 transition-transform duration-300 ease-in-out
        ${isSidenavOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:w-[20%] w-[280px]
      `}>
      {/* Logo */}
      <h1 className="text-2xl text-white font-bold flex items-center mb-3">
        <img src="/mvxclogo.jpg" alt="MVXC Logo" className="h-8 w-8 rounded-full object-cover mr-2" />
        MVXC
      </h1>

      {/* New Feeds */}
      <nav className="text-zinc-400 text-lg flex flex-col gap-2">
        <h2 className="text-white font-semibold mt-4 mb-2">New Feeds</h2>
        <Link to="/trending" onClick={handleLinkClick} className="hover:bg-[#D2042D] hover:scale-110  duration-300   hover:text-white rounded-md transition duration-200 p-3 flex items-center">
          <i className="mr-2 ri-fire-fill"></i> Trending
        </Link>
        <Link to="/popular" onClick={handleLinkClick} className="hover:bg-[#D2042D] hover:scale-110  duration-300   hover:text-white rounded-md transition duration-200 p-3 flex items-center">
          <i className="mr-2 ri-bard-fill"></i> Popular
        </Link>
        <Link to="/movie" onClick={handleLinkClick} className="hover:bg-[#D2042D] hover:scale-110  duration-300   hover:text-white rounded-md transition duration-200 p-3 flex items-center">
          <i className="mr-2 ri-clapperboard-fill"></i> Movies
        </Link>
        <Link to="/tv" onClick={handleLinkClick} className="hover:bg-[#D2042D] hover:scale-110  duration-300   hover:text-white rounded-md transition duration-200 p-3 flex items-center">
          <i className="mr-2 ri-tv-2-fill"></i> TV Shows
        </Link>
        <Link to="/person" onClick={handleLinkClick} className="hover:bg-[#D2042D] hover:scale-110  duration-300   hover:text-white rounded-md transition duration-200 p-3 flex items-center">
          <i className="mr-2 ri-user-smile-fill"></i> People
        </Link>
      </nav>

      <hr className="border-none h-[1px] bg-zinc-500 my-6" />

      {/* Authentication */}
      <nav className="text-zinc-400 text-lg flex flex-col gap-2">
        <h2 className="text-white font-semibold mt-4 mb-3">
          Account
        </h2>
        {isAuthenticated ? (
          <div className="relative">
            {/* User Profile */}
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="w-full hover:bg-[#D2042D] hover:scale-110 duration-300 hover:text-white rounded-md transition duration-200 p-3 flex items-center justify-between"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 bg-[#D2042D] rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-semibold text-sm">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-white font-medium text-sm">{user?.name || 'User'}</p>
                  <p className="text-zinc-400 text-xs">{user?.email}</p>
                </div>
              </div>
              <i className={`ri-arrow-${showProfileDropdown ? 'up' : 'down'}-s-line`}></i>
            </button>

            {/* Profile Dropdown */}
            {showProfileDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#2A2930] border border-zinc-600 rounded-lg shadow-xl z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-3 text-zinc-300 hover:bg-[#D2042D] hover:text-white transition duration-200 rounded-t-lg"
                  onClick={handleLinkClick}
                >
                  <i className="ri-user-line mr-2"></i>
                  My Profile
                </Link>
                <Link
                  to="/watchlist"
                  className="block px-4 py-3 text-zinc-300 hover:bg-[#D2042D] hover:text-white transition duration-200"
                  onClick={handleLinkClick}
                >
                  <i className="ri-bookmark-line mr-2"></i>
                  Watchlist
                </Link>
                <Link
                  to="/favorites"
                  className="block px-4 py-3 text-zinc-300 hover:bg-[#D2042D] hover:text-white transition duration-200"
                  onClick={handleLinkClick}
                >
                  <i className="ri-heart-line mr-2"></i>
                  Favorites
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-zinc-300 hover:bg-red-600 hover:text-white transition duration-200 rounded-b-lg"
                >
                  <i className="ri-logout-box-line mr-2"></i>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/auth" onClick={handleLinkClick} className="hover:bg-[#D2042D] hover:scale-110  duration-300   hover:text-white rounded-md transition duration-200 p-3 flex items-center">
            <i className="mr-2 ri-login-box-fill"></i> Login / Sign Up
          </Link>
        )}
      </nav>

      <hr className="border-none h-[1px] bg-zinc-500 my-6" />

      {/* Website Information */}
      <nav className="text-zinc-400 text-lg flex flex-col gap-2">
        <h2 className="text-white font-semibold mt-4 mb-3">
          Website Information
        </h2>
        <Link className="hover:bg-[#D2042D] hover:scale-110  duration-300   hover:text-white rounded-md transition duration-200 p-3 flex items-center">
          <i className="mr-2 ri-information-2-fill"></i> About MVXC
        </Link>
        <Link className="hover:bg-[#D2042D] hover:scale-110  duration-300   hover:text-white rounded-md transition duration-200 p-3 flex items-center">
          <i className="mr-2 ri-phone-fill"></i> Contact Us
        </Link>
      </nav>
      </div>
    </>
  );
};

export default Sidenav;
