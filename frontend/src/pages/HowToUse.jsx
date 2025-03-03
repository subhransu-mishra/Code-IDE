import React from 'react';
import { FaUserPlus, FaFolderPlus, FaEdit, FaSave, FaLaptopCode, FaRegClock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HowToUse = () => {
  const steps = [
    {
      title: "Create Your Account",
      description: "Sign up using your email address to get started",
      icon: <FaUserPlus className="text-3xl text-blue-500" />
    },
    {
      title: "Start New Project",
      description: "Click 'New Project' button from your dashboard",
      icon: <FaFolderPlus className="text-3xl text-green-500" />
    },
    {
      title: "Name Your Project",
      description: "Give a meaningful title to your coding project",
      icon: <FaEdit className="text-3xl text-purple-500" />
    },
    {
      title: "Access Your Workspace",
      description: "Click on your project to open the code editor",
      icon: <FaLaptopCode className="text-3xl text-orange-500" />
    },
    {
      title: "Code & Preview",
      description: "Write code and see live preview simultaneously",
      icon: <FaSave className="text-3xl text-red-500" />
    },
    {
      title: "Save & Return",
      description: "Your work auto-saves and is always accessible",
      icon: <FaRegClock className="text-3xl text-yellow-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            How to Use NexGen Studios
          </h1>
          <p className="text-xl text-gray-300">Follow these simple steps to start coding like a pro</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-400 transition-all duration-300 group hover:transform hover:scale-105 cursor-default"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-gray-900 rounded-lg group-hover:bg-blue-900/20 transition-colors">
                  {step.icon}
                </div>
                <span className="ml-4 text-2xl font-bold text-gray-300">Step {index + 1}</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105"
          >
            <FaUserPlus className="mr-2" />
            Get Started Now
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default HowToUse;