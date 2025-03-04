import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api_base_url } from "../helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { BeatLoader } from "react-spinners";
import { IoLogoGithub } from "react-icons/io5";
import { FaCodeCompare } from "react-icons/fa6";


const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const notifySuccess = () =>
    toast.success("Login successful!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

  const submitForm = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(api_base_url + "/login", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password: pwd }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.success) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("userId", data.userId);
          notifySuccess();
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        } else {
          setError(data.message);
        }
      })
      .catch(() => {
        setLoading(false);
        setError("Something went wrong. Please try again.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0d1117] to-[#161b22] p-6 text-white">
      <ToastContainer position="top-right" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl flex flex-col md:flex-row bg-[#161b22] rounded-2xl shadow-2xl border border-gray-800 overflow-hidden"
      >
        {/* Left Side - Login Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <div className="flex items-center justify-center mb-6">
            <FaCodeCompare className="text-5xl text-blue-500 mr-3" />
            <h1 className="text-3xl font-bold text-blue-400">
              NexGen <span className="text-white">Studio</span>
            </h1>
          </div>
          
          <p className="text-center text-gray-400 mb-6">
            Welcome back, developer
          </p>

          <form onSubmit={submitForm} className="space-y-5">
            <div>
              <input
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded-lg bg-[#0d1117] border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-600 outline-none text-white placeholder-gray-500"
              />
            </div>
            
            <div className="relative">
              <input
                required
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg bg-[#0d1117] border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-600 outline-none text-white placeholder-gray-500 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <p className="text-sm text-gray-400 text-center">
              Don't have an account?{" "}
              <Link to="/signUp" className="text-blue-400 hover:text-blue-300 font-semibold">
                Sign Up
              </Link>
            </p>

            {error && (
              <p className="text-red-500 text-sm text-center bg-red-500/10 p-2 rounded-lg">
                {error}
              </p>
            )}

            <div className="flex justify-center">
              <motion.button
                whileHover={!loading ? { scale: 1.05 } : {}}
                whileTap={!loading ? { scale: 0.95 } : {}}
                disabled={loading}
                className="w-full max-w-xs flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all duration-300 ease-in-out"
              >
                {loading ? <BeatLoader color="#fff" size={8} /> : "Login"}
              </motion.button>
            </div>
          </form>
        </div>

        {/* Right Side - Image */}
        <div className="w-full md:w-1/2 relative hidden md:block">
          <div className="absolute inset-0 bg-[#0d1117] opacity-60"></div>
          <img
            className="h-full w-full object-cover"
            src="/code-ide.jpg"
            alt="Coding workspace"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Login;