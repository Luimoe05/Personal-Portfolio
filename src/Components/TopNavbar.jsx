import React, { useEffect, useState } from "react";

const sections = ["about", "experience", "projects", "writing", "contact"];

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export default function TopNavbar({ isDark }) {
  const [active, setActive] = useState("about");

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
    <div
      className={`flex max-w-full overflow-x-auto scrollbar-hide rounded-xl p-1.5 backdrop-blur-md ${
        isDark
          ? "bg-zinc-800/60 border border-zinc-700/50"
          : "bg-zinc-100/80 border border-zinc-200"
      }`}
    >
      <div className="flex flex-row gap-1 w-max">
        {sections.map((section) => {
          const isActive = active === section;
          return (
            <button
              key={section}
              onClick={() => scrollTo(section)}
              className={`whitespace-nowrap text-xs sm:text-sm font-medium capitalize cursor-pointer px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? isDark
                    ? "bg-zinc-700 text-white"
                    : "bg-white text-zinc-900 shadow-sm"
                  : isDark
                  ? "hover:bg-zinc-700/60 text-zinc-300 hover:text-white"
                  : "hover:bg-white/60 text-zinc-500 hover:text-zinc-900"
              }`}
              style={isActive ? { color: "var(--accent)" } : undefined}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
