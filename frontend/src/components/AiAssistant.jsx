import React, { useState, useRef, useEffect } from "react";
import { IoIosSend } from "react-icons/io";
import { AiOutlineClose, AiOutlineRobot } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

const AiAssistant = ({ isOpen, toggleSidebar }) => {
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your coding assistant. Ask me anything about HTML, CSS, or JavaScript.",
      isAi: true,
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { text: inputText, isAi: false }]);
    setIsLoading(true);

    // Simulate AI response (replace with actual API call later)
    setTimeout(() => {
      const aiResponses = {
        default:
          "I'll help you with that. Could you provide more details about what you're trying to accomplish?",
        html: "For HTML, I recommend using semantic elements like <header>, <main>, and <footer> for better accessibility.",
        css: "In CSS, consider using Flexbox or Grid for layouts. They provide better control than traditional methods.",
        javascript:
          "Remember to use 'const' and 'let' instead of 'var' in modern JavaScript for better scoping.",
        react:
          "When working with React components, try to keep them small and focused on a single responsibility.",
      };

      // Simple keyword matching logic
      const lowerInput = inputText.toLowerCase();
      let responseText = aiResponses.default;

      if (lowerInput.includes("html")) responseText = aiResponses.html;
      else if (lowerInput.includes("css")) responseText = aiResponses.css;
      else if (lowerInput.includes("js") || lowerInput.includes("javascript"))
        responseText = aiResponses.javascript;
      else if (lowerInput.includes("react")) responseText = aiResponses.react;

      setMessages((prev) => [...prev, { text: responseText, isAi: true }]);
      setIsLoading(false);
      setInputText("");
    }, 1000);
  };

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      transition={{ type: "spring", damping: 20 }}
      className="ai-sidebar fixed right-0 top-0 h-full bg-[#0A0A0A] text-white transition-all duration-300 flex flex-col shadow-lg w-80"
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "easeInOut",
            }}
          >
            <AiOutlineRobot className="text-blue-400 text-2xl" />
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="font-medium text-lg bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
          >
            NexGen AI Agent
          </motion.h3>
        </div>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleSidebar}
          className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
        >
          <AiOutlineClose />
        </motion.button>
      </div>

      <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#0A0A0A] to-[#111111]">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`max-w-[90%] p-3 rounded-xl ${
                msg.isAi
                  ? "bg-[#1A1A1A] text-gray-200 mr-auto border border-gray-800"
                  : "bg-blue-600 text-white ml-auto shadow-lg shadow-blue-500/20"
              }`}
            >
              {msg.text}
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[#1A1A1A] text-white max-w-[90%] p-3 rounded-xl mr-auto border border-gray-800"
          >
            <div className="flex space-x-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="w-2 h-2 bg-blue-500 rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                className="w-2 h-2 bg-blue-500 rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                className="w-2 h-2 bg-blue-500 rounded-full"
              />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-4 border-t border-gray-800 bg-[#0A0A0A]"
      >
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask me about your code..."
            className="flex-grow bg-[#1A1A1A] text-white p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-gray-800 placeholder-gray-500"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 p-3 rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-300"
          >
            <IoIosSend className="text-xl" />
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default AiAssistant;
