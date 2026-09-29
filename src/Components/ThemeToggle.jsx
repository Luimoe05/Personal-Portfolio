import React, { useState } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";
// eslint-disable-next-line no-unused-vars -- `motion` is used via <motion.span> JSX below; this config lacks jsx-uses-vars
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const THEME_COLOR = { light: "#ffffff", dark: "#000000" };

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

// Light/dark switch. The new theme grows out of the button as a circle until
// it covers the whole screen. That's a View Transition: the browser snapshots
// the page, we swap the theme, then clip the new snapshot to a circle that
// expands from the button. Browsers without the API, and anyone with reduced
// motion on, get an instant swap.
export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.dataset.theme === "dark"
  );
  const reduceMotion = useReducedMotion();

  const toggle = (e) => {
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

    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    // Distance to the farthest corner, so the circle ends fully covering it.
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(swap);
    transition.finished.finally(done);
    transition.ready.then(() => {
      root.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 900,
          easing: "cubic-bezier(0.76, 0, 0.24, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex h-11 w-11 cursor-pointer items-center justify-center text-ink/80 transition-colors hover:text-ink"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "sun" : "moon"}
          initial={reduceMotion ? false : { rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={reduceMotion ? undefined : { rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex"
        >
          {isDark ? (
            <Sun className="h-4 w-4" strokeWidth={1.75} />
          ) : (
            <Moon className="h-4 w-4" strokeWidth={1.75} />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
