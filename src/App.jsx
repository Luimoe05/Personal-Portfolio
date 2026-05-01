import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import MainPage from "./Components/MainPage";
import TopNavbar from "./Components/TopNavbar";
import AboutSF from "./Components/AboutSF";
import { Moon, Sun } from "lucide-react";

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
              aria-label="Toggle theme"
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 ${
                isDark
                  ? "bg-zinc-800/60 border border-zinc-700/50 text-zinc-300 hover:bg-zinc-700 hover:text-white"
                  : "bg-zinc-100 border border-zinc-200 text-zinc-500 hover:bg-white hover:text-zinc-900"
              }`}
            >
              {isDark ? <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
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
