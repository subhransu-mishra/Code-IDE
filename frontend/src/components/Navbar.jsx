import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import { MdLightMode, MdMenu, MdClose } from "react-icons/md";
import { BsGridFill } from "react-icons/bs";
import { api_base_url, toggleClass } from "../helper";
import "./../styles/Navbar.css";

const Navbar = ({ isGridLayout, setIsGridLayout }) => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch(api_base_url + "/getUserDetails", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setData(data.user);
        } else {
          setError(data.message);
          logout();
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    setMobileMenuOpen(false);
    window.location.reload();
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleAvatarClick = (e) => {
    e.stopPropagation();
    toggleClass(".dropDownNavbar", "hidden");
    if (window.innerWidth < 768) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="navbar fixed w-full top-0 z-50 backdrop-blur-lg bg-black md:bg-black/80 shadow-xl transition-all duration-300 hover:bg-black md:hover:bg-black/90">
      <div className="flex items-center justify-between px-4 md:px-8 lg:px-[100px] h-[70px] md:h-[80px]">
        <div className="logo transform transition duration-500 hover:scale-105">
          <h1 className="text-white text-base md:text-lg font-bold">NexGen Studios</h1>
        </div>

        {/* Mobile Menu Button */}
        <div className="block md:hidden">
          <button 
            onClick={toggleMobileMenu}
            className="text-white p-2 focus:outline-none"
          >
            {mobileMenuOpen ? 
              <MdClose className="text-2xl" /> : 
              <MdMenu className="text-2xl" />
            }
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {["How to use"].map((link) => (
            <Link
              key={link}
              to={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
            >
              {link}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}

          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 rounded-lg ml-4 hover:bg-red-700 transform transition-all duration-300 hover:scale-105 shadow-red-glow text-white"
          >
            Logout
          </button>

          <Avatar
            onClick={handleAvatarClick}
            name={data?.name || ""}
            size="40"
            round="50%"
            className="cursor-pointer ml-4 transition-transform duration-300 hover:scale-110 shadow-lg"
          />
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden fixed inset-0 top-[70px] bg-[#121212] z-40 mobilemenu transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col p-5 h-full">
            <div className="flex items-center justify-between mb-6">
              <Avatar
                onClick={handleAvatarClick}
                name={data?.name || ""}
                size="50"
                round="50%"
                className="cursor-pointer transition-transform duration-300 hover:scale-110 shadow-lg"
              />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-white truncate">
                  {data?.name || ""}
                </h3>
              </div>
            </div>
            
            <div className="py-3 border-t border-white/10">
              {["How to use"].map((link) => (
                <Link
                  key={link}
                  to={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block py-3 text-gray-300 hover:text-white transition-colors duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link}
                </Link>
              ))}
            </div>
            
            <div className="mt-4 space-y-3 border-t border-white/10 py-3">
              <button className="flex items-center gap-3 p-2 w-full rounded-lg hover:bg-white/10 transition-all duration-200">
                <MdLightMode className="text-xl" />
                <span>Light Mode</span>
              </button>
              <button
                onClick={() => {
                  setIsGridLayout(!isGridLayout);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 p-2 w-full rounded-lg hover:bg-white/10 transition-all duration-200"
              >
                <BsGridFill className="text-xl" />
                <span>{isGridLayout ? "List" : "Grid"} Layout</span>
              </button>
            </div>
            
            <div className="mt-auto mb-8">
              <button
                onClick={logout}
                className="w-full py-3 bg-red-600 rounded-lg hover:bg-red-700 transition-all duration-300 text-white font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Dropdown for Desktop */}
        <div className="dropDownNavbar hidden absolute right-4 md:right-8 lg:right-[60px] top-[70px] md:top-[80px] bg-gradient-to-br from-[#1A1919] to-[#2d2d2d] rounded-xl shadow-2xl p-4 w-[180px] backdrop-blur-lg border border-white/10 animate-slideDown">
          <div className="py-2 border-b border-white/20">
            <h3 className="text-lg font-medium text-white truncate">
              {data?.name || ""}
            </h3>
          </div>
          <div className="flex flex-col gap-2 mt-3">
            <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-all duration-200">
              <MdLightMode className="text-xl" />
              <span>Light Mode</span>
            </button>
            <button
              onClick={() => setIsGridLayout(!isGridLayout)}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
            >
              <BsGridFill className="text-xl" />
              <span>{isGridLayout ? "List" : "Grid"} Layout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;