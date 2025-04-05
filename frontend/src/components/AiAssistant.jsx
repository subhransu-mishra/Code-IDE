import React, { useState, useRef, useEffect } from "react";
import { IoIosSend } from "react-icons/io";
import { AiOutlineClose, AiOutlineRobot } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { ScaleLoader } from "react-spinners";

const AiAssistant = ({ isOpen, toggleSidebar }) => {
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your AI agent. Ask me anything about HTML, CSS, or JavaScript.",
      isAi: true,
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = { text: inputText, isAi: false };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      setMessages((prev) => [...prev, { text: "", isAi: true }]);

      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization:
              "Bearer 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",
            "HTTP-Referer": "https://your-website.com",
            "X-Title": "Code Assistant",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "deepseek/deepseek-r1",
            messages: [{ role: "user", content: inputText }],
            temperature: 0.7,
            max_tokens: 1000,
            stream: true,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error?.message || `API Error: ${response.status}`
        );
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let aiResponse = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine || trimmedLine === "data: [DONE]") continue;

          if (trimmedLine.startsWith("data: ")) {
            const jsonData = trimmedLine.replace("data: ", "");
            try {
              const parsed = JSON.parse(jsonData);
              const content = parsed.choices[0].delta.content;

              if (content) {
                aiResponse += content;
                setMessages((prev) => {
                  const newMessages = [...prev];
                  const lastMessage = newMessages[newMessages.length - 1];
                  lastMessage.text = aiResponse;
                  return newMessages;
                });
              }
            } catch (err) {
              console.error("Error parsing JSON:", jsonData);
            }
          }
        }
      }
    } catch (err) {
      console.error("API error:", err);
      setMessages((prev) => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        lastMessage.text = `Error: ${err.message}`;
        return newMessages;
      });
    } finally {
      setIsLoading(false);
      setInputText("");
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      transition={{ type: "spring", damping: 20 }}
      className={`ai-sidebar fixed right-0 top-0 h-full bg-[#0A0A0A] text-white transition-all duration-300 flex flex-col shadow-lg z-50 ${
        isExpanded ? "w-80 sm:w-96" : "w-16 sm:w-20"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "easeInOut",
            }}
          >
            <AiOutlineRobot className="text-blue-400 text-2xl" />
          </motion.div>
          {isExpanded && (
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="font-medium text-lg bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
            >
              NexGen AI Agent
            </motion.h3>
          )}
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            {isExpanded ? "➖" : "➕"}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleSidebar}
            className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            <AiOutlineClose />
          </motion.button>
        </div>
      </div>

      {isExpanded && (
        <>
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
                  {msg.isAi && !msg.text && (
                    <div className="flex justify-start">
                      <ScaleLoader color="#3B82F6" height={20} />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
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
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 p-3 rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-300 disabled:opacity-50"
              >
                <IoIosSend className="text-xl" />
              </motion.button>
            </div>
          </form>
        </>
      )}
    </motion.div>
  );
};

export default AiAssistant;

