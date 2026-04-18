import React from "react";

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export default function TopNavbar({ isDark }) {
  return (
    <div
      className={`flex flex-row gap-1 rounded-xl p-1.5 ${
        isDark
          ? "bg-zinc-800/60 border border-zinc-700/50"
          : "bg-zinc-100 border border-zinc-200"
      }`}
    >
      {["about", "experience", "projects"].map((section) => (
        <button
          key={section}
          onClick={() => scrollTo(section)}
          className={`text-xs sm:text-sm font-medium capitalize cursor-pointer px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-200 ${
            isDark
              ? "hover:bg-zinc-700 text-zinc-300 hover:text-white"
              : "hover:bg-white text-zinc-500 hover:text-zinc-900"
          }`}
        >
          {section.charAt(0).toUpperCase() + section.slice(1)}
        </button>
      ))}
    </div>
  );
}
