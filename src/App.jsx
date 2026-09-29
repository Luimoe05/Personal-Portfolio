import * as React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import MainPage from "./Components/MainPage";
import TopNavbar, { sections, useActiveSection } from "./Components/TopNavbar";
import AboutSF from "./Components/AboutSF";
import Summer2026 from "./Components/Summer2026";
import CommandPalette from "./Components/CommandPalette";
import NotFound from "./Components/NotFound";
import ThemeToggle from "./Components/ThemeToggle";
import useScrollLock from "./Components/useScrollLock";
import { Search, Menu, X } from "lucide-react";
// eslint-disable-next-line no-unused-vars -- `motion` is used via <motion.div> JSX tags below; this config lacks jsx-uses-vars
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

// Scrolls to a home-page section from anywhere. On a sub-page it routes home
// first and waits a tick for the sections to mount.
function useGoSection() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return useCallback(
    (id) => {
      const go = () =>
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      if (pathname === "/") go();
      else {
        navigate("/");
        setTimeout(go, 60);
      }
    },
    [navigate, pathname]
  );
}

// Apple's mobile menu: the bar grows into a full-screen sheet of large,
// bold links that cascade in.
function MobileMenu({ open, onClose, triggerRef, active, onGo }) {
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

  useScrollLock(open);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-nav-panel"
          className="fixed inset-x-0 top-12 bottom-0 z-40 bg-canvas md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
        >
          <nav aria-label="Sections" className="flex flex-col px-12 pt-6">
            {sections.map(({ id, label }, i) => (
              <motion.button
                key={id}
                onClick={() => {
                  onClose();
                  onGo(id);
                }}
                aria-current={active === id ? "true" : undefined}
                className="cursor-pointer py-2 text-left text-[28px] font-semibold tracking-tight text-ink"
                initial={reduceMotion ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduceMotion ? 0 : 0.04 * i + 0.05, duration: 0.3 }}
              >
                {label}
              </motion.button>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// The global nav: a thin, full-width frosted bar pinned to the top, as on
// apple.com. Name on the left, section links in the middle, the theme switch
// and search (the command palette) on the right.
function GlobalNav({ setPaletteOpen }) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const menuTriggerRef = useRef(null);
  const active = useActiveSection(isHome);
  const goSection = useGoSection();

  useEffect(() => setMenuOpen(false), [location.pathname]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 h-12 backdrop-blur-xl backdrop-saturate-[1.8] transition-colors ${
          menuOpen ? "bg-canvas" : "bg-canvas/80"
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1024px] items-center justify-between px-4 sm:px-6">
          <Link
            to="/"
            aria-label="Luis-Angel Moreno, home"
            className="text-sm font-semibold tracking-tight text-ink"
          >
            Luis-Angel Moreno
          </Link>

          <div className="hidden md:block">
            <TopNavbar active={active} onGo={goSection} />
          </div>

          <div className="flex items-center">
            <ThemeToggle />
            <button
              onClick={() => setPaletteOpen(true)}
              aria-label="Search (Command K)"
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center text-ink/80 transition-colors hover:text-ink"
            >
              <Search className="h-4 w-4" strokeWidth={1.75} />
            </button>
            <button
              ref={menuTriggerRef}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-panel"
              className="-mr-3 inline-flex h-11 w-11 cursor-pointer items-center justify-center text-ink/80 transition-colors hover:text-ink md:hidden"
            >
              {menuOpen ? (
                <X className="h-[18px] w-[18px]" strokeWidth={1.75} />
              ) : (
                <Menu className="h-[18px] w-[18px]" strokeWidth={1.75} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Outside the header: its backdrop-filter would make it the containing
          block for this fixed sheet and clip it to the 48px bar. */}
      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        triggerRef={menuTriggerRef}
        active={active}
        onGo={goSection}
      />
    </>
  );
}

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <a
        href="#content"
        className="sr-only rounded-full bg-blue px-4 py-2 text-sm text-white focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[110]"
      >
        Skip to content
      </a>

      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />

      <GlobalNav setPaletteOpen={setPaletteOpen} />
      <div className="min-h-screen pt-12">
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
