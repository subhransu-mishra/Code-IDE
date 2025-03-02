import React, { useEffect, useState } from "react";
import logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import { MdLightMode } from "react-icons/md";
import { BsGridFill } from "react-icons/bs";
import { api_base_url, toggleClass } from "../helper";
import "./../styles/Navbar.css";

const Navbar = ({ isGridLayout, setIsGridLayout }) => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

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
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    window.location.reload();
  };

  const handleLogoutClick = () => {
    setShowLogoutPopup(true);
  };

  const confirmLogout = () => {
    setShowLogoutPopup(false);
    logout();
  };

  const cancelLogout = () => {
    setShowLogoutPopup(false);
  };

  return (
    <div className="navbar fixed w-full top-0 z-50 backdrop-blur-lg bg-black/80 shadow-xl transition-all duration-300 hover:bg-black/90">
      <div className="flex items-center justify-between px-[100px] h-[80px]">
        <div className="logo transform transition duration-500 hover:scale-105">
          <h1 className="text-white text-lg font-bold">NexGen Studios</h1>
        </div>

        <div className="links flex items-center gap-6">
          {["Home", "About", "Contact", "Services"].map((link) => (
            <Link
              key={link}
              to={`/${link.toLowerCase()}`}
              className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
            >
              {link}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}

          <button
            onClick={handleLogoutClick}
            className="px-4 py-2 bg-red-600 rounded-lg ml-4 hover:bg-red-700 transform transition-all duration-300 hover:scale-105 shadow-red-glow"
          >
            Logout
          </button>

          <Avatar
            onClick={() => toggleClass(".dropDownNavbar", "hidden")}
            name={data?.name || ""}
            size="40"
            round="50%"
            className="cursor-pointer ml-4 transition-transform duration-300 hover:scale-110 shadow-lg"
          />
        </div>

        <div className="dropDownNavbar hidden absolute right-[60px] top-[80px] bg-gradient-to-br from-[#1A1919] to-[#2d2d2d] rounded-xl shadow-2xl p-4 w-[180px] backdrop-blur-lg border border-white/10 animate-slideDown">
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

      {showLogoutPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#1a1919] text-white rounded-lg p-6 shadow-xl w-[90%] max-w-sm mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Confirm Logout
            </h3>
            <p className="text-center">Are you sure you want to logout?</p>
            <div className="flex justify-center mt-4 space-x-2">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition-all duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
