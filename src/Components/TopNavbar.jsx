import React, { useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components -- shared with App.jsx's nav bar and mobile menu so every surface consumes the same section list as one source of truth
export const sections = [
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
];

// Which section is under the reader right now.
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

// The desktop section links in the global nav: small, quiet text links, the
// way apple.com lays out its top bar. The current section is the only one at
// full ink.
export default function TopNavbar({ active, onGo }) {
  return (
    <nav aria-label="Sections" className="flex items-center gap-8">
      {sections.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => onGo(id)}
          aria-current={active === id ? "true" : undefined}
          className={`cursor-pointer text-xs tracking-normal transition-colors hover:text-ink ${
            active === id ? "text-ink" : "text-ink/80"
          }`}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
