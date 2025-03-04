import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import { MdMenu, MdClose } from "react-icons/md";
import { BsGridFill } from "react-icons/bs";
import { api_base_url } from "../helper";
import "./../styles/Navbar.css";
import { BeatLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ isGridLayout, setIsGridLayout }) => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isloading, setIsLoading] = useState(false);
 
  useEffect(() => {
    // Fetch user data
    fetch(api_base_url + "/getUserDetails", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: localStorage.getItem("userId") }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setData(data.user);
        else logout();
      });
  }, []);
 
  const logout = () => {
    setIsLoading(true);
    localStorage.clear();
    navigate("/login");
    setIsLoading(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Animation variants for mobile menu
  const mobileMenuVariants = {
    hidden: { 
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.3
      }
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
        duration: 0.5
      }
    }
  };

  return (
    <div className="navbar fixed w-full top-0 z-50 backdrop-blur-lg bg-white dark:bg-black md:bg-white/80 dark:md:bg-black/80 shadow-sm transition-all duration-300 hover:bg-white/90 dark:hover:bg-black/90">
      <div className="flex items-center justify-between px-4 md:px-8 lg:px-[100px] h-[70px] md:h-[80px]">
        {/* Logo */}
        <Link to="/" className="logo transform transition duration-500 hover:scale-105">
          <h1 className="text-black dark:text-white text-base md:text-lg font-bold">
            NexGen Studios
          </h1>
        </Link>

        {/* Mobile Menu Button */}
        <div className="block md:hidden">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleMobileMenu}
            className="text-black dark:text-white p-2 focus:outline-none"
          >
            {mobileMenuOpen ? <MdClose className="text-2xl" /> : <MdMenu className="text-2xl" />}
          </motion.button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/how-to-use"
            className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300 relative group"
          >
            How to use
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black dark:bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <button
            onClick={() => setIsGridLayout(!isGridLayout)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 text-black dark:text-white"
          >
            <BsGridFill className="text-xl" />
          </button>

          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-300 text-white"
          >
            {isloading ? <BeatLoader color="#fff" size={8} /> : "Logout"}
          </button>

          <Avatar
            name={data?.name || ""}
            size="40"
            round="50%"
            className="cursor-pointer transition-transform duration-300 hover:scale-110 shadow-lg"
          />
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              key="mobile-menu"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={mobileMenuVariants}
              className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-[#000] backdrop-blur-lg shadow-lg border-t border-gray-200 dark:border-white/10"
            >
              <div className="p-4 flex flex-col gap-4">
                <div className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-white/10">
                  <Avatar
                    name={data?.name || ""}
                    size="48"
                    round="50%"
                    className="shadow-lg"
                  />
                  <div>
                    <h3 className="font-medium text-black dark:text-white">{data?.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{data?.email}</p>
                  </div>
                </div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link
                    to="/how-to-use"
                    className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg block"
                    onClick={toggleMobileMenu}
                  >
                    How to use
                  </Link>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <button
                    onClick={() => {
                      setIsGridLayout(!isGridLayout);
                      toggleMobileMenu();
                    }}
                    className="flex items-center gap-3 w-full p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg"
                  >
                    <BsGridFill />
                    <span>{isGridLayout ? "List View" : "Grid View"}</span>
                  </button>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <button
                    onClick={logout}
                    className="w-full mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors duration-300"
                  >
                    {isloading ? <BeatLoader color="#fff" size={8} /> : "Logout"}
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navbar;
