import * as React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Link,
} from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import MainPage from "./Components/MainPage";
import TopNavbar, { sections } from "./Components/TopNavbar";
import AboutSF from "./Components/AboutSF";
import Summer2026 from "./Components/Summer2026";
import CommandPalette from "./Components/CommandPalette";
import NotFound from "./Components/NotFound";
import { Command, Menu, Moon, Sun, X } from "lucide-react";
// eslint-disable-next-line no-unused-vars -- `motion` is used via <motion.div>/<motion.button> JSX tags below; this config lacks jsx-uses-vars
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

// The inline script in index.html already set document.documentElement's
// data-theme attribute before first paint (localStorage, falling back to
// prefers-color-scheme, defaulting to dark). Read that back so React's
// initial state never disagrees with what's already on screen.
const getInitialTheme = () => {
  if (typeof document === "undefined") return true;
  return document.documentElement.dataset.theme !== "light";
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function ThemeToggle({ isDark, toggleMode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      onClick={toggleMode}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      whileTap={reduceMotion ? undefined : { scale: 0.8 }}
      className="icon-link cursor-pointer relative inline-flex items-center justify-center w-6 h-6 rounded-full overflow-hidden"
    >
      <AnimatePresence>
        <motion.span
          key={isDark ? "burst-dark" : "burst-light"}
          initial={reduceMotion ? false : { opacity: 0.45, scale: 0 }}
          animate={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 2.4 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ background: "var(--accent)" }}
        />
      </AnimatePresence>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "sun" : "moon"}
          initial={reduceMotion ? false : { rotate: -90, opacity: 0, scale: 0.4 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={reduceMotion ? undefined : { rotate: 90, opacity: 0, scale: 0.4 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

// Mobile section nav: a compact disclosure panel anchored under the top bar.
// Reuses TopNavbar's `sections` list (single source of truth) rather than a
// second hardcoded set of links. Desktop is untouched — this only ever
// renders below the `sm` breakpoint.
function MobileMenu({ open, onClose, triggerRef }) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        onClose();
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, triggerRef]);

  const goSection = (id) => {
    onClose();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-nav-backdrop"
          className="fixed inset-0 z-30 sm:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.15 }}
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      {open && (
        <motion.div
          key="mobile-nav-panel"
          id="mobile-nav-panel"
          role="menu"
          aria-label="Section navigation"
          className="absolute left-0 right-0 top-full z-40 border-b rule-c elevated sm:hidden"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: reduceMotion ? 0.1 : 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
          <nav className="max-w-5xl mx-auto px-5 py-2 flex flex-col">
            {sections.map(({ id, label }) => (
              <button
                key={id}
                role="menuitem"
                onClick={() => goSection(id)}
                className="mono-link min-h-[44px] flex items-center text-left"
              >
                {label}
              </button>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TopBar({ isDark, toggleMode, setPaletteOpen }) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuTriggerRef = useRef(null);

  // The blurred bar below establishes a CSS containing block (backdrop-filter
  // does that per spec), which would clip a `position: fixed` backdrop to the
  // bar's own 48px box instead of the viewport. Keep the positioning context
  // (`relative`) on this outer, filter-free wrapper instead, so the mobile
  // menu's fixed backdrop and absolutely-positioned panel size against it
  // correctly while still anchoring visually right under the bar.
  return (
    <div className="sticky top-0 z-40 relative">
      <div
        className="border-b rule-c backdrop-blur-md"
        style={{ background: "color-mix(in oklch, var(--bg) 85%, transparent)" }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-8 h-12 flex items-center justify-between gap-3">
          <Link to="/" className="mono text-[11px] sm:text-[13px] tracking-[0.06em] sm:tracking-[0.14em] uppercase hover:txt-accent transition-colors flex items-center gap-1.5 sm:gap-2 shrink-0">
            <span className="txt-accent">✳</span> Luis-Angel Moreno
          </Link>

          <div className="flex items-center gap-2 sm:gap-5">
            {isHome && (
              <button
                ref={menuTriggerRef}
                onClick={() => setMobileMenuOpen((o) => !o)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav-panel"
                className="icon-link sm:hidden inline-flex items-center justify-center w-11 h-11 -mr-2.5 cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}
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
            <ThemeToggle isDark={isDark} toggleMode={toggleMode} />
          </div>
        </div>
      </div>

      {isHome && (
        <MobileMenu
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          triggerRef={menuTriggerRef}
        />
      )}
    </div>
  );
}

export default function App() {
  const [isDark, setIsDark] = useState(getInitialTheme);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    // Keep in sync with --bg in index.css and the pre-paint script in index.html.
    if (themeMeta) themeMeta.setAttribute("content", isDark ? "#070707" : "#f5f5f5");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleMode = () => setIsDark((d) => !d);

  return (
    <Router>
      <ScrollToTop />
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[110] focus:px-4 focus:py-2 btn-solid"
      >
        Skip to content
      </a>
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
          <Route path="/summer" element={<AboutSF />} />
          <Route path="/summer-2026" element={<Summer2026 />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}
