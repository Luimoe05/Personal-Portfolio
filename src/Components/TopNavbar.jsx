import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars -- `motion` is used via <motion.span> JSX below; this config lacks jsx-uses-vars
import { motion, useReducedMotion } from "framer-motion";

// eslint-disable-next-line react-refresh/only-export-components -- shared with App.jsx's nav shell and mobile panel so every surface consumes the same section list as one source of truth
export const sections = [
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
];

// Which section is under the reader right now. Lifted out of the nav itself
// because the shell also needs it: on mobile the collapsed pill shows the
// active label in place of the name, and there is only ever one observer.
// eslint-disable-next-line react-refresh/only-export-components -- see above
export function useActiveSection(enabled = true) {
  const [active, setActive] = useState("");

  useEffect(() => {
    if (!enabled) {
      setActive("");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -60% 0px", threshold: [0, 0.5, 1] }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [enabled]);

  return active;
}

// The section rail inside the nav pill. The active item is marked by a single
// shared background element (`layoutId`), so switching sections slides one
// capsule between labels rather than cross-fading four separate backgrounds.
export default function TopNavbar({
  active,
  compact = false,
  markerId = "nav-active-pill",
}) {
  const reduceMotion = useReducedMotion();

  return (
    <nav
      aria-label="Sections"
      className={`flex items-center ${compact ? "gap-0.5" : "gap-1"}`}
    >
      {sections.map(({ id, label }) => (
        <button
          key={id}
          onClick={() =>
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
          }
          data-on={active === id}
          aria-current={active === id ? "true" : undefined}
          className="mono-link nav-pill"
        >
          {active === id && (
            <motion.span
              layoutId={markerId}
              className="nav-pill-bg"
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 520, damping: 42, mass: 0.6 }
              }
            />
          )}
          <span className="relative z-10">{label}</span>
        </button>
      ))}
    </nav>
  );
}
