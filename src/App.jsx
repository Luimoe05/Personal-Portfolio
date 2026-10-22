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
import ResumePDF from "./assets/Luis_Resume_2026.pdf";
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

// Mobile menu: the bar grows into a full-screen sheet of large section
// links, with the resume last.
function MobileMenu({ open, onClose, triggerRef, active, onGo }) {
  const reduceMotion = useReducedMotion();
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const trigger = triggerRef.current;
    const header = trigger?.closest("header");
    if (!panel || !header) return;

    const background = [document.getElementById("page-content"), document.getElementById("skip-link")].filter(Boolean);
    const previousInert = background.map((element) => element.inert);
    background.forEach((element) => { element.inert = true; });

    const focusable = () => [header, panel].flatMap((container) =>
      Array.from(container.querySelectorAll('a[href], button:not([disabled])'))
        .filter((element) => element.getClientRects().length > 0)
    );
    panel.querySelector("button")?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "Tab") {
        const controls = focusable();
        const index = controls.indexOf(document.activeElement);
        if (index === -1 || (e.shiftKey ? index === 0 : index === controls.length - 1)) {
          e.preventDefault();
          (e.shiftKey ? controls.at(-1) : controls[0])?.focus();
        }
      }
    };
    const onFocus = (e) => {
      if (!header.contains(e.target) && !panel.contains(e.target)) {
        panel.querySelector("button")?.focus();
      }
    };
    // A menu opened on mobile must release its focus/scroll locks on desktop.
    const desktop = window.matchMedia("(min-width: 768px)");
    const onResize = () => { if (desktop.matches) onClose(); };
    onResize();
    window.addEventListener("keydown", onKey);
    document.addEventListener("focusin", onFocus);
    desktop.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("focusin", onFocus);
      desktop.removeEventListener("change", onResize);
      background.forEach((element, i) => { element.inert = previousInert[i]; });
      // The mobile trigger is hidden after a desktop resize.
      (trigger?.getClientRects().length ? trigger : header.querySelector("a"))?.focus();
    };
  }, [open, onClose, triggerRef]);

  useScrollLock(open);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          id="mobile-nav-panel"
          className="fixed inset-0 z-40 overflow-y-auto bg-canvas pt-20 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
        >
          <nav aria-label="Sections" className="flex flex-col px-6 pt-6">
            {sections.map(({ id, label }, i) => (
              <motion.button
                key={id}
                onClick={() => {
                  onClose();
                  onGo(id);
                }}
                aria-current={active === id ? "true" : undefined}
                className={`cursor-pointer py-2 text-left text-h3 font-bold tracking-[-0.02em] ${
                  active === id ? "text-accent" : "text-ink"
                }`}
                initial={reduceMotion ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduceMotion ? 0 : 0.04 * i + 0.05, duration: 0.3 }}
              >
                {label}
              </motion.button>
            ))}
            <a
              href={ResumePDF}
              target="_blank"
              rel="noreferrer"
              className="mt-6 border-t border-line pt-6 text-h4 font-semibold text-accent"
            >
              View resume (PDF)
            </a>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// True once the page has scrolled past the very top.
function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

// Whether the hero's own resume button is on screen. While it is, the nav
// leaves its Resume button out; off the home page there is no hero, so the
// nav always offers it.
function useHeroResumeVisible(isHome) {
  const [visible, setVisible] = useState(isHome);
  useEffect(() => {
    const el = isHome && document.getElementById("hero-resume");
    if (!el) {
      setVisible(false);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: "-80px 0px 0px 0px",
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [isHome]);
  return visible;
}

// The global nav: a floating oval pinned near the top. Once the page scrolls
// it shrinks (a transform, so nothing reflows) to get out of the content's way,
// and a Resume button joins it once the hero's own one is out of view.
// Name on the left, section links in the middle, then the resume, the theme
// switch and search (the command palette). On mobile the section links move
// into the menu sheet and search is dropped: the sheet already lists
// everything.
function GlobalNav({ paletteOpen, setPaletteOpen }) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const menuTriggerRef = useRef(null);
  const active = useActiveSection(isHome);
  const goSection = useGoSection();
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const scrolled = useScrolled();
  const showResume = !useHeroResumeVisible(isHome);

  useEffect(() => setMenuOpen(false), [location.pathname, paletteOpen]);

  const iconBtn =
    "inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-ink-2 transition-colors hover:bg-mist hover:text-ink";

  return (
    <>
      <header
        className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3"
      >
        <div
          className={`pointer-events-auto flex h-14 w-full origin-top items-center justify-between gap-3 rounded-full border border-line bg-card py-2 pr-2 pl-5 shadow-[0_6px_24px_-8px_oklch(0.2_0.01_158/0.18)] transition-transform duration-300 ease-out-expo motion-reduce:transition-none md:w-auto md:gap-6 ${
            scrolled && !menuOpen ? "scale-[0.86]" : "scale-100"
          }`}
        >
          <Link
            to="/"
            aria-label="Luis-Angel Moreno, home"
            className="shrink-0 text-small font-bold tracking-[-0.02em] text-ink sm:text-body"
          >
            Luis-Angel Moreno
          </Link>

          <div className="hidden md:block">
            <TopNavbar active={active} onGo={goSection} />
          </div>

          <div className="flex items-center gap-1">
            {/* Slides open once the hero's resume button scrolls away. The
                0fr → 1fr grid column animates the width without measuring. */}
            <div
              inert={!showResume}
              className={`grid transition-[grid-template-columns,opacity] duration-300 ease-out-expo motion-reduce:transition-none ${
                showResume ? "grid-cols-[1fr] opacity-100" : "grid-cols-[0fr] opacity-0"
              }`}
            >
              <div className="min-w-0 overflow-hidden">
                <a
                  href={ResumePDF}
                  target="_blank"
                  rel="noreferrer"
                  className="mr-1 block rounded-full bg-accent px-4 py-2 text-small font-semibold whitespace-nowrap text-on-accent transition-colors hover:bg-accent-hover"
                >
                  Resume
                </a>
              </div>
            </div>
            <ThemeToggle className={iconBtn} />
            <button
              onClick={() => setPaletteOpen(true)}
              aria-label="Search (Command K)"
              className="hidden h-10 cursor-pointer items-center gap-2 rounded-full px-3 text-ink-2 transition-colors hover:bg-mist hover:text-ink md:inline-flex"
            >
              <Search className="h-4 w-4" strokeWidth={1.75} />
              <kbd className="rounded border border-line px-1.5 font-sans text-caption">⌘K</kbd>
            </button>
            <button
              ref={menuTriggerRef}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-panel"
              className={`${iconBtn} md:hidden`}
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

      {/* Outside the header so the sheet's z-order and inert handling stay
          independent of the bar. */}
      <MobileMenu
        open={menuOpen && !paletteOpen}
        onClose={closeMenu}
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
        id="skip-link"
        href="#content"
        className="sr-only rounded-lg bg-accent px-4 py-2 text-small text-on-accent focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[110]"
      >
        Skip to content
      </a>

      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />

      <GlobalNav paletteOpen={paletteOpen} setPaletteOpen={setPaletteOpen} />
      <div id="page-content" className="min-h-screen pt-20">
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
