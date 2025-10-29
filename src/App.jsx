import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Components/Homepage/HomePage";
import { useState } from "react";
import ExperiencePage from "./Components/ExperiencePage/ExperiencePage.jsx";
import ProjectsPage from "./Components/ProjectsPage/ProjectsPage.jsx";
import TopNavbar from "./Components/TopNavbar.jsx";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [mode, setMode] = useState("Moon");

  const changeMode = (currMode) => {
    if (currMode == "Moon") {
      setMode("Sun");
      document.documentElement.style.setProperty("--bg-color", "#f9fafb");
      document.documentElement.style.setProperty("--text-color", "#000000");
    } else {
      setMode("Moon");
      document.documentElement.style.setProperty("--bg-color", "#121212");
      document.documentElement.style.setProperty("--text-color", "#ffffff");
    }
  };
  return (
    <>
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-40px, 40px); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -40px); }
        }
        .animate-float-slow { animation: float-slow 20s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 15s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 12s ease-in-out infinite; }
      `}</style>

      <div className="relative min-h-screen overflow-hidden">
        {mode == "Moon" ? (
          <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float-slow" />
            <div
              className="absolute top-20 left-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-float-medium"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-float-fast"
              style={{ animationDelay: "2s" }}
            />
          </div>
        ) : (
          <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 bg-red-300/30 rounded-full blur-3xl animate-float-slow" />
            <div
              className="absolute top-20 left-20 w-80 h-80 bg-purple-500/60 rounded-full blur-3xl animate-float-medium"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/60 rounded-full blur-3xl animate-float-fast"
              style={{ animationDelay: "2s" }}
            />
          </div>
        )}

        <Router>
          <div className="flex justify-center m-5 relative z-10 items-center">
            <TopNavbar color={mode} />
            <div className="absolute right-5 text-white flex items-center">
              <AnimatePresence mode="wait">
                {mode == "Moon" ? (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.1, opacity: 0.7 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Moon
                      className="cursor-pointer text-white"
                      onClick={() => changeMode("Moon")}
                    />
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
                    <Sun
                      className="cursor-pointer text-black"
                      onClick={() => changeMode("Sun")}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <Routes>
            <Route path="/" element={<HomePage colorMode={mode} />} />
            <Route
              path="/Experience"
              element={<ExperiencePage colorMode={mode} />}
            />
            <Route
              path="/Projects"
              element={<ProjectsPage colorMode={mode} />}
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}
