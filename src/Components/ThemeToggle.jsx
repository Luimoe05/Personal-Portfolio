import React, { useState } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";
import { useReducedMotion } from "framer-motion";

// Matches --canvas in each theme (index.css), for the browser chrome.
const THEME_COLOR = { light: "#f8fbf9", dark: "#0f1110" };

// Writes the theme everywhere it lives: the attribute the CSS variables key
// off, the browser-chrome colour, and the saved preference.
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", THEME_COLOR[theme]);
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // Private mode or blocked storage: the switch still works for this visit.
  }
}

// Light/dark switch. Where View Transitions exist, the swap runs as the
// browser's cross-fade, shortened to a quick dissolve in index.css. Browsers
// without the API, and anyone with reduced motion on, get an instant swap.
export default function ThemeToggle({ className = "" }) {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.dataset.theme === "dark"
  );
  const reduceMotion = useReducedMotion();

  const toggle = () => {
    const next = isDark ? "light" : "dark";
    const swap = () => {
      applyTheme(next);
      // Synchronous, so the icon in the snapshot matches the new theme.
      flushSync(() => setIsDark(next === "dark"));
    };

    const root = document.documentElement;
    root.dataset.themeSwitching = "";
    const done = () => delete root.dataset.themeSwitching;

    if (!document.startViewTransition || reduceMotion) {
      swap();
      // Two frames: one to paint the new colours with transitions off, one
      // so re-enabling them doesn't animate from the old values.
      requestAnimationFrame(() => requestAnimationFrame(done));
      return;
    }

    document.startViewTransition(swap).finished.finally(done);
  };

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={className}
    >
      {isDark ? (
        <Sun className="h-4 w-4" strokeWidth={1.75} />
      ) : (
        <Moon className="h-4 w-4" strokeWidth={1.75} />
      )}
    </button>
  );
}
