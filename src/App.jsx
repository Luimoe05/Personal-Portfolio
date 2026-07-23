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
import AboutSF from "./Components/AboutSF";
import Summer2026 from "./Components/Summer2026";
import CommandPalette from "./Components/CommandPalette";
import NotFound from "./Components/NotFound";
import { Command, Moon, Sun } from "lucide-react";

const getInitialTheme = () => {
  if (typeof window === "undefined") return true;
  const stored = localStorage.getItem("theme");
  if (stored) return stored === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const DARK_TOKENS = {
  "--bg": "oklch(16% 0.004 70)",
  "--surface": "oklch(19.5% 0.005 70)",
  "--surface-2": "oklch(23% 0.006 70)",
  "--text": "oklch(93% 0.006 85)",
  "--muted": "oklch(68% 0.008 80)",
  "--faint": "oklch(50% 0.008 75)",
  "--line": "oklch(28% 0.006 75)",
  "--line-bright": "oklch(38% 0.006 75)",
  "--accent": "oklch(74% 0.12 168)",
  "--accent-dim": "oklch(60% 0.09 168)",
  "--accent-ink": "oklch(17% 0.03 168)",
  "--accent-line": "oklch(74% 0.12 168 / 0.3)",
};
const LIGHT_TOKENS = {
  "--bg": "oklch(96.5% 0.008 85)",
  "--surface": "oklch(99.3% 0.005 85)",
  "--surface-2": "oklch(93.5% 0.008 82)",
  "--text": "oklch(23% 0.012 60)",
  "--muted": "oklch(44% 0.012 60)",
  "--faint": "oklch(58% 0.012 60)",
  "--line": "oklch(86% 0.01 75)",
  "--line-bright": "oklch(99.5% 0.004 85)",
  "--accent": "oklch(50% 0.13 165)",
  "--accent-dim": "oklch(58% 0.1 165)",
  "--accent-ink": "oklch(98% 0.02 165)",
  "--accent-line": "oklch(50% 0.13 165 / 0.32)",
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

// Floating theme toggle + ⌘K, top-right. The homepage carries its identity and
// nav in the page's own sidebar, so the bar stays out of the way; inner pages
// get a wordmark as a way home.
function TopBar({ isDark, toggleMode, setPaletteOpen }) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="sticky top-0 z-40 pointer-events-none">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        {isHome ? (
          <span />
        ) : (
          <Link
            to="/"
            className="pointer-events-auto font-display text-[15px] tracking-tight hover:txt-accent transition-colors"
          >
            Luis-Angel Moreno
          </Link>
        )}
        <div className="pointer-events-auto flex items-center gap-3">
          {isHome && (
            <button
              onClick={() => setPaletteOpen(true)}
              aria-label="Open quick view (Command K)"
              className="hidden sm:inline-flex items-center gap-1 text-[11px] txt-faint hover:txt-accent transition-colors cursor-pointer"
            >
              <Command className="w-3 h-3" />K
            </button>
          )}
          <button
            onClick={toggleMode}
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            className="inline-flex items-center justify-center w-8 h-8 rounded-full border rule-c icon-link cursor-pointer"
            style={{ background: "color-mix(in oklch, var(--bg) 70%, transparent)" }}
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
    if (themeMeta) themeMeta.setAttribute("content", isDark ? "#1a1917" : "#f4efe4");
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
