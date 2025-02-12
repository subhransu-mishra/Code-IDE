import React, { useEffect, useState } from 'react';
import logo from "../images/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import Avatar from 'react-avatar';
import { MdLightMode } from "react-icons/md";
import { BsGridFill } from "react-icons/bs";
import { api_base_url, toggleClass } from '../helper';

const Navbar = ({ isGridLayout, setIsGridLayout }) => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    fetch(api_base_url + "/getUserDetails", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId")
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        setData(data.user);
      } else {
        setError(data.message);
      }
    });
  }, []);

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="navbar fixed w-full z-50 backdrop-blur-lg bg-black/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo with hover effect */}
        <div className="logo transform transition duration-300 hover:scale-105">
          <img className="w-32 cursor-pointer" src={logo} alt="Logo" />
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-8">
          <div className="hidden md:flex items-center space-x-6">
            {['Home', 'About', 'Contact', 'Services'].map((item) => (
              <Link 
                key={item}
                className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={logout}
              className="px-4 py-2 bg-red-600/30 hover:bg-red-600/40 text-red-400 rounded-lg transition-all duration-300 
                        transform hover:scale-105 border border-red-400/20 hover:border-red-400/40 flex items-center"
            >
              <span className="text-sm font-medium">Logout</span>
            </button>

            <div className="relative">
              <Avatar 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                name={data?.name || ""} 
                size="40" 
                round="50%"
                className="cursor-pointer transition-transform duration-300 hover:scale-110 border-2 border-white/20 hover:border-white/40"
              />

              {/* Animated Dropdown */}
              <div className={`absolute right-0 top-14 bg-black/90 backdrop-blur-sm rounded-xl shadow-2xl p-3 w-48 
                              transition-all duration-300 origin-top ${isDropdownOpen ? 'scale-y-100 opacity-100' : 'scale-y-95 opacity-0 invisible'}`}>
                <div className="flex flex-col space-y-3">
                  <div className="pb-2 border-b border-white/10">
                    <h3 className="text-white font-medium truncate">{data?.name || "User"}</h3>
                    <p className="text-xs text-gray-400 truncate">{data?.email || ""}</p>
                  </div>
                  
                  <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200">
                    <MdLightMode className="text-lg" />
                    <span>Light Mode</span>
                  </button>
                  
                  <button 
                    onClick={() => setIsGridLayout(!isGridLayout)}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    <BsGridFill className="text-lg" />
                    <span>{isGridLayout ? "List View" : "Grid View"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;