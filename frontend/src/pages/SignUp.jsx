import React, { useState } from "react";
import logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import image from "../images/authPageSide.png";
import { api_base_url } from "../helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";

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
    <div className="min-h-screen flex bg-black text-white">
      <ToastContainer />
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md bg-neutral-800 p-8 rounded-lg shadow-lg">
          <h1 className="text-center text-2xl font-bold mb-6">Nextgen Studios</h1>
          <form onSubmit={submitForm} className="space-y-6">
            <div>
              <label className="block text-gray-400 text-sm font-semibold mb-2">Username</label>
              <input
                className="w-full px-4 py-3 rounded-lg bg-neutral-700 border border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm font-semibold mb-2">Full Name</label>
              <input
                className="w-full px-4 py-3 rounded-lg bg-neutral-700 border border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm font-semibold mb-2">Email Address</label>
              <input
                className="w-full px-4 py-3 rounded-lg bg-neutral-700 border border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <label className="block text-gray-400 text-sm font-semibold mb-2">Password</label>
              <input
                className="w-full px-4 py-3 rounded-lg bg-neutral-700 border border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 pr-12"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute top-10 right-4 text-gray-400 hover:text-white"
                onClick={togglePassword}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {error && <div className="text-red-500 bg-red-100 px-4 py-2 rounded-lg text-sm">{error}</div>}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.01] shadow-md hover:shadow-lg"
            >
              Create Account
            </button>

            <p className="text-gray-400 text-center mt-6">
              Already have an account? {" "}
              <Link to="/login" className="text-blue-400 hover:text-blue-500 font-semibold underline underline-offset-2">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden md:block w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/30 to-blue-900/50"></div>
        <img className="h-[100vh] w-[80%] object-cover" src="/code-ide.jpg" alt="Decorative background" />
        <div className="absolute bottom-8 left-8 text-white">
          <h2 className="text-4xl font-bold mb-4 ">Be a beast in Coding</h2>
          <p className="text-lg opacity-90">Start you engineering journey now !</p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;