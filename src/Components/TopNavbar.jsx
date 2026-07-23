import React, { useEffect, useState } from "react";

const sections = ["experience", "projects", "writing", "contact"];

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

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
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    const els = sections
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="flex items-center gap-5">
      {sections.map((section) => {
        const isActive = active === section;
        return (
          <button
            key={section}
            onClick={() => scrollTo(section)}
            className={`text-[11px] font-semibold uppercase tracking-[0.16em] cursor-pointer transition-colors ${
              isActive ? "txt-accent" : "txt-faint hover:txt-muted"
            }`}
          >
            {section}
          </button>
        );
      })}
    </nav>
  );
}
