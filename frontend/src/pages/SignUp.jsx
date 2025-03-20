import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { BeatLoader } from "react-spinners";
import { FaCodeCompare } from "react-icons/fa6";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const submitForm = (e) => {
    e.preventDefault();
    setLoader(true);
    fetch("https://code-ide-backend-6h2w.onrender.com/signUp", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        name,
        email,
        password: pwd,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoader(false);
        if (data.success) {
          toast.success("Account created successfully!");
          setTimeout(() => navigate("/login"), 2000);
        } else {
          setError(data.message);
        }
      })
      .catch(() => {
        setLoader(false);
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
        className="bg-[#161b22] border border-gray-800 p-8 rounded-2xl shadow-2xl w-full backdrop-blur-lg max-w-md"
      >
        <div className="flex justify-center items-center mb-6">
          <FaCodeCompare className="text-5xl text-blue-500 mr-3" />
          <h1 className="text-3xl text-blue-400 font-bold">
            NexGen <span className="text-white">Studio</span>
          </h1>
        </div>

        <p className="text-center text-gray-400 mb-6">
          Create your developer workspace
        </p>

        <form onSubmit={submitForm} className="space-y-5">
          {/** Username */}
          <div>
            <input
              className="bg-[#0d1117] border border-gray-700 rounded-lg text-white w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-600 outline-none placeholder-gray-500 px-4 py-3"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          {/** Full Name */}
          <div>
            <input
              className="bg-[#0d1117] border border-gray-700 rounded-lg text-white w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-600 outline-none placeholder-gray-500 px-4 py-3"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          {/** Email */}
          <div>
            <input
              className="bg-[#0d1117] border border-gray-700 rounded-lg text-white w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-600 outline-none placeholder-gray-500 px-4 py-3"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {/** Password */}
          <div className="relative">
            <input
              className="bg-[#0d1117] border border-gray-700 rounded-lg text-white w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-600 outline-none placeholder-gray-500 pr-12 px-4 py-3"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required
            />
            <button
              type="button"
              className="text-gray-400 -translate-y-1/2 absolute hover:text-blue-400 right-4 top-1/2 transform"
              onClick={togglePassword}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {/** Error Message */}
          {error && <p className="text-center text-red-500 text-sm">{error}</p>}
          {/** Submit Button */}
          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex bg-blue-600 justify-center rounded-full text-white w-full duration-300 ease-in-out gap-2 hover:bg-blue-700 items-center max-w-xs px-6 py-3 transition-all"
            >
              {loader ? <BeatLoader color="#fff" size={8} /> : "Create Account"}
            </motion.button>
          </div>
          {/** Login Link */}
          <p className="text-center text-gray-400 text-sm mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-400 font-semibold hover:text-blue-300"
            >
              Log in
            </Link>
          </p>
          <p className="text-center text-white cursor-pointer hover:text-blue-600">
            Login as guest
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default SignUp;
