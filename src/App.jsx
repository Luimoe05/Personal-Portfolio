import * as React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Link,
} from "react-router-dom";
import { useState, useEffect } from "react";
import MainPage from "./Components/MainPage";
import TopNavbar from "./Components/TopNavbar";
import AboutSF from "./Components/AboutSF";
import Summer2026 from "./Components/Summer2026";
import CommandPalette from "./Components/CommandPalette";
import NotFound from "./Components/NotFound";
import { Command, Moon, Sun } from "lucide-react";

const getInitialTheme = () => {
  if (typeof window === "undefined") return true;
  const stored = localStorage.getItem("theme");
  if (stored) return stored === "dark";
  return true; // default to the near-black lab theme
};

const DARK_TOKENS = {
  "--bg": "oklch(14% 0.003 250)",
  "--surface": "oklch(17% 0.004 250)",
  "--surface-2": "oklch(20% 0.005 250)",
  "--text": "oklch(93% 0.004 250)",
  "--muted": "oklch(66% 0.006 250)",
  "--faint": "oklch(48% 0.006 250)",
  "--line": "oklch(26% 0.005 250)",
  "--line-bright": "oklch(33% 0.005 250)",
  "--accent": "oklch(74% 0.14 165)",
  "--accent-ink": "oklch(16% 0.03 165)",
  "--accent-line": "oklch(74% 0.14 165 / 0.3)",
};
const LIGHT_TOKENS = {
  "--bg": "oklch(94.5% 0.006 95)",
  "--surface": "oklch(98.5% 0.004 95)",
  "--surface-2": "oklch(91% 0.006 92)",
  "--text": "oklch(20% 0.008 250)",
  "--muted": "oklch(43% 0.008 250)",
  "--faint": "oklch(57% 0.008 250)",
  "--line": "oklch(85% 0.006 92)",
  "--line-bright": "oklch(99% 0.003 95)",
  "--accent": "oklch(42% 0.09 160)",
  "--accent-ink": "oklch(97% 0.02 160)",
  "--accent-line": "oklch(42% 0.09 160 / 0.32)",
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function TopBar({ isDark, toggleMode, setPaletteOpen }) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div
      className="sticky top-0 z-40 border-b rule-c backdrop-blur-md"
      style={{ background: "color-mix(in oklch, var(--bg) 85%, transparent)" }}
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8 h-12 flex items-center justify-between gap-4">
        <Link to="/" className="mono text-[13px] tracking-[0.14em] uppercase hover:txt-accent transition-colors flex items-center gap-2">
          <span className="txt-accent">✳</span> Luis-Angel Moreno
        </Link>

        <div className="flex items-center gap-5">
          {isHome && (
            <div className="hidden sm:block">
              <TopNavbar />
            </div>
          )}
          {isHome && (
            <button
              onClick={() => setPaletteOpen(true)}
              aria-label="Open quick view (Command K)"
              className="hidden sm:inline-flex items-center gap-1 mono-link"
            >
              <Command className="w-3 h-3" />K
            </button>
          )}
          <button
            onClick={toggleMode}
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            className="icon-link cursor-pointer inline-flex"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [isDark, setIsDark] = useState(getInitialTheme);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const tokens = isDark ? DARK_TOKENS : LIGHT_TOKENS;
    for (const [k, v] of Object.entries(tokens)) root.style.setProperty(k, v);
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) themeMeta.setAttribute("content", isDark ? "#131315" : "#eeece4");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleMode = () => setIsDark((d) => !d);

  return (
    <Router>
      <ScrollToTop />
      <div className="grain" aria-hidden="true" />

      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />

      <div className="min-h-screen">
        <TopBar
          isDark={isDark}
          toggleMode={toggleMode}
          setPaletteOpen={setPaletteOpen}
        />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/summer" element={<AboutSF isDark={isDark} />} />
          <Route path="/summer-2026" element={<Summer2026 isDark={isDark} />} />
          <Route path="*" element={<NotFound isDark={isDark} />} />
        </Routes>
      </div>
    </Router>
  );
}
