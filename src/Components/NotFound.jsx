import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import AnimateIn from "./AnimateIn";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="relative flex flex-col items-center justify-center min-h-[80vh] px-6 text-center overflow-hidden">
      {/* Soft grey halo to match the hero — monochrome, so it has to stay
          faint or it reads as a smudge rather than as light. */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div
          className="h-72 w-72 rounded-full blur-3xl"
          style={{ background: "var(--accent)", opacity: 0.09 }}
        />
      </div>

      <AnimateIn delay={0.1}>
        <p className="text-xs uppercase tracking-widest font-semibold txt-muted">
          Page not found
        </p>
        <h1 className="font-display text-7xl sm:text-8xl font-black tracking-tight mt-3">
          404
        </h1>
        <p className="max-w-sm mx-auto mt-4 text-sm sm:text-base leading-relaxed txt-muted">
          Looks like this page wandered off. Let's get you back to solid ground.
        </p>
        <button
          onClick={() => navigate("/")}
          className="btn-ghost mt-6 inline-flex items-center gap-2 px-4 py-2.5"
        >
          <ArrowLeft className="w-4 h-4" />
          Back home
        </button>
      </AnimateIn>
    </main>
  );
}
