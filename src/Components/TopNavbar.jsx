import React, { useEffect, useState } from "react";

const sections = [
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
];

export default function TopNavbar() {
  const [active, setActive] = useState("");

  useEffect(() => {
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
  }, []);

  return (
    <nav className="flex items-center gap-5">
      {sections.map(({ id, label }) => (
        <button
          key={id}
          onClick={() =>
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
          }
          data-on={active === id}
          className="mono-link"
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
