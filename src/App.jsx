import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import MainPage from "./Components/MainPage";
import TopNavbar from "./Components/TopNavbar";
import AboutSF from "./Components/AboutSF";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export default function App() {
  const [isDark, setIsDark] = useState(false);

  const toggleMode = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.style.setProperty("--bg-color", next ? "#111111" : "#ffffff");
    document.documentElement.style.setProperty("--text-color", next ? "#ffffff" : "#111111");
  };

  return (
    <Router>
      <div className="min-h-screen">
        <div className="flex justify-center m-5 relative z-10 items-center">
          <TopNavbar isDark={isDark} />
          <div className="absolute right-5 flex items-center">
            <button
              onClick={toggleMode}
              aria-label="Toggle theme"
              className={`relative flex items-center w-12 h-6 rounded-full cursor-pointer transition-colors duration-300 ${
                isDark ? "bg-zinc-600" : "bg-zinc-300"
              }`}
            >
              <motion.div
                className="absolute w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center"
                animate={{ x: isDark ? 26 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {isDark
                  ? <Moon size={11} className="text-zinc-600" />
                  : <Sun size={11} className="text-zinc-400" />
                }
              </motion.div>
            </button>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<MainPage isDark={isDark} />} />
          <Route path="/summer" element={<AboutSF isDark={isDark} />} />
        </Routes>
      </div>
    </Router>
  );
}
