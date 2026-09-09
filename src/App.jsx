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
import TopNavbar, { sections, useActiveSection } from "./Components/TopNavbar";
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

// True once the page has scrolled past `collapseAt`, false again below
// `expandAt`. The two thresholds are deliberately apart: a single boundary
// makes the nav flip state on every jitter of a trackpad scroll sitting right
// on it. rAF-throttled so a scroll never queues more than one render a frame.
function useScrolled(collapseAt = 72, expandAt = 24) {
  const [scrolled, setScrolled] = useState(
    () => typeof window !== "undefined" && window.scrollY > collapseAt
  );

  useEffect(() => {
    let frame = 0;
    const read = () => {
      const y = window.scrollY;
      setScrolled((was) => (was ? y > expandAt : y > collapseAt));
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        read();
      });
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [collapseAt, expandAt]);

  return scrolled;
}

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
      className="icon-link cursor-pointer relative inline-flex items-center justify-center w-6 h-6 rounded-full overflow-hidden shrink-0"
    >
      {/* `initial={false}`: the toggle is remounted every time the nav swaps
          between its two pills, and without this the ripple would fire on each
          of those swaps rather than only on an actual theme change. */}
      <AnimatePresence initial={false}>
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

// Mobile section nav: a floating card that hangs under the nav pill.
// Reuses TopNavbar's `sections` list (single source of truth) rather than a
// second hardcoded set of links. Desktop is untouched — this only ever
// renders below the `sm` breakpoint.
function MobileMenu({ open, onClose, triggerRef, active }) {
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
          className="fixed inset-0 pointer-events-auto sm:hidden"
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
          className="absolute left-0 right-0 top-full mt-2 z-20 rounded-3xl overflow-hidden elevated pointer-events-auto sm:hidden"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: reduceMotion ? 0.1 : 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
          <nav className="px-3 py-2 flex flex-col">
            {sections.map(({ id, label }) => (
              <button
                key={id}
                role="menuitem"
                onClick={() => goSection(id)}
                data-on={active === id}
                aria-current={active === id ? "true" : undefined}
                className="mono-link nav-row min-h-[44px] flex items-center text-left"
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

// Everything inside the capsule. Both the wide and the collapsed pill render
// this — the flag only decides which pieces are along for the ride — so the
// two never drift apart as the nav gains controls.
function PillContents({
  compact,
  isHome,
  active,
  activeLabel,
  isDark,
  toggleMode,
  onPalette,
  mobileMenuOpen,
  onToggleMobileMenu,
  menuTriggerRef,
}) {
  return (
    <>
      <Link
        to="/"
        aria-label="Home"
        className="mono text-[11px] sm:text-[13px] tracking-[0.06em] sm:tracking-[0.14em] uppercase hover:txt-accent transition-colors flex items-center gap-1.5 sm:gap-2 shrink-0 min-w-0 px-1"
      >
        <span className="txt-accent">✳</span>
        {!compact && <span className="whitespace-nowrap">Luis-Angel Moreno</span>}
        {/* Desktop keeps the whole rail visible when collapsed; on mobile this
            label is the only thing saying where you are. */}
        {compact && activeLabel && (
          <span className="whitespace-nowrap txt-muted sm:hidden">{activeLabel}</span>
        )}
      </Link>

      <div className="flex items-center gap-2 sm:gap-4">
        {isHome && (
          <div className="hidden sm:block">
            <TopNavbar
              active={active}
              compact={compact}
              // Both pills are on screen at once mid-crossfade; a shared
              // layoutId would make the marker fly between the two of them.
              markerId={compact ? "nav-marker-compact" : "nav-marker-wide"}
            />
          </div>
        )}

        {isHome && !compact && (
          <button
            onClick={onPalette}
            aria-label="Open quick view (Command K)"
            className="hidden sm:inline-flex items-center gap-1 mono-link whitespace-nowrap"
          >
            <Command className="w-3 h-3" />K
          </button>
        )}

        {isHome && (
          <button
            ref={menuTriggerRef}
            onClick={onToggleMobileMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-panel"
            className={`icon-link sm:hidden inline-flex items-center justify-center cursor-pointer shrink-0 ${
              compact ? "w-9 h-9" : "w-11 h-11"
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        )}

        <ThemeToggle isDark={isDark} toggleMode={toggleMode} />
      </div>
    </>
  );
}

// A floating capsule rather than a bar pinned to the page edge. At the top of
// the home page it is the full-width identity bar; past the first scroll it
// contracts around the section rail alone, so what stays on screen is a
// position indicator ("you are in Work") rather than a masthead. Sub-pages
// have no sections, so they keep the wide form at every scroll position.
//
// The two forms are two separate elements that cross-fade, NOT one element
// animating its own width. Morphing a single pill means animating layout —
// framer does that by scaling the box, which stretches the text inside it and
// forces the backdrop blur to re-rasterise every frame. Both look like
// stutter. Swapping two correctly-sized boxes moves nothing but `transform`
// and `opacity`, which the compositor handles without a relayout.
function TopBar({ isDark, toggleMode, setPaletteOpen }) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuTriggerRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const scrolled = useScrolled();
  const active = useActiveSection(isHome);
  const compact = isHome && scrolled;
  const activeLabel = sections.find((s) => s.id === active)?.label ?? "";

  // The panel hangs off the bottom of the pill; leaving it open through a
  // swap would strand it under a capsule that just changed shape. Fires on
  // the collapse only, so opening the menu while already compact is fine.
  useEffect(() => {
    if (compact) setMobileMenuOpen(false);
  }, [compact]);

  const swap = reduceMotion
    ? { duration: 0 }
    : { duration: 0.26, ease: [0.16, 1, 0.3, 1] };

  const shared = {
    initial: reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -4 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: reduceMotion
      ? { opacity: 0, pointerEvents: "none" }
      : { opacity: 0, scale: 0.96, y: -4, pointerEvents: "none" },
    transition: swap,
  };

  const contents = (
    <PillContents
      compact={compact}
      isHome={isHome}
      active={active}
      activeLabel={activeLabel}
      isDark={isDark}
      toggleMode={toggleMode}
      onPalette={() => setPaletteOpen(true)}
      mobileMenuOpen={mobileMenuOpen}
      onToggleMobileMenu={() => setMobileMenuOpen((o) => !o)}
      menuTriggerRef={menuTriggerRef}
    />
  );

  return (
    // `pointer-events-none` on the gutter so the strip either side of a
    // collapsed pill doesn't swallow clicks meant for the page underneath.
    <div className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:pt-4 pointer-events-none">
      {/* Fixed height: both pills are absolutely placed inside it so they can
          overlap during the swap, and the mobile panel anchors to a box that
          doesn't move. */}
      <div className="relative mx-auto w-full max-w-5xl h-14">
        <AnimatePresence initial={false}>
          {compact ? (
            <motion.div
              key="nav-compact"
              {...shared}
              style={{ x: "-50%", willChange: "transform, opacity" }}
              className="nav-shell pointer-events-auto absolute top-0 left-1/2 z-10 flex items-center gap-1 h-11 max-w-full px-2 sm:px-2.5"
            >
              {contents}
            </motion.div>
          ) : (
            <motion.div
              key="nav-wide"
              {...shared}
              style={{ willChange: "transform, opacity" }}
              className="nav-shell pointer-events-auto absolute top-0 inset-x-0 z-10 flex items-center justify-between gap-3 h-14 px-3 sm:px-5"
            >
              {contents}
            </motion.div>
          )}
        </AnimatePresence>

        {isHome && (
          <MobileMenu
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            triggerRef={menuTriggerRef}
            active={active}
          />
        )}
      </div>
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
        {/* The nav floats out of flow now, so the page owes it the height it
            used to occupy: 12px gutter + a 56px pill. */}
        <div className="pt-[4.25rem] sm:pt-[4.5rem]">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/summer" element={<AboutSF />} />
            <Route path="/summer-2026" element={<Summer2026 />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
