import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ListCard from "../components/ListCard";
import GridCard from "../components/GridCard";
import { api_base_url } from "../helper";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaFolderOpen, FaTimes, FaSearch } from "react-icons/fa";
import "./../styles/Home.css";
import { toast } from "react-toastify";

const Home = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [projTitle, setProjTitle] = useState("");
  const navigate = useNavigate();
  const [isCreateModelShow, setIsCreateModelShow] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isGridLayout, setIsGridLayout] = useState(false);

  const filteredData = data
    ? data.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const createProj = (e) => {
    if (!projTitle.trim()) {
      alert("Please Enter Project Title");
      return;
    }

    fetch(api_base_url + "/createProject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: projTitle,
        userId: localStorage.getItem("userId")
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setIsCreateModelShow(false);
        setProjTitle("");
        navigate(`/`);
        toast.success("Project created successfully");
      } else {
        toast.error("Project creation failed");
      }
    });
  };

  useEffect(() => {
    // Fetch projects
    fetch(api_base_url + "/getProjects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: localStorage.getItem("userId") })
    })
    .then(res => res.json())
    .then(data => data.success ? setData(data.projects) : setError(data.message));

    // Fetch user data
    fetch(api_base_url + "/getUserDetails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: localStorage.getItem("userId") })
    })
    .then(res => res.json())
    .then(data => data.success ? setUserData(data.user) : setUserError(data.message));
  }, []);

  return (
    <>
      <Navbar isGridLayout={isGridLayout} setIsGridLayout={setIsGridLayout} />
      
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] pb-20 mt-24">
        {/* Header Section */}
        <div className="flex items-center justify-between px-[100px] my-[40px]">
          <h2 className="text-2xl text-white font-medium">
            👋 Welcome back, {userData?.username || "User"}
          </h2>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-[350px] bg-[#202020] rounded-lg text-white 
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500
                         transition-all duration-200"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Create Project Button */}
        <div className="flex justify-center mb-12">
          <button
            onClick={() => setIsCreateModelShow(true)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 
                     rounded-xl text-white font-medium transition-all duration-300 
                     transform hover:scale-105 shadow-lg shadow-blue-500/30"
          >
            <FaPlus className="text-xl" />
            New Project
          </button>
        </div>

        {/* Projects Grid/List */}
        <div className="px-[100px]">
          {filteredData.length > 0 ? (
            <div className={`${isGridLayout ? 
              "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : 
              "space-y-4"}`}
            >
              {filteredData.map((item, index) =>
                isGridLayout ? (
                  <GridCard key={index} item={item} />
                ) : (
                  <ListCard key={index} item={item} />
                )
              )}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <p>No projects found {searchQuery && `for "${searchQuery}"`}</p>
            </div>
          )}
        </div>

        {/* Create Project Modal */}
        {isCreateModelShow && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center animate-fadeIn">
            <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] rounded-2xl p-8 w-[480px] shadow-2xl border border-white/10">
              <button
                onClick={() => setIsCreateModelShow(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>

              <div className="space-y-6">
                <div className="text-center">
                  <FaFolderOpen className="mx-auto text-4xl text-blue-500 mb-3" />
                  <h3 className="text-2xl font-bold text-white">New Project</h3>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={projTitle}
                    onChange={(e) => setProjTitle(e.target.value)}
                    placeholder="Project title"
                    className="w-full px-4 py-3 pl-12 bg-[#252525] rounded-lg text-white 
                             placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500
                             transition-all duration-200"
                    onKeyPress={(e) => e.key === 'Enter' && createProj()}
                  />
                  <FaFolderOpen className="absolute left-4 top-3.5 text-gray-400" />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={createProj}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 
                             bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium 
                             transition-colors duration-200"
                  >
                    <FaPlus />
                    Create Project
                  </button>
                  <button
                    onClick={() => setIsCreateModelShow(false)}
                    className="flex-1 px-4 py-3 border border-white/20 hover:border-white/40 
                             rounded-lg text-white font-medium transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;