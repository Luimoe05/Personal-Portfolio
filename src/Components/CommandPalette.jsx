import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Search,
  User,
  Briefcase,
  FolderGit2,
  PenLine,
  Mail,
  FileText,
  Github,
  Linkedin,
  CornerDownLeft,
} from "lucide-react";
import ResumePDF from "../assets/Luis_Resume_2026.pdf";

export default function CommandPalette({ open, setOpen }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const goSection = (id) => {
    navigate("/");
    setTimeout(
      () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
      60
    );
  };

  const actions = useMemo(
    () => [
      { id: "about", label: "Go to About", group: "Navigate", Icon: User, run: () => goSection("about") },
      { id: "experience", label: "Go to Experience", group: "Navigate", Icon: Briefcase, run: () => goSection("experience") },
      { id: "projects", label: "Go to Projects", group: "Navigate", Icon: FolderGit2, run: () => goSection("projects") },
      { id: "writing", label: "Go to Writing", group: "Navigate", Icon: PenLine, run: () => goSection("writing") },
      { id: "contact", label: "Go to Contact", group: "Navigate", Icon: Mail, run: () => goSection("contact") },
      { id: "resume", label: "View résumé", group: "Actions", Icon: FileText, run: () => window.open(ResumePDF, "_blank") },
      { id: "summer", label: "Read: Summer 2025 recap", group: "Actions", Icon: PenLine, run: () => navigate("/summer") },
      { id: "github", label: "GitHub — @Luimoe05", group: "Links", Icon: Github, run: () => window.open("https://github.com/Luimoe05", "_blank") },
      { id: "linkedin", label: "LinkedIn — luisanm", group: "Links", Icon: Linkedin, run: () => window.open("https://www.linkedin.com/in/luisanm/", "_blank") },
      { id: "email", label: "Email me", group: "Links", Icon: Mail, run: () => window.open("mailto:lmoreno00528@gmail.com") },
    ],
    []
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
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  useEffect(() => setSelected(0), [query]);

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
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[15vh] bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="elevated w-full max-w-lg rounded-xl overflow-hidden"
            initial={{ scale: 0.97, opacity: 0, y: -8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.97, opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b rule-c">
              <Search className="w-4 h-4 txt-faint" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search…"
                className="flex-1 bg-transparent outline-none text-sm placeholder:txt-faint"
              />
              <kbd className="text-[10px] px-1.5 py-0.5 rounded border rule-c txt-faint">
                ESC
              </kbd>
            </div>

            <div ref={listRef} className="max-h-72 overflow-y-auto scrollbar-hide py-2">
              {filtered.length === 0 && (
                <p className="px-4 py-6 text-sm text-center txt-faint">
                  No results for "{query}"
                </p>
              )}
              {filtered.map((action, i) => {
                const { Icon } = action;
                const isSel = i === selected;
                return (
                  <button
                    key={action.id}
                    onMouseEnter={() => setSelected(i)}
                    onClick={() => runAction(action)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors"
                    style={isSel ? { background: "var(--surface-2)" } : undefined}
                  >
                    <Icon
                      className="w-4 h-4 shrink-0"
                      style={{ color: isSel ? "var(--accent)" : "var(--muted)" }}
                    />
                    <span className="flex-1">{action.label}</span>
                    <span className="text-[10px] uppercase tracking-wide txt-faint">
                      {action.group}
                    </span>
                    {isSel && <CornerDownLeft className="w-3.5 h-3.5 txt-faint" />}
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
