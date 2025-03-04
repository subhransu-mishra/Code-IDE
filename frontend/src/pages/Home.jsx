import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ListCard from "../components/ListCard";
import GridCard from "../components/GridCard";
import { api_base_url } from "../helper";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaFolderOpen, FaTimes } from "react-icons/fa";
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
    ? data.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const createProj = (e) => {
    if (!projTitle.trim()) {
      toast.error("Please Enter Project Title");
      return;
    }

    fetch(api_base_url + "/createProject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: projTitle,
        userId: localStorage.getItem("userId"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
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
      body: JSON.stringify({ userId: localStorage.getItem("userId") }),
    })
      .then((res) => res.json())
      .then((data) =>
        data.success ? setData(data.projects) : setError(data.message)
      );

    // Fetch user data
    fetch(api_base_url + "/getUserDetails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: localStorage.getItem("userId") }),
    })
      .then((res) => res.json())
      .then((data) =>
        data.success ? setUserData(data.user) : setError(data.message)
      );
  }, []);

  return (
    <>
      <Navbar isGridLayout={isGridLayout} setIsGridLayout={setIsGridLayout} />

      <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] pb-20 pt-[80px] md:mt-24">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-4 sm:px-6 lg:px-[100px] my-6 md:my-[40px] gap-4">
          {/* Empty div for spacing */}
          <div className="hidden md:block"></div>

          {/* Right-aligned controls */}
          <div className="flex flex-col md:flex-row items-end md:items-center gap-4 w-full md:w-auto">
            {/* Search Box */}
            <div className="relative w-full md:w-[250px] lg:w-[350px]">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-4 py-2 w-full bg-[#202020] rounded-lg text-white 
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500
                         transition-all duration-200"
              />
            </div>

            {/* New Project Button */}
            <button
              onClick={() => setIsCreateModelShow(true)}
              className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 
                       rounded-xl text-white font-medium transition-all duration-300 
                       transform hover:scale-105 shadow-lg shadow-blue-500/30 w-full md:w-auto justify-center"
            >
              <FaPlus className="text-lg sm:text-xl" />
              New Project
            </button>
          </div>
        </div>
        {isCreateModelShow && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-[#202020] rounded-lg p-6 w-[90%] sm:w-[400px] shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg text-white font-semibold">
                  Create New Project
                </h2>
                <button
                  onClick={() => setIsCreateModelShow(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              <input
                type="text"
                placeholder="Enter project title"
                value={projTitle}
                onChange={(e) => setProjTitle(e.target.value)}
                className="w-full p-2 mb-4 rounded bg-[#303030] text-white outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                onClick={createProj}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-all"
              >
                Create
              </button>
            </div>
          </div>
        )}

        {/* Projects Grid/List */}
        <div className="px-4 sm:px-6 lg:px-[100px]">
          {filteredData.length > 0 ? (
            <div
              className={
                isGridLayout
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                  : "space-y-4"
              }
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
            <div className="text-center py-12 sm:py-20 text-gray-400">
              <FaFolderOpen className="mx-auto text-3xl mb-4 text-gray-500/50" />
              <p className="text-lg">
                No projects found {searchQuery && `for "${searchQuery}"`}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Click "New Project" to get started
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
