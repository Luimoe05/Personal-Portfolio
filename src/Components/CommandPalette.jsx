import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars -- `motion` is used via <motion.div> JSX tags below; this config lacks jsx-uses-vars
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Search,
  User,
  Briefcase,
  FolderGit2,
  Wrench,
  PenLine,
  Mail,
  FileText,
  Github,
  Linkedin,
  CornerDownLeft,
} from "lucide-react";
import ResumePDF from "../assets/Luis_Resume_2026.pdf";
import useScrollLock from "./useScrollLock";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function CommandPalette({ open, setOpen }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const dialogRef = useRef(null);
  const selectedItemRef = useRef(null);
  const previousFocusRef = useRef(null);

  const goSection = useCallback(
    (id) => {
      navigate("/");
      setTimeout(
        () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
        60
      );
    },
    [navigate]
  );

  const actions = useMemo(
    () => [
      { id: "top", label: "Go to Top", group: "Navigate", Icon: User, run: () => goSection("top") },
      { id: "experience", label: "Go to Experience", group: "Navigate", Icon: Briefcase, run: () => goSection("experience") },
      { id: "projects", label: "Go to Projects", group: "Navigate", Icon: FolderGit2, run: () => goSection("work") },
      { id: "toolkit", label: "Go to Toolkit", group: "Navigate", Icon: Wrench, run: () => goSection("toolkit") },
      { id: "writing", label: "Go to Writing", group: "Navigate", Icon: PenLine, run: () => goSection("writing") },
      { id: "contact", label: "Go to Contact", group: "Navigate", Icon: Mail, run: () => goSection("contact") },
      { id: "resume", label: "View résumé", group: "Actions", Icon: FileText, run: () => window.open(ResumePDF, "_blank") },
      { id: "summer", label: "Read: Summer 2025 recap", group: "Actions", Icon: PenLine, run: () => navigate("/summer") },
      { id: "summer-2026", label: "Read: Summer 2026 at Salesforce", group: "Actions", Icon: PenLine, run: () => navigate("/summer-2026") },
      { id: "github", label: "GitHub — @Luimoe05", group: "Links", Icon: Github, run: () => window.open("https://github.com/Luimoe05", "_blank") },
      { id: "linkedin", label: "LinkedIn — luisanm", group: "Links", Icon: Linkedin, run: () => window.open("https://www.linkedin.com/in/luisanm/", "_blank") },
      { id: "email", label: "Email me", group: "Links", Icon: Mail, run: () => window.open("mailto:lmoreno00528@gmail.com") },
    ],
    [goSection, navigate]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((a) => a.label.toLowerCase().includes(q));
  }, [actions, query]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement;
      setQuery("");
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    } else {
      const toRestore = previousFocusRef.current;
      if (toRestore instanceof HTMLElement && document.contains(toRestore)) {
        toRestore.focus();
      }
      previousFocusRef.current = null;
    }
  }, [open]);

  useScrollLock(open);

  useEffect(() => setSelected(0), [query]);

  useEffect(() => {
    selectedItemRef.current?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  const runAction = (action) => {
    if (!action) return;
    action.run();
    setOpen(false);
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => (s + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => (s - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      runAction(filtered[selected]);
    } else if (e.key === "Tab") {
      const container = dialogRef.current;
      if (!container) return;
      const focusable = Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (e.shiftKey) {
        if (active === first || !container.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else if (active === last || !container.contains(active)) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-black/20 px-4 pt-[18vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="w-full max-w-[600px] overflow-hidden rounded-2xl border border-ink/10 bg-card/85 shadow-[0_24px_80px_rgb(0_0_0/0.25)] backdrop-blur-2xl backdrop-saturate-[1.8]"
            initial={{ scale: 0.97, opacity: 0, y: -8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.97, opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-ink/10 px-5 py-4">
              <Search className="h-5 w-5 text-ink-2" strokeWidth={1.75} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                aria-label="Search the site"
                className="flex-1 bg-transparent text-[21px] text-ink outline-none placeholder:text-ink-2"
              />
              <kbd className="rounded-md border border-ink/10 px-1.5 py-0.5 font-sans text-[11px] text-ink-2">
                ESC
              </kbd>
            </div>

            <div ref={listRef} className="max-h-80 overflow-y-auto overscroll-contain p-2 [scrollbar-width:none]">
              {filtered.length === 0 && (
                <p className="px-4 py-6 text-center text-[15px] text-ink-2">
                  No results for "{query}"
                </p>
              )}
              {filtered.map((action, i) => {
                const { Icon } = action;
                const isSel = i === selected;
                return (
                  <button
                    key={action.id}
                    ref={isSel ? selectedItemRef : null}
                    onMouseEnter={() => setSelected(i)}
                    onClick={() => runAction(action)}
                    className={`flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[15px] ${
                      isSel ? "bg-blue text-white" : "text-ink"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 shrink-0 ${isSel ? "text-white" : "text-ink-2"}`}
                      strokeWidth={1.75}
                    />
                    <span className="flex-1">{action.label}</span>
                    <span className={`text-xs ${isSel ? "text-white" : "text-ink-2"}`}>
                      {action.group}
                    </span>
                    {isSel && <CornerDownLeft className="h-3.5 w-3.5 text-white/85" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
