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
    document.documentElement.style.setProperty("--bg-color", next ? "oklch(10% 0.01 80)" : "oklch(98.5% 0.008 80)");
    document.documentElement.style.setProperty("--text-color", next ? "oklch(97% 0.006 80)" : "oklch(14% 0.012 80)");
  };

  return (
    <Router>
      <div className="min-h-screen">
        <div className="flex items-center m-5 z-10">
          <div className="flex-1" />
          <TopNavbar isDark={isDark} />
          <div className="flex-1 flex justify-end">
            <button
              onClick={toggleMode}
              role="switch"
              aria-checked={isDark}
              aria-label="Toggle theme"
              className={`relative flex items-center w-14 h-8 rounded-full p-1 cursor-pointer border transition-colors duration-300 ${
                isDark
                  ? "bg-zinc-800/60 border-zinc-700/50 justify-end"
                  : "bg-zinc-100 border-zinc-200 justify-start"
              }`}
            >
              <motion.span
                layout
                transition={{ type: "spring", stiffness: 500, damping: 32 }}
                className={`flex items-center justify-center w-6 h-6 rounded-full shadow-sm ${
                  isDark ? "bg-zinc-900 text-zinc-300" : "bg-white text-zinc-500"
                }`}
              >
                {isDark ? (
                  <Moon className="w-3.5 h-3.5" />
                ) : (
                  <Sun className="w-3.5 h-3.5" />
                )}
              </motion.span>
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
