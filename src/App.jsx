import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import MainPage from "./Components/MainPage";
import TopNavbar from "./Components/TopNavbar";
import AboutSF from "./Components/AboutSF";
import CommandPalette from "./Components/CommandPalette";
import NotFound from "./Components/NotFound";
import { Moon, Sun, Command } from "lucide-react";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";

const getInitialTheme = () => {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem("theme");
  if (stored) return stored === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

export default function App() {
  const [isDark, setIsDark] = useState(getInitialTheme);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Apply + persist theme whenever it changes
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty(
      "--bg-color",
      isDark ? "oklch(10% 0.01 80)" : "oklch(98.5% 0.008 80)"
    );
    root.style.setProperty(
      "--text-color",
      isDark ? "oklch(97% 0.006 80)" : "oklch(14% 0.012 80)"
    );
    // Name-glint sheen: darker-than-white in dark mode, silver shine in light mode
    root.style.setProperty("--glint", isDark ? "#9297a3" : "#c2c5cd");
    // Keep the mobile browser chrome (status/address bar) in sync with the page
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) {
      themeMeta.setAttribute("content", isDark ? "#0c0b09" : "#fbfaf7");
    }
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleMode = () => setIsDark((d) => !d);

  // Scroll progress bar + shrink-on-scroll navbar
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  return (
    <Router>
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 z-[80] origin-left"
        style={{ scaleX, background: "var(--accent)" }}
      />

      <CommandPalette
        isDark={isDark}
        toggleMode={toggleMode}
        open={paletteOpen}
        setOpen={setPaletteOpen}
      />

      <div className="min-h-screen">
        {/* Floating, shrink-on-scroll top bar */}
        <div
          className={`sticky top-0 z-40 transition-all duration-300 ${
            scrolled ? "py-2" : "py-4"
          }`}
        >
          <motion.div
            className="flex items-center gap-2 px-4 sm:px-6"
            animate={{ scale: scrolled ? 0.94 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ transformOrigin: "center" }}
          >
            <div className="hidden sm:block flex-1" />
            <div className="hidden sm:flex sm:flex-none min-w-0 sm:justify-center">
              <TopNavbar isDark={isDark} />
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-auto sm:ml-0 sm:flex-1 sm:justify-end">
              {/* ⌘K quick-view hint */}
              <button
                onClick={() => setPaletteOpen(true)}
                aria-label="Open quick view (Command K)"
                className={`hidden sm:inline-flex items-center gap-1 text-xs cursor-pointer transition-opacity hover:opacity-100 ${
                  isDark ? "text-zinc-400" : "text-zinc-500"
                } opacity-70`}
              >
                <Command className="w-3 h-3" />K
                <span className="opacity-70">quick view</span>
              </button>

              {/* Theme toggle */}
              <button
                onClick={toggleMode}
                role="switch"
                aria-checked={isDark}
                aria-label="Toggle theme"
                className={`relative flex items-center w-14 h-8 rounded-full p-1 cursor-pointer border backdrop-blur-md transition-colors duration-300 ${
                  isDark
                    ? "bg-zinc-800/60 border-zinc-700/50 justify-end"
                    : "bg-zinc-100/80 border-zinc-200 justify-start"
                }`}
              >
                <motion.span
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 32 }}
                  className={`flex items-center justify-center w-6 h-6 rounded-full shadow-sm ${
                    isDark
                      ? "bg-zinc-900 text-zinc-300"
                      : "bg-white text-zinc-500"
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
          </motion.div>
        </div>

        <Routes>
          <Route path="/" element={<MainPage isDark={isDark} />} />
          <Route path="/summer" element={<AboutSF isDark={isDark} />} />
          <Route path="*" element={<NotFound isDark={isDark} />} />
        </Routes>
      </div>
    </Router>
  );
}
