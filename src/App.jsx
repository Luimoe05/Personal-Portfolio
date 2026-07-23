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
import { Command } from "lucide-react";

// React Router preserves scroll position across navigations; reset to the top
// on every path change so pages (e.g. blog posts) open at their start.
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

// Slim, refined top bar. Wordmark left (way home), section nav + ⌘K on the
// homepage only.
function TopBar({ setPaletteOpen }) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div
      className="sticky top-0 z-40 border-b rule-c backdrop-blur-md"
      style={{ background: "color-mix(in oklch, var(--bg) 82%, transparent)" }}
    >
      <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
        <Link
          to="/"
          className="font-display text-[15px] tracking-tight hover:txt-accent transition-colors"
        >
          Luis-Angel Moreno
        </Link>

        {isHome && (
          <div className="hidden sm:flex items-center gap-4">
            <TopNavbar />
            <button
              onClick={() => setPaletteOpen(true)}
              aria-label="Open quick view (Command K)"
              className="inline-flex items-center gap-1 text-[11px] txt-faint hover:txt-accent transition-colors cursor-pointer"
            >
              <Command className="w-3 h-3" />K
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Dark-only: set the mobile browser chrome to match the charcoal once.
  useEffect(() => {
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) themeMeta.setAttribute("content", "#1a1917");
    localStorage.setItem("theme", "dark");
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="grain" aria-hidden="true" />

      <CommandPalette
        open={paletteOpen}
        setOpen={setPaletteOpen}
      />

      <div className="min-h-screen">
        <TopBar setPaletteOpen={setPaletteOpen} />

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/summer" element={<AboutSF isDark />} />
          <Route path="/summer-2026" element={<Summer2026 isDark />} />
          <Route path="*" element={<NotFound isDark />} />
        </Routes>
      </div>
    </Router>
  );
}
