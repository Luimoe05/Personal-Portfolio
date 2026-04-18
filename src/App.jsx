import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import MainPage from "./Components/MainPage";
import TopNavbar from "./Components/TopNavbar";
import AboutSF from "./Components/AboutSF";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.div
                  key="moon"
                  initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.1, opacity: 0.7 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Moon className="cursor-pointer" onClick={toggleMode} />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.1, opacity: 0.7 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Sun className="cursor-pointer" onClick={toggleMode} />
                </motion.div>
              )}
            </AnimatePresence>
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
