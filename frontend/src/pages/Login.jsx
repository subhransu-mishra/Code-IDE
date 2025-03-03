import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api_base_url } from "../helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
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
      });
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-6">
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl flex flex-col md:flex-row items-center bg-black/40 backdrop-blur-lg shadow-xl rounded-2xl overflow-hidden"
      >
        {/* Left Side - Login Form */}
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-3xl font-bold text-blue-400 mb-8 text-center">
            NexGen Studios
          </h1>
          <form onSubmit={submitForm} className="space-y-6">
            <div className="relative">
              <input
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 bg-gray-800/80 rounded-lg border border-gray-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-gray-400"
              />
            </div>
            <div className="relative">
              <input
                required
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-3 bg-gray-800/80 rounded-lg border border-gray-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
              >
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </button>
            </div>
            <p className="text-sm text-gray-300">
              Don't have an account?{" "}
              <Link to="/signUp" className="text-blue-400 hover:text-blue-300">
                Sign Up
              </Link>
            </p>
            {error && (
              <p className="text-red-500 text-sm bg-red-700/20 p-2 rounded-lg">
                {error}
              </p>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all"
            >
              Login
            </motion.button>
          </form>
        </div>
        {/* Right Side - Image */}
        <div className="w-full md:w-1/2 relative hidden md:block">
          <img
            className="h-full w-full object-cover"
            src="/code-ide.jpg"
            alt="Coding"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-gray-400 text-sm text-center"
      >
        <Link to="https://subhransumishra.me/">Developed by this guy</Link>
      </motion.div>
    </div>
  );
};

export default Login;
