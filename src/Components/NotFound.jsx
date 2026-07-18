import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import AnimateIn from "./AnimateIn";

export default function NotFound({ isDark }) {
  const navigate = useNavigate();
  const subtle = isDark ? "text-zinc-400" : "text-zinc-500";

  return (
    <main className="relative flex flex-col items-center justify-center min-h-[80vh] px-6 text-center overflow-hidden">
      {/* Soft accent glow to match the hero */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div
          className="h-72 w-72 rounded-full blur-3xl"
          style={{ background: "var(--accent)", opacity: 0.16 }}
        />
      </div>

      <AnimateIn delay={0.1}>
        <p
          className="text-xs uppercase tracking-widest font-semibold"
          style={{ color: "var(--accent)" }}
        >
          Page not found
        </p>
        <h1 className="font-display text-7xl sm:text-8xl font-black tracking-tight mt-3">
          404
        </h1>
        <p className={`max-w-sm mx-auto mt-4 text-sm sm:text-base leading-relaxed ${subtle}`}>
          Looks like this page wandered off. Let's get you back to solid ground.
        </p>
        <button
          onClick={() => navigate("/")}
          className={`mt-6 inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full border cursor-pointer transition-colors ${
            isDark
              ? "border-zinc-700 hover:bg-zinc-800"
              : "border-zinc-300 hover:bg-zinc-100"
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Back home
        </button>
      </AnimateIn>
    </main>
  );
}
