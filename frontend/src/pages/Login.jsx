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
    <div className="flex bg-gradient-to-br justify-center p-6 text-white from-[#0d1117] items-center min-h-screen to-[#161b22]">
      <ToastContainer position="top-right" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col bg-[#161b22] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl md:flex-row overflow-hidden"
      >
        {/* Left Side - Login Form */}
        <div className="flex flex-col justify-center p-8 w-full md:w-1/2">
          <div className="flex justify-center items-center mb-6">
            <FaCodeCompare className="text-5xl text-blue-500 mr-3" />
            <h1 className="text-3xl text-blue-400 font-bold">
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
                className="bg-[#0d1117] border border-gray-700 rounded-lg text-white w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-600 outline-none placeholder-gray-500 px-4 py-3"
              />
            </div>

            <div className="relative">
              <input
                required
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="bg-[#0d1117] border border-gray-700 rounded-lg text-white w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-600 outline-none placeholder-gray-500 pr-12 px-4 py-3"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 -translate-y-1/2 absolute hover:text-blue-400 right-4 top-1/2 transform"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <p className="text-center text-gray-400 text-sm">
              Don't have an account?{" "}
              <Link
                to="/signUp"
                className="text-blue-400 font-semibold hover:text-blue-300"
              >
                Sign Up
              </Link>
            </p>
            
            {error && (
              <p className="bg-red-500/10 p-2 rounded-lg text-center text-red-500 text-sm">
                {error}
              </p>
            )}

            <div className="flex justify-center flex-col gap-4 items-center">
              <motion.button
                whileHover={!loading ? { scale: 1.05 } : {}}
                whileTap={!loading ? { scale: 0.95 } : {}}
                disabled={loading}
                className="flex bg-blue-600 justify-center rounded-full text-white w-full duration-300 ease-in-out gap-2 hover:bg-blue-700 items-center max-w-xs px-6 py-3 transition-all"
              >
                {loading ? <BeatLoader color="#fff" size={8} /> : "Login"}
              </motion.button>
              <p className="text-white font-semibold cursor-pointer hover:text-blue-600">
              Login as guest
            </p>
            </div>
          </form>
        </div>

        {/* Right Side - Image */}
        <div className="w-full hidden md:block md:w-1/2 relative">
          <div className="bg-[#0d1117] absolute inset-0 opacity-60"></div>
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
