import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api_base_url } from "../helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff, Terminal, Code } from "lucide-react";
import { motion } from "framer-motion";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const submitForm = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/signUp", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        name: name,
        email: email,
        password: pwd,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          toast.success("Account created successfully!");
          setTimeout(() => navigate("/login"), 2000);
        } else {
          setError(data.message);
        }
      });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-4 md:p-8">
      <ToastContainer position="top-right" />
      
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-black/40 backdrop-blur-lg p-6 md:p-8 rounded-xl shadow-xl border border-gray-800"
        >
          <div className="flex items-center justify-center gap-2 mb-8">
            <Terminal className="text-blue-400" size={28} />
            <h1 className="text-2xl font-bold text-blue-400">NexGen Studios</h1>
          </div>

          <form onSubmit={submitForm} className="space-y-5">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Username
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg bg-gray-800/60 border border-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 outline-none transition-all placeholder-gray-500"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg bg-gray-800/60 border border-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 outline-none transition-all placeholder-gray-500"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg bg-gray-800/60 border border-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 outline-none transition-all placeholder-gray-500"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Password
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg bg-gray-800/60 border border-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 outline-none transition-all placeholder-gray-500 pr-12"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute top-[38px] right-3 text-gray-400 hover:text-blue-400 transition-colors"
                onClick={togglePassword}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {error && (
              <div className="text-red-400 bg-red-900/30 px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all shadow-lg hover:shadow-blue-500/20"
            >
              Create Account
            </motion.button>

            <p className="text-gray-400 text-center mt-5 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-400 hover:text-blue-300 font-medium underline underline-offset-2 transition-colors"
              >
                Log in
              </Link>
            </p>
          </form>
        </motion.div>

        {/* Developer Credit */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-gray-500 text-sm text-center"
        >
          Developed by this guy
        </motion.div>
      </div>

      {/* Right Section */}
      <div className="hidden md:block w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-blue-900/40"></div>
        <img
          className="h-full w-full object-cover"
          src="/code-ide.jpg"
          alt="Coding background"
        />
        <div className="absolute bottom-8 left-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Code size={32} className="text-blue-400" />
            <h2 className="text-3xl font-bold">Be a beast in Coding</h2>
          </div>
          <p className="text-lg opacity-90">
            Start your engineering journey now!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;